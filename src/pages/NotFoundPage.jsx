import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const NotFoundPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    Swal.fire({
      icon: "error",
      title: "Página no encontrada",
      text: "La ruta que intentaste acceder no existe.",
      confirmButtonText: "Ir al inicio"
    }).then(() => {
      navigate("/"); 
    });
  }, [navigate]);

  return null; 
};

export default NotFoundPage;
