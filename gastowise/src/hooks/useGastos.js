import { useState, useEffect } from "react";

export const useGastos = () => {
    const [gastos, setGastos] = useState(() => {
        const guardados = localStorage.getItem("gastos_v1");
        return guardados ? JSON.parse(guardados) : [];
    });

    useEffect(() => {
        localStorage.setItem("gastos_v1", JSON.stringify(gastos));
    }, [gastos]);

    const agregarGasto = (nuevoGasto) => {
        // nuevoGasto será un objeto: { id, nombre, cantidad, categoria }
        setGastos([...gastos, nuevoGasto]);
    };

    const eliminarGasto = (id) => {
        setGastos(gastos.filter(g => g.id !== id));
    };

    // Lógica para el presupuesto
    const totalGastado = gastos.reduce((acc, curr) => acc + Number(curr.cantidad), 0);

    return { gastos, agregarGasto, eliminarGasto, totalGastado };
};