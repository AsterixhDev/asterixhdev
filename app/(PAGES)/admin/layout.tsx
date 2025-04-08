"use client"
import { RippleButton } from '@/components/magicui/ripple-button';
import { AdminSidebar } from '@/components/Sections/Majors/Admin'
import { useIsMobile } from '@/lib/hooks/useMobile';
import React from 'react'

type Props = {
    children: React.ReactNode
}

export default function Layout({children}: Props) {
  const isMobile = useIsMobile(768);
  return (
    <div className="w-full flex relative items-start justify-start p-4 gap-2">
    
    {
      !isMobile&&<AdminSidebar mobileTrigger={null}/>
    }
    <main className='w-full relative isolate bg-muted/20 backdrop-blur-lg rounded-2xl h-full min-h-screen p-2'> 
    {
      isMobile&&
      <header className='w-full bg-muted/20 backdrop-blur-lg rounded-2xl py-4 px-2 flex items-center justify-between'>
        <strong className="text-accent-foreground/60 px-4">Welcome Asterixh</strong>
        <AdminSidebar mobileTrigger={
          <RippleButton variant='primary' className='p-2'>
            <i className="pi pi-bars"/>
          </RippleButton>
        }/>
      </header>
    }
    {children}
    </main>
    </div>
  )
}