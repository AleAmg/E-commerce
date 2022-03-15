import React, { useEffect } from 'react';
import './App.css';
import Cart from './components/CartView/Cart';
import NavView from './components/NavView/NavView';
import RegisterView from './components/RegisterView/RegisterView';
import LogInView from './components/LogInView/LogInView';
import { Navigate, Route, Routes } from 'react-router-dom';
import CartProduct from './commons/Product/CartProduct';
import GridProducts from './commons/GridProducts/GridProducts';
import { useDispatch } from 'react-redux';
import {getUser} from "./redux/user"
import {getCart} from "./redux/cart"
import Checkout from './components/CheckoutView/Checkout';


function App() {
  
  const dispatch = useDispatch()
  
  useEffect(()=>{
    dispatch(getUser())
    .then((data)=>{
      if(data.payload){
        console.log(data.payload)
        dispatch(getCart())
      }
    })
    .catch((ERR)=> console.error(ERR))
  }, [])

  return (
    <div className='App'>
      <NavView />
      <Routes>
        <Route path='/cart' element={<Cart />} />
        <Route path='/register' element={<RegisterView />} />
        <Route path='/signIn' element={<LogInView />} />
        <Route path='/home' element={<GridProducts/>} />
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='/product/:id' element={<CartProduct />} />
        <Route path='/checkout' element={<Checkout />} />

      </Routes>
    </div>
  );
}

export default App;
