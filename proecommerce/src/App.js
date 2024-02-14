import React from 'react'
import { AppProvider } from './context/AppProvider';
import Login from './components/login';
import Register from './components/register';
import HomePage from './components/HomePage';
import AddProducts from './components/AddProducts';
import DeleteProduct from './components/DeleteProduct';
import UpdateProduct from './components/UpdateProduct';
import ProductList from './components/ProductList';
import CategoryProduct from './Categories/CategoryProduct';
import AdminPanel from './components/AdminPanel';
import AddBrand from './components/AddBrand';
import AddCategory from './components/AddCategory';
import SearchCategory from './Categories/SearchCategory';
import Profile from './components/Profile/Profile';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate 
} from "react-router-dom";
import Basket from './components/Basket';

const reducer = (state, action) => {
  if (action.type === 'user') {
    return { ...state, user: action.value};
  } 
  return state;
}

const initialState = {
  user: {
    username: '',
    id: 0,
    email: ''
  }
}

const App=()=> {

  return (
    <AppProvider reducer={reducer} initialState={initialState}>
      <Router>
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/Register' element={<Register/>}/>
            <Route path='/HomePage' element={<HomePage/>}/>
            <Route path="/categories/:categoryId" element={<CategoryProduct />} />
            <Route path='/Categories/SearchCategory' element={<SearchCategory/>}/>
            <Route path='/Basket' element={<Basket/>}/>
            <Route path='/Profile' element={<Profile/>}/>
            <Route path='/AdminPanel' element={<AdminPanel/>}>
              
              <Route index element={<Navigate replace to="listProduct"/>} />
              <Route path='listProduct' element={<ProductList/>}/>
              <Route path='add' element={<AddProducts />} />
              <Route path='delete' element={<DeleteProduct />} />
              <Route path='update/:productId' element={<UpdateProduct />} />
              <Route path='addCategory' element={< AddCategory />} />
              <Route path='addBrand' element={<AddBrand/>} />
            </Route>
            <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </Router>
    </AppProvider>
      
  );
}

  export default App;
/*


//import ElectroCat from './Categories/ElectroCat';
//import BabyCategory from './Categories/BabyCategory';
//import ClothesCategory from './Categories/ClothesCategory';
//import FashionCategory from './Categories/FashionCategory';
//import FoodCategory from './Categories/FoodCategory';
//import GameCategory from './Categories/GameCategory';
//import HealthBeautyCategory from './Categories/HealthBeautyCategory';


 <Route path='/Categories/Electronics' element={<ElectroCat/>}/>
 <Route path='/Categories/BabyToys' element={<BabyCategory/>}/>
 <Route path='/Categories/Fashion' element={<FashionCategory/>}/>
 <Route path='/Categories/Food' element={<FoodCategory/>}/>
 <Route path='/Categories/Cloths' element={<ClothesCategory/>}/>
 <Route path='/Categories/GameAssesories' element={<GameCategory/>}/>
 <Route path='/Categories/HealthBeauty' element={<HealthBeautyCategory/>}/>
*/