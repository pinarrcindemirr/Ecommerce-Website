import React, { useState } from 'react';
import Navbar from '../Bars/Navbar';
import NavbarMain from '../Bars/NavbarMain';
import { useParams , useNavigate} from 'react-router-dom';
import './AdminFunc.css'
import AdminSidebar from '../Bars/AdminSidebar';
import { useMutation, useQueryClient, useQuery, QueryClient } from 'react-query';
import axios from 'axios';

const AddCategory = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [categoryInfo, setCategoryInfo] = useState({
        categoryName:"",
        categoryImage:""
    });

    const addCategoryDatabase= async (category) => {
        const response = await axios({
          method: 'post',
          url: 'http://10.28.60.26:9091/category/addCategory',
          data: category,
          headers: {'Content-Type': 'application/json'}
        });
        return response.data;
    };

    const {mutate: addCategory, isLoadingCategory,isErrorCategory, error} = useMutation(addCategoryDatabase, {
        onSuccess: ()=>{
          queryClient.invalidateQueries('category');
          navigate('/AdminPanel/add')
          alert('Category added successfully!');
        },
        onError: (error)=> {
          alert(`An error occurred: ${error.message}`);
        }
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCategoryInfo({ ...categoryInfo, [name]: value });
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          setCategoryInfo({ ...categoryInfo, categoryImage: reader.result });
        };
        reader.readAsDataURL(file);
      };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        addCategory(categoryInfo);
    
        console.log('Submitted:', categoryInfo);
    };


  return (
    <div className='admin-func'>
       <NavbarMain/>
        <Navbar/>
        <aside className="sidebar">
          <AdminSidebar/>
        </aside>
        <main>
              <h1>Add Category</h1>
              <div>
                <label>Add Category Name:</label>
                <input
                  text="text"
                  name="categoryName"
                  value={categoryInfo.categoryName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                  <label>Category Imagine:</label>
                  <input 
                    type="file" 
                    name="categoryImage" 
                    onChange={handleFileChange} 
                  />
              </div>
              <button className="add-func-button" onClick={handleSubmit} type="submit">Add Category</button>
        </main>
      </div>
  )
}

export default AddCategory
