import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuthState from "../hooks/useAuthState";

const AuthenticatedRoute: React.FC = () => {
    const {isAuthenticated} = useAuthState();
    const location = useLocation();

    if (!isAuthenticated) {
        return (
            <Navigate
                to="/signin"
                state={{redirect: `${location.pathname}${location.search}`}}
            />
        );
    }
    return <Outlet />;
};

export default AuthenticatedRoute;