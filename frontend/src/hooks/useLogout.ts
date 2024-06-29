import { TOKEN } from "../constants/localstorage";

const useLogout = () => {
    const logout = () => {
        localStorage.removeItem(TOKEN);
    }
    return {logout};
}

export default useLogout;