import { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";


const Registros = () =>{
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("")

    const navigate = useNavigate();

    const registroUsuario = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setEmail("")
      setPassword("")
      console.log("Usuario registrado:", userCredential.user);
      navigate("/"); // Redirigir a tareas tras el éxito
    } catch (err) {
      setError(err.message); 
    }
  };

  
    return (
        <>
            <h3>Registro de usuario</h3>
            <form onSubmit={registroUsuario}>
                <p>Correo: </p>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}  placeholder="Email"   /> 
                <p>Contrasñea: </p>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña"  /> 
                <button type="submit"> Registrar</button>
                {error && <p style={{color: "red"}}>{error}</p>}
            </form>    
        </>
    )
}

export default Registros