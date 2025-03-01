import { ReactNode } from "react";
import { Navigate, Outlet } from "react-router";

interface AdminRouteProps {
    children?: ReactNode;
}

export default function AdminRoute({ children }: AdminRouteProps) {
    const token = (localStorage.getItem('token'));
    
    if (!token) {
        return <Navigate to="/admin" replace />;
    }

    return children ? children : <Outlet />;
}