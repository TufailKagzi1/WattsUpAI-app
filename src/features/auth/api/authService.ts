import { User } from "@/features/auth/types";
import apiClient from '@/services/apiClient';
import { getRefreshToken, removeRefreshToken, removeToken, saveRefreshToken, saveToken } from '../utils/tokenService';

interface LoginInput {
    email: string;
    password: string;
};

interface RegisterInput {
    name: string;
    email: string;
    phone: string;
    password: string;
}

interface RegisterResponse {
    success: boolean;
    data: User;
}

interface LoginResponse {
    token: string;
    refreshToken: string;
    expirationTime: string;
    refreshTokenExpiration: string;
    data: User;
}

export const register = async (payload: RegisterInput): Promise<User> => {
    const responese = await apiClient.post<RegisterResponse>("/auth/register", payload);
    return responese.data.data;
};

export const login = async (payload: LoginInput): Promise<User> => {
    const response = await apiClient.post<LoginResponse>("/auth/login", payload);
    const { token, refreshToken, data } = response.data;

    await saveToken(token);
    await saveRefreshToken(refreshToken);

    return data;
};

export const logout = async () => {
    const refreshToken = await getRefreshToken();

    if (!refreshToken) {
        console.warn("No refresh token found, skipping logout call.");
        await removeToken();
        await removeRefreshToken();
        return;
    }

    try {
        await apiClient.post("/auth/logout", { refreshToken });
    } catch (error) {
        console.warn("Logout API call failed", error);
    } finally {
        await removeToken();
        await removeRefreshToken();
    }
};