import { TOKEN } from "../constants/localstorage";

const useAuthState = () => {
    return {
        isAuthenticated: localStorage.getItem(TOKEN) != null,
        idToken: localStorage.getItem(TOKEN) ?? '',
    }
};

export default useAuthState;