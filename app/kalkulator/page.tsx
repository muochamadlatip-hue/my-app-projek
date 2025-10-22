'use client'

import React, { useState } from 'react'

export default function Kalkulator() {
  const [variableOne, setVariableOne] = useState('')
  const [variableTwo, setVariableTwo] = useState('')
  const [aritmatika, setAritmatika] = useState('+')
  const [result, setResult] = useState('')

  const submitAritmatika = () => {
    if (variableOne && variableTwo) {
      const num1 = Number(variableOne)
      const num2 = Number(variableTwo)
      let hasil = 0

      switch (aritmatika) {
        case '+':
          hasil = num1 + num2
          break
        case '-':
          hasil = num1 - num2
          break
        case '*':
          hasil = num1 * num2
          break
        case '/':
          if (num2 === 0) {
            alert('Tidak bisa membagi dengan nol!')
            return
          }
          hasil = num1 / num2
          break
        default:
          alert('Operator tidak valid!')
          return
      }

      setResult(hasil.toString())
    } else {
      alert('Harap isi kedua bilangan terlebih dahulu!')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-white-900">
      <div className="bg-black text-white p-6 rounded-2xl shadow-2xl w-[340px] text-center">
        <h1 className="text-2xl font-bold mb-6">KALKULATOR</h1>

        {/* Input bilangan pertama */}
        <input
          value={variableOne}
          onChange={(e) => setVariableOne(e.target.value)}
          className="border border-gray-700 bg-white text-black rounded-lg p-3 w-full mb-3 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Masukan Bilangan Pertama"
          type="number"
        />

        {/* Input bilangan kedua */}
        <input
          value={variableTwo}
          onChange={(e) => setVariableTwo(e.target.value)}
          className="border border-gray-700 bg-white text-black rounded-lg p-3 w-full mb-3 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Masukan Bilangan kedua"
          type="number"
        />

        {/* Dropdown & Tombol Hitung sejajar penuh */}
        <div className="flex items-center justify-between gap-3 mb-4 w-full">
          <select
            value={aritmatika}
            onChange={(e) => setAritmatika(e.target.value)}
            className="border border-gray-700 bg-white text-black rounded-lg p-3 w-[60%] focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="+">+</option>
            <option value="-">-</option>
            <option value="*">*</option>
            <option value="/">/</option>
          </select>

          <button
            className="bg-red-600 hover:bg-red-700 text-white rounded-lg px-4 py-3 font-semibold w-[40%]"
            onClick={submitAritmatika}
          >
            Hitung
          </button>
        </div>

        {/* Field hasil */}
        <input
          value={result}
          readOnly
          className="border border-gray-700 bg-white text-black rounded-lg p-3 w-full mb-3 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder=" "
        />
      </div>
    </div>
  )
}
