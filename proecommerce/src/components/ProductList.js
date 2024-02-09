import React, { useState } from 'react';
import Navbar from '../Bars/Navbar';
import NavbarMain from '../Bars/NavbarMain';
import { useParams , useNavigate} from 'react-router-dom';
import './AdminFunc.css'
import './Table.css'
import AdminSidebar from '../Bars/AdminSidebar';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import axios from 'axios';


const ProductList = () => {
  const queryClient = useQueryClient();
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([])

  const listProducts = async () => {
    const response = await axios.get('http://10.28.60.22:9091/product/listAllProducts'); 
    return response.data.data;
  };

  const { data, isLoading, isError, error } = useQuery('products', listProducts);

  
  const handleSelectProduct = (productId) => {
    console.log(productId)
    setSelectedProducts(prevSelectedProducts =>
      prevSelectedProducts.includes(productId)
        ? prevSelectedProducts.filter(id => id !== productId)
        : [...prevSelectedProducts, productId]
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div >
       <NavbarMain/>
        <Navbar/>
        <aside className="sidebar">
          <AdminSidebar/>
        </aside>
      </div>
  )
}

export default ProductList
