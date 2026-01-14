import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Usuario( {nombre, cargo, id}) {

    const [likes, setLikes] = useState(0)
    const [estaActivo, setEstaActivo] = useState(false)
    
    const handleLike = ( ) => {
        setLikes (prev => prev+1)
    }

    const handleActivo = () =>{
        setEstaActivo(prev => !prev)
    }
    
    useEffect(() => {
        // Creamos el intervalo
        const intervalo = setInterval(() => {
            console.log(`Intervalo de: ${nombre} ejecutándose...`);
        }, 2000); // Ponlo cada 2 segundos para que no sea tan molesto

        // ESTO ES LO QUE QUIERO QUE APRENDAS: La función de limpieza
        return () => {
            console.log(`Limpiando intervalo de: ${nombre}`);
            clearInterval(intervalo);
        };
    }, []);

    return (  
        <>

            <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <h3 style={{ color: estaActivo ? 'green' : 'red'}}>{nombre}</h3>
            <p> Cargo: {cargo} </p>
            
            <div>
                <span>Likes: {likes}</span> 
                <button onClick={handleLike}>👍 Me gusta</button>
                <button onClick={handleActivo}>{estaActivo ? 'Desactivar Usuario' : 'Activar Usuario'}</button>
                <Link to={`/usuarios/${id}`}>Detalle Usuario</Link>
            </div>
        </div>
        </>
    )
}

export default Usuario