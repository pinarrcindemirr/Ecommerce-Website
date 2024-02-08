import React , { useState , useEffect}from 'react'
import { useParams , useNavigate} from 'react-router-dom';
//import Card from 'react-bootstrap/Card';
import data from '../data';
import SideBar from '../Bars/SideBar';
import Navbar from '../Bars/Navbar';
import NavbarMain from '../Bars/NavbarMain';

const FoodCategory = () => {

  const navigate = useNavigate();
  //const [selectedCategory, setSelectedCategory] = useState(null);
  const products = data.Food.products;
  const { categoryName } = useParams();

  const handleSelectCategory = (category) => {
    navigate(`/Categories/${category}`);
  };

  return (
    <div>
      <NavbarMain/>
       <Navbar selectedCategory={categoryName} />
      <aside className="sidebar">
        <SideBar onSelectCategory={handleSelectCategory} />
      </aside>
      <main className="main-content">
          <div className='main'>
             <h1>Food</h1>
             {products.map(product => (
              <li key={product.id}>
                {product.name} - ${product.price}
              </li>
            ))}
          </div>
       </main>
    </div>
  );
}

export default FoodCategory
