import { useState } from "react"

export const Formulario = ({ agregarGasto, categoriGasto }) => {
    const [nombreGasto, setNombreGastos] = useState("")
    const [total, setTotal] = useState("")
    const [categoria, setCategoria] = useState(categoriGasto[0].valor)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!nombreGasto.trim() || !total.trim()) return alert('¡Completa todos los campos!')

        agregarGasto({
            id: crypto.randomUUID(),
            nombre: nombreGasto,
            cantidad: Number(total), // Convertimos a número de una vez
            categoria: categoria
        })

        setNombreGastos("")
        setTotal("")
    }

    return (
        <div className="max-w-lg mx-auto mt-8 mb-12">
            <form 
                onSubmit={handleSubmit}
                className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl shadow-2xl space-y-5"
            >
                <h2 className="text-center text-2xl font-bold text-sky-200 mb-4">Nuevo Gasto</h2>

                {/* Campo Nombre */}
                <div>
                    <label className="text-sky-200 text-sm font-semibold uppercase tracking-wider mb-2 block">
                        ¿En qué gastaste?
                    </label>
                    <input
                        className="w-full rounded-xl bg-sky-800/50 border border-sky-700 px-4 py-3 focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none transition-all placeholder:text-sky-400/50"
                        type="text" 
                        placeholder="Ej. Sushi, Internet, Cine..."
                        onChange={(e) => setNombreGastos(e.target.value)} 
                        value={nombreGasto} 
                    />
                </div>

                {/* Campo Total */}
                <div>
                    <label className="text-sky-200 text-sm font-semibold uppercase tracking-wider mb-2 block">
                        Cantidad ($)
                    </label>
                    <input 
                        className="w-full rounded-xl bg-sky-800/50 border border-sky-700 px-4 py-3 focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none transition-all" 
                        type="number" 
                        placeholder="0.00"
                        onChange={(e) => setTotal(e.target.value)} 
                        value={total} 
                    />
                </div>

                {/* Campo Categoría */}
                <div>
                    <label className="text-sky-200 text-sm font-semibold uppercase tracking-wider mb-2 block">
                        Categoría
                    </label>
                    <select 
                        value={categoria} 
                        onChange={(e) => setCategoria(e.target.value)} 
                        className="w-full rounded-xl bg-sky-800/50 border border-sky-700 px-4 py-3 focus:ring-2 focus:ring-sky-400 outline-none appearance-none cursor-pointer"
                    >
                        {categoriGasto.map((cate) => (
                            <option key={cate.id} value={cate.valor} className="bg-sky-900 text-white">
                                {cate.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Botón */}
                <button 
                    type="submit" 
                    className="w-full bg-sky-400 hover:bg-sky-300 text-sky-950 font-bold py-4 rounded-xl shadow-lg shadow-sky-900/50 transition-all active:scale-[0.98] mt-4"
                >
                    Agregar a la lista
                </button>
            </form>
        </div>
    )
}
