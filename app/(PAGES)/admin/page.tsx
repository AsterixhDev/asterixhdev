import React from 'react'

type Props = object

export default function page({}: Props) {
  return (
    <div className='flex flex-col gap-4 items-center justify-center h-full text-secondary'>
      <i className='pi pi-inbox text-4xl'></i>
      <strong className='text-sm opacity-30'>Please pick an item from the navigation</strong>
    </div>
  )
}