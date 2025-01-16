import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Axios from '../../Axios'
import {
  getGalleryError,
  getGalleryPending,
  getGallerySuccess
} from '../../Toolkit/GallerySlicer'
import { useNavigate } from 'react-router-dom'
import { ThumbsDown, ThumbsUp, Trash } from 'lucide-react'

export const Gallery = () => {
  const dispatch = useDispatch()
  const { data, isPending, isError } = useSelector(state => state.gallery)
  const { phoneNumber } = useSelector(state => state.user.data)
  const navigate = useNavigate()
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  useEffect(() => {
    const getAllGallery = async () => {
      dispatch(getGalleryPending())
      try {
        const response = await Axios.get('gallery')
        dispatch(getGallerySuccess(response.data?.data || []))
      } catch (error) {
        dispatch(
          getGalleryError(error.response?.data?.message || 'Unknown error')
        )
      }
    }
    getAllGallery()
  }, [dispatch])

  const handleLike = async (id, currentLikeStatus) => {
    try {
      const response = await Axios.put(`gallery/${id}/like`, {
        likeStatus: !currentLikeStatus,

        phoneNumber
      })
      const updatedGallery = response.data.data

      dispatch(
        getGallerySuccess(
          data.map(photo =>
            photo._id === id
              ? {
                  ...photo,
                  likes: updatedGallery.likes,
                  dislikes: updatedGallery.dislikes
                }
              : photo
          )
        )
      )

      if (selectedPhoto && selectedPhoto._id === id) {
        setSelectedPhoto({
          ...selectedPhoto,
          likes: updatedGallery.likes,
          dislikes: updatedGallery.dislikes
        })
      }
    } catch (error) {
      alert('You can only like or dislike once!')
    }
  }

  const handleDislike = async (id, currentDislikeStatus) => {
    try {
      const response = await Axios.put(`gallery/${id}/dislike`, {
        dislikeStatus: !currentDislikeStatus,
        phoneNumber
      })
      const updatedGallery = response.data.data

      dispatch(
        getGallerySuccess(
          data.map(photo =>
            photo._id === id
              ? {
                  ...photo,
                  likes: updatedGallery.likes,
                  dislikes: updatedGallery.dislikes
                }
              : photo
          )
        )
      )

      if (selectedPhoto && selectedPhoto._id === id) {
        setSelectedPhoto({
          ...selectedPhoto,
          likes: updatedGallery.likes,
          dislikes: updatedGallery.dislikes
        })
      }
    } catch (error) {
      alert('You can only like or dislike once!')
      console.error('Error disliking photo:', error)
    }
  }

  const handleDelete = async id => {
    if (!window.confirm('Are you sure you want to delete this photo?')) return
    try {
      await Axios.delete(`gallery/${id}`)
      dispatch(getGallerySuccess(data.filter(photo => photo._id !== id)))
      alert('photo deleted successfully')
      setSelectedPhoto(null)
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete photo')
    }
  }
  return (
    <div className='p-8 bg-gray-100 max-h-screen h-auto overflow-y-auto pb-[100px]'>
      <div className='w-full flex justify-between items-center p-4'>
        <h1 className='text-4xl font-bold text-gray-800'>Gallery</h1>
        <button
          onClick={() => navigate('/create-photo')}
          className='bg-green-700 text-white px-4 py-2 rounded shadow hover:bg-green-800 transition-colors'
        >
          Add Photo
        </button>
      </div>

      {isPending ? (
        <div className='flex justify-center items-center mt-10'>
          <p className='text-xl text-gray-600'>Loading Gallery...</p>
        </div>
      ) : isError ? (
        <p className='text-red-500 text-center text-xl'>Error: {isError}</p>
      ) : data.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {data.map(photo => (
            <div
              key={photo._id}
              className='relative bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer'
              onClick={() => setSelectedPhoto(photo)}
            >
              <img
                src={photo.photos[0] || null}
                alt='Gallery'
                className='w-full h-60 object-cover transition duration-500 ease-in-out transform hover:scale-110'
              />
              <div className='absolute bottom-0 left-0 bg-black bg-opacity-50 text-white w-full p-2'>
                <h3 className='text-lg font-semibold'>
                  {photo.Designation.length > 50
                    ? photo.Designation.slice(0, 50) + ' ...'
                    : photo.Designation}
                </h3>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className='text-gray-600 text-center text-lg mt-4'>
          No photos found.
        </p>
      )}

      {selectedPhoto && (
        <div
          className='fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center'
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className='bg-white rounded-lg shadow-lg p-6 max-w-xl w-full'
            onClick={e => e.stopPropagation()}
          >
            <img
              src={selectedPhoto.photos[0]}
              alt='Selected'
              className='w-full h-72 object-cover rounded-lg'
            />
            <div className='mt-4'>
              <div className='flex items-center justify-start gap-2'>
                <img
                  src={selectedPhoto.avatar}
                  className='w-[20px] h-[20px]'
                  alt='user'
                />
                <p className='text-gray-600'>{selectedPhoto.firstName}</p>
              </div>
              <div className='flex items-center space-x-4 mt-4'>
                <button
                  onClick={() =>
                    handleLike(
                      selectedPhoto._id,
                      selectedPhoto.likes.includes(phoneNumber)
                    )
                  }
                  className='bg-green-500 flex gap-1 text-white px-4 py-2 rounded hover:bg-green-600'
                >
                  <ThumbsUp /> {selectedPhoto.likes.length}
                </button>
                <button
                  onClick={() =>
                    handleDislike(
                      selectedPhoto._id,
                      selectedPhoto.dislikes.includes(phoneNumber)
                    )
                  }
                  className='bg-red-500 flex gap-1 text-white px-4 py-2 rounded hover:bg-red-600'
                >
                  <ThumbsDown /> {selectedPhoto.dislikes.length}
                </button>
                <button
                  onClick={() => handleDelete(selectedPhoto._id)}
                  className='bg-red-500 flex gap-1 text-white px-4 py-2 rounded hover:bg-red-600'
                >
                  <Trash />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
