import { useAuthstore } from "../model/authStore";

export const useAuth = () => {
    const user = useAuthstore((state) => state.user);
    const isLoading = useAuthstore((state)=>state.isLoading);
    const error = useAuthstore((state)=>state.error);
    const login = useAuthstore((state)=>state.login);
    const register = useAuthstore((state)=>state.register);
    const logout = useAuthstore((state)=>state.logout);

    return  {
        user,
        isLoading,
        error,
        login,
        register,
        logout,
    };
};