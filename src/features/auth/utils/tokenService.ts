import * as SecureStore from 'expo-secure-store';

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

export async function saveToken(token: string) {
    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, token);
}

export async function getToken(): Promise<string | null> {
    return await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
}

export async function removeToken() {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
}


// Refresh Tokens

export async function saveRefreshToken(token: string) {
    await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, token);
}

export async function getRefreshToken(): Promise<string | null> {
    return await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
}

export async function removeRefreshToken() {
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
}