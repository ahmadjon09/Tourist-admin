import React, { useState } from 'react'
import Axios from '../../Axios'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const AddPhoto = () => {
  const navigate = useNavigate()
  const { data } = useSelector(state => state.user)
  const [imagePending, setImagePending] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const [photoData, setphotoData] = useState({
    Designation: '',
    photos: [],
    phoneNumber: data.phoneNumber,
    isAdminn: true
  })

  const handleInputChange = e => {
    const { name, value } = e.target
    setphotoData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleFileChange = async e => {
    try {
      const formImageData = new FormData()
      const files = e.target.files
      for (let i = 0; i < files.length; i++) {
        formImageData.append('photos', files[i])
      }
      setImagePending(true)
      const { data } = await Axios.post('/upload', formImageData)
      setphotoData(prevData => ({
        ...prevData,
        photos: [...prevData.photos, ...data.photos]
      }))
    } catch (err) {
      console.error(err)
    } finally {
      setImagePending(false)
    }
  }

  const handleFormSubmit = async e => {
    e.preventDefault()
    try {
      setIsPending(true)
      await Axios.post('gallery/create', photoData)
      navigate('/gallery')
    } catch (error) {
      console.error(error)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <form
      onSubmit={handleFormSubmit}
      className='flex h-screen flex-col pb-[200px] space-y-4 w-full mx-auto mt-14 px-4 py-4 md:w-[400px]'
    >
      <h1 className='text-3xl text-center font-bold'>Add New photo</h1>

      <div className='space-y-4'>
        <textarea
          name='Designation'
          className='border border-gray-300 rounded-md p-2 w-full resize-none'
          onChange={handleInputChange}
          required
          placeholder='Designation'
        />

        <input
          type='file'
          name='photos'
          onChange={handleFileChange}
          multiple
          required
          className='border border-gray-300 rounded-md p-2 w-full'
        />

        {imagePending && (
          <h1 className='bg-sky-600 text-white text-center py-2'>
            Uploading image...
          </h1>
        )}
      </div>

      <button
        type='submit'
        disabled={imagePending || isPending}
        className={`${
          imagePending || isPending
            ? 'bg-gray-600 cursor-not-allowed'
            : 'bg-green-700'
        } w-full text-xl py-2 rounded-md text-white`}
      >
        {imagePending || isPending ? 'Loading...' : 'Submit'}
      </button>
    </form>
  )
}
