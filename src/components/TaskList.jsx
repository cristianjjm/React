import React from "react";

// Componente funcional que renderiza la lista de tareas y permite eliminarlas
export const TaskList = ({ onDeleteTask, tasks }) => {
  return (
    <>
      <ol>
        {/* Lista ordenada para mostrar las tareas */}
        {tasks.map((task, index) => (
          <pre key={index}>
            {/* Muestra cada tarea en un bloque con espaciado respetado */}
            <li>
              {task} {/* Muestra el texto de la tarea */}
              <button onClick={() => onDeleteTask(index)}>
                {/* Botón para eliminar la tarea, pasando su índice a la función onDeleteTask */}
                Eliminar tarea
              </button>
            </li>
          </pre>
        ))}
      </ol>
    </>
  );
};
