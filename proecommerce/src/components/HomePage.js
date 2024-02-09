import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SideBar from '../Bars/SideBar';
import Navbar from '../Bars/Navbar';
import NavbarMain from '../Bars/NavbarMain';
import axios from 'axios'
import { useQuery } from 'react-query';

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const {isLoading, isError,data,error}=useQuery('category', ()=>
  axios.get('http://10.28.60.22:9091/category/listAllCategories')
  .then(response => response.data.data)
  )

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.error('Error', error);
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <NavbarMain/>
       <Navbar selectedCategory={selectedCategory} />
      <aside className="sidebar">
        <SideBar onSelectCategory={setSelectedCategory} />
      </aside>
      <main className="main-content">
          <div className='main'>
              <div className='container'>
                {Array.isArray(data) ? (
                    data.map((category,index) => (
                      <div className='list-category' key={index}>
                          <Link to={`/Categories/${category.categoryName}`}  className='linktTo' >
                            <h2>{category.categoryName}</h2>
                          </Link>
                       <Link to={`/Categories/${category.categoryName}`}>
                          <img  key={index} src={category.categoryImage} alt={category.categoryName}  />
                         </Link>
                      </div>
                    ))

                ) : (
                  <div>Dta is not Array</div>
                )}
                
              </div>
            </div>
      </main>
    </div>
  );
};


export default HomePage;
