import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import UserPage from "../pages/UserPage";
import VerTickets from "../pages/VerTickets";
import RegistroUsuario from "../pages/admin/registroUsuario";
import UsuariosPage from "../pages/admin/usuarios";
import NotFoundPage from "../pages/NotFoundPage";
import PrivateRoute from '../components/PrivateRoute'; 
import CrearTicket from "../pages/admin/CrearTicket";
import VerTicketAdmin from "../pages/admin/VerTicketsAdmin";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="crear-reporte" element={<PrivateRoute requiredRole="User"><UserPage /></PrivateRoute>} />
        <Route path="ver-reportes" element={<PrivateRoute requiredRole="User"><VerTickets /></PrivateRoute>} />

        {/* Página 404 (Para rutas inexistentes) */}
        <Route path="*" element={<NotFoundPage />} />

        {/* Rutas Protegidas */}
        <Route path="usuarios" element={<PrivateRoute requiredRole="Administrador"><UsuariosPage /></PrivateRoute>} />
        <Route path="registro"element={<PrivateRoute requiredRole="Administrador"><RegistroUsuario /></PrivateRoute>} />
        <Route path="reporte_Admin" element={<PrivateRoute requiredRole="Administrador"><CrearTicket /></PrivateRoute>} />
        <Route path="ver-reportes_Admin" element={<PrivateRoute requiredRole="Administrador"><VerTicketAdmin /></PrivateRoute>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
