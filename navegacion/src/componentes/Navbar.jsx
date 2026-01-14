import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/usesContext";

const Navbar = () => {
  const {userLogueado, toggleTheme, tema} = useContext(UserContext)

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
      <button onClick={toggleTheme}> {tema}</button>
    </nav>
  );
};

export default Navbar;