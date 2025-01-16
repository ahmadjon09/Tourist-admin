import React, { useEffect, useState } from 'react'
import Axios from '../../Axios'
import { useNavigate, useParams } from 'react-router-dom'
import Select from 'react-select'
import {
  CalendarPlus,
  Drama,
  EarthIcon,
  Footprints,
  Hotel,
  Map,
  PlaneTakeoff,
  Salad,
  TentTree,
  TicketsPlane
} from 'lucide-react'

export const UpdateService = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isPending, setIsPending] = useState(false)
  const [serviceData, setServiceData] = useState({
    designation: '',
    logo: '',
    name: ''
  })

  const logoOptions = [
    {
      value: 'EarthIcon',
      label: (
        <div className='flex items-center space-x-2'>
          <EarthIcon /> <span>WorldWide Tours</span>
        </div>
      )
    },
    {
      value: 'Hotel',
      label: (
        <div className='flex items-center space-x-2'>
          <Hotel /> <span>Hotel Reservation</span>
        </div>
      )
    },
    {
      value: 'Map',
      label: (
        <div className='flex items-center space-x-2'>
          <Map /> <span>Map</span>
        </div>
      )
    },
    {
      value: 'CalendarPlus',
      label: (
        <div className='flex items-center space-x-2'>
          <CalendarPlus /> <span>Event Management</span>
        </div>
      )
    },
    {
      value: 'TicketsPlane',
      label: (
        <div className='flex items-center space-x-2'>
          <TicketsPlane /> <span>Flight Booking</span>
        </div>
      )
    },
    {
      value: 'PlaneTakeoff',
      label: (
        <div className='flex items-center space-x-2'>
          <PlaneTakeoff /> <span>Transportation </span>
        </div>
      )
    },
    {
      value: 'TentTree',
      label: (
        <div className='flex items-center space-x-2'>
          <TentTree /> <span>Excursions</span>
        </div>
      )
    },
    {
      value: 'Drama',
      label: (
        <div className='flex items-center space-x-2'>
          <Drama /> <span>Entertainment </span>
        </div>
      )
    },
    {
      value: 'Volleyball',
      label: (
        <div className='flex items-center space-x-2'>
          <Footprints size={25} /> <span>Sports</span>
        </div>
      )
    },
    {
      value: 'Salad',
      label: (
        <div className='flex items-center space-x-2'>
          <Salad /> <span>Spa and Wellness </span>
        </div>
      )
    }
  ]

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const { data } = await Axios.get(`/service/${id}`)
        setServiceData(data.OneService)
      } catch (error) {
        console.error(
          'Error fetching service data:',
          error.response?.data || error
        )
      }
    }
    fetchServiceData()
  }, [id])

  const handleInputChange = e => {
    const { name, value } = e.target
    setServiceData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleLogoChange = selectedOption => {
    setServiceData(prevData => ({ ...prevData, logo: selectedOption.value }))
  }

  const handleFormSubmit = async e => {
    e.preventDefault()
    try {
      setIsPending(true)
      await Axios.put(`service/${id}`, serviceData)
      navigate('/services')
    } catch (error) {
      console.error('Error updating service:', error)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <form
      onSubmit={handleFormSubmit}
      className='flex h-screen flex-col pb-[200px] space-y-4 w-full mx-auto mt-14 px-4 py-4 md:w-[400px]'
    >
      <h1 className='text-3xl text-center font-bold'>Update Service</h1>

      <div className='space-y-4'>
        <textarea
          name='designation'
          className='border border-gray-300 rounded-md p-2 w-full resize-none'
          value={serviceData.designation}
          onChange={handleInputChange}
          required
          placeholder='Description'
        />
        <input
          type='text'
          name='name'
          className='border border-gray-300 rounded-md p-2 w-full'
          value={serviceData.name}
          onChange={handleInputChange}
          required
          placeholder='Name'
        />

        <Select
          options={logoOptions}
          value={logoOptions.find(option => option.value === serviceData.logo)}
          onChange={handleLogoChange}
          placeholder='Select Logo'
        />
      </div>

      <button
        type='submit'
        disabled={isPending}
        className={`${
          isPending ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-700'
        } w-full text-xl py-2 rounded-md text-white`}
      >
        {isPending ? 'Updating...' : 'Update'}
      </button>
    </form>
  )
}
