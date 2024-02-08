import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useQuery } from 'react-query';
import './sideBar.css'


const SideBar = ({ onSelectCategory }) => {
  const [category, setCategory] = useState([]);

  const {isLoading, isError,data,error}=useQuery('category', ()=>
    axios.get('http://10.28.60.28:9091/category/listAllCategories')
    .then(response => response.data.data)
  )

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Hata durumunu kontrol et
  if (isError) {
    console.error('Kategorileri alırken bir hata oluştu:', error);
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>CATEGORIES</h2>
      <ul>
      {data.map((categoryItem) => (
        <li 
          style={{color: "white"}} 
          key={categoryItem.categoryId } 
          onClick={() => onSelectCategory(categoryItem.categoryName)}>
            {categoryItem.categoryName}
        </li>
      ))}
      </ul>
    </div>
  );
}

export default SideBar;