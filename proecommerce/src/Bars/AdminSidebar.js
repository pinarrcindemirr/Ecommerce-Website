import React from 'react';
import { NavLink } from 'react-router-dom';
import './AdminSide.css'

const AdminSidebar = () => {
  return (
    <div className='admin-sidebar'>
      <NavLink
        to="/AdminPanel/listProduct"
          className={({ isActive }) => isActive ? 'active-link' : 'link'}
          > Product List 
      </NavLink>
      <NavLink 
        to="/AdminPanel/add"
        className={({ isActive }) => isActive ? 'active-link' : 'link'}
        > Add 
     </NavLink>
    </div>
  );
};

export default AdminSidebar;

