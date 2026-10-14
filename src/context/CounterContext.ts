import { createContext, type Dispatch, type SetStateAction } from "react"

type CounterContextType = {
  counter : number | null,
  setCounter : Dispatch<SetStateAction<number | null>>
}
export const CounterContext = createContext<CounterContextType | null>(null)
