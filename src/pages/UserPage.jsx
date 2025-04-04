import React, { useState } from "react";
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import axios from "axios"; 
import Swal from "sweetalert2";
import "../styles/user/user.css";

const UserPage = () => {
  const storedUser = JSON.parse(localStorage.getItem("nombre")); 
  const userName = storedUser ? storedUser.nombre : "Usuario";

  const [formData, setFormData] = useState({
    usuario: userName, 
    asunto: "",
    descripcion: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      
      const response = await axios.post(
        "https://sistema-de-seguimiento-de-tickets.onrender.com/ticket",  
        formData,  
        { withCredentials: true } 
      );

      Swal.fire({
        title: "¡Ticket Creado!",
        text: "Tu reporte se ha registrado con éxito.",
        icon: "success",
        confirmButtonText: "OK",
      });

      setFormData({
        usuario: userName,
        asunto: "",
        descripcion: "",
      });

    } catch (error) {
      console.error("Error al enviar el ticket:", error.response?.data || error.message);
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Hubo un problema al registrar el ticket. Inténtalo nuevamente.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="user-page">
      <Header />
      
      {/* Contenido principal */}
      <main className="contentu">
        <div className="report-box">
          <h2 className="title">CREAR REPORTE</h2>
          <form onSubmit={handleSubmit} className="form-container">
            <input 
              type="text" 
              value={formData.usuario} 
              readOnly 
              className="input-field locked" 
            />
            <select 
              className="input-field" 
              name="asunto" 
              value={formData.asunto} 
              onChange={handleChange} 
              required
            >
              <option value="">-- Seleccione un tema de Ayuda --</option>
              <option value="Formateo de PC/Laptop">Formateo de PC/Laptop</option>
              <option value="Mantenimiento preventivo">Mantenimiento preventivo</option>
              <option value="Respaldo de información">Respaldo de información</option>
              <option value="Configuración de impresora">Configuración de impresora</option>
              <option value="Diagnóstico a equipos">Diagnóstico a equipos</option>
              <option value="Restricciones de internet">Restricciones de internet</option>
              <option value="Configuración de PC/Laptop">Configuración de PC/Laptop</option>
              <option value="Configuración de Aplicaciones">Configuración de Aplicaciones</option>
              <option value="Otros Servicios">Otros Servicios</option>
            </select>
            <textarea 
              className="input-field" 
              placeholder="DESCRIPCIÓN"
              name="descripcion"
              value={formData.descripcion} 
              onChange={handleChange} 
              required 
            ></textarea> 
            <button type="submit" className="btn-submit">Registrar</button>
          </form>
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default UserPage;