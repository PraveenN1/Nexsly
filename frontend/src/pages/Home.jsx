import React from 'react'
import Navbar from '@/components/ui/Navbar'
import Sidebar1 from '@/components/homepage/Sidebar1'
import Content from '@/components/homepage/Content'
// import Sidebar2 from '@/components/homepage/Sidebar2'
export const Home = () => {
  return (
    <div className='flex'>
      <div className='fixed w-full'>
      <Navbar/>
      </div>
      <div className='flex h-svh w-full'>
        <Sidebar1/>
        <Content/>
        {/* <Sidebar2/> */}
      </div>
    </div>
  )
}

