import React, { useEffect, useState } from "react";
import HeaderAdmin from "../../layouts/headerAdmin";
import Footer from "../../layouts/footer";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import "../../styles/admin/estadisticas.css";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const EstadisticasPage = () => {
  const [estadisticas, setEstadisticas] = useState({
    ticketsCreados: 0,
    ticketsFinalizados: 0,
    ticketsPendientes: 0,
    usuariosRegistrados: 0,
  });
  const [filtro, setFiltro] = useState("todos");

  useEffect(() => {
    axios.get("http://localhost:4000/estadisticas")
      .then(response => {
        setEstadisticas(response.data);
      })
      .catch(error => console.error("Error al obtener estadísticas", error));
  }, []);

  const data = {
    labels: ["Tickets Finalizados", "Tickets Pendientes"],
    datasets: [
      {
        label: "Cantidad",
        data: [estadisticas.ticketsFinalizados, estadisticas.ticketsPendientes],
        backgroundColor: ["#16a085", "#e74c3c"],
      },
    ],
  };

  return (
    <div className="estadisticas-page">
      <HeaderAdmin />
      <main className="content">
        <h2 className="title">Estadisticas</h2>
        
        <div className="estadisticas-container">
          <div className="stat-card orange">
            TICKETS CREADOS
            <span>{estadisticas.ticketsCreados}</span>
          </div>
          <div className="stat-card gray">
            USUARIOS REGISTRADOS
            <span>{estadisticas.usuariosRegistrados}</span>
          </div>
          <div className="stat-card green">
            TICKETS FINALIZADOS
            <span>{estadisticas.ticketsFinalizados}</span>
          </div>
          <div className="stat-card red">
            TICKETS PENDIENTES
            <span>{estadisticas.ticketsPendientes}</span>
          </div>
        </div>
          
        
        <div className="chart-container">
          <select onChange={(e) => setFiltro(e.target.value)} className="filter-select">
            <option value="todos">Todos</option>
            <option value="cerrado">Cerrados</option>
            <option value="pendientes">Pendientes</option>
          </select>
          <Bar data={{
            labels: filtro === "todos" ? ["Tickets Finalizados", "Tickets Pendientes"] : [filtro === "cerrado" ? "Tickets Finalizados" : "Tickets Pendientes"],
            datasets: [{
              label: "Cantidad",
              data: filtro === "todos" ? [estadisticas.ticketsFinalizados, estadisticas.ticketsPendientes] : [filtro === "cerrado" ? estadisticas.ticketsFinalizados : estadisticas.ticketsPendientes],
              backgroundColor: filtro === "todos" ? ["#16a085", "#e74c3c"] : [filtro === "cerrado" ? "#16a085" : "#e74c3c"],
            }]
          }} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EstadisticasPage;