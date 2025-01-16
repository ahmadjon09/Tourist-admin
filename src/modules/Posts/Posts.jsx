import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getPostsError,
  getPostsPending,
  getPostsSuccess
} from '../../Toolkit/PostsSlicer'
import Axios from '../../Axios'
import { ThumbsDown, ThumbsUp, Trash } from 'lucide-react'

export const Posts = () => {
  const dispatch = useDispatch()
  const { data, isPending, isError } = useSelector(state => state.posts)
  const { phoneNumber } = useSelector(state => state.user.data)

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
  const [postToDelete, setPostToDelete] = useState(null)

  useEffect(() => {
    const getAllPosts = async () => {
      dispatch(getPostsPending())
      try {
        const response = await Axios.get('post/all')
        dispatch(getPostsSuccess(response.data?.data || []))
      } catch (error) {
        dispatch(
          getPostsError(error.response?.data?.message || 'Failed to load posts')
        )
      }
    }
    getAllPosts()
  }, [dispatch])

  const handleLike = async (id, currentLikeStatus) => {
    try {
      const response = await Axios.put(`post/${id}/like`, {
        likeStatus: !currentLikeStatus,
        phoneNumber
      })
      const updatedPost = response.data.data
      dispatch(
        getPostsSuccess(
          data.map(post =>
            post._id === id
              ? {
                  ...post,
                  likes: updatedPost.likes,
                  dislikes: updatedPost.dislikes
                }
              : post
          )
        )
      )
    } catch (error) {
      alert('You can only like or dislike once!')
    }
  }

  const handleDislike = async (id, currentDislikeStatus) => {
    try {
      const response = await Axios.put(`post/${id}/dislike`, {
        dislikeStatus: !currentDislikeStatus,
        phoneNumber
      })
      const updatedPost = response.data.data
      dispatch(
        getPostsSuccess(
          data.map(post =>
            post._id === id
              ? {
                  ...post,
                  likes: updatedPost.likes,
                  dislikes: updatedPost.dislikes
                }
              : post
          )
        )
      )
    } catch (error) {
      alert('You can only like or dislike once!')
      console.error('Error disliking post:', error)
    }
  }

  const handleDelete = async id => {
    try {
      await Axios.delete(`post/${id}`)
      dispatch(getPostsSuccess(data.filter(post => post._id !== id)))
      setDeleteModalOpen(false)
      setPostToDelete(null)
    } catch (error) {
      console.error('Error deleting post:', error)
      alert('Failed to delete the post')
    }
  }

  return (
    <div className='container mx-auto overflow-y-auto my-5'>
      {isPending ? (
        <div className='flex justify-center items-center'>Loading ...</div>
      ) : isError ? (
        <p className='text-red-500 text-center text-xl'>Error: {isError}</p>
      ) : data.length > 0 ? (
        <div className='container w-full h-full mx-auto p-5 pb-[100px]'>
          {data.map(post => {
            const isLongContent = post.smsContent?.length > 150
            return (
              <div
                key={post._id}
                className={`flex items-start bg-white shadow-md rounded-lg p-4 mb-6 hover:bg-gray-100 transition-all ${
                  isLongContent ? 'min-h-[150px]' : 'min-h-[100px]'
                }`}
              >
                <div className='flex items-center h-auto gap-3'>
                  <img
                    src={post.avatar}
                    alt='Avatar'
                    className='w-12 h-12 rounded-full object-cover'
                  />
                  <div className='h-auto'>
                    <p className='font-semibold text-lg'>{post.firstName}</p>
                    <p className='text-sm text-gray-500'>{post.address}</p>
                    <p className='text-sm h-auto w-full text-wrap text-gray-500'>
                      {new Date(post.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className='ml-6 flex-1 max-w-full flex-wrap'>
                  <span className='text-gray-700 w-full text-sm text-wrap mt-2'>
                    {post.smsContent}
                  </span>

                  <div className='flex items-center space-x-4 mt-4'>
                    <button
                      className={`flex items-center space-x-1 ${
                        post.likes.length > 0 ? 'text-red-600' : 'text-gray-600'
                      } hover:text-red-600`}
                      onClick={() =>
                        handleLike(post._id, post.likes.includes(phoneNumber))
                      }
                    >
                      <ThumbsUp />
                      <span>{post.likes.length}</span>
                    </button>
                    <button
                      className={`flex items-center space-x-1 ${
                        post.dislikes.length > 0
                          ? 'text-blue-600'
                          : 'text-gray-600'
                      } hover:text-blue-600`}
                      onClick={() =>
                        handleDislike(
                          post._id,
                          post.dislikes.includes(phoneNumber)
                        )
                      }
                    >
                      <ThumbsDown />
                      <span>{post.dislikes.length}</span>
                    </button>
                    <button
                      className='flex items-center space-x-1 text-gray-600 hover:text-red-600'
                      onClick={() => {
                        setPostToDelete(post._id)
                        setDeleteModalOpen(true)
                      }}
                    >
                      <Trash size={25} />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <p className='text-gray-600 text-center text-lg mt-4'>
          No Posts found.
        </p>
      )}

      {isDeleteModalOpen && (
        <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center'>
          <div className='bg-white p-6 rounded-lg shadow-lg'>
            <p className='text-center mb-4'>
              Are you sure you want to delete this post?
            </p>
            <div className='flex justify-center space-x-4'>
              <button
                onClick={() => handleDelete(postToDelete)}
                className='bg-red-600 text-white px-4 py-2 rounded-md'
              >
                Yes, Delete
              </button>
              <button
                onClick={() => {
                  setDeleteModalOpen(false)
                  setPostToDelete(null)
                }}
                className='bg-gray-600 text-white px-4 py-2 rounded-md'
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
