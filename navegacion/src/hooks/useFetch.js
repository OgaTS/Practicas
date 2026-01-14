import { useState, useEffect } from "react";

export const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Reiniciamos el estado de carga si la URL cambia
        setLoading(true);

        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error("Error al obtener los datos");
                
                const json = await response.json();
                setData(json);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]); // Se ejecuta cada vez que la URL cambie

    // Devolvemos los estados para que el componente los use
    return { data, loading, error };
};