import React from 'react'
import { useParams , useNavigate} from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import SideBar from '../Bars/SideBar';
import Navbar from '../Bars/Navbar';
import NavbarMain from '../Bars/NavbarMain';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useLocation } from 'react-router-dom';


const SearchCategory = () => {
    const location = useLocation(); // useLocation hook'unu çağırın
    const productList = location.state?.productList || []; 

    return (
        <div>
          <NavbarMain/>
          <Navbar/>
          <aside className="sidebar">
            <SideBar/>
          </aside>
          <main className="main-content">
                <div className='main'>
                    <h1>Products</h1>
                    <div className="container">
                        {productList.map((product) => (
                            <Card className='list-category' key={product.productId}>
                                <Card.Img variant='top' src={product.imageUrl} alt={product.productName} />
                                <Card.Body>
                                    <Card.Title>{product.productName}</Card.Title>
                                    <Card.Text>
                                        <div>{product.brand.brandName}</div>
                                        <div>{product.category.categoryName}</div>
                                        <div>Price: ${product.price}</div>
                                    </Card.Text>
                                    <Button variant='primary' className="card-button"> Buy </Button>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                </div>
            </main>
        </div>
      );
}

export default SearchCategory