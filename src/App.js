import { Fragment, useState } from 'react';
import './App.css';
import Header from './components/layout/Header';
import Meals from './components/meals/Meals';
import Cart from './components/card/Cart';
import CartProvider from './components/store/CartProvider';

function App() {

  const [cartIsShown, setCartIsShown] = useState(false);
  const onShowCartHandler = () => {
         setCartIsShown(true);
  };
  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
  <CartProvider >
    <Header onShowCart={onShowCartHandler}/>
    <Meals />
    {cartIsShown && <Cart onClose={hideCartHandler}/>}
  </CartProvider>  
   
  );
}

export default App;
