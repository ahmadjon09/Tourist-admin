import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Axios from '../../Axios'
import {
  getGuidesError,
  getGuidesPending,
  getGuidesSuccess
} from '../../Toolkit/GuidesSlicer'
import { Pencil, Trash2 } from 'lucide-react'
import { Section } from '../../Components/Section/Section'
import {
  FacebookLogo,
  InstagramLogo,
  TwitchLogo,
  TwitterLogo
} from '@phosphor-icons/react'

export const Guides = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { data, isPending, isError } = useSelector(state => state.guides)

  useEffect(() => {
    const getAllGuides = async () => {
      dispatch(getGuidesPending())
      try {
        const response = await Axios.get('guides')
        dispatch(getGuidesSuccess(response.data?.data || []))
      } catch (error) {
        dispatch(
          getGuidesError(error.response?.data?.message || 'Unknown error')
        )
      }
    }
    getAllGuides()
  }, [dispatch])

  const handleDelete = async id => {
    if (!window.confirm('Are you sure you want to delete this guide?')) return
    try {
      await Axios.delete(`guides/${id}`)
      dispatch(getGuidesSuccess(data.filter(guide => guide._id !== id)))
      alert('Guide deleted successfully')
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete guide')
    }
  }

  return (
    <div className='p-8 max-h-screen h-auto overflow-y-auto'>
      <div className='w-full flex justify-between items-center p-4'>
        <h1 className='text-3xl text-black'>Guides</h1>
        <button
          onClick={() => navigate('/create-guide')}
          className='bg-green-700 text-white px-4 py-2 rounded shadow hover:bg-green-800 transition-colors'
        >
          Create Guide
        </button>
      </div>
      {isPending ? (
        <p> loading ...</p>
      ) : isError ? (
        <p className='text-red-500 text-center text-xl'>Error: {isError}</p>
      ) : data.length > 0 ? (
        <div className='h-full w-full pb-10'>
          <div className='flex items-center justify-start flex-wrap gap-6 h-auto pb-[200px]'>
            {data.map((guide, index) => (
              <div
                key={index}
                className='relative text-center bg-white rounded-md shadow-md w-[300px] h-[450px] hover:shadow-xl transition-shadow group'
              >
                <div className='w-full h-[75%] overflow-hidden'>
                  <img
                    src={guide.photos[0] || 'https://via.placeholder.com/150'}
                    alt={`${guide.firstName} ${guide.lastName}`}
                    className='object-cover mb-4 h-full w-full rounded-md'
                  />
                </div>
                <br />
                <h2 className='text-lg font-bold'>
                  {guide.firstName} {guide.lastName}
                </h2>
                <p className='text-sm text-gray-500'>
                  {guide.Designation.length > 150
                    ? guide.Designation.slice(0, 150) + ' ...' || 'Designation'
                    : guide.Designation || 'Designation'}
                </p>
                <div className='absolute top-[300px] left-0 right-0 p-2 transition-all opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 flex justify-center items-center space-x-4'>
                  <div className='flex items-center justify-center w-12 h-12 bg-blue-600  rounded-full transition-all group-hover:scale-100 scale-0'>
                    <a href={guide.fsblink}>
                      <FacebookLogo size={30} color='#fff' />
                    </a>
                  </div>
                  <div className='flex items-center justify-center w-12 h-12 bg-blue-500 rounded-full transition-all group-hover:scale-100 scale-0'>
                    <a href={guide.twtlink}>
                      <TwitterLogo size={30} color='#fff' />
                    </a>
                  </div>
                  <div className='flex items-center justify-center w-12 h-12 bg-red-500 rounded-full transition-all group-hover:scale-100 scale-0'>
                    <a href={guide.inslink}>
                      <InstagramLogo size={30} color='#fff' />
                    </a>
                  </div>
                </div>
                <div className='flex justify-between items-center px-3'>
                  <Link
                    to={`/guide-edit/${guide._id}`}
                    className='bg-sky-600 text-white rounded-md px-3 py-1 text-sm hover:bg-sky-700'
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(guide._id)}
                    className='bg-red-600 text-white rounded-md px-3 py-1 text-sm hover:bg-red-700'
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className='text-gray-600 text-center text-lg mt-4'>
          No guides found.
        </p>
      )}
    </div>
  )
}
