import React from 'react'
import SetRange from './RangeForm'
import Status from './Status'
import { Ranges } from '../interfaces'

export default function Expectations({ ranges }: { ranges: Ranges }) {
  const inputDone = ranges.yourMax != undefined && ranges.yourMax != -1
  const theirRangeDone = ranges.theirMax != undefined && ranges.theirMax != -1  

  return (
    <div
      className={
        'expectations ' + (inputDone && theirRangeDone ? 'collapsed' : '')
      }
    >
      <h2 className="bg-green-500 text-white p-3 text-xl">Expectations</h2>
      <div className="grid grid-cols-2 p-4 gap-x-6 gap-y-4">
        <SetRange
          disabled={inputDone}
          min={inputDone ? ranges.yourMin : undefined}
          max={inputDone ? ranges.yourMax : undefined}
        />
        <Status theirRangeDone={theirRangeDone} inputDone={inputDone} />
      </div>
    </div>
  )
}
