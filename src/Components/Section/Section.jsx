import React from 'react'

export const Section = ({ children, className }) => {
  return (
    <section
      className={'p-5h h-screen overflow-y-auto' + ' ' + className}
    >
      {children}
    </section>
  )
}
