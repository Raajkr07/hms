import React from 'react'
import Header from '../components/header/Header';
import Sidebar from '../components/sidebar/Sidebar';

const AppRoutes = () => {
  return (
    <div className='flex'>
        <Sidebar/>
        <div className='w-full'>
            <Header/>
        </div>
    </div>
  )
}

export default AppRoutes