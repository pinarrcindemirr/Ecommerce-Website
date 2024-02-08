import React , { useState , useEffect}from 'react'
import { useParams , useNavigate} from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import data from '../data';
import SideBar from '../Bars/SideBar';
import Navbar from '../Bars/Navbar';
import NavbarMain from '../Bars/NavbarMain';
import { useQuery } from 'react-query';
import axios from 'axios';


const ElectroCat = () => {
  const navigate = useNavigate();
  const products = data.Electronics.products;
  const { categoryName } = useParams();

  const handleSelectCategory = (category) => {
    navigate(`/Categories/${category}`);
  };

  return (
      <div>
        <NavbarMain/>
        <Navbar selectedCategory={categoryName}/>
        <aside className="sidebar">
          <SideBar onSelectCategory={handleSelectCategory}/>
        </aside>
        <main className="main-content">
            <div className='main'>
               <h1>Electronics</h1>
               <div className="container">
                  {products.map(product => (
                    <Card key={product.id} style={{ width: '18rem', margin: '10px' }}>
                      <Card.Img variant="top" src={product.image} alt={product.name} />
                      <Card.Body>
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Text>
                          Price: ${product.price}
                        </Card.Text>
                        <Button variant="primary">Buy Now</Button>
                      </Card.Body>
                    </Card>
                  ))}
               </div>
            </div>
         </main>
      </div>
    );
}

export default ElectroCat