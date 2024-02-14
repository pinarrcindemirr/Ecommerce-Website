import React , {useState} from 'react';
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './sideBar.css'
import { useNavigate } from 'react-router-dom';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import axios from 'axios';
import { useQuery } from 'react-query';

const NavbarMain = () => {
  const [search, setSearch] = useState('');
  const [searchResult,setSearchResult] =useState([]);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };
  const handleDropdownItemClick = (event) => {
  event.stopPropagation();
  setIsProfileOpen(false);
  };
  const goBack = () => {
    navigate(-1);
  };
  const performSearch = async (searchQuery) => {
    try {
      const response = await axios.get(`http://10.28.60.29:9091/product/search?name=${searchQuery}`);
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      return { data: [], success: false };
    }
  };
  
  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await performSearch(search);
      if (result.success && result.data.length > 0) {
        navigate(`/Categories/SearchCategory`, { state: { productList: result.data } });
      } else {
        alert('No products found for your search.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while searching for products.');
    }
  };

  return (
    <div className='navbar-main'>
      <button onClick={goBack} style={{ color: 'white', background: 'none', border: 'none', cursor: 'pointer' }}>
        <IoArrowBackCircleOutline size="2em" />
      </button>
      <div className='search-bar-container'>
        <form className="search-bar" onSubmit={handleSearchSubmit}>
          <input 
            type="text" 
            placeholder="Search" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            />
          <button type="submit"><FaSearch /></button>
        </form>
      </div>
      <div className="navbar-icons">
        <Link to="/Basket" className="icon">
          <FaShoppingCart style={{ color: 'white' }} />
        </Link>
        <div className="profile-icon" onClick={toggleProfileDropdown}>
            <FaUser className="icon" />
            {isProfileOpen && (
              <div className="profile-dropdown">
                <Link to="/AdminPanel" className="dropdown-item" onClick={handleDropdownItemClick}>Admin Control</Link>
                <div className="dropdown-divider"></div>
                <Link to="/Profile" className="dropdown-item" onClick={handleDropdownItemClick}>Profile</Link>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default NavbarMain;
