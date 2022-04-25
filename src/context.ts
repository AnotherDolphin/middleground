import { createContext } from "react";
import { DocumentReference } from 'firebase/firestore'


export const statusContext = createContext({
  status: 0,
  setStatus: (status: number) => {}
});


export const docContext = createContext(null as unknown as DocumentReference)
