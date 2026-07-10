import React from "react";
import "./MenuItem.css";
import { MENU_CDN } from "../../utils/constants";
import useMenuItemCart from "../../hooks/useMenuItemCart";

const MenuItem = ({ item, restaurantName }) => {
  const price = (item?.price || item?.defaultPrice || 0) / 100;
  const isVeg = item?.isVeg === 1;
  const { quantity, showAdded, handleAddItem, increaseQty, decreaseQty } = useMenuItemCart(item, restaurantName, price);

  return (
    <div className="menu-item">
      <div className="menu-item-left">
        <div className={isVeg ? "veg-icon" : "nonveg-icon"} />
        <h4 className="item-name">{item?.name}</h4>
        <p className="item-price">₹{Math.round(price)}</p>
        {item?.description && <p className="item-desc">{item.description}</p>}
      </div>
      <div className="menu-item-right">
        {item?.imageId && (
          <>
            <img
              className="item-image"
              src={MENU_CDN + item.imageId}
              alt={item?.name}
              loading="lazy"
              onError={(e) => { e.target.src = "https://via.placeholder.com/300x200?text=Food"; }}
            />
            {quantity === 0 ? (
              <button type="button" className="add-btn" onClick={handleAddItem}>ADD</button>
            ) : (
              <div className="qty-container">
                <button type="button" className="qty-btn" onClick={decreaseQty}>-</button>
                <span className="qty-count">{quantity}</span>
                <button type="button" className="qty-btn" onClick={increaseQty}>+</button>
              </div>
            )}
            {showAdded && <div className="added-message">✓ Added to cart</div>}
          </>
        )}
      </div>
    </div>
  );
};

export default MenuItem;
