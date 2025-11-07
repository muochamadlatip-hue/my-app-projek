'use client'
import React, { useEffect, useState } from 'react'

function TodoList() {
    const [input, setInput] = useState('')
    const [dataTodo, setDataTodo] = useState<string[]>([])
    const [search, setSearch] = useState('')
    const [editIndex, setEditIndex] = useState<number | null>(null)
    const [editValue, setEditValue] = useState('')

    useEffect(() => { //use effect : menjalakan function ketika pertama kali dibuka
        const storedData = localStorage.getItem('dataTodo')
        if (storedData) {  //kurung kurawal harus berpasangan
            setDataTodo(JSON.parse(storedData))
        }
    }, [])

    const saveToLocal = (data: string[]) => {
        localStorage.setItem('dataTodo', JSON.stringify(data))
    }

    const addDataTodo = () => {
        if (input.trim().length === 0) {
            alert('Tolong masukkan kata!')
            return
        }

        if (dataTodo.includes(input.trim())) {
            alert('Data sudah ada, tidak boleh duplikat!')
            return
        }

        const newData = [...dataTodo, input.trim()]
        setDataTodo(newData)
        saveToLocal(newData)
        setInput('')
    }

    const removeDataTodo = (index: number) => {
        const newData = dataTodo.filter((_val, idx) => idx !== index)
        setDataTodo(newData)
        saveToLocal(newData)
    }

    const startEditTodo = (index: number, value: string) => {
        setEditIndex(index)
        setEditValue(value)
    }

    const submitEditTodo = () => {
        if (editValue.trim().length === 0) {
            alert('Tolong masukkan kata!')
            return
        }

        if (editIndex === null) {
            alert('Pilih todo yang ingin diedit dulu!')
            return
        }

        const newData = [...dataTodo]
        newData[editIndex] = editValue.trim()
        setDataTodo(newData)
        saveToLocal(newData)
        setEditValue('')
        setEditIndex(null)
        alert('Edit berhasil!')
    }

    const filteredData = dataTodo.filter((item) =>
        item.toLowerCase().startsWith(search.toLowerCase())
    ) // includes untuk mencari data tanpa melihat kalimat awal 

    const inputStyle =
        'flex-1 border border-[#E4E4E4] rounded-lg py-[10px] px-[16px] text-[16px]'
    const buttonMain =
        'bg-[#503E9D] text-white h-[42px] w-[114px] rounded-lg text-center hover:opacity-90 transition-all duration-150'

    return (
        <div className='w-1/2 m-auto p-[64px]'>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <h1 className='text-[56px] font-[600]'>Todo List</h1>
                </div>
                <div className='flex justify-center items-center
             bg-[#F2F3FF] w-[56px] h-[56px] rounded-lg'>
                    🚀
                </div>
            </div>
            <p>Notes:</p>
            <div className="h-[1px] bg-[#EBEBEB] mb-[21px] mt-[32px]" />

            <div className="flex items-center gap-2 mb-[20px]">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className={inputStyle}
                    placeholder="Masukkan Todo"
                />
                <button className={buttonMain} onClick={addDataTodo}>
                    Simpan
                </button>
            </div>

            <div className="flex items-center gap-2 mb-[20px]">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={inputStyle}
                    placeholder="Cari Todo"
                />
                <div className="w-[114px]" />
            </div>
            <div className="flex items-center gap-2 mb-[30px]">
                <input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className={inputStyle}
                    placeholder="Masukkan teks edit"
                />
                <button className={buttonMain} onClick={submitEditTodo}>
                    Edit
                </button>
            </div>

            {filteredData.length > 0 ? (
                filteredData.map((value, index) => ( //melakuka mapping data - pemetaan data //memfilter data
                    <div
                        key={String(index)}
                        className="flex items-center justify-between mb-[16px]"
                    >
                        <div
                            className="cursor-pointer flex-1"
                            onClick={() => startEditTodo(index, value)}
                        >
                            <p>{value}</p>
                        </div>


                        <div className="flex justify-end w-[114px]">
                            <button
                                className="bg-[#FF0004] text-white h-[30px] px-[10px] rounded-lg hover:opacity-90 transition"
                                onClick={() => removeDataTodo(index)}
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-gray-400 italic"></p>
            )}
        </div>
    )
}

export default TodoList
