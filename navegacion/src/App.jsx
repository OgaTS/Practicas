import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
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

  const { tema, userLogueado, cargando} = useContext(UserContext)

    // Si Firebase todavía está pensando, mostramos una pantalla de carga
  if (cargando) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
       <p className="text-xl font-semibold animate-pulse">Verificando sesión...</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
    <div className={tema === 'light' ? 'bg-gray-50 min-h-screen' : 'bg-gray-900 min-h-screen'}>
      <Navbar />
      <Routes>
        {/* RUTA PROTEGIDA: Solo entra si NO es invitado */}
        <Route 
          path="/" 
          element={
            userLogueado !== "Invitado" 
            ? <SeccionTareas /> 
            : <Navigate to="/login" />
          } 
        />

        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registros />} />
        <Route path="/usuarios" element={<SeccionUsuarios />} />
        <Route path="/usuarios/:id" element={<DetalleUsuario />} />
        
        {/* Redirección por si escriben cualquier cosa en la URL */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
    </BrowserRouter>
  );


  // return (
      
  //     <BrowserRouter>
  //       <Navbar />
  //       {/*Aqui modificamos el tema */}
  //       <div className="container bg-gray-100" style={{ background: tema === 'light' ? '#4892d3' : '#2c3e50' }}>
  //         <Routes>
  //           <Route path="/" element={userLogueado !== "Invitado" ? <SeccionTareas /> : <Login />} />
  //           <Route path="/usuarios" element={<SeccionUsuarios />} />
  //           <Route path="/usuarios/:id" element={<DetalleUsuario />} />
  //           <Route path="/registro" element={<Registros />} />
  //           <Route path="/login" element={<Login />} />
  //           {/* RUTA 404: El "*" atrapa cualquier cosa que no coincida arriba */}
  //           <Route path="*" element={<h2>404 - Página no encontrada</h2>} />
  //         </Routes>
  //       </div>
  //     </BrowserRouter>
  // );
}

export default App