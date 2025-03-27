import React, { useState, useEffect } from "react";
import Header from "../../layouts/headerAdmin";
import Footer from "../../layouts/footer";
import DataTable from "react-data-table-component";
import axios from "axios"; 
import "../../styles/admin/ticket_a.css";

const VerTicketAdmin = () => {
  const [tickets, setTickets] = useState([]);  
  const [filterEstado, setFilterEstado] = useState("");  
  const [loading, setLoading] = useState(true);  

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get("http://localhost:4000/ver_tickets_admin"); 
        setTickets(response.data.tickets); 
      } catch (error) {
        console.error("Error al obtener los tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);


  const columns = [
    { name: "ID", selector: row => row.id, sortable: true },
    { name: "Usuario", selector: row => row.usuario, sortable: true },
    { name: "Problema", selector: row => row.asunto, sortable: true },
    { name: "Estado", selector: row => row.estado, sortable: true },
    { name: "Fecha de Inicio", selector: row => row.fecha_inicio, sortable: true },
    { name: "Fecha de Cierre", selector: row => row.fecha_cierre, sortable: true },
    { name: "Asignar", sortable: true },
    { name: "Cerrar", sortable: true },
  ];

  const filteredData = filterEstado
    ? tickets.filter(row => row.estado === filterEstado)
    : tickets;

  if (loading) {
    return <div>Cargando tickets...</div>;
  }

  return (
    <div className="ver-ticket-a">
      <Header />
      <main className="content-a">
        <h2 className="titulo_Table">Todos los Tickets</h2>

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

        {/* Tabla con los tickets */}
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
