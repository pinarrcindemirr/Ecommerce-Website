import React, { useState } from 'react';
import Navbar from '../../Bars/Navbar';
import AdminNavbar from '../../Bars/adminNavbar';
import ProfileSidebar from '../../Bars/Setting/ProfileSidebar';
import { useParams , useNavigate} from 'react-router-dom';
import { useGlobalState } from '../../context/AppProvider';
import { Card , Button, Form  } from 'react-bootstrap';
import './Profile.css';
const Profile = () => {
  const [state,dispatch] = useGlobalState();

  return (
        <div>
           <AdminNavbar/>
            <Navbar/>
            <aside>
              <ProfileSidebar/>
            </aside>
            <main className="profile-main">
              <Card className='user-profile-card'>
                <Card.Body>
                  <Card.Title className="profile-title">Profile</Card.Title>
                  <div className="profile-image-wrapper">
                    <img src={state.user.image} alt="Profile" className="profile-image" />
                    <div className="profile-image-controls">
                      <div className="profile-buttons">
                        <Button variant="outline-primary" className="change-picture-btn">Change picture</Button>
                        <Button variant="outline-danger" className="delete-picture-btn">Delete picture</Button>
                      </div>
                    </div>
                  </div>
                  <Form className="user-info-form">
                    <Form.Group controlId="formBasicFirstName">
                      <Form.Label>User Name</Form.Label>
                      <Form.Control type="text" placeholder="First name" defaultValue={state.user.username} />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" placeholder="Enter email" defaultValue={state.user.email} />
                    </Form.Group>
                  </Form>
                </Card.Body>
              </Card>
            </main>
          </div>
      )
}

export default Profile
