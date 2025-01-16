import React from 'react'
import { NavLink } from 'react-router-dom'

export const Sidebar = () => {
  return (
    <aside className='bg-green-900 h-screen'>
      <ul className='h-full flex flex-col'>
        <li>
          <NavLink to={'/'} className='flex text-xl text-yellow-500 p-5'>
            Comments
          </NavLink>
        </li>
        <li>
          <NavLink to={'/admins'} className='flex text-xl text-yellow-500 p-5'>
            Admins
          </NavLink>
        </li>
        <li>
          <NavLink
            to={'/products'}
            className='flex text-xl text-yellow-500 p-5'
          >
            Products
          </NavLink>
        </li>
        <li>
          <NavLink to={'/guides'} className='flex text-xl text-yellow-500 p-5'>
            Guides
          </NavLink>
        </li>
        <li>
          <NavLink
            to={'/services'}
            className='flex text-xl text-yellow-500 p-5'
          >
            Services
          </NavLink>
        </li>
        <li>
          <NavLink to={'/gallery'} className='flex text-xl text-yellow-500 p-5'>
            Gallery
          </NavLink>
        </li>
      </ul>
    </aside>
  )
}
