import { useState } from "react"


export function useCounter(valorInicial: number){
    const [count, setCount] = useState(valorInicial)

    const increasingBy = (incremento: number) => {
        setCount(count + incremento)
    }

    return {
        count,
        increasingBy
    }
        

        
}

