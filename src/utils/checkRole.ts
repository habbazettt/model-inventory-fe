import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useCheckRole(requiredRole: string) {
    const navigate = useNavigate();

    useEffect(() => {
        const role = localStorage.getItem("role");
        if (role !== requiredRole) {
            navigate("/auth/login");
        }
    }, [navigate, requiredRole]);
}