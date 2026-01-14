const TareaItem = ({tarea, onComplete, onEliminar}) =>{

    return(
        <div style={{ 
            border: '1px solid #ccc', 
            margin: '10px', 
            padding: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: tarea.complete ? '#f9f9f9' : '#fff'
            }} >
            <h3 style={{ textDecoration: tarea.complete ? 'line-through' : 'none' }}>
                {tarea.text}
            </h3>

            <div>
                <input type="checkbox" checked={tarea.complete} onChange={() => onComplete(tarea.id)} />
                <button onClick={() =>onEliminar(tarea.id)}>Eliminar Tarea</button>
            </div>
        
        </div>
    )
}

export default TareaItem