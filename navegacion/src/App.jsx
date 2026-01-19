import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./componentes/Navbar";
import SeccionUsuarios from "./paginas/SeccionUsuarios";
import SeccionTareas from "./paginas/SeccionTareas";
import DetalleUsuario from "./paginas/DetalleUsuario";
import Registros from "./paginas/Registros"
import Login from "./paginas/Login";
import { useContext } from "react";
import { UserContext } from "./context/usesContext";
import './index.css'

function App() {

  const { tema, userLogueado} = useContext(UserContext)
  return (
    
      <BrowserRouter>
        <Navbar />
        {/*Aqui modificamos el tema */}
        <div className="container bg-gray-100" style={{ background: tema === 'light' ? '#4892d3' : '#2c3e50' }}>
          <Routes>
            <Route path="/" element={userLogueado !== "Invitado" ? <SeccionTareas /> : <Login />} />
            <Route path="/usuarios" element={<SeccionUsuarios />} />
            <Route path="/usuarios/:id" element={<DetalleUsuario />} />
            <Route path="/registro" element={<Registros />} />
            <Route path="/login" element={<Login />} />
            {/* RUTA 404: El "*" atrapa cualquier cosa que no coincida arriba */}
            <Route path="*" element={<h2>404 - Página no encontrada</h2>} />
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App