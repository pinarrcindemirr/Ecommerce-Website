import React from 'react';
import './sideBar.css'
import { Link } from 'react-router-dom';
const Navbar = ({ selectedCategory }) => (
  <div className='navbar1'>
    <div className="navbar1-content" style={{ display: 'flex', alignItems: 'center' }}>
      <Link to={`/HomePage`} className='linkTo'>
        <span>Home</span>
        {selectedCategory && <span style={{ marginLeft: '20px' }}>{selectedCategory}</span>}
      </Link>
      
    </div>
  </div>
);

export default Navbar;
