import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/usesContext";

import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";


const Navbar = () => {
  const {userLogueado, toggleTheme, tema} = useContext(UserContext)

  const cerrarSesion = async () => {
    try {
      await signOut(auth); // Firebase se encarga de todo, el observador detectará el cambio
      console.log("Sesión cerrada");
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  // En el nav hacemos en el operador ternario para cambiar el tema 
  return (
    
    <nav style={{ padding: '20px', background: tema === 'light' ? '#4892d3' : '#2c3e50' , color: 'white' }}>
      {/* Usamos una función en style para resaltar la página activa */}
      <p style={{ color: '#f1c40f' }}>{userLogueado}</p>
      <NavLink 
        to="/" 
        style={({ isActive }) => ({
          marginRight: '15px',
          color: 'white',
          fontWeight: isActive ? 'bold' : 'normal',
          textDecoration: isActive ? 'underline' : 'none'
        })}
      >
        Mis Tareas
      </NavLink>
    
      <NavLink 
        to="/usuarios" 
        style={({ isActive }) => ({
            marginRight: '15px',
          color: 'white',
          fontWeight: isActive ? 'bold' : 'normal',
          textDecoration: isActive ? 'underline' : 'none'
        })}
      >
        Colaboradores
      </NavLink>

      <NavLink 
        to="/registro" 
        style={({ isActive }) => ({
            marginRight: '15px',
          color: 'white',
          fontWeight: isActive ? 'bold' : 'normal',
          textDecoration: isActive ? 'underline' : 'none'
        })}
      >
        Registrar 
      </NavLink>

      <NavLink 
        to="/login" 
        style={({ isActive }) => ({
            marginRight: '15px',
          color: 'white',
          fontWeight: isActive ? 'bold' : 'normal',
          textDecoration: isActive ? 'underline' : 'none'
        })}
      >
        Login 
      </NavLink>

      {/* Solo mostramos el botón de salir si NO es un invitado */}
      {userLogueado !== "Invitado" && (
        <button onClick={cerrarSesion} style={{ marginLeft: '10px', background: 'red', color: 'white' }}>
          Cerrar Sesión
        </button>
      )}

      <button onClick={toggleTheme} style={{ marginLeft: '10px' }}>Modo {tema === 'light' ? 'Luna' : 'Sol'}</button>
    </nav>
  );
};

export default Navbar;