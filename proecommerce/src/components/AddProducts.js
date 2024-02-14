import React, { useState } from 'react';
import Navbar from '../Bars/Navbar';
import AdminNavbar from '../Bars/adminNavbar';
import { useParams , useNavigate} from 'react-router-dom';
import './AdminFunc.css'
import AdminSidebar from '../Bars/AdminSidebar';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import axios from 'axios';

const AddProducts = () => {
  const queryClient = useQueryClient();
  const { categoryName } = useParams();
  const navigate = useNavigate();

  const [productInfo, setProductInfo] = useState({
    productName:"",
    imageUrl:"",
    price:0,
    category:{
        categoryId:0
          },
    brand:{
      brandId:0}
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


  const addProductDatabase= async (product) => {
    const response = await axios({
      method: 'post',
      url: 'http://10.28.60.29:9091/product/addProduct',
      data: product,
      headers: {'Content-Type': 'application/json'}
    });
    return response.data;
  };

  const {mutate: addProduct, isLoadingProduct,isErrorProduct, error} = useMutation(addProductDatabase, {
    onSuccess: ()=>{
      queryClient.invalidateQueries('products');
      alert('Product added successfully!');
    },
    onError: (error)=> {
      alert(`An error occurred: ${error.message}`);
    }
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "categoryId") {
      if (value === "addCategory") {
        // Kullanıcı "Add Category" seçeneğini seçtiğinde, Add Category sayfasına yönlendir
        navigate('/AdminPanel/addCategory');
      } else {
        // Normal işlem devam ediyor
        setProductInfo({ ...productInfo, category: { ...productInfo.category, categoryId: parseInt(value) } });
      }
    } else if (name === "brandId") {
        if(value === "addBrand"){
          navigate('/AdminPanel/addBrand');
        }else{
          setProductInfo({ ...productInfo, brand: { ...productInfo.brand, brandId: parseInt(value) } });
        }
    } else {
      setProductInfo({ ...productInfo, [name]: value });
    }
  };
  

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProductInfo({ ...productInfo, imageUrl: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate('/AdminPanel/listProduct')
    addProduct(productInfo);
};

  return (
    <div className='admin-func'>
       <AdminNavbar/>
        <Navbar selectedCategory={categoryName}/>
        <aside className="sidebar">
          <AdminSidebar/>
        </aside>
        <main>
              <h1>Add Product</h1>
              <div>
                <label>Select Category:</label>
                <select
                  name='categoryId'
                  value={productInfo.category.categoryId}
                  onChange={handleInputChange}
                > 
                <option value="">Selecet Category</option>
                <option className='add-func-option' value="addCategory"> + Add Category</option>
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
                  <option value="">Selecet Brand </option>
                  <option className='add-func-option' value="addBrand">+ Add Brand</option>
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
              <button className="add-func-button" onClick={handleSubmit} type="submit">Add Product</button>
              {isErrorProduct && <p>Error: {error.message}</p>}
        </main>
      </div>
  )
}

export default AddProducts
