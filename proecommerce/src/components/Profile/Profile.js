import React, { useState } from 'react';
import Navbar from '../../Bars/Navbar';
import AdminNavbar from '../../Bars/adminNavbar';
import { useParams , useNavigate} from 'react-router-dom';

const Profile = () => {
  return (
        <div>
           <AdminNavbar/>
            <Navbar/>
            <main>
              
            </main>
          </div>
      )
}

export default Profile
