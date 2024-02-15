import React from 'react'
import { useParams , useNavigate} from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import SideBar from '../Bars/SideBar';
import Navbar from '../Bars/Navbar';
import NavbarMain from '../Bars/NavbarMain';
import { useQuery } from 'react-query';
import axios from 'axios';


const CategoryProduct = () => {
    const navigate = useNavigate();
    const { categoryId } = useParams();
  
    const { isLoading, isError, data: products, error } = useQuery(['products', categoryId], () =>
      axios.get(`http://10.28.60.27:9091/product/filterByCategory/${+categoryId}`)
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
              <div className='container'>
                {products.length > 0 ? (
                  products.map((product) => (
                    <Card className='list-category' key={product.productId}>
                      <Card.Img variant='top' src={product.imageUrl} alt={product.productName} />
                      <Card.Body>
                        <Card.Title>{product.productName}</Card.Title>
                        <Card.Text>
                          <div>{product.brand.brandName}</div>
                          <div>Price: ${product.price}</div>
                        </Card.Text>
                        <Button variant='primary' className="card-button"> Buy </Button>
                      </Card.Body>
                    </Card>
                  ))
                ) : (
                      <div className="centered-container">
                        <div className="no-products-alert">
                          No products found.
                        </div>
                      </div>                
                    )}
              </div>
            </div>
          </main>
        </div>
      );
}

export default CategoryProduct