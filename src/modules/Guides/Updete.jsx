import React, { useEffect, useState } from 'react'
import Axios from '../../Axios'
import { useNavigate, useParams } from 'react-router-dom'

export const Updete = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [GuideData, setGuideData] = useState({
    fsblink: '',
    twtlink: '',
    inslink: '',
    firstName: '',
    lastName: '',
    Designation: '',
    photos: []
  })

  const [isPending, setIsPending] = useState(false)
  const [isError, setIsError] = useState('')
  const [imagePending, setImagePending] = useState(false)

  useEffect(() => {
    const getGuide = async () => {
      try {
        setIsPending(true)
        const { data } = await Axios.get(`guides/${id}`)
        setGuideData(data.guide)
      } catch (error) {
        setIsError(error.response?.data?.message || 'An error occurred.')
      } finally {
        setIsPending(false)
      }
    }
    getGuide()
  }, [id])

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
    try {
      await Axios.put(`guides/${id}`, GuideData)
      navigate('/guides')
    } catch (error) {
      console.error(error.response?.data?.message || 'An error occurred.')
    }
  }

  return (
    <>
      {isPending && <p>Loading...</p>}
      {isError && <p className='text-red-500'>{isError}</p>}
      <form
        onSubmit={handleFormSubmit}
        className='flex flex-col space-y-3 h-full w-full mx-auto mt-14 md:w-[500px]'
      >
        <h1 className='text-4xl text-center'>Edit Guide</h1>
        <textarea
          name='description'
          className='border border-gray-300 rounded-md p-2 w-full resize-none'
          onChange={handleInputChange}
          value={GuideData?.Designation || ''}
          placeholder='Description'
        />
        <input
          type='text'
          name='firstName'
          className='border border-gray-300 rounded-md p-2 w-full'
          onChange={handleInputChange}
          required
          value={GuideData?.firstName || ''}
          placeholder='First Name'
        />
        <input
          type='text'
          name='lastName'
          className='border border-gray-300 rounded-md p-2 w-full'
          value={GuideData?.lastName || ''}
          onChange={handleInputChange}
          required
          placeholder='Last Name'
        />
        <input
          type='url'
          name='fsblink'
          className='border border-gray-300 rounded-md p-2 w-full'
          value={GuideData?.fsblink || ''}
          onChange={handleInputChange}
          required
          placeholder='Facebook Link'
        />
        <input
          type='url'
          name='twtlink'
          className='border border-gray-300 rounded-md p-2 w-full'
          value={GuideData?.twtlink || ''}
          onChange={handleInputChange}
          required
          placeholder='Twitter Link'
        />
        <input
          type='url'
          name='inslink'
          className='border border-gray-300 rounded-md p-2 w-full'
          value={GuideData?.inslink || ''}
          onChange={handleInputChange}
          required
          placeholder='Instagram Link'
        />
        <input
          type='file'
          name='photos'
          onChange={handleFileChange}
          multiple
          className='border border-gray-300 rounded-md p-2 w-full'
        />
        {imagePending && (
          <h1 className='bg-sky-600 text-white text-center py-2'>
            Uploading image...
          </h1>
        )}
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
    </>
  )
}
