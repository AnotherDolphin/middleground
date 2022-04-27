import React, { useContext } from 'react'
import { docContext, statusContext } from '../context'
import { setDoc } from 'firebase/firestore'
import { Done } from '../utils'

interface props {
  min: number
  max: number
  theyLow: boolean
}

export default function OutcomeStatement({ min, max, theyLow }: props) {
  const docRef = useContext(docContext)
  const { setStatus } = useContext(statusContext)

  const resetData = async () => {
    await setDoc(
      docRef,
      {
        yourMin: -1,
        yourMax: -1,
        theirMin: -1,
        theirMax: -1,
      },
      { merge: true }
    )
    setStatus(Done.neither)
  }

  return (
    <div className='col-span-2 self-center flex flex-col'>
      {max > min ? (
        <div>
          <h2>Intersection found!</h2>
          <p>
            Your and your peer's ranges crossover between ${min} and ${max}
          </p>
        </div>
      ) : (
        <div>
          <h2 className='text-red-600 text-xl my-2'>No intersection</h2>
          <p>
            Your and your peer's ranges did not meet. Your peer's
            {theyLow ? ' maximum' : ' minimum'} expectation value was
            {theyLow ? ' lower' : ' higher'} than your
            {theyLow ? ' minimum' : ' maximum'} expected amount.
          </p>
        </div>
      )}
      <button
        onClick={resetData}
        className='self-end bg-red-600 text-white px-4 py-2 m-2 rounded-lg shadow-lg'
      >
        Reset
      </button>
    </div>
  )
}
