import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const usePreventBack = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Esta función evitará el retorno hacia la página anterior
    const handlePopState = (event) => {
      if (!localStorage.getItem("token")) {
        // Si no hay token (usuario no autenticado), redirigir al login
        navigate("/", { replace: true });
      }
    };

    // Añadir evento para bloquear el botón de retroceso
    window.addEventListener("popstate", handlePopState);

    // Limpieza del evento
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);
};
