import React , {useState} from 'react';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './sideBar.css'
import { useNavigate } from 'react-router-dom';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useGlobalState } from '../context/AppProvider';

const AdminNavbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const [state,dispatch] = useGlobalState();

  const handleLogout = () => {
    dispatch({ type: 'logout' });
    navigate('/');
  };


  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };
  const handleDropdownItemClick = (event) => {
  event.stopPropagation();
  setIsProfileOpen(false); // Dropdown menüyü kapat
  // İsteğe bağlı olarak başka işlemler yapabilirsiniz.
};
const goBack = () => {
  navigate(-1);
};

  return (
    <div className='navbar-main'>
      <button onClick={goBack} style={{ color: 'white', background: 'none', border: 'none', cursor: 'pointer' }}>
        <IoArrowBackCircleOutline size="2em" />
      </button>
      <div className="navbar-icons">
        <FaShoppingCart className="icon" />
        <div className="profile-icon" onClick={toggleProfileDropdown}>
            <FaUser className="icon" />
            {isProfileOpen && (
              <div className="profile-dropdown">
                 <div className="dropdown-item" style={{ fontWeight: 'bold', textTransform: 'uppercase' }} >{state.user.username}</div>
                <Link to="/AdminPanel" className="dropdown-item" onClick={handleDropdownItemClick}>Product Control</Link>
                <div className="dropdown-divider"></div>
                <Link to="/Profile" className="dropdown-item" onClick={handleDropdownItemClick}>Settings</Link>
                <div className="dropdown-item" onClick={handleLogout}> Logout</div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default AdminNavbar;