import React from 'react'

type Props = {
    what?:string
}

export default function Loader({what}: Props) {
  return (
    <div className="size-full py-60 flex gap-3 items-center justify-center">
    
    <i className="pi pi-box"></i><strong className='text-secondary'>{what}</strong>  not found</div>
  )
}