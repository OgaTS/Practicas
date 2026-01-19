import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";



export const UserContext = createContext()

export const UserProvider = ({children}) =>{

    const [userLogueado, setUserLogueado] = useState('Bienvenido Invitado')
    const [tema, setTema] = useState('light')

    const toggleTheme = () => {
        setTema((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    useEffect(() => {
        // Esto se queda escuchando si el usuario está logueado o no
        const unsustribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserLogueado(user.email); // Guardamos el email real
            } else {
                setUserLogueado("Invitado");
            }
        });
        return () => unsustribe(); // Limpieza al desmontar
    }, []);

    return(
        <UserContext.Provider value ={{userLogueado, setUserLogueado, tema, toggleTheme }}>
            {children}
        </UserContext.Provider>
    )

}