import React, { useState } from "react";
import HeaderAdmin from "../../layouts/headerAdmin";
import Footer from "../../layouts/footer";
import DataTable from "react-data-table-component";
import "../../styles/admin/usuarios.css";

const UsuariosPage = () => {
  const [filtertipoUsuario, setFilterEstado] = useState(""); // Estado para filtrar

  const columns = [
    { name: "ID", selector: row => row.id, sortable: true },
    { name: "Nombre", selector: row => row.nombre, sortable: true },
    { name: "Apellidos", selector: row => row.apellidos, sortable: true },
    { name: "Email", selector: row => row.email, sortable: true },
    { name: "Departamento", selector: row => row.departamento, sortable: true },
    { name: "Tipo De Usuario", selector: row => row.tipoUsuario, sortable: true },
    { name: "Usuario", selector: row => row.user, sortable: true },
  ];

  const data = [
      { id: 1, nombre: "sa", apellido: "Abierto", email: "Abierto",  departamento: "Abierto", tipoUsuario: "Abierto", user: "df" },
      { id: 2, nombre: "as", apellido: "Cerrado", email: "Abierto",  departamento: "Abierto", tipoUsuario: "Abierto",user: "df" },
      { id: 3, nombre: "s", apellido: "En proceso", email: "Abierto",  departamento: "Abierto", tipoUsuario: "Abierto",user: "df" },
      { id: 4, nombre: "s", apellido: "Abierto", email: "Abierto",  departamento: "Abierto", tipoUsuario: "Abierto",user: "d" },
      { id: 5, nombre: "s", apellido: "Abierto", email: "Abierto",  departamento: "Abierto", tipoUsuario: "Abierto",user: "d" },
      { id: 6, nombre: "s", apellido: "Cerrado", email: "Abierto",  departamento: "Abierto", tipoUsuario: "Cerrado",user: "d" },
      { id: 7, nombre: "s", apellido: "En proceso", email: "Abierto",  departamento: "Abierto", tipoUsuario: "Abierto",user: "df" },
      { id: 8, nombre: "s", apellido: "Abierto", email: "Abierto",  departamento: "Abierto", tipoUsuario: "Cerrado",user: "f" },
      { id: 9, nombre: "s", apellido: "Abierto", email: "Abierto",  departamento: "Abierto", tipoUsuario: "Abierto",user: "2f" },
      { id: 10, nombre: "s", apellido: "Abierto", email: "Abierto",  departamento: "Abierto", tipoUsuario: "En proceso",user: "f" },
      { id: 11, nombre: "s", apellido: "Cerrado", email: "Abierto",  departamento: "Abierto", tipoUsuario: "En proceso",user: "df" },
      { id: 12, nombre: "s", apellido: "En proceso", email: "Abierto",  departamento: "Abierto", tipoUsuario: "Abierto",user: "sd" },
      { id: 13, nombre: "s", apellido: "Abierto", email: "Abierto",  departamento: "Abierto", tipoUsuario: "Abierto",user: "sd" },
      { id: 14, nombre: "s", apellido: "Abierto", email: "Abierto",  departamento: "Abierto", tipoUsuario: "Abierto",user: "sd" },
    ];

  // Filtrar datos por estado seleccionado
  const filteredData = filtertipoUsuario
    ? data.filter(row => row.tipoUsuario === filtertipoUsuario)
    : data;

  return (
    <div className="usuarios">
      <HeaderAdmin />

      <main className="content-u">
        <h2 className="titulo_Table">Usuarios</h2>

        {/* Select para filtrar por estado */}
        <select
          value={filtertipoUsuario}
          onChange={(e) => setFilterEstado(e.target.value)}
          className="filter-select"
        >
          <option value="">Todos</option>
          <option value="Abierto">Abierto</option>
          <option value="Cerrado">Cerrado</option>
          <option value="En proceso">En proceso</option>
        </select>

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
