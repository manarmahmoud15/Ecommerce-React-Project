import { createContext, useState } from "react";

export let counterContext = createContext()

export default function CounterContextProvider(props)
{
    const [counter , setcounter] = useState(0)
    function ChangeCounter ()
    {
        setcounter(Math.random)
    }
    return <>
    <counterContext.Provider value={{ChangeCounter , counter}}>
        {props.children}
    </counterContext.Provider>
    </>
}