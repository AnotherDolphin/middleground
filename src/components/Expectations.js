import React from 'react'
import { useState } from 'react';
import MyRange from './MyRange';

export default function Expectations() {

    const [myRange, setMyRange] = useState([]);
    const [theirRange, setTheirRange] = useState([]);

    return (
        <div className='mx-[15%] my-4 p-4 shadow-md rounded-xl bg-[#b8cde1]'>
            <h2 className='bg-violet-500'>Expectations</h2>
            <p>
                Set your peer's expectation with an initial range.
                Expectaions are only revelaed after both parties set their ranges.
            </p>
            <MyRange/>
            <div>
                <h3>Status</h3>
                {!myRange ? 'ee': 'null'}
            </div>


        </div>
    )
}
