import React from 'react'
import Navbar from '@/components/ui/Navbar'
import Sidebar1 from '@/components/homepage/Sidebar1'
import Content from '@/components/homepage/Content'
// import Sidebar2 from '@/components/homepage/Sidebar2'
export const Layout = ({children}) => {
  return (
    <div className='flex'>
      
      <div className='fixed w-full'>
      <Navbar/>
      </div>
      <div className='flex h-svh w-full mb-5'>
        <Sidebar1/>
        {children}
      </div>
    </div>
  )
}

