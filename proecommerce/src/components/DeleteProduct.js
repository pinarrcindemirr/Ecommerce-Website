import React, { useState } from 'react';
import Navbar from '../Bars/Navbar';
import NavbarMain from '../Bars/NavbarMain';
import { useParams , useNavigate} from 'react-router-dom';
import './AdminFunc.css'
import './Table.css'
import AdminSidebar from '../Bars/AdminSidebar';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import axios from 'axios';


const DeleteProducts = () => {
  const queryClient = useQueryClient();
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [selectedProducts, setSelectedProducts] = useState([]);

  const listProducts = async () => {
    const response = await axios.get('http://10.28.60.26:9091/product/listAllProducts'); 
    return response.data.data;
  };

  const { data, isLoading, isError, error } = useQuery('products', listProducts);

  const deleteProducts = async (productIds) => {
    const response = await axios.delete(`http://10.28.60.26:9091/product/deleteProduct/${productIds}`);
 
  };
  
  const { mutate: deleteSelectedProducts, isLoading: isDeleting, isError: isDeleteError, error: deleteError } = useMutation(deleteProducts, {
    onSuccess: () => {
      alert('The selected products were successfully deleted.');
      setSelectedProducts([]);
      queryClient.invalidateQueries('products');
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const handleSelectProduct = (productId) => {
    console.log(productId)
    setSelectedProducts(prevSelectedProducts =>
      prevSelectedProducts.includes(productId)
        ? prevSelectedProducts.filter(id => id !== productId)
        : [...prevSelectedProducts, productId]
    );
  };

  const handleDeleteProducts = () => {
    if (selectedProducts.length === 0) {
      alert('Please select at least one product to delete.');
      return;
    }
    if (window.confirm('Are you sure you want to delete the selected products?')) {
      deleteSelectedProducts(selectedProducts);
    }
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
        <main>
          <h1> Product</h1>
          <h2>Product List</h2>
          <table>
            <thead>
              <tr>
                <th>Select</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {data.map(product => (
                <tr key={product.productId}>
                  <td>
                    <input
                      type='checkbox'
                      checked={selectedProducts.includes(product.productId)}
                      onChange={() => handleSelectProduct(product.productId)}
                    />
                  </td>
                  <td>{product.productName}</td>
                  <td>{product.category.categoryName}</td>
                  <td>{product.brand.brandName}</td>
                  <td>{product.price}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
          {isDeleting && <div>Deleting...</div>}
          {isDeleteError && <div>Hata: {deleteError.message}</div>}
          <button onClick={handleDeleteProducts} disabled={isDeleting || selectedProducts.length === 0}>Seçili Ürünleri Sil</button>
        </main>
      </div>
  )
}

export default DeleteProducts
