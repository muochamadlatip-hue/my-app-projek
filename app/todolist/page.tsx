'use client';
import React, { useEffect, useState } from 'react'
import api from '../lib/axios';

interface DataTodoTypes {
  id: number;
  title: string;
  body: string;
  userId: number;
}

function Todolist() {

  const [input, setInput] = useState('')
  const [search, setSearch] = useState('')
  const [editValue, setEditValue] = useState('')
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [dataTodo, setDataTodo] = useState<DataTodoTypes[]>([])

  const handleFetchData = async () => {
    const response = await api.get('/posts')
    setDataTodo(response?.data || [])
    localStorage.setItem('dataTodo', JSON.stringify(response?.data || []))
  }

  useEffect(() => {
    const storedData = localStorage.getItem('dataTodo')
    if (storedData) {
      setDataTodo(JSON.parse(storedData))
    } else {
      handleFetchData()
    }
  }, [])

  const addDataTodo = async () => {
    if (input.trim().length === 0) {
      alert('Masukan Todo terlebih dahulu')
      return
    }

    const response = await api.post('/posts', {
      title: input,
      body: input,
      userId: 1
    })

    if (response.status < 400) {
      alert('Data berhasil di simpan')
      handleFetchData()
      setInput('')
    }
  }

  const removeDataTodo = async (id: number) => {
    const response = await api.delete(`/posts/${id}`)

    if (response.status < 400) {
      alert('Data berhasil di hapus')
      handleFetchData()
    } else {
      alert('Data gagal di hapus')
    }
  }

  const startEditTodo = (index: number) => {
    setEditIndex(index)
    setEditValue(dataTodo[index].title)
  }

  const saveEditTodo = () => {
    if (editValue.trim().length === 0) {
      alert('Todo tidak boleh kosong!')
      return
    }

    const updatedTodos = [...dataTodo]
    updatedTodos[editIndex!] = {
      ...updatedTodos[editIndex!],
      title: editValue
    }

    setDataTodo(updatedTodos)
    localStorage.setItem('dataTodo', JSON.stringify(updatedTodos))

    setEditIndex(null)
    setEditValue('')
  }

  const filteredData = dataTodo.filter((value) =>
    value.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className='w-1/2 m-auto p-[64px]'>
      <div className='flex justify-between items-center'>
        <h1 className='text-[56px] font-[600]'>Todo List</h1>
        <div className='flex justify-center items-center bg-[#F2F3FF] w-[56px] h-[56px] rounded-lg'>
          🚀
        </div>
      </div>

      <p className='font-semibold mt-[12px]'>Notes:</p>
      <div>
        <div className='h-[1px] bg-[#EBEBEB] mb-[21px] mt-[32px]' />

        {/* Input Tambah */}
        <div className='flex items-center gap-2 mb-[16px]'>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className='w-full border border-[#E4E4E4] rounded-lg py-[8px] px-[16px]'
            placeholder='Masukan Todo'
          />
          <button
            className='bg-[#503E9D] text-white h-[40px] w-[114px] rounded-lg'
            onClick={addDataTodo}
          >
            Simpan
          </button>
        </div>

        {/* Input Cari */}
        <div className='mb-[16px]'>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='w-full border border-[#E4E4E4] rounded-lg py-[8px] px-[16px]'
            placeholder='Cari Todo'
          />
        </div>

        {/* Input Edit */}
        {editIndex !== null && (
          <div className='flex items-center gap-2 mb-[43px]'>
            <input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className='w-full border border-[#E4E4E4] rounded-lg py-[8px] px-[16px]'
              placeholder='Edit Todo'
            />
            <button
              className='bg-[#503E9D] text-white h-[40px] w-[114px] rounded-lg'
              onClick={saveEditTodo}
            >
              Edit
            </button>
          </div>
        )}

        {/* List Todo */}
        {filteredData.map((value, index) => (
          <div key={value.id} className='flex items-center justify-between mb-[16px]'>
            <div
              className='flex items-center gap-2 cursor-pointer flex-1'
              onClick={() => startEditTodo(index)}
            >
              <input type='checkbox' className='w-[18px] h-[18px]' />
              <p>{value.title}</p>
            </div>

            <button
              className='bg-[#FF0004] text-white h-[30px] px-[10px] rounded-lg'
              onClick={() => removeDataTodo(value.id)}
            >
              Hapus
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Todolist;
