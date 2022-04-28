import React, { useContext } from 'react'
import { docContext, statusContext } from '../context'
import { setDoc } from 'firebase/firestore'
import { Done } from '../interfaces'

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
        youConfirmed: false,
        theyConfirmed: false
      },
      { merge: true }
    )
    setStatus(Done.staging)
  }

  return (
    <div className='col-span-2 self-center flex flex-col'>
      {max > min ? (
        <div>
          <h2 className='text-green-600 text-xl my-2'>Intersection found!</h2>
          <p>
            Your and your peer's ranges crossover <span className='font-bold'>between ${min} and ${max}</span>
          </p>
        </div>
      ) : (
        <div>
          <h2 className='text-red-600 text-xl my-2'>No intersection</h2>
          <p>
            Your and your peer's ranges did not meet. Your peer's
            {theyLow ? ' maximum' : ' minimum'} expected was
            {theyLow ? ' lower' : ' higher'} than your
            {theyLow ? ' minimum' : ' maximum'} expected amount.
          </p>
        </div>
      )}
      {/* <button
        onClick={resetData}
        className='self-end bg-red-600 text-white px-4 py-2 m-2 rounded-lg shadow-lg'
      >
        Reset
      </button> */}
    </div>
  )
}
