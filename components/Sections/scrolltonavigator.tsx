import React from 'react'
import { Button } from '../ui/button'

type Props = React.ComponentPropsWithoutRef<typeof Button> & {
    to:string;
}

export default function ScrollToNavigator({...props}: Props) {
    const scrollToSection = (sectionId: string) => {
        sectionId = sectionId.replace(/\/#/g, '')
        const section = document.getElementById(sectionId)
        if (section) {
        section.scrollIntoView({ behavior: 'smooth' })
        }
    }
  return (
    <Button
    data-slot="scroll-to-navigator"
    {...props}
    onClick={(e)=>{
        scrollToSection(props.to)
        if (props.onClick) {
            props.onClick(e)
        }

    }}
    
    />
  )
}