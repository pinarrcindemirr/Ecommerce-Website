import React from 'react';
import { NavLink } from 'react-router-dom';
import './profileSide.css'
const ProfileSidebar = () => {
  return (
    <div className='admin-sidebar'>
     <NavLink
        to="/ProfilePanel/EditEmail"
          className={({ isActive }) => isActive ? 'active-link' : 'link'}
        > E-Mail
      </NavLink>
      <NavLink
        to="/ProfilePanel/EditPassword"
          className={({ isActive }) => isActive ? 'active-link' : 'link'}
        > Password
      </NavLink>
    </div>
  );
};

export default ProfileSidebar;