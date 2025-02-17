import { useState } from "react";

// Componente funcional que permite al usuario añadir nuevas tareas
export const TaskInput = ({ onAddTask }) => {
  // Hook de estado para manejar el texto ingresado por el usuario
  const [task, setTask] = useState(''); // `task` almacena el texto de la tarea, `setTask` actualiza ese texto

  // Función que se ejecuta al hacer clic en el botón
  const handleClick = () => {
    onAddTask(task); // Llama a la función pasada como propiedad para agregar la tarea
    setTask(''); // Limpia el estado de la tarea, vaciando el input
  };

  return (
    <>
      {/* Input controlado para capturar la tarea ingresada por el usuario */}
      <input
        type="text"
        placeholder="Nueva tarea" // Texto que aparece como sugerencia en el input
        value={task} // Vincula el valor del input con el estado `task`
        onChange={(e) => setTask(e.target.value)} // Actualiza el estado al escribir en el input
      />
      <br /> {/* Salto de línea para separar elementos visualmente */}
      <br />
      {/* Botón que agrega la tarea y limpia el input al ser clicado */}
      <button onClick={handleClick}>Añadir tarea</button>
    </>
  );
};
