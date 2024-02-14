import React, { useState } from 'react';
import Navbar from '../Bars/Navbar';
import AdminNavbar from '../Bars/adminNavbar';
import { useNavigate} from 'react-router-dom';
import './AdminFunc.css'
import AdminSidebar from '../Bars/AdminSidebar';
import { useMutation, useQueryClient} from 'react-query';
import axios from 'axios';

const AddBrand = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [brandInfo, setBrandInfo] = useState({
        brandName:""
    });

    const addBrandDatabase= async (brand) => {
        const response = await axios({
          method: 'post',
          url: 'http://10.28.60.29:9091/brand/addBrand',
          data: brand,
          headers: {'Content-Type': 'application/json'}
        });
        return response.data;
    };

    const {mutate: addBrand, isLoadingBrand,isErrorBrand, error} = useMutation(addBrandDatabase, {
        onSuccess: ()=>{
          queryClient.invalidateQueries('brand');
          navigate('/AdminPanel/add')
          alert('Brand added successfully!');
        },
        onError: (error)=> {
          alert(`An error occurred: ${error.message}`);
        }
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBrandInfo({ ...brandInfo, [name]: value });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        addBrand(brandInfo);
    
    };

  return (
    <div className='admin-func'>
       <AdminNavbar/>
        <Navbar/>
        <aside className="sidebar">
          <AdminSidebar/>
        </aside>
        <main>
              <h1>Add Brand</h1>
              <div>
                <label>Add Brand Name:</label>
                <input
                  text="text"
                  name="brandName"
                  value={brandInfo.brandName}
                  onChange={handleInputChange}
                />
              </div>
              <button className="add-func-button" onClick={handleSubmit} type="submit">Add Category</button>
        </main>
      </div>
  )
}

export default AddBrand
