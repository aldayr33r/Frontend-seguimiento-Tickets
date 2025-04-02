import React, { useState, useEffect } from "react";
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import DataTable from "react-data-table-component";
import axios from "axios";
import "../styles/user/user_T.css";

const AdminPage = () => {
  const [tickets, setTickets] = useState([]); 
  const [filterEstado, setFilterEstado] = useState(""); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const userName = JSON.parse(localStorage.getItem("nombre")).nombre; 

    const fetchTickets = async () => {
      try {
        const response = await axios.get(`https://sistema-de-seguimiento-de-tickets.onrender.com/ver_tickets/${userName}`);
        setTickets(response.data.tickets); 
        setLoading(false); 
      } catch (error) {
        console.error("Error al obtener los tickets:", error);
        setLoading(false); 
      }
    };

    fetchTickets();
  }, []); 

 
  const filteredData = filterEstado
    ? tickets.filter((row) => row.estado === filterEstado)
    : tickets;

  const columns = [
      {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      cell: (row) => <span className="id-column">{row.id}</span>, 
    },
    {
      name: "Asunto",
      selector: (row) => row.asunto,
      sortable: true,
      cell: (row) => <span className="asunto-column">{row.asunto}</span>, 
    },
    {
      name: "Descripción",
      selector: (row) => row.descripcion,
      sortable: true,
    },
    {
      name: "Estado",
      selector: (row) => row.estado,
      sortable: true,
    },
    {
      name: "Fecha de Inicio",
      selector: (row) => row.fecha_inicio,
      sortable: true,
    },
    {
      name: "Fecha de Cierre",
      selector: (row) => row.fecha_cierre,
      sortable: true,
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

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
          <option value="Pendiente">Pendiente</option>
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

export default AdminPage;
