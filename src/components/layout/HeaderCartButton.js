import { useContext, useEffect, useState } from "react";
import CartIcon from "../card/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../store/cart-context";

const HeaderCartButton = (props) => {
    const [btnIsHighlited, setBtnIsHighlited] = useState(false);
  const cartCtx = useContext(CartContext);
  const numberOfCartItems = cartCtx.items.reduce((currentNumber, item) => {
    return currentNumber + item.amount;
  }, 0);
  
  const {items} = cartCtx;

  const btnClasses = `${classes.button} ${btnIsHighlited ? classes.bump :'' }`;
  //handling sideEffects to make the cart bump for every add
  useEffect(() => {
    if(cartCtx.items.length  === 0){
        return;
    }
    setBtnIsHighlited(true);
    const timer  = setTimeout(() => {
     setBtnIsHighlited(false);
    }, 300);

    //adding the cleanup function to clear the timer 

    return () => {
        clearTimeout(timer);
    };
  }, [items]);
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span> Your Cart </span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
