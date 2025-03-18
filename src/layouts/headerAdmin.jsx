import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";  // Importa Link para redirección
import logoLeft from "../assets/icon.png";
import logoRight from "../assets/escudoPabe.jpg";
import "../styles/admin/headerAdmin.css";
import Swal from "sweetalert2";

const HeaderAdmin = () => {

  const navigate = useNavigate(); // Usamos useNavigate para redirigir después de cerrar sesión

  // Función para manejar el cierre de sesión
  const handleLogout = async (e) => {
    e.preventDefault(); 

    // Mostrar la alerta de confirmación con SweetAlert
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Cerrar sesión terminará tu sesión actual.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Enviar la solicitud de cierre de sesión al backend
          await axios.post("http://localhost:4000/logout", {}, { withCredentials: true });

          // Eliminar datos de sesión del localStorage
          localStorage.removeItem("token");
          localStorage.removeItem("nombre");
          localStorage.removeItem("user");

          // Redirigir al usuario a la página de inicio de sesión
          navigate("/");

          // Mostrar mensaje de éxito
          Swal.fire({
            title: "Sesión cerrada",
            text: "Has cerrado sesión correctamente.",
            icon: "success",
            timer: 2000, 
            showConfirmButton: false,
          });
        } catch (error) {
          console.error("Error al cerrar sesión:", error);
          Swal.fire({
            title: "Error",
            text: "Hubo un problema al cerrar sesión.",
            icon: "error",
          });
        }
      }
    });
  };
  return (
    <>
      {/* HEADER */}
      <div className="header">
        <img src={logoLeft} alt="Logo Pabellón Arteaga" className="logo_left" />
        <h1>SISTEMA DE REPORTE DE INCIDENCIAS</h1>
        <img src={logoRight} alt="Escudo Pabellón de Arteaga" className="logo_right" />
      </div>

      {/* SIDEBAR */}
      <div className="sidebar">
        <ul className="sidebar-menuA">
        <li className="sidebar-btn">
            <Link to="/ver-reportes">
              <img src="https://img.icons8.com/external-becris-flat-becris/64/external-statistics-data-science-becris-flat-becris.png" alt="Listar" />
              Estadisticas
            </Link>
          </li>
          <li className="sidebar-btn">
            <Link to="/reporte_Admin">
              <img src="https://img.icons8.com/office/40/add-property.png" alt="Crear" />
              Crear Reporte
            </Link>
          </li>
          <li className="sidebar-btn">
            <Link to="/ver-reportes_Admin">
              <img src="https://img.icons8.com/stickers/50/test-partial-passed.png" alt="Listar" />
              Ver Reportes
            </Link>
          </li>
          <li className="sidebar-btn">
            <Link to="/usuarios">
              <img src="https://img.icons8.com/plasticine/100/conference-call.png" alt="Listar" />
              Usuarios
            </Link>
          </li>
          <li className="sidebar-btn">
            <Link to="/registro">
              <img src="https://img.icons8.com/stickers/50/add-user-group-woman-woman.png" alt="Listar" />
              Registro de Usuarios
            </Link>
          </li>
          {/* <li className="sidebar-btn">
            <Link to="/">
              <img src="https://img.icons8.com/dusk/64/clock--v1.png" alt="Listar" />
              Registro de Actividades
            </Link>
          </li> */}
          <li className="sidebar-btn">
            <Link to="/" onClick={handleLogout}>
              <img src="https://img.icons8.com/arcade/64/exit.png" alt="Listar" />
              Cerrar Sesion
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default HeaderAdmin;
