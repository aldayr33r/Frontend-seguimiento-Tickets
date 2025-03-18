import React, { useState, useEffect  } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "../styles/login.css";
import logoLeft from "../assets/icon.png";
import logoRight from "../assets/escudoPabe.jpg";
import avatar from "../assets/user_i.png";

const usePreventBack = () => {
  const navigate = useNavigate();

  useEffect(() => {
    
    const preventBack = () => {
      navigate("/", { replace: true });
    };

    
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = preventBack;

    return () => {
      window.onpopstate = null;
    };
  }, [navigate]);
};
const LoginPage = () => {
  const [user, setUser] = useState("");  
  const [pass, setPass] = useState(""); 
  const navigate = useNavigate();

  // Verificar si el usuario ya tiene una sesión activa
  useEffect(() => {
    const token = localStorage.getItem("token");
  
    if (token) {
      const userData = JSON.parse(localStorage.getItem("user"));
  
      Swal.fire({
        icon: "warning",
        title: "Sesión activa",
        text: "Ya tienes una sesión activa. Cierra sesion para iniciar con otra cuenta.",
        confirmButtonText: "Aceptar"
      }).then(() => {
        if (userData.tipo_usuario === "Administrador") {
          navigate("/registro");
        } else {
          navigate("/crear-reporte");
        }
      });
    }
  }, [navigate]);
  // Llamar al hook para prevenir retroceder
  usePreventBack();

  const handleLogin = async (e) => {
    e.preventDefault(); 
    try {
      const response = await axios.post(
        "http://localhost:4000/login",  
        { user, pass },  
        { withCredentials: true } 
      );

        const { token, nombre:name ,user: userData } = response.data; 
          localStorage.setItem("token", token);
          localStorage.setItem("nombre", JSON.stringify(name));
          localStorage.setItem("user", JSON.stringify(userData));

          Swal.fire({
            icon: "success",
            title: "Bienvenido",
            text: `Hola ${name.nombre}, has iniciado sesión correctamente`,
            timer: 2000, 
            showConfirmButton: false,
          });

          
        if (userData.tipo_usuario === "Administrador") {
          navigate("/registro"); 
        } else {
          navigate("/crear-reporte"); 
        }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Credenciales incorrectas",
      });
    }
  };

  return (
    <div className="container">
      {/* Header fijo */}
      <div className="header">
        <img src={logoLeft} alt="Logo Pabellón Arteaga" className="logo_left" />
        <h1>SISTEMA DE REPORTE DE INCIDENCIAS</h1>
        <img src={logoRight} alt="Escudo Pabellón de Arteaga" className="logo_right" />
      </div>

      {/* Cuerpo del login */}
      <div className="login-container">
        <div className="login-box">
          <h1>INICIO DE SESIÓN</h1>
          <div className="login-avatar">
            <img src={avatar} alt="Usuario" />
          </div>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="USUARIO"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="CONTRASEÑA"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              required
            />
            <button type="submit">INICIAR SESIÓN</button>
          </form>
        </div>
      </div>

      {/* Pie de página */}
      <div className="footer"></div>
    </div>
  );
};

export default LoginPage;
