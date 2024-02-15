import React, { useState } from 'react';
import Navbar from '../Bars/Navbar';
import AdminNavbar from '../Bars/adminNavbar';
import { useParams , useNavigate} from 'react-router-dom';
import './AdminFunc.css'
import './Table.css'
import './listProduct.css'
import AdminSidebar from '../Bars/AdminSidebar';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import axios from 'axios';
import { FaRegEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";

const ProductList = () => {
  const queryClient = useQueryClient();
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([])

  const listProducts = async () => {
    const response = await axios.get('http://10.28.60.27:9091/product/listAllProducts'); 
    return response.data.data;
  };

  const { data, isLoading, isError, error } = useQuery('products', listProducts);

  const deleteProduct = useMutation(productId => {
    return axios.delete(`http://10.28.60.29:9091/product/deleteProduct/${productId}`);
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('products');
    }
  });

if (isLoading) return <div>Loading...</div>;
if (isError) return <div>Error: {error.message}</div>;

  const handleAddProduct = () => {
    navigate('/AdminPanel/add');
  };

  const handleEditProduct = (productId) => {
    console.log("Edit Product Id:", productId);
    navigate(`/AdminPanel/update/${productId}`)
  };
  
  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct.mutate(productId);
    }
  };

  return (
    <div>
       <AdminNavbar/>
        <Navbar/>
        <aside className="sidebar">
          <AdminSidebar/>
        </aside>
        <main>
          <div className="product-list-header">
            <h1>Product List</h1>
            <button onClick={handleAddProduct} className="add-product-button">
              <IoIosAddCircleOutline size="2em" /> {/* İkon boyutunu ayarlayabilirsiniz */}
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {data.map(product => (
                <tr key={product.productId}>
                  <td>{product.productName}</td>
                  <td>{product.category.categoryName}</td>
                  <td>{product.brand.brandName}</td>
                  <td>{product.price}</td>
                  <td>
                    <button onClick={() => handleEditProduct(product.productId)}>
                      <FaRegEdit />
                    </button>
                    <button onClick={() => handleDeleteProduct(product.productId)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
  )
}

export default ProductList
