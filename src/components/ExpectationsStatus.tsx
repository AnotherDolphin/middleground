import React from 'react'

export default function ExpectationsStatus({
  inputDone,
  theirRangeDone,
}: {
  inputDone: boolean
  theirRangeDone: boolean
}) {
  const awaiting = () => {
    return <span className="text-yellow-600">awaiting ... ⌛</span>
  }

  const done = () => {
    return <span className="text-green-600">done ✅</span>
  }

  return (
    <div className="grid grid-cols-2 justify-items-center">
      <h3 className="col-span-2 text-gray-700 justify-self-center">Status</h3>
      <div className="inline-flex flex-col">
        <p>your range</p>
        {inputDone ? done() : awaiting()}
      </div>
      <div className="inline-flex flex-col">
        <p>your peer</p>
        {theirRangeDone ? done() : awaiting()}
      </div>
      <p className="col-span-2 text-sm text-gray-900 self-end">
        expectations will be revealed once both parties have set their ranges{' '}
      </p>
    </div>
  )
}
