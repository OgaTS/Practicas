import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./componentes/Navbar";
import SeccionUsuarios from "./paginas/SeccionUsuarios";
import SeccionTareas from "./paginas/SeccionTareas";
import DetalleUsuario from "./paginas/DetalleUsuario";
import { useContext } from "react";
import { UserContext } from "./context/usesContext";

function App() {

  const { tema} = useContext(UserContext)
  return (
      <BrowserRouter>
        <Navbar />
        {/*Aqui modificamos el tema */}
        <div className="container" style={{ background: tema === 'light' ? '#4892d3' : '#2c3e50' }}>
          <Routes>
            <Route path="/" element={<SeccionTareas />} />
            <Route path="/usuarios" element={<SeccionUsuarios />} />
            <Route path="/usuarios/:id" element={<DetalleUsuario />} />
            {/* RUTA 404: El "*" atrapa cualquier cosa que no coincida arriba */}
            <Route path="*" element={<h2>404 - Página no encontrada</h2>} />
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App