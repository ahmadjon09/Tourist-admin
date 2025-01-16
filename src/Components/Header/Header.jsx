import React from 'react'
import contactInfo from '/src/data/contact/contact.js'
import { MapPin } from 'lucide-react'

const { Address, Links } = contactInfo

export const Header = () => {
  return (
    <>
      <header className='bg-black h-[35px]'>
        <div className='container h-full flex items-center justify-between px-5 text-white'>
          <div className='flex  justify-center items-center'>
            <MapPin size={15} />
            <p>{Address}</p>
          </div>
          <div className='flex text-white items-center gap-3'>
            {Object.keys(Links).map(key => (
              <a
                key={key}
                href={Links[key].link}
                target='_blank'
                rel='noopener noreferrer'
                className='hover:scale-105'
              >
                <img src={Links[key].logo} alt={key} className='w-5 h-5' />
              </a>
            ))}
          </div>
        </div>
      </header>
      <nav className='w-full h-[70px] bg-green-600 flex items-center'>
        <div className='flex items-center justify-center w-full'>
          <MapPin size={60} color='#fff' />
          <p className='text-5xl text-white font-bold'>Tourist</p>
        </div>
      </nav>
    </>
  )
}
