import React, { useContext } from 'react'
import ExpectationsForm from './ExpectationsForm'
import { ProjectData, Done } from '../interfaces'
import { statusContext } from '../context'
import ExpectationsStatus from './ExpectationsStatus'

export default function Expectations({ ranges }: { ranges: ProjectData }) {
  const { status } = useContext(statusContext)
  const inputDone = [Done.youSetRange, Done.bothSetRange].includes(status)
  return (
    <div className={'stage ' + (status >= Done.bothSetRange || status < Done.bothConfirmed ? 'collapsed' : '')}>
      <h2 className='bg-purple-500 text-white p-3 text-xl'>Expectations</h2>
      <div className='grid grid-cols-2 p-4 gap-x-6 gap-y-4'>
        {/* <div className="flex p-4 gap-6 flex-wrap"> */}
        <ExpectationsForm min={ranges.yourMin} max={ranges.yourMax} />
        <ExpectationsStatus
          theirRangeDone={status >= Done.theySetRange}
          inputDone={inputDone}
        />
      </div>
    </div>
  )
}
