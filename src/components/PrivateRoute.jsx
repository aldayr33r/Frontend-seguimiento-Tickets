import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Swal from "sweetalert2";

const PrivateRoute = ({ children, requiredRole }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  if (!user || !token) {
    Swal.fire({
      icon: "error",
      title: "No has iniciado sesión",
      text: "No tienes permiso para acceder a esta página.",
    });
    return <Navigate to="/" replace />;
  }

  if (requiredRole && user.tipo_usuario !== requiredRole) {
    Swal.fire({
      icon: "error",
      title: "Acceso Denegado",
      text: "No tienes permiso para acceder a esta página.",
    });

    return <Navigate to="/crear-reporte" replace />; 
  }

  return children ? children : <Outlet />;
};

export default PrivateRoute;