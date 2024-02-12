import React , {useState} from 'react';
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './sideBar.css'
import { useNavigate } from 'react-router-dom';
import { IoArrowBackCircleOutline } from "react-icons/io5";

const NavbarMain = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

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
      <div className='search-bar-container'>
        <div className="search-bar">
          <input type="text" placeholder="Search" />
          <button type="submit"><FaSearch /></button>
        </div>
      </div>
      <div className="navbar-icons">
        <FaShoppingCart className="icon" />
        <div className="profile-icon" onClick={toggleProfileDropdown}>
            <FaUser className="icon" />
            {isProfileOpen && (
              <div className="profile-dropdown">
                <Link to="/AdminPanel" className="dropdown-item" onClick={handleDropdownItemClick}>Admin Control</Link>
                {/*<div className="dropdown-divider"></div>
                <Link to="/LogOut" className="dropdown-item" onClick={handleDropdownItemClick}>Log Out</Link>*/}
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default NavbarMain;
