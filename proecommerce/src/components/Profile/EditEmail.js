import React, { useState } from 'react';
import Navbar from '../../Bars/Navbar';
import AdminNavbar from '../../Bars/adminNavbar';
import ProfileSidebar from '../../Bars/Setting/ProfileSidebar';

const EditEmail = () => {
  return (
    <div>
      <AdminNavbar/>
      <Navbar/>
      <aside>
        <ProfileSidebar/>
      </aside>
      <main>
        E Mail
      </main>
    </div>
  )
}

export default EditEmail
