import React, { useState, useEffect, createContext } from "react"
import { doc, DocumentReference, onSnapshot } from "firebase/firestore"
import {db } from './firebase'
import Expectations from "./components/Expectations"
import { Ranges } from "./interfaces"

export const Doc = createContext(null as unknown as DocumentReference)
export const isInvited = window.location.pathname.split('/')[1] == 'invited'

function App() {
  const [ranges, setRanges] = useState<Ranges>()
  const docRef = doc(db, "/testing/user0/projects", "testing")
  
  useEffect(() => {
    onSnapshot(docRef, (snap) => {
      let data = snap.data() as Ranges
      let out = {} as Ranges
      out = Object.assign(out, data)
      if(isInvited) {        
        out.theirMax = data.yourMax
        out.theirMin = data.yourMin        
        out.yourMax = data.theirMax
        out.yourMin = data.theirMin
      }
      setRanges(out)
    })
  }, [])
  
  return (
    <div className="App p-2">
      <header className="App-header p-4 rounded bg-teal-500 text-white shadow">
        <h1 className="inline text-3xl font-bold mr-4">middleground</h1>
        <p className="inline">settle budgets comfortably</p>
      </header>
      <Doc.Provider value={docRef}>
        {ranges ? <Expectations ranges={ranges} /> : "loading"}
        {/* {ranges ? <Expectations ranges={ranges} /> : "loading"} */}
      </Doc.Provider>
    </div>
  )
}

export default App
