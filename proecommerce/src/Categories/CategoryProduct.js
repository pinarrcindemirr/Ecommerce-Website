import React , { useState , useEffect}from 'react'
import { useParams , useNavigate} from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import SideBar from '../Bars/SideBar';
import Navbar from '../Bars/Navbar';
import NavbarMain from '../Bars/NavbarMain';
import { useQuery } from 'react-query';
import axios from 'axios';


const CategoryProduct = () => {
    const navigate = useNavigate();
    //const products = data.Electronics.products;
    const { categoryId } = useParams();
  
    const { isLoading, isError, data: products, error } = useQuery(['products', categoryId], () =>
      axios.get(`http://10.28.60.22:9091/product/filterByCategory/${+categoryId}`)
        .then(response => response.data.data),
      {
        enabled: !!categoryId,
      }
    );
  
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;
  
    const handleSelectCategory = (category) => {
      navigate(`/Categories/${category}`);
    };
    //  selectedCategory={categoryName}
    return (
        <div>
          <NavbarMain/>
          <Navbar/>
          <aside className="sidebar">
            <SideBar onSelectCategory={handleSelectCategory}/>
          </aside>
          <main className="main-content">
              <div className='main'>
                 <h1>Products</h1>
                 <div className='container'>
                    {products.map((product) => (
                        <Card className='list-category' key={product.productId} >
                            <Card.Img variant='top' src={product.imageUrl} alt={product.name} />
                            <Card.Body>
                                <Card.Title>{product.productName}</Card.Title>
                                <Card.Text>
                                    Price: ${product.price}
                                </Card.Text>
                                <Button variant='primary'> Buy </Button>
                            </Card.Body>
                        </Card>
                    ))}


                 </div>
                 <ul>
                     
                  </ul>
  
              </div>
           </main>
        </div>
      );
}

export default CategoryProduct