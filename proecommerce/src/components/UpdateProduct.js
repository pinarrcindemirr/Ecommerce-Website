import React, { useState, useEffect } from 'react';
import Navbar from '../Bars/Navbar';
import AdminNavbar from '../Bars/adminNavbar';
import { useParams , useNavigate} from 'react-router-dom';
import './AdminFunc.css'
import AdminSidebar from '../Bars/AdminSidebar';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import axios from 'axios';

const UpdateProducts = () => {
  const queryClient = useQueryClient();
  const { productId } = useParams();
  const navigate = useNavigate();

  const [productInfo, setProductInfo] = useState({
    productName:"",
    imageUrl:"",
    price:0,
    category:{
        categoryId:0,
        categoryName:""
          },
    brand:{
      brandId:0,
      brandName:""
    }
  });

  const fetchCategories = async () => {
    const response = await axios.get('http://10.28.60.29:9091/category/listAllCategories'); 
    return response.data.data;
  };

  const { data: categories, isLoading, isError } = useQuery('category', fetchCategories);

  const fetchBrands = async () => {
    const response = await axios.get('http://10.28.60.29:9091/brand/listAllBrands');
    return response.data.data;
  };

  const { data: brands, isLoading: isLoadingBrands, isError: isErrorBrands } = useQuery('brands', fetchBrands);

  const fetchProduct = async () =>{
    try {
      const response = await axios.get(`http://10.28.60.29:9091/product/findProductById/${productId}`);
      setProductInfo(response.data.data);
    }catch(error){
      console.error('Failed to fetch product details:', error);
    }
  };

  useEffect(()=>{

    if(productId){
      fetchProduct();
    }

  },[productId]);

  const updateProduct= useMutation(newProductInfo => {
    return axios.put(`http://10.28.60.29:9091/product/updateProduct`,newProductInfo)
  },{
    onSuccess: () =>{
      queryClient.invalidateQueries(['product', productId])
    },
    onError: (error) => {
      console.error('Failed to update product:', error);
    }
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value)
    if (name === "categoryId") {
        setProductInfo({ ...productInfo, category: { ...productInfo.category, categoryId: parseInt(value) } });
    } else if (name === "brandId") {
        setProductInfo({ ...productInfo, brand: { ...productInfo.brand, brandId: parseInt(value) } });
    } else {
        setProductInfo({ ...productInfo, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProductInfo(prevState => ({ ...prevState, imageUrl: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct.mutateAsync(productInfo);
      navigate('/AdminPanel/listProduct'); 
    } catch (error) {
      console.error('Failed to update product:', error);
    }
  };

  return (
    <div className='admin-func'>
       <AdminNavbar/>
        <Navbar/>
        <aside className="sidebar">
          <AdminSidebar/>
        </aside>
        <main>
              <h1>Update Product</h1>
              <div>
                <label>Select Category:</label>
                <select
                  name='categoryId'
                  value={productInfo.category.categoryId}
                  onChange={handleInputChange}
                > 
                  {isLoading ? (
                  <option>Loading...</option>
                  ) : isError ? (
                    <option>Error fetching categories</option>
                  ) : Array.isArray(categories) ? (
                    categories.map(category => (
                      <option className='add-func-option' key={category.categoryId} value={category.categoryId}>{category.categoryName}</option>
                    ))
                  ) : (
                    <option>No categories found</option>
                  )}
                  
                </select>
              </div>
              <div>
                <label>Product Name:</label>
                  <input 
                    type="text" 
                    name="productName" 
                    value={productInfo.productName} 
                    onChange={handleInputChange} 
                  />
              </div>
              <div>
                <label>Brand Name:</label>
                <select
                  name="brandId"
                  value={productInfo.brand.brandId}
                  onChange={handleInputChange}
                >
                  {isLoadingBrands ? (
                    <option>Loading...</option>
                  ) : isErrorBrands ? (
                    <option>Error fetching brands</option>
                  ) :  Array.isArray(brands) ? ( 
                  brands.map(brand => (
                    <option className='add-func-option' key={brand.brandId} value={brand.brandId}>{brand.brandName}</option>
                  ))
                ) : (
                    <option>No brands found</option>
                  )}
                </select>
              </div>
              <div>
                  <label>Product Imagine:</label>
                  <input 
                    type="file" 
                    name="imageUrl" 
                    onChange={handleFileChange} 
                  />
              </div>
              <div>
                  <label>Price:</label>
                  <input 
                  type="text" 
                  name="price" 
                  value={productInfo.price} 
                  onChange={handleInputChange} 
                  />
              </div>
              <button className="add-func-button" onClick={handleSubmit} type="submit">Update Product</button>
              
        </main>
      </div>
  )
}

export default UpdateProducts