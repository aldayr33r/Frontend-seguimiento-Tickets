import React, { useState } from "react";
import HeaderAdmin from "../../layouts/headerAdmin";
import Footer from "../../layouts/footer";
import "../../styles/admin/registro.css";

const RegistroUsuario = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    departamento: "",
    tipoUsuario: "",
    usuario: "",
    pass: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
    
  };

  return (
    <div className="admin-page">
      <HeaderAdmin />

      {/* Contenido principal */}
      <main className="content-a">
        <div className="report-box">
          <h2 className="title">Registro de Usuario</h2>

          <form onSubmit={handleSubmit} className="form-container">
            <input 
              type="text" 
              className="form-control" 
              id="nombre" 
              name="nombre" 
              placeholder="Ej: Juan Roberto"
              value={formData.nombre} 
              onChange={handleChange} 
              required 
            />

            <input 
              type="text" 
              className="form-control" 
              id="apellido" 
              name="apellido" 
              placeholder="Ej: Gonzalez Roman"
              value={formData.apellido} 
              onChange={handleChange} 
              required 
            />

            <input 
              type="email" 
              className="form-control" 
              id="correo" 
              name="correo" 
              placeholder="Ej: Alda@gmail.com"
              value={formData.correo} 
              onChange={handleChange} 
              required 
            />

            <select 
              className="input-field" 
              id="departamento" 
              name="departamento" 
              value={formData.departamento} 
              onChange={handleChange} 
              required
            >
              <option value="">-- Seleccione una de las opciones --</option>
              <option value="Sistemas y TI">Sistemas y TI</option>
              <option value="Contraloria">Contraloria</option>
              <option value="Recursos Humanos">Recursos Humanos</option>
              <option value="Accion Civica">Accion Civica</option>
            </select>

            <select 
              className="input-field" 
              id="tipoUsuario" 
              name="tipoUsuario" 
              value={formData.tipoUsuario} 
              onChange={handleChange} 
              required
            >
              <option value="">-- Seleccione una de las opciones --</option>
              <option value="Admin">Admin</option>
              <option value="Tecnico">Técnico</option>
              <option value="User">Usuario</option>
            </select>

            <input 
              type="text" 
              className="form-control" 
              id="usuario" 
              name="usuario" 
              placeholder="Usuario"
              value={formData.usuario} 
              onChange={handleChange} 
              required 
            />

            <input 
              type="password" 
              className="form-control" 
              id="pass" 
              name="pass" 
              placeholder="Contraseña"
              value={formData.pass} 
              onChange={handleChange} 
              required 
            />

            <button type="submit" className="btn-submit">Registrar</button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RegistroUsuario;
