import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Importa Link para redirección
import logoLeft from "../assets/icon.png";
import axios from "axios"; 
import logoRight from "../assets/escudoPabe.jpg";
import avatar from "../assets/usuario.gif";
import "../styles/user/header.css";
import Swal from "sweetalert2";

const Header = () => {

  const navigate = useNavigate(); // Usamos useNavigate para redirigir después de cerrar sesión
  const userData = JSON.parse(localStorage.getItem("nombre"));
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
      <div className="sidebarU">
        <div className="user-info">
          <img src={avatar} alt="Usuario" className="user-avatar" />
          <h2>{userData ? userData.nombre : "Usuario"}</h2>
        </div>
        <ul className="sidebar-menu">
          <li className="sidebar-btn">
            <Link to="/crear-reporte">
              <img src="https://img.icons8.com/office/40/add-property.png" alt="Crear Reporte" />
              Crear Reporte
            </Link>
          </li>
          <li className="sidebar-btn">
            <Link to="/ver-reportes">
              <img src="https://img.icons8.com/stickers/50/test-partial-passed.png" alt="Ver Reportes" />
              Ver Reportes
            </Link>
          </li>
          <li className="sidebar-btn">
            <Link to="/" onClick={handleLogout}>
              <img src="https://img.icons8.com/arcade/64/exit.png" alt="Cerrar Sesion" />
              Cerrar Sesion
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
