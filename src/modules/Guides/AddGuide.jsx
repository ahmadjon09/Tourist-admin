import React, { useState } from 'react'
import Axios from '../../Axios'
import { useNavigate } from 'react-router-dom'

export const AddGuide = () => {
  const navigate = useNavigate()
  const [imagePending, setImagePending] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const [guideData, setGuideData] = useState({
    firstName: '',
    lastName: '',
    Designation: '',
    fsblink: '',
    twtlink: '',
    inslink: '',
    photos: ''
  })

  const handleInputChange = e => {
    const { name, value } = e.target
    setGuideData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleFileChange = async e => {
    try {
      const formImageData = new FormData()
      const files = Array.from(e.target.files)

      files.forEach(file => {
        formImageData.append('photos', file)
      })

      setImagePending(true)
      const { data } = await Axios.post('/upload', formImageData)
      setGuideData(prevData => ({
        ...prevData,
        photos: [...data.photos]
      }))
    } catch (err) {
      console.error(err)
    } finally {
      setImagePending(false)
    }
  }

  const handleFormSubmit = async e => {
    e.preventDefault()
    console.log(guideData)

    try {
      setIsPending(true)
      await Axios.post('guides/create', guideData)
      navigate('/guides')
    } catch (error) {
      console.error(error)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <form
      onSubmit={handleFormSubmit}
      className='flex h-screen overflow-y-auto flex-col pb-[200px] space-y-4 w-full mx-auto mt-14 px-4 py-4 md:w-[400px]'
    >
      <h1 className='text-3xl text-center font-bold'>Add New Guide</h1>

      {/* Input Fields */}
      <div className='space-y-4'>
        <input
          type='text'
          name='firstName'
          className='border border-gray-300 rounded-md p-2 w-full'
          onChange={handleInputChange}
          required
          placeholder='First Name'
        />
        <input
          type='text'
          name='lastName'
          className='border border-gray-300 rounded-md p-2 w-full'
          onChange={handleInputChange}
          required
          placeholder='Last Name'
        />
        <input
          type='text'
          name='Designation'
          className='border border-gray-300 rounded-md p-2 w-full'
          onChange={handleInputChange}
          required
          placeholder='Designation'
        />
        <input
          type='url'
          name='fsblink'
          className='border border-gray-300 rounded-md p-2 w-full'
          onChange={handleInputChange}
          required
          placeholder='Facebook Link'
        />
        <input
          type='url'
          name='twtlink'
          className='border border-gray-300 rounded-md p-2 w-full'
          onChange={handleInputChange}
          required
          placeholder='Twitter Link'
        />
        <input
          type='url'
          name='inslink'
          className='border border-gray-300 rounded-md p-2 w-full'
          onChange={handleInputChange}
          required
          placeholder='Instagram Link'
        />
        <input
          type='file'
          name='avatar'
          onChange={handleFileChange}
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
