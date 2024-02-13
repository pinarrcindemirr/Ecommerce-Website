import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SideBar from '../Bars/SideBar';
import Navbar from '../Bars/Navbar';
import NavbarMain from '../Bars/NavbarMain';
import axios from 'axios'
import { useQuery } from 'react-query';
import { Card } from 'react-bootstrap';

const Basket = () => {

  return (
    <div>
      <NavbarMain/>
       <Navbar/>
      <aside className="sidebar">
        <SideBar/>
      </aside>
      <main className="main-content">
        <div className='main'>
             SEPET
        </div>
      </main>
    </div>
  );
};

export default Basket;
