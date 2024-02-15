import React, { useState } from 'react';
import Navbar from '../../Bars/Navbar';
import AdminNavbar from '../../Bars/adminNavbar';
import ProfileSidebar from '../../Bars/Setting/ProfileSidebar';

const EditPassword = () => {
  return (
    <div>
      <AdminNavbar/>
      <Navbar/>
      <aside>
        <ProfileSidebar/>
      </aside>
      <main>
        Password
      </main>
    </div>
  )
}

export default EditPassword