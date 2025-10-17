'use client'

import React, { useState } from 'react'

export default function Kalkulator() {
    const [variableOne, SetVariableOne] = useState('')
    const [variableTwo, SetVariableTwo] = useState('')
    const [aritmatika, SetAritmatika] = useState('+')
    const [result, setResult] = useState(0)

    const submitAritmatika = () => {
        if (variableOne && variableTwo) {
            if (aritmatika == '+') {
                const plus = Number(variableOne) + Number(variableTwo) ;
                setResult(plus)
            } else if (aritmatika === '-' ) {
                const minus = Number(variableOne) - Number(variableTwo) ;
                setResult(minus)
            } else if (aritmatika === '*' ) {
                const kali = Number(variableOne) * Number(variableTwo) ;
                setResult(kali)
            } else {
                alert('Aritmatika hanya bisa di isi oleh +, -, *, /')
            }
        }
    }
  return (
    <div className='items-center justify-items-center min-h-screen '>
        <h1>kalkulator</h1>
        <div className='my-2'>
            <input value={variableOne} onChange={(e) => SetVariableOne(e.target.value)} className='border rounded-lg p-3' placeholder='Bilangan Pertama' />
        </div>
         <div className='my-2'>
            <input value={variableTwo} onChange={(e) => SetVariableTwo(e.target.value)} className='border rounded-lg p-3' placeholder='Bilangan Kedua' />
        </div>
         <div className='my-2'>
            <input value={aritmatika} onChange={(e) => SetAritmatika(e.target.value)}className='border rounded-lg p-3' placeholder='Aritmatika' />
        </div>
         <div className='my-2'>
            <button className='w-[200px] btn bg-[blue] text white rounded-lg'
            onClick={submitAritmatika}>
                hasil
            </button>
        </div>
        <h1>{result}</h1>
    </div>
  )
}
