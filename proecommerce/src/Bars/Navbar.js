import React from 'react';
import './sideBar.css'
const Navbar = ({ selectedCategory }) => (
  <div className='navbar1'>
    <div className="navbar1-content" style={{ display: 'flex', alignItems: 'center' }}>
      <span>Home</span>
      {selectedCategory && <span style={{ marginLeft: '20px' }}>{selectedCategory}</span>}
    </div>
  </div>
);

export default Navbar;
