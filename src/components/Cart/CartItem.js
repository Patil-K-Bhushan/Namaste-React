import React from "react";
import { increaseQuantity, decreaseQuantity, removeItem } from "../../utils/cartSlice";

const CartItem = ({ item, formatPrice, dispatch }) => (
  <div className="cart-item">
    <img
      src={item.image}
      alt={item.name}
      loading="lazy"
      className="food-image"
      onError={(e) => { e.target.src = "https://via.placeholder.com/200x200?text=Food"; }}
    />
    <div className="item-details">
      <h2>{item.name}</h2>
      {item.restaurantName && <p className="item-restaurant">{item.restaurantName}</p>}
      <div className="price-qty">
        <span>₹{formatPrice(item.price)}</span>
        <div className="qty-box">
          <button type="button" onClick={() => dispatch(decreaseQuantity({ id: item.id }))}>-</button>
          <span>{item.quantity}</span>
          <button type="button" onClick={() => dispatch(increaseQuantity({ id: item.id }))}>+</button>
        </div>
      </div>
      <button type="button" className="remove-btn" onClick={() => dispatch(removeItem({ id: item.id }))}>Remove</button>
    </div>
    <div className="item-total">₹{formatPrice(item.price * item.quantity)}</div>
  </div>
);

export default CartItem;
