import React, {  useState } from 'react'
import { CounterContext } from './CounterContext';


export default function CounterContextProvider({children}:{children : React.ReactNode}) {
    
const [counter, setCounter] = useState<number | null>(0);



    
  return (
    <>
    <CounterContext.Provider value={ {counter , setCounter} }>
    {children}
    </CounterContext.Provider>
    </>
  )
}
