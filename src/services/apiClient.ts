import { getRefreshToken, getToken, removeRefreshToken, removeToken, saveToken } from '@/features/auth/utils/tokenService';
import axios from 'axios';

const API_BASE_URL = "https://wattsupai-backend.onrender.com/api/v1";

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});


//attach access token
apiClient.interceptors.request.use(async (config) => {
    const token = await getToken();
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// // Refresh token on 401
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        //check 401 AND not already retried
        if (error.responese?.status === 401
            && !originalRequest._retry
            && !originalRequest.url.includes("/auth/refresh")) {

            originalRequest._retry = true;

            try {
                const refreshToken = await getRefreshToken();
                if (!refreshToken) throw new Error("No refresh token");

                // call refresh token
                const refreshResponse = await axios.post(`${API_BASE_URL}/auth/refresh`, {
                    refreshToken,
                });

                const newToken = refreshResponse.data.token;
                await saveToken(newToken); //new access token stored

                //retry with new access token
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return apiClient(originalRequest);

            } catch (refreshError) {
                // Refresh failed -> logging out
                await removeRefreshToken();
                await removeToken();
                console.log("Token refresh failed, logging out.");

                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;