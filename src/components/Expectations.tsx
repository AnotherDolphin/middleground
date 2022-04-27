import React, { useContext } from 'react'
import ExpectationsForm from './ExpectationsForm'
import Status from './Status'
import { Ranges, Done } from '../utils'
import { statusContext } from '../context'

export default function Expectations({ ranges }: { ranges: Ranges }) {
  const { status } = useContext(statusContext)
  const inputDone = [Done.onlyYou, Done.both].includes(status)
  return (
    <div className={'stage ' + (status >= Done.both ? 'collapsed' : '')}>
      <h2 className='bg-green-500 text-white p-3 text-xl'>Expectations</h2>
      <div className='grid grid-cols-2 p-4 gap-x-6 gap-y-4'>
        {/* <div className="flex p-4 gap-6 flex-wrap"> */}
        <ExpectationsForm min={ranges.yourMin} max={ranges.yourMax} />
        <Status
          theirRangeDone={status >= Done.onlyThem}
          inputDone={inputDone}
        />
      </div>
    </div>
  )
}
