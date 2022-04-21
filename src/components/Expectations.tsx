import React from 'react'
import SetRange from './RangeForm';
import {Ranges} from '../interfaces'

export default function Expectations ({ ranges }:{ ranges:Ranges}) {

    const inputSet = ranges.yourMax !== -1

    return (
      <div className="mx-[15%] my-4 overflow-hidden shadow-md rounded-xl bg-[#e7eff7]">
        <h2 className="bg-green-500 text-white p-3 text-xl">Expectations</h2>
        <div className="grid grid-cols-2 p-4 gap-y-4">
          <p className="col-span-2">
            Set your peer's expectation with an initial range. Expectaions are
            only revelaed after both parties set their ranges.
          </p>
          <SetRange
            disabled={inputSet}
            min={inputSet? ranges.yourMin : undefined}
            max={inputSet? ranges.yourMax : undefined}
          />
          <div>
            {/* <h3>Status</h3>
            {ranges.yourMin ? ranges.yourMin : "null"} */}
          </div>
        </div>
      </div>
    );
}
