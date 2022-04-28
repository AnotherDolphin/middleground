import React, { useContext, useState } from 'react'
import { statusContext } from '../context'
import { Done } from '../interfaces'
import { setDoc } from 'firebase/firestore'
import { docContext } from '../context'
import { isInvited } from '../App'

export default function Requirements({
  requirements,
}: {
  requirements: string
}) {
  const { status } = useContext(statusContext)
  const docRef = useContext(docContext)
  const textAreaRef = React.createRef<HTMLTextAreaElement>()
  const [text, setText] = useState(requirements)
  const [editing, setIfEditing] = useState(false)

  const readInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  const updateRequirements = async () => {
    await setDoc(
      docRef,
      {
        requirements: textAreaRef.current?.value,
      },
      { merge: true }
    )
  }

  const clickedEdit = () => {
    setIfEditing(true)
  }

  const clickedSave = async () => {
    setIfEditing(false)
    updateRequirements()
    const update: any = {}
    if (isInvited) update['youConfirmed'] = false
    else update['theyConfirmed'] = false
    await setDoc(docRef, update, { merge: true })
  } 

  const clickedConfirm = async () => {
    const update: any = {}
    if (isInvited) update['theyConfirmed'] = true
    else update['youConfirmed'] = true
    await setDoc(docRef, update, { merge: true })
  }

  console.log(status)

  return (
    <div
      className={'stage ' + (status >= Done.bothConfirmed ? 'collapsed' : '')}
    >
      <h2 className='bg-cyan-600 text-white p-3 text-xl'>Requirements</h2>
      <div className='grid grid-cols-3 p-4 gap-2'>
        <p className='col-span-3'>
          Set and edit project requirements with your peer before evaluation
        </p>
        <ul className='col-span-2'>
          <li>
            <textarea
              className='border-2 w-full p-2 rounded text-sm'
              disabled={!editing}
              ref={textAreaRef}
              value={text}
              onChange={readInput}
              name=''
              id=''
              cols={30}
              rows={7}
            ></textarea>
          </li>
        </ul>
        <div className='flex flex-col self-end ml-8'>
          <p className='text-sm text-center text-gray-500 m-2'>project will move to expecations phase when both parties confirm requirements</p>
          {!editing ? (
            <button
              className='bg-yellow-500 text-white m-2 py-2 rounded-lg'
              onClick={clickedEdit}
              disabled={status == Done.youConfirmed || status >= Done.bothConfirmed}
            >
              Edit
            </button>
          ) : (
            <button
              className='bg-blue-500 text-white m-2 py-2 rounded-lg'
              onClick={clickedSave}
              disabled={status == Done.youConfirmed || status >= Done.bothConfirmed}
            >
              Save
            </button>
          )}
          <button
            className='bg-green-600 text-white m-2 py-2 rounded-lg'
            onClick={clickedConfirm}
            disabled={status == Done.youConfirmed || status >= Done.bothConfirmed}
            >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}
