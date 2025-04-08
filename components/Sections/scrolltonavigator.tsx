import Link from 'next/link';
import React from 'react';

type Props = React.ComponentPropsWithoutRef<typeof Link>

export default function ScrollToNavigator({...props}: Props) {
    const scrollToSection = (sectionId: string) => {
        sectionId = sectionId.replace(/\/#/g, '')
        const section = document.getElementById(sectionId)
        if (section) {
        section.scrollIntoView({ behavior: 'smooth' })
        }
    }
  return (
    <Link
    {...props}
    href={`${props.href}`}
    onClick={(e)=>{
        e.preventDefault()
        scrollToSection(props.href as string)
        if (props.onClick) {
            props.onClick(e)
        }

    }}
    
    />
  )
}