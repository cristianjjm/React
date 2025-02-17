import { useState } from 'react';
import { InputBox } from './InputBox';
import React from 'react';

export const Bienvenida = () => {
  // Estado para almacenar el nombre ingresado en el input
  const [nombre, setNombre] = useState('');
  // Estado para almacenar el mensaje de bienvenida que se mostrará al usuario
  const [mensaje, setMensaje] = useState('');

  // Función que se ejecuta cuando el valor del input cambia
  const handleNombreChange = (event) => {
    setNombre(event.target.value); // Actualiza el estado 'nombre' con el valor ingresado
  };

  // Función que se ejecuta al hacer clic en el botón "Refrescar"
  const handleRefrescarClick = () => {
    setMensaje(`Bienvenido ${nombre}`); // Actualiza el mensaje de bienvenida usando el nombre ingresado
  };

  return (
    <div>
      <h2>Input</h2>
      {/* Componente InputBox para ingresar el nombre */}
      <InputBox placeholder="Introduzca su nombre" onChange={handleNombreChange} />
      <br />
      {/* Botón para actualizar el mensaje de bienvenida */}
      <button onClick={handleRefrescarClick}>Refrescar</button>
      {/* Muestra el mensaje de bienvenida */}
      <p>{mensaje}</p>
    </div>
  );
};
