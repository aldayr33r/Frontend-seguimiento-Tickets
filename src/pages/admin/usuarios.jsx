import React, { useState, useEffect } from "react";
import HeaderAdmin from "../../layouts/headerAdmin";
import Footer from "../../layouts/footer";
import DataTable from "react-data-table-component";
import axios from "axios"; 
import "../../styles/admin/usuarios.css";

const UsuariosPage = () => {
  const [usuarios, setUsuarios] = useState([]); 
  const [filterTipoUsuario, setFilterTipoUsuario] = useState("");  
  const [loading, setLoading] = useState(true);  

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get("http://localhost:4000/usuarios");
        setUsuarios(response.data.usuarios); 
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  const columns = [
    { name: "ID", selector: row => row.id, sortable: true },
    { name: "Nombre", selector: row => row.nombre, sortable: true },
    { name: "Apellidos", selector: row => row.apellidos, sortable: true },
    { name: "Email", selector: row => row.correo, sortable: true },
    { name: "Departamento", selector: row => row.departamento, sortable: true },
    { name: "Tipo de Usuario", selector: row => row.tipo_usuario, sortable: true },
    { name: "Usuario", selector: row => row.usuario, sortable: true },
  ];

  const filteredData = filterTipoUsuario
    ? usuarios.filter(row => row.tipoUsuario === filterTipoUsuario)
    : usuarios;

  if (loading) {
    return <div>Cargando usuarios...</div>;
  }

  return (
    <div className="usuarios">
      <HeaderAdmin />
      <main className="content-u">
        <h2 className="titulo_Table">Usuarios</h2>

        {/* Select para filtrar por tipo de usuario */}
        <select
          value={filterTipoUsuario}
          onChange={(e) => setFilterTipoUsuario(e.target.value)}
          className="filter-select"
        >
          <option value="">Todos</option>
          <option value="Administrador">Administrador</option>
          <option value="User">User</option>
        </select>

        {/* Tabla con los usuarios */}
        <DataTable
          className="react-data-table"
          columns={columns}
          data={filteredData}
          pagination
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5]}
          highlightOnHover
          striped
          responsive
        />
      </main>
      <Footer />
    </div>
  );
};

export default UsuariosPage;
