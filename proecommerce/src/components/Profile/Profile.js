import React, { useState , useEffect} from 'react';
import Navbar from '../../Bars/Navbar';
import AdminNavbar from '../../Bars/adminNavbar';
import ProfileSidebar from '../../Bars/Setting/ProfileSidebar';
import { useParams , useNavigate} from 'react-router-dom';
import { useGlobalState } from '../../context/AppProvider';
import { Card , Button, Form  } from 'react-bootstrap';
import './Profile.css';
const Profile = () => {
  const { state, dispatch } = useGlobalState();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      // State'leri local storage'dan alınan verilerle başlat
      setUsername(userData.username || '');
      setEmail(userData.email || '');
      setImage(userData.image || '');
    }
  }, []);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const saveProfile = async (e) => {
    e.preventDefault(); // Formun varsayılan gönderimini engelleyin
    
    const updatedUserInfo = { username, email, image };
    
    try {
      const response = await fetch('http://10.28.60.28:9091/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // Gerekli olan diğer header'lar (örneğin, Authorization)
        },
        body: JSON.stringify(updatedUserInfo),
      });

      if (!response.ok) {
        throw new Error('Profile update failed');
      }

      const updatedUser = await response.json();

      // Global state ve localStorage güncelleme
      dispatch({
        type: 'UPDATE_USER_PROFILE',
        payload: updatedUser,
      });
      
      localStorage.setItem('user', JSON.stringify(updatedUser));

      alert('Profile updated successfully');
      navigate('/Profile');
    } catch (error) {
      console.error(error);
      alert('An error occurred while updating the profile');
    }
  };

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
                    <img src={image} alt="Profile" className="profile-image" />
                    <div className="profile-image-controls">
                      <div className="profile-buttons">
                        <Button variant="outline-primary" className="change-picture-btn">Change picture</Button>
                        <Button variant="outline-danger" className="delete-picture-btn">Delete picture</Button>
                      </div>
                    </div>
                  </div>
                  <Form onSubmit={saveProfile} className="user-info-form">
                    <Form.Group controlId="formBasicUsername">
                      <Form.Label>User Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="User name"
                        value={username}
                        onChange={handleUsernameChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={handleEmailChange}
                      />
                    </Form.Group>
                    <Button type="submit" className="save-profile-btn">Save</Button>
                  </Form>
                </Card.Body>
              </Card>
            </main>
          </div>
      )
}

export default Profile
