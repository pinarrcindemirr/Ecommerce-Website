import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import ProfileSidebar from './ProfileSidebar'
import './profileSide.css'
const ProfilePanel = () => {
    
  return (
        <div className='admin-panel-layout'>
          <ProfileSidebar />
          <div className='admin-panel-content'>
            <Outlet />
          </div>
        </div>
      );
};

export default ProfilePanel;