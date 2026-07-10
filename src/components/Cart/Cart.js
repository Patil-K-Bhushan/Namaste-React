import React from "react";
import "./Cart.css";
import { TiShoppingCart } from "react-icons/ti";
import useCartState from "../../hooks/useCartState";
import CartItem from "./CartItem";
import CartBill from "./CartBill";

const Cart = () => {
  const state = useCartState();

  if (state.cartItems.length === 0) {
    return (
      <div className="Cart">
        <div className="cart-container">
          <div className="cart-items-section empty-state">
            <TiShoppingCart size={80} />
            <h1>Your Cart is Empty</h1>
            <p>Looks like you haven't added anything yet.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="Cart">
      <div className="cart-container">
        <div className="cart-items-section">
          <div className="cart-header">
            <h1 className="cart-title">Your Cart <TiShoppingCart /></h1>
            <button type="button" className="clear-cart-btn" onClick={state.handleClearCart}>Clear Cart</button>
          </div>
          {state.cartItems.map((item) => (
            <CartItem key={item.id} item={item} formatPrice={state.formatPrice} dispatch={state.dispatch} />
          ))}
        </div>
        <CartBill {...state} />
      </div>
    </div>
  );
};

export default Cart;
