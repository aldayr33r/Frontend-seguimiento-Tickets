import React, { useState, useEffect } from "react";
import Header from "../../layouts/headerAdmin";
import Footer from "../../layouts/footer";
import axios from "axios"; 
import "../../styles/user/user.css";

const CrearTicket = () => {
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
        "http://localhost:4000/ticket",  
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

            {/* Campo para el nombre, editable pero con valor por defecto */}
            <input
              type="text"
              name="nombre"
              value={formData.usuario}
              onChange={handleChange}
              className="input-field"
            />

            {/* Selección del problema */}
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
              <option value="Configuracion de impresora">Configuracion de impresora</option>
              <option value="Diagnostico a equipos">Diagnostico a equipos</option>
              <option value="Restricciones de internet">Restricciones de internet</option>
              <option value="Configuracion de PC/Laptop">Configuracion de PC/Laptop</option>
              <option value="Configuracion de Aplicaciones">Configuracion de Aplicaciones</option>
              <option value="Otros Servicios">Otros Servicios</option>
            </select>

            {/* Descripción del problema */}
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
      <Footer />
    </div>
  );
};

export default CrearTicket;
