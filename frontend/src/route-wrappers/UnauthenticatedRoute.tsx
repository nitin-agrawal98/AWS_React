import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuthState from "../hooks/useAuthState";

const UnauthenticatedRoute: React.FC = () => {
    const {isAuthenticated} = useAuthState();
    const location = useLocation();

    if (isAuthenticated) {
        const next = location.state ? location.state['redirect'] : '/';
        return <Navigate to={next} />;
    }
    return <Outlet />;
}

export default UnauthenticatedRoute;