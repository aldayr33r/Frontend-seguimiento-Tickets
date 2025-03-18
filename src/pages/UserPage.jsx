import React, { useState } from "react";
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import "../styles/user/user.css";

const UserPage = () => {

const [formData, setFormData] = useState({
    nombre: "",
    problema: "",
    descripcion: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
    
  };
  
  return (
    <div className="user-page">
      <Header />
      
      {/* Contenido principal */}
      <main className="contentu">
        <div className="report-box">
          <h2 className="title">CREAR REPORTE</h2>
          <form onSubmit={handleSubmit} className="form-container">
          <input type="text" value="N_USER" readOnly className="input-field locked" />
          <select className="input-field" 
           id="problema" 
           name="problema" 
           value={formData.problema} 
           onChange={handleChange} 
           required>
            <option selected>-- Seleccione un tema de Ayuda --</option>
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
         <textarea className="input-field" placeholder="DESCRIPCIÓN"
          type="text" 
          id="apellido" 
          name="apellido"
          value={formData.apellido} 
          onChange={handleChange} 
          required ></textarea> 
          <button type="submit" className="btn-submit">Registrar</button>
          </form>
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default UserPage;
