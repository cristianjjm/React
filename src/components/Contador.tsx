import { useState } from "react";
import React from "react";


export const Contador = () => {
    const [count, setCount] = useState(0)

  return (
    <>
        <button onClick={() => setCount(count + 1)} id = 'B1'>+1</button>
        <button onClick={() => setCount(count - 1)} id = 'B2'>-1</button>
        <h1>Contador: {count}</h1>
    </>
    
  )
  
}
