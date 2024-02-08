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

 {/*
  <div>
  <h3>Product List</h3>
  <ul>
   {products.map((product, index) => (
    <li key={index}>
     <img src={product.image} alt={product.name} style={{ width: '100px', height: '100px' }} />
      <p>{product.name} - ${product.price}</p>
     </li>
    ))}
   </ul>
  </div>
   */}