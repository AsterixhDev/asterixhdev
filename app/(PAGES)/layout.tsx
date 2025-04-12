import Footer from '@/components/Sections/Majors/Footer'
import Header from '@/components/Sections/Majors/Header'
import { SideBarMobile } from '@/components/Sections/Majors/SideBarMobile'
import { Metadata } from 'next'
import React from 'react'
export const metadata: Metadata = {
  // ...other metadata
  other: {
    "schema": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Paul Peter",
      "alternateName": "Asterixh",
      "url": "https://asterixhdev.vercel.app",
      "image": "/images/my-image.jpg",
      "sameAs": [
        "https://github.com/CodeWithAsterixh",
        "https://www.linkedin.com/in/paul-peter-eyinnaya",
        "https://twitter.com/AsterixhThanks",
        "https://www.instagram.com/code_with_asterixh"
      ],
      "jobTitle": "Full Stack Developer",
      "worksFor": {
        "@type": "Organization",
        "name": "AsterixhDev"
      },
      "description": "Professional web developer specializing in React, Next.js, TypeScript and modern web technologies."
    })
  }
}


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