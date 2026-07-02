import React, { useState } from 'react'
import AdminSidebar from './AdminSidebar';
import AdminNavbar from './AdminNavbar';
import { Outlet } from 'react-router-dom';
import ScrollToTop from '@/shared/components/ScrollToTop';

const AdminLayout = () => {

  const [collapsed, setCollapsed]= useState(false)
  return (
    <div className="flex h-screen bg-background overflow-hidden">
     
      <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed}/>

      <div className="flex flex-col flex-1 overflow-hidden">
      
        <AdminNavbar/>

        <main className="flex-1 overflow-y-auto p-8">
          <ScrollToTop/>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout
