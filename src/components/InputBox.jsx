import React, { useState } from "react";

export const InputBox = ({ placeholder = 'default', onChange }) => {
  // input es la variable del texto que se tiene que mostrar
  const [input, setInput] = useState('');

  // Función para actualizar el estado con el valor del input
  const handleInputChange = (event) => {
    setInput(event.target.value);

    if (onChange) {
      onChange(event); // Llama a la función onChange pasada desde ActividadInput
    }
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder={placeholder}
      />
    </div>
  );
};
