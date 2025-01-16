import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { LogOut, Pencil } from 'lucide-react'
import Cookies from 'js-cookie'
import { Section } from '../../Components/Section/Section'
import { Posts } from '../../modules/Posts/Posts'

export const Dashboard = () => {
  const { data } = useSelector(state => state.user)
  const { avatar } = data

  function Logout () {
    Cookies.remove('token')
    window.location.href = '/'
  }

  return (
    <Section className={''}>
      <div className='flex justify-between h-[70px] p-5 items-center'>
        <img src={avatar} width={'50px'} alt='' />
        <button
          onClick={() => Logout()}
          className='flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-2xl font-bold'
        >
          Logout <LogOut size={14} />
        </button>
      </div>
      <Posts />
    </Section>
  )
}
