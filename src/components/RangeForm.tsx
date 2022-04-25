import React, { FormEvent, useContext } from 'react'
import { setDoc } from 'firebase/firestore'
import { isInvited } from '../App'
import { Ranges, Done } from '../utils'
import { statusContext, docContext } from '../context'

type propTypes = {
  min?: number
  max?: number
}

export default function RangeForm({ min, max }: propTypes) {
  const docRef = useContext(docContext)
  const { status } = useContext(statusContext)
  const disabled = [Done.onlyYou, Done.both].includes(status)
  // const disabled = min && min > -1 ? true : false

  const submitRange = async (e: FormEvent) => {
    e.preventDefault()
    const data = new FormData(e.target as HTMLFormElement)
    const updates = {} as Ranges
    if (isInvited) {
      updates.theirMax = data.get('high')! as unknown as number
      updates.theirMin = data.get('low')! as unknown as number
    } else {
      updates.yourMax = data.get('high')! as unknown as number
      updates.yourMin = data.get('low')! as unknown as number
    }
    await setDoc(docRef, updates, { merge: true })
  }

  return (
    <form
      className="inline-grid grid-cols-2 justify-items-center gap-y-3"
      onSubmit={submitRange}
    >
      <p className="col-span-2 text-gray-900">
        Set your expectation with an your project budget range.
      </p>
      {/* <h2 className="justify-self-start col-span-2">Set your range</h2> */}
      <div>
        <label className="text-gray-500" htmlFor="low">
          minimum 🔽
        </label>
        <br />
        $
        <input
          required
          disabled={disabled}
          defaultValue={min && min > -1 ? min : ''}
          className="w-32 border-2 bg-gray-50 rounded-xl p-2 m-2"
          type="number"
          id="low"
          name="low"
        />
      </div>
      <div>
        <label className="text-gray-500" htmlFor="high">
          maximum 🔼
        </label>
        <br />
        $
        <input
          required
          disabled={disabled}
          defaultValue={max && max > -1 ? max : ''}
          className="w-32 border-2 bg-gray-50 rounded-xl p-2 m-2"
          type="number"
          id="high"
          name="high"
        />
      </div>
      <button
        disabled={disabled}
        className={
          'rounded-xl bg-green-500 px-4 py-2 text-white shadow-lg col-span-2 justify-self-center ' +
          (disabled && 'bg-gray-400')
        }
      >
        Submit
      </button>
    </form>
  )
}
