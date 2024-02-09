import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../Bars/AdminSidebar';
import './AdminPanel.css'
const AdminPanel = () => {
    
  return (
        <div className='admin-panel-layout'>
          <AdminSidebar />
          <div className='admin-panel-content'>
            <Outlet />
          </div>
        </div>
      );
};

export default AdminPanel;