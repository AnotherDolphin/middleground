import React, { useState, useEffect } from 'react';
import { db, doc, getDoc } from './firebase'
import Expectations from './components/Expectations';
import {Ranges} from './interfaces'

function App() {

  const [ranges, setRanges] = useState<Ranges>();

  const getData = async () => {
    const docRef = doc(db, "/testing/user0/projects", "testing")
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      setRanges(docSnap.data() as Ranges)
    } else {
      console.log("No such document!");
    }
  }

  useEffect(() => {
    getData()
  }, []);

  return (
    <div className="App p-2">
      <header className="App-header p-4 rounded bg-teal-500 text-white shadow">
        <h1 className='inline text-3xl font-bold mr-4'>middleground</h1>
        <p className='inline'>settle budgets comfortably</p>
      </header>
      {ranges ? <Expectations ranges={ranges} /> : 'loading'}
    </div>
  )
}

export default App;
