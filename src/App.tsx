import React, { useState, useEffect } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'

import { db } from './firebase'
import { checkStatus } from './utils'
import { statusContext, docContext } from './context'
import { Done, ProjectData } from './interfaces'

import Expectations from './components/Expectations'
import Outcome from './components/Outcome'
import Requirements from './components/Requirements'

export const isInvited = window.location.pathname.split('/').at(-1) == 'invited'
const projectId = window.location.pathname.split('/')[1]
if(!projectId) alert('Missing project ID. Home page not supported yet')
const docRef = doc(db, '/testing/user0/projects', projectId)

function App() {
  const [projectData, setProjectData] = useState<ProjectData>()
  const [status, setStatus] = useState(Done.staging)

  useEffect(() => {
    onSnapshot(docRef, (snap) => {
      let data = snap.data() as ProjectData
      let out = {} as ProjectData
      out = Object.assign(out, data)
      if (isInvited) {
        out.theirMax = data.yourMax
        out.theirMin = data.yourMin
        out.yourMax = data.theirMax
        out.yourMin = data.theirMin
        out.theyConfirmed = data.youConfirmed
        out.youConfirmed = data.theyConfirmed
      }
      setProjectData(out)
      setStatus(checkStatus(out))
    })
  }, [])

  return (
    <div className="App p-2">
      <header className="App-header p-4 rounded bg-teal-500 text-white shadow">
        <h1 className="inline text-3xl font-bold mr-4">middleground</h1>
        <p className="inline">settle budgets comfortably</p>
      </header>
      {projectData ? (
        <docContext.Provider value={docRef}>
          <statusContext.Provider value={{ status, setStatus }}>
            <Requirements requirements={ projectData.requirements?? ''} />
            <Expectations ranges={projectData} />
            <Outcome ranges={projectData} />
          </statusContext.Provider>
        </docContext.Provider>
      ) : (
        'loading...'
      )}
    </div>
  )
}

export default App
