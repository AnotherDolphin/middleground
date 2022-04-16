import React from 'react'

export default function MyRange() {
    return (
        <div className='flex gap-4'>
            <div>
                <label htmlFor="low">minimum</label><br/>
                $<input className='w-32' type="text" id="low" name="low" />
            </div>
            <div>
                <label htmlFor="high">maximum</label><br/>
                $<input className='w-32' type="number" id='high' name='high' />
            </div>
        </div>
    )
}
