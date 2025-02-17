import React, { useReducer } from "react";
import { TaskInput } from './TaskInput'; // Componente para añadir nuevas tareas
import { TaskList } from "./TaskList"; // Componente para mostrar y gestionar la lista de tareas

// Definición de las acciones que puede manejar el reducer
const ACTIONS = {
    ADD_TASK: 'add-task',
    DELETE_TASK: 'delete-task',
};

// Reducer que maneja el estado de la lista de tareas
const taskReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.ADD_TASK:
            if (action.payload.trim() === '') {
                alert('No puedes añadir tareas vacías');
                return state; // No modifica el estado
            }
            return [...state, action.payload]; // Añade la nueva tarea al final del array
        case ACTIONS.DELETE_TASK:
            return state.filter((_, index) => index !== action.payload); // Elimina la tarea según el índice
        default:
            return state; // Retorna el estado sin cambios si la acción no es reconocida
    }
};

// Componente principal que une la funcionalidad de TaskInput y TaskList
export const TogetherTaskInputList = () => {
    // Hook `useReducer` para manejar el estado de la lista de tareas
    const [tasks, dispatch] = useReducer(taskReducer, []); // Estado inicial es un array vacío

    // Función para manejar la adición de tareas
    const addTask = (task) => {
        dispatch({ type: ACTIONS.ADD_TASK, payload: task }); // Envía la acción al reducer
    };

    // Función para manejar la eliminación de tareas
    const deleteTask = (index) => {
        dispatch({ type: ACTIONS.DELETE_TASK, payload: index }); // Envía la acción al reducer
    };

    return (
        <div>
            <br />
            {/* Componente para capturar y añadir tareas, pasando la función `addTask` como prop */}
            <TaskInput onAddTask={addTask} />
            
            {/* Componente para mostrar la lista de tareas, pasando la lista y la función de eliminar como props */}
            <TaskList onDeleteTask={deleteTask} tasks={tasks} />
        </div>
    );
};
