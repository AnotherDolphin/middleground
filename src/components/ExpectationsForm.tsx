import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from 'react'
import { setDoc } from 'firebase/firestore'
import { isInvited } from '../App'
import { ProjectData, Done } from '../interfaces'
import { statusContext, docContext } from '../context'

type propTypes = {
  min?: number
  max?: number
}

export default function ExpectationsForm({ min, max }: propTypes) {
  const docRef = useContext(docContext)
  const { status } = useContext(statusContext)
  const disabled = [Done.youSetRange, Done.bothSetRange].includes(status)
  const [inputValues, setInputValues] = useState({ min: min, max: max })

  useEffect(() => {
    setInputValues({ min: min, max: max })
  }, [min, max])

  const submitRange = async (e: FormEvent) => {
    e.preventDefault()
    const data = new FormData(e.target as HTMLFormElement)
    const updates = {} as ProjectData
    if (isInvited) {
      updates.theirMax = data.get('max')! as unknown as number
      updates.theirMin = data.get('min')! as unknown as number
    } else {
      updates.yourMax = data.get('max')! as unknown as number
      updates.yourMin = data.get('min')! as unknown as number
    }
    await setDoc(docRef, updates, { merge: true })
  }

  const readInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value })
  }

  return (
    <form
      className='inline-grid grid-cols-2 justify-items-center gap-y-3'
      onSubmit={submitRange}
    >
      <p className='col-span-2 text-gray-900'>
        Set your expected budget range for the project
      </p>
      <div>
        <label className='text-gray-500' htmlFor='low'>
          minimum 🔽
        </label>
        <br />
        $
        <input
          className='w-32 border-2 bg-gray-50 rounded-xl p-2 m-2'
          required
          disabled={disabled}
          value={inputValues.min && inputValues.min > -1 ? inputValues.min : 0}
          onChange={readInput}
          type='number'
          id='low'
          name='min'
        />
      </div>
      <div>
        <label className='text-gray-500' htmlFor='high'>
          maximum 🔼
        </label>
        <br />
        $
        <input
          className='w-32 border-2 bg-gray-50 rounded-xl p-2 m-2'
          required
          disabled={disabled}
          value={inputValues.max && inputValues.max > -1 ? inputValues.max : 0}
          onChange={readInput}
          type='number'
          id='high'
          name='max'
        />
      </div>
      <button
        disabled={disabled}
        className={
          'rounded-xl bg-green-500 px-4 py-2 text-white shadow-lg col-span-2 justify-self-center '        }
      >
        Submit
      </button>
    </form>
  )
}
