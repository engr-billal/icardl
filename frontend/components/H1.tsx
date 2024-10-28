import React, { ReactNode } from 'react'

const H1 = ({children}: {children:ReactNode}) => {
  return (
    <h1 className='font-semibold text-xl text-left mb-5'>
        {children}
    </h1>
  )
}

export default H1