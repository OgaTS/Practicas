import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch"; // Importamos nuestro hook
import { useContext, useEffect } from "react";
import { UserContext } from "../context/usesContext";

const DetalleUsuario = () => {
    const { id } = useParams();
    const {setUserLogueado} = useContext(UserContext)

    // ¡Toda la lógica de fetch resumida en una línea!
    const { data: usuario, loading, error } = useFetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    
    const navigate = useNavigate()

    useEffect(() =>{
        if(usuario){
            setUserLogueado(`Viendo a: ${usuario.name}`)
        }

        // Limpieza: cuando el usuario se vaya del detalle, vuelve a ser invitado
        return () => setUserLogueado("Bienvenido Invitado");
    }, [usuario, setUserLogueado]);

    if (loading) return <p>Cargando perfil...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <button onClick={() => navigate("/usuarios")}>Volver a la lista</button>
            <h2>Usuario: {usuario?.name}</h2>
            <p>Email: {usuario?.email}</p>
        </div>
    );
};

export default DetalleUsuario