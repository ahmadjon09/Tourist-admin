import React, { useState } from 'react'
import Axios from '../../Axios'
import { useNavigate } from 'react-router-dom'

export const AddProduct = () => {
  const navigate = useNavigate()
  const [imagePending, setImagePending] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const [productData, setProductData] = useState({
    description: '',
    price: 0,
    category: '',
    photos: [],
    location: '',
    days: 0,
    person: 0,
    sale: 0
  })

  const handleInputChange = e => {
    const { name, value } = e.target
    setProductData(prevData => ({ ...prevData, [name]: value }))
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
      setProductData(prevData => ({
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

    if (productData.category === 'none' || productData.colors === 'none') {
      alert('Please select valid category and color options.')
      return
    }

    try {
      setIsPending(true)
      await Axios.post('/product/create', productData)
      navigate('/products')
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
      <h1 className='text-3xl text-center font-bold'>Add New Product</h1>

      {/* Inputlar container */}
      <div className='space-y-4'>
        <textarea
          name='description'
          className='border border-gray-300 rounded-md p-2 w-full resize-none'
          onChange={handleInputChange}
          required
          placeholder='Description'
        />

        <div className='grid grid-cols-2 gap-3'>
          <input
            type='number'
            name='price'
            className='border border-gray-300 rounded-md p-2 w-full'
            onChange={handleInputChange}
            required
            placeholder='Price'
          />

          <input
            type='number'
            name='sale'
            className='border border-gray-300 rounded-md p-2 w-full'
            onChange={handleInputChange}
            required
            placeholder='Sale (%)'
          />
        </div>

        <div className='grid grid-cols-2 gap-3'>
          <input
            type='number'
            name='days'
            className='border border-gray-300 rounded-md p-2 w-full'
            onChange={handleInputChange}
            required
            placeholder='Days'
          />
          <input
            type='number'
            name='person'
            className='border border-gray-300 rounded-md p-2 w-full'
            onChange={handleInputChange}
            required
            placeholder='Person Count'
          />
        </div>

        <input
          type='text'
          name='location'
          className='border border-gray-300 rounded-md p-2 w-full'
          onChange={handleInputChange}
          required
          placeholder='Location'
        />

        <select
          name='category'
          className='border border-gray-300 rounded-md p-2 bg-white w-full'
          onChange={handleInputChange}
          required
        >
          <option value=''>Select Category</option>
          <option value='adventure'>Adventure</option>
          <option value='cultural'>Cultural</option>
          <option value='relaxation'>Relaxation</option>
          <option value='nature'>Nature</option>
          <option value='city-tours'>City Tours</option>
          <option value='family-friendly'>Family Friendly</option>
          <option value='beach'>Beach</option>
          <option value='honeymoon'>Honeymoon</option>
        </select>
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
