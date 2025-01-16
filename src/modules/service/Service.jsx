import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Axios from '../../Axios'
import {
  getServiceError,
  getServicePending,
  getServiceSuccess
} from '../../Toolkit/ServicesSlicer'
import { Link } from 'react-router-dom'

export const Services = () => {
  const dispatch = useDispatch()
  const { data, isPending, isError } = useSelector(state => state.service)

  const [icons, setIcons] = useState({})

  useEffect(() => {
    const getAllServices = async () => {
      dispatch(getServicePending())
      try {
        const response = await Axios.get('service')
        dispatch(getServiceSuccess(response.data.data || []))
      } catch (error) {
        dispatch(
          getServiceError(error.response?.data?.message || 'Unknown error')
        )
      }
    }
    getAllServices()
  }, [dispatch])

  const getIconByName = async iconName => {
    try {
      const module = await import('lucide-react')
      const Icon = module[iconName]
      if (Icon) {
        setIcons(prev => ({ ...prev, [iconName]: Icon }))
      } else {
        console.warn(`Icon "${iconName}" not found in lucide-react`)
      }
    } catch (error) {
      console.error(`Error loading icon: ${error.message}`)
    }
  }

  const handleDelete = async id => {
    if (!window.confirm('Are you sure you want to delete this Service?')) return
    try {
      await Axios.delete(`service/${id}`)
      dispatch(getServiceSuccess(data.filter(Service => Service._id !== id)))
      alert('Service deleted successfully')
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete Service')
    }
  }

  return (
    <div className='p-8 bg-green-100 max-h-screen h-auto overflow-y-auto'>
      <div className='w-full flex justify-between items-center p-4'>
        <h1 className='text-3xl text-black'>Services</h1>
        <Link
          to={'/create-service'}
          className='bg-green-700 text-white px-4 py-2 rounded shadow hover:bg-green-800 transition-colors'
        >
          Create Service
        </Link>
      </div>
      {isPending ? (
        <div className='flex justify-center items-center mt-10'>
          <p className='text-xl text-gray-600'>Loading Services...</p>
        </div>
      ) : isError ? (
        <p className='text-red-500 text-center text-xl'>Error: {isError}</p>
      ) : data.length > 0 ? (
        <div className='grid h-auto pb-[100px] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {data.map(Service => {
            const IconComponent = icons[Service.logo]
            if (!IconComponent && Service.logo) {
              getIconByName(Service.logo)
            }
            return (
              <div
                key={Service._id}
                className='bg-white rounded-md shadow-lg overflow-hidden relative'
              >
                <div className='w-full p-4 flex justify-start gap-3 items-center'>
                  {IconComponent ? (
                    <IconComponent size={48} color='green' />
                  ) : (
                    <p className='text-gray-500'>Icon not found</p>
                  )}
                  <p className='text-xl font-bold text-gray-700'>
                    {' '}
                    {Service.name}
                  </p>
                </div>
                <div className='w-full p-4'>
                  <h2 className='text-sm font-semibold text-gray-500'>
                    {Service.designation}
                  </h2>
                  <div className='flex justify-between items-center mt-4'>
                    <Link
                      to={`/service-edit/${Service._id}`}
                      className='bg-sky-600 text-white rounded-md px-3 py-1 text-sm hover:bg-sky-700'
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(Service._id)}
                      className='bg-red-600 text-white rounded-md px-3 py-1 text-sm hover:bg-red-700'
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <p className='text-gray-600 text-center text-lg mt-4'>
          No Services found.
        </p>
      )}
    </div>
  )
}
