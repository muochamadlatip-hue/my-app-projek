'use client'
import React, { useState, useEffect } from 'react'

function Todolist() {
    const [input, setInput] = useState('')
    const [dataTodo, setDataTodo] = useState<string[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredTodo, setFilteredTodo] = useState<string[]>([])

    useEffect(() => {
        const savedData = localStorage.getItem('dataTodo')
        if (savedData) {
            const parsedData = JSON.parse(savedData)
            setDataTodo(parsedData)
            setFilteredTodo(parsedData)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('dataTodo', JSON.stringify(dataTodo))
        setFilteredTodo(dataTodo) 
    }, [dataTodo])

    const addDataTodo = () => {
        if (input.length > 0) {
            const isDuplicate = dataTodo.includes(input)
            if (isDuplicate) {
                alert('Todo sudah ada, masukkan todo yang berbeda!')
                return
            }

            setDataTodo([...dataTodo, input])
            setInput('')
        } else {
            alert('Masukkan Todo Terlebih Dahalu')
        }
    }

    const removeDataTodo = (index: number) => {
        const tempData = [...dataTodo]
        const removeData = tempData.filter((_val, idx) => idx !== index)
        setDataTodo(removeData)
    }

    const handleSearch = () => {
        if (searchTerm.trim() === '') {
            setFilteredTodo(dataTodo)
        } else {
            const filtered = dataTodo.filter(todo =>
                todo.toLowerCase().includes(searchTerm.toLowerCase())
            )
            setFilteredTodo(filtered)
        }
    }

    return (
        <div className='w-1/2 m-auto p-[64px]'>
            <div className='flex justify-between items-center'>
                <h1 className='text-[56px] font-[600]'>Todo list</h1>
                <div className='flex justify-center items-center
             bg-[#F2F3FF] w-[56px] h-[56px] rounded-lg'>
                    🚀
                </div>
            </div>
            <p>Notes:</p>
            <div>
                <div className='h-[1px] bg-[#EBEBEB] mb-[21px] mt-[32px]' />
                <div className='flex items-center gap-2 mb-[43px]'>
                    <div className='flex-1'>
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className='w-full border border-[#E4E4E4]
                rounded-lg py-[8px] px-[16px]'
                            placeholder='Masukan Todo' />
                    </div>
                    <button className='bg-[#503E9D] text-white
            h-[40px] px-[16px] rounded-lg text-center'
                        onClick={addDataTodo}>
                        Simpan
                    </button>
                </div>

                <div className='flex items-center gap-2 mb-[32px]'>
                    <div className='flex-1'>
                        <input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className='w-full border border-[#E4E4E4]
                rounded-lg py-[8px] px-[16px]'
                            placeholder='Cari Todo...' />
                    </div>
                    <button
                        className='bg-[#3A8DFF] text-white h-[40px] px-[16px] rounded-lg text-center'
                        onClick={handleSearch}
                    >
                        Cari
                    </button>
                </div>

                {filteredTodo.map((value, index) => {
                    return (
                        <div key={String(index)} className='flex items-center
                          justify-between mb-[16px]'>
                            <p>{value}</p>
                            <button className='bg-[#FF0004] text-white
            h-[30px] px-[6px] rounded-lg'
                                onClick={() => removeDataTodo(index)}>
                                Hapus
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Todolist
