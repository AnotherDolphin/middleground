import React, { useState, useEffect } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'

import { db } from './firebase'
import { Ranges, Done, checkStatus } from './utils'
import { statusContext, docContext } from './context'

import Expectations from './components/Expectations'
import Outcome from './components/Outcome'

export const isInvited = window.location.pathname.split('/')[1] == 'invited'
const docRef = doc(db, '/testing/user0/projects', 'testing')

function App() {
  const [ranges, setRanges] = useState<Ranges>()
  const [status, setStatus] = useState(Done.neither)

  useEffect(() => {
    onSnapshot(docRef, (snap) => {
      let data = snap.data() as Ranges
      let out = {} as Ranges
      out = Object.assign(out, data)
      if (isInvited) {
        out.theirMax = data.yourMax
        out.theirMin = data.yourMin
        out.yourMax = data.theirMax
        out.yourMin = data.theirMin
      }
      setRanges(out)
      setStatus(checkStatus(out))
    })
  }, [])

  return (
    <div className="App p-2">
      <header className="App-header p-4 rounded bg-teal-500 text-white shadow">
        <h1 className="inline text-3xl font-bold mr-4">middleground</h1>
        <p className="inline">settle budgets comfortably</p>
      </header>
      {ranges ? (
        <docContext.Provider value={docRef}>
          <statusContext.Provider value={{ status, setStatus }}>
            <Expectations ranges={ranges} />
            <Outcome />
          </statusContext.Provider>
        </docContext.Provider>
      ) : (
        'loading...'
      )}
    </div>
  )
}

export default App
