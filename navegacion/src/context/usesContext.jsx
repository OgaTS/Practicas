import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";



export const UserContext = createContext()

export const UserProvider = ({children}) =>{

    const [userLogueado, setUserLogueado] = useState(null); 
    const [cargando, setCargando] = useState(true); 
    const [tema, setTema] = useState('light')

    const toggleTheme = () => {
        setTema((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserLogueado(user.email);
            } else {
                setUserLogueado("Invitado");
            }
            setCargando(false); // <--- Importante: Ya terminó de verificar
        });
        return () => unsubscribe();
    }, []);

    return(
        <UserContext.Provider value={{ userLogueado, cargando, tema, toggleTheme }}>
            {children}
        </UserContext.Provider>
    )

}