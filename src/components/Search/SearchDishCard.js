import React from "react";
import { IMG_CDN } from "../../utils/constants";

const SearchDishCard = ({ d, cartItems, addedId, handleAddItem, increaseQty, decreaseQty }) => {
  const { info, restaurant } = d;
  const rawPrice = info?.price ?? info?.defaultPrice ?? info?.finalPrice ?? 0;
  const price = rawPrice ? Math.round(rawPrice / 100) : 0;
  const rating = info?.ratings?.aggregatedRating?.rating;
  const count = cartItems.find((ci) => ci.id === info.id)?.quantity || 0;

  const payload = {
    id: info.id,
    name: info?.name,
    price,
    image: info?.imageId ? IMG_CDN + info.imageId : "",
    restaurantName: restaurant?.info?.name || "Unknown Restaurant",
  };

  return (
    <div className="dish-card">
      <div className="dish-details">
        <h3 className="dish-name">{info?.name}</h3>
        <p className="dish-price">₹{price}</p>
        {rating && <p className="dish-rating">★ {rating}</p>}
        <p className="dish-restaurant">By {restaurant?.info?.name || "Unknown Restaurant"}</p>
        {info?.description && <p className="dish-desc">{info.description}</p>}
      </div>
      <div className="dish-img-wrap">
        {info?.imageId && (
          <img
            className="dish-img"
            src={IMG_CDN + info.imageId}
            alt={info?.name}
            loading="lazy"
            onError={(e) => { e.target.src = "https://via.placeholder.com/300x200?text=Food"; }}
          />
        )}
        {count === 0 ? (
          <button type="button" className="add-btn" onClick={() => handleAddItem(payload)}>ADD</button>
        ) : (
          <div className="qty-container">
            <button type="button" className="qty-btn" onClick={() => decreaseQty(info.id)}>-</button>
            <span className="qty-count">{count}</span>
            <button type="button" className="qty-btn" onClick={() => increaseQty(info.id)}>+</button>
          </div>
        )}
        {addedId === info.id && <span className="added-message">✓ Added</span>}
      </div>
    </div>
  );
};

export default SearchDishCard;
