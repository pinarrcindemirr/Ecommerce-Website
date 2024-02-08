import React , {useState} from 'react';
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './sideBar.css'

const NavbarMain = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };
  const handleDropdownItemClick = (event) => {
  event.stopPropagation();
  setIsProfileOpen(false); // Dropdown menüyü kapat
  // İsteğe bağlı olarak başka işlemler yapabilirsiniz.
};


  return (
    <div className='navbar-main'>
      <div className="search-bar">
        <input type="text" placeholder="Search" />
        <button type="submit"><FaSearch /></button>
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
