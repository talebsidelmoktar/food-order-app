import React, { Fragment, useContext, useState } from "react";
import calsses from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../store/cart-context";
import CartItem from "./CartItem";
import Chekout from "./Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isSubmitting, setIsSubmitting ] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const [isCheckout, setIsCheckout] = useState(false);

  const orderHanlder = () => {
    setIsCheckout(true);
  };

  const cartItemRmoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHanlder = (item) => {
    cartCtx.addItem({
      ...item,
      amount: 1,
    });
  };
   //posting the data
  const submitOrderHanadler = async (userData) => {
    setIsSubmitting(true);
    const response = await fetch('https://push-d6d89-default-rtdb.firebaseio.com/Orders.json',{
      method: 'POST',
      body:  JSON.stringify({
        user: userData,
        orderItems: cartCtx.items
      })
    });
   setIsSubmitting(false);
   setDidSubmit(true);
   cartCtx.clearCart();
  }

  const cartItems = (
    <ul className={calsses["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRmoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHanlder.bind(null, item)}
        />
      ))}
    </ul>
  );
  const modalActions = (
    <div className={calsses.actions}>
      {hasItems && (
        <button className={calsses["button--alt"]} onClick={orderHanlder}>
          Order
        </button>
      )}
      <button className={calsses.button} onClick={props.onClose}>
        close
      </button>
    </div>
  );
  const cartModalContent =  <React.Fragment>{cartItems}
  <div className={calsses.total}>
    <span>Total Amount</span>
    <span>{totalAmount}</span>
  </div>
  {isCheckout && <Chekout onConfirm={submitOrderHanadler} onCancel={props.onClose}/>}
  {!isCheckout && modalActions}</React.Fragment>

  const isSubmittingContent = <p>Sending data</p>;

  const didSubmitContent = <p>Successfully sent the order</p>;
  return (
    <Modal onClose={props.onClose}>
     {!isSubmitting && !didSubmit && cartModalContent}
     {isSubmitting && isSubmittingContent}
     {!isSubmitting && didSubmit && didSubmitContent}
    </Modal>
  );
};

export default Cart;
