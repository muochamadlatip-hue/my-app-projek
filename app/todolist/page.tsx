'use client'
import React, { useState, useEffect } from 'react'

function Todolist() {
    const [input, setInput] = useState('')
    const [dataTodo, setDataTodo] = useState<string[]>([])
    const [search, setSearch] = useState('')

    useEffect(() => { //use effect : menjalakan function ketika pertama kali dibuka
        const storedData = localStorage.getItem('dataTodo')
        if (storedData) {
            setDataTodo(JSON.parse(storedData))
        } //kurung kurawal harus berpasangan
    }, [])

    const addDataTodo = () => {
        if (input.length > 0) {
            setInput('')
            setDataTodo([...dataTodo, input])
            localStorage.setItem('dataTodo', JSON.stringify([...dataTodo, input]))
        } else {
            alert('Masukan Todo Terebih Dahulu')
        }
    }

    const removeDataTodo = (index: number) => {
        const tempData = [...dataTodo]
        const removeData = tempData.filter((_val, idx) => idx !== index)
        setDataTodo(removeData)
        localStorage.setItem('dataTodo', JSON.stringify(removeData))
    }

    const filteredData = dataTodo.filter(todo =>
        todo.toLowerCase().includes(search.toLowerCase())
    )  // includes untuk mencari data tanpa melihat kalimat awal 

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
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className='w-full border border-[#E4E4E4]
                rounded-lg py-[8px] px-[16px]'
                            placeholder='Cari Todo' />
                    </div>
                    <button
                        className=''
                        onClick={addDataTodo} >
                    </button>
                </div>

                {filteredData.map((value, index) => { //mlakuka mapping data - pemetaan data //memfilter data
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
