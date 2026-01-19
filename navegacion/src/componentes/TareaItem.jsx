// 1. Importamos motion
import { motion } from "framer-motion";

const TareaItem = ({ item, onEliminar, onComplete }) => {
  return (
    // 2. Cambiamos 'div' por 'motion.div'
    <motion.div 
      // Definimos los estados de la animación
      initial={{ opacity: 0, y: 20 }} // Empieza transparente y 20px abajo
      animate={{ opacity: 1, y: 0 }}  // Termina visible y en su posición original (0)
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }} // Al salir se desvanece y se encoge rápido
      layout // ¡Magia! Hace que los otros elementos se reacomoden suavemente
      
      // Mantenemos TODAS tus clases de Tailwind intactas
      className="group flex items-center justify-between p-4 bg-gray-50 hover:bg-white border border-transparent hover:border-blue-100 rounded-xl transition-all duration-300 shadow-sm"
    >
      <div className="flex items-center gap-4">
         {/* ... todo el contenido interno sigue igual ... */}
        <button 
          onClick={() => onComplete(item.id, item.completada)}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
            item.completada 
              ? 'bg-green-500 border-green-500 text-white' 
              : 'border-gray-300 hover:border-blue-500 bg-white'
          }`}
        >
          {item.completada && '✓'}
        </button>

        <span className={`text-gray-700 font-medium transition-all ${
          item.completada ? 'line-through text-gray-400' : ''
        }`}>
          {item.texto}
        </span>
      </div>

      <button 
        onClick={() => onEliminar(item.id)}
        className="opacity-0 group-hover:opacity-100 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white p-2 rounded-lg transition-all duration-300"
      >
        🗑️
      </button>
    </motion.div>
  );
};
// No olvides exportarlo si no lo haces por defecto
export default TareaItem;