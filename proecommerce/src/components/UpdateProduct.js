import React, { useState } from 'react';
import Navbar from '../Bars/Navbar';
import NavbarMain from '../Bars/NavbarMain';
import { useParams , useNavigate} from 'react-router-dom';
import './AdminFunc.css'
import AdminSidebar from '../Bars/AdminSidebar';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import axios from 'axios';

const UpdateProducts = () => {
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
    const response = await axios.get('http://10.28.60.28:9091/category/listAllCategories'); 
    return response.data.data;
  };

  const { data: categories, isLoading, isError } = useQuery('category', fetchCategories);

  const fetchBrands = async () => {
    const response = await axios.get('http://10.28.60.28:9091/brand/listAllBrands');
    return response.data.data;
  };

  const { data: brands, isLoading: isLoadingBrands, isError: isErrorBrands } = useQuery('brands', fetchBrands);


  const addProductDatabase= async (product) => {
    const response = await axios({
      method: 'post',
      url: 'http://10.28.60.28:9091/product/addProduct',
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

  /*
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "categoryId") {
        setProductInfo({ ...productInfo, category: { ...productInfo.category, categoryId: value } });
    } else if (name === "brandId") {
        setProductInfo({ ...productInfo, brand: { ...productInfo.brand, brandId: value } });
    } else {
        setProductInfo({ ...productInfo, [name]: value });
    }
};
*/

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductInfo({ ...productInfo, [name]: value });
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

      const productData = {
        categoryId: +productInfo.category.categoryId,
        productName: productInfo.productName,
        brandId: +productInfo.brand.brandId,
        imageUrl: productInfo.imageUrl,
        price: +productInfo.price,
      };
      addProduct(productData);
      console.log(productData);
  };

  return (
    <div className='admin-func'>
       <NavbarMain/>
        <Navbar selectedCategory={categoryName}/>
        <aside className="sidebar">
          <AdminSidebar/>
        </aside>
        <main>
              <h1>Update Product</h1>
              <div>
                <label>Select Category:</label>
                <select
                  name='categoryId'
                  value={productInfo.categoryId}
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
                  value={productInfo.brandId}
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
              {isErrorProduct && <p>Error: {error.message}</p>}
        </main>
      </div>
  )
}

export default UpdateProducts
/*
<select
    name='categoryId' // This should be 'categoryId' to match the state structure
    value={productInfo.category.categoryId}
    onChange={handleInputChange}
>
   
</select>



<select
    name="brandId" // This should be 'brandId' to match the state structure
    value={productInfo.brand.brandId}
    onChange={handleInputChange}
>
    </select>




    const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
        productName: productInfo.productName,
        imageUrl: productInfo.imageUrl,
        price: +productInfo.price,
        category: {
            categoryId: +productInfo.category.categoryId,
        },
        brand: {
            brandId: +productInfo.brand.brandId,
        },
    };
    addProduct(productData);
    console.log(productData);
  };

 */              