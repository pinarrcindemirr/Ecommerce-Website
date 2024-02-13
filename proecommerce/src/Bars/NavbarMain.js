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
      const response = await axios.get(`http://10.28.60.33:9091/product/search?name=${searchQuery}`);
      return response.data; // Doğrudan response.data döndürün
    } catch (error) {
      console.error('Error:', error);
      // Hata yakalama için gerekirse burada işlem yapabilirsiniz
      return { data: [], success: false }; // Hata durumunda boş bir liste döndürün
    }
  };
  
  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await performSearch(search);
      // result, performSearch'ten dönen veridir ve bir data özelliğine sahip olmalıdır
      if (result.success && result.data.length > 0) {
        // Başarılı yanıt ve veri varsa işlemleriniz
        navigate(`/Categories/SearchCategory`, { state: { productList: result.data } });
      } else {
        // Veri yoksa kullanıcıya bilgi ver
        alert('No products found for your search.');
      }
    } catch (error) {
      console.error('Error:', error);
      // Hata ile ilgili kullanıcıyı bilgilendir
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
