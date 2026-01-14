import { createContext, useState } from "react";


export const UserContext = createContext()

export const UserProvider = ({children}) =>{

    const [userLogueado, setUserLogueado] = useState('Bienvenido Invitado')
    const [tema, setTema] = useState('light')

    const toggleTheme = () => {
        setTema((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return(
        <UserContext.Provider value ={{userLogueado, setUserLogueado, tema, toggleTheme }}>
            {children}
        </UserContext.Provider>
    )

}