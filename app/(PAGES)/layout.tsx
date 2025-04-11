import Footer from '@/components/Sections/Majors/Footer'
import Header from '@/components/Sections/Majors/Header'
import { SideBarMobile } from '@/components/Sections/Majors/SideBarMobile'
import React from 'react'

type Props = {
    children: React.ReactNode
}

export default function layout({children}: Props) {
  return (
    <>
    <div className="size-full h-screen">
    <SideBarMobile/>

    <main data-slot="main-scroll-container" className='max-h-full relative isolate overflow-y-auto custom-scrollbar'>
    <Header/>
    {children}
    <Footer/>
    </main>
    </div>
    </>
  )
}