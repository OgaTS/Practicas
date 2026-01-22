import { useMemo, useState } from "react";

export const ListaGasto = ({gastos, eliminarGasto}) =>{

    const [filtroGasto, setFiltroGasto] = useState("")

    const handleCategoryChange = (event) => {
        setFiltroGasto(event.target.value);
      };
    
      const filteredProducts = useMemo(() => {
        if (filtroGasto === 'all' || filtroGasto === '') {
          return gastos; // Muestra todos si no hay filtro
        }
        return gastos.filter(product => product.categoria === filtroGasto);
      }, [gastos, filtroGasto]);
    


    return ( 

        <div>
             <h3 className="flex justify-center text-xl">
                Lista de gastos
            </h3> 
            <div className="flex justify-center text-xl">
                <div>
                <h4>Seleccion filtro de gasto </h4>
                <select className="justify-center text-black" value={filtroGasto} onChange={handleCategoryChange}>    
                    <option value="all">Todas las categorias</option>
                    <option value="Comida">Comida</option>
                    <option value="Ocio">Ocio</option>
                </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-10"> 
                {filteredProducts.map((item) => (
                    <div key={item.id} className="bg-white/10 p-4 rounded-xl border border-white/20 backdrop-blur-sm">
                        <h4 className="text-xl font-bold border-b border-white/10 mb-2">{item.nombre}</h4>
                        <p className="text-green-400 font-bold text-lg">${item.cantidad}</p>
                        <p className="text-xs uppercase opacity-60">{item.categoria}</p>
                        <button 
                            className="w-full mt-4 bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white py-1 rounded-lg transition-all" 
                            onClick={() => eliminarGasto(item.id)}
                        >
                            Eliminar
                        </button>
                    </div>
                ))}
            </div>
        </div>

        

    )
}