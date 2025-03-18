import React, { useState } from "react";
import Header from "../../layouts/headerAdmin";
import Footer from "../../layouts/footer";
import DataTable from "react-data-table-component";
import "../../styles/user/user_T.css";

const VerTicketAdmin = () => {
  const [filterEstado, setFilterEstado] = useState(""); // Estado para filtrar

  const columns = [
    { name: "ID", selector: row => row.id, sortable: true },
    { name: "Título", selector: row => row.titulo, sortable: true },
    { name: "Estado", selector: row => row.estado, sortable: true },
    { name: "Fecha", selector: row => row.fecha, sortable: true },
  ];

  const data = [
    { id: 1, titulo: "Problema con el sistema", estado: "Abierto", fecha: "2025-03-01" },
    { id: 2, titulo: "Error en la base de datos", estado: "Cerrado", fecha: "2025-02-25" },
    { id: 3, titulo: "Fallo en el servidor", estado: "En proceso", fecha: "2025-02-28" },
    { id: 4, titulo: "Problemas de acceso", estado: "Abierto", fecha: "2025-03-02" },
    { id: 5, titulo: "Problema con el sistema", estado: "Abierto", fecha: "2025-03-01" },
    { id: 6, titulo: "Error en la base de datos", estado: "Cerrado", fecha: "2025-02-25" },
    { id: 7, titulo: "Fallo en el servidor", estado: "En proceso", fecha: "2025-02-28" },
    { id: 8, titulo: "Problemas de acceso", estado: "Abierto", fecha: "2025-03-02" },
    { id: 9, titulo: "Problema con el sistema", estado: "Abierto", fecha: "2025-03-01" },
    { id: 10, titulo: "Problema con el sistema", estado: "Abierto", fecha: "2025-03-01" },
    { id: 11, titulo: "Error en la base de datos", estado: "Cerrado", fecha: "2025-02-25" },
    { id: 12, titulo: "Fallo en el servidor", estado: "En proceso", fecha: "2025-02-28" },
    { id: 13, titulo: "Problemas de acceso", estado: "Abierto", fecha: "2025-03-02" },
    { id: 14, titulo: "Problema con el sistema", estado: "Abierto", fecha: "2025-03-01" },
  ];

  // Filtrar datos por estado seleccionado
  const filteredData = filterEstado
    ? data.filter(row => row.estado === filterEstado)
    : data;

  return (
    <div className="ver-ticket">
      <Header />

      <main className="content">
        <h2 className="titulo_Table">Tickets Realizados</h2>

        {/* Select para filtrar por estado */}
        <select
          value={filterEstado}
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
          paginationPerPage={6}
          paginationRowsPerPageOptions={[6]}
          highlightOnHover
          striped
          responsive
        />
      </main>

      <Footer />
    </div>
  );
};

export default VerTicketAdmin;
