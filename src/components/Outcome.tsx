import React, { useContext } from 'react'
import { statusContext } from '../context'
import { Done, Ranges } from '../utils'
import OutcomeStatement from './OutcomeStatement'

export default function Outcome({ ranges }: { ranges: Ranges }) {
  const { status } = useContext(statusContext)

  const decimal = (n: number) => {
    return (Math.round(n * 100) / 100).toFixed(2)
  }
  const min = Math.max(ranges.yourMin, ranges.theirMin)
  const max = Math.min(ranges.yourMax, ranges.theirMax)
  const theyLow = ranges.theirMax == max

  return (
    <div className={'stage ' + (status < Done.both ? 'collapsed' : '')}>
      <h2 className='bg-violet-600 text-white p-3 text-xl'>Outcome</h2>
      <div className='grid grid-cols-4 p-4 gap-x-6 gap-y-4'>
        <div className='flex flex-col text-center m-4'>
          <h3 className='bg-bluegray text-white rounded-t-lg p-2'>
            Your range
          </h3>
          <p className='border-2 border-gray-300 rounded-b-lg text-xl p-2'>
            ${decimal(ranges.yourMin)} to ${decimal(ranges.yourMax)}
          </p>
        </div>
        <div className='flex flex-col text-center m-4'>
          <h3 className='bg-bluegray text-white rounded-t-lg p-2'>
            Peer's range
          </h3>
          <p className='border-2 border-gray-300 rounded-b-lg text-xl p-2'>
            ${decimal(ranges.theirMin)} to ${decimal(ranges.theirMax)}
          </p>
        </div>
        <OutcomeStatement {...{min, max, theyLow}}/>
      </div>
    </div>
  )
}
