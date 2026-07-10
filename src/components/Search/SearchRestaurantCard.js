import React from "react";
import { IMG_CDN } from "../../utils/constants";

const SearchRestaurantCard = ({ restaurant, navigate }) => (
  <div className="search-restaurant-card" onClick={() => navigate(`/restaurant/${restaurant.id}`)}>
    <img
      className="search-restaurant-img"
      src={restaurant.cloudinaryImageId ? IMG_CDN + restaurant.cloudinaryImageId : "https://via.placeholder.com/300x200?text=Restaurant"}
      alt={restaurant.name}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      onError={(e) => { e.target.src = "https://via.placeholder.com/300x200?text=Restaurant"; }}
    />
    <div className="search-restaurant-info">
      <h3 className="search-restaurant-name">{restaurant.name}</h3>
      <div className="search-restaurant-meta">
        <span className="search-rating">★ {restaurant.avgRating || restaurant.avgRatingString || "--"}</span>
        <span>•</span>
        <span>{restaurant.sla?.slaString || `${restaurant.sla?.deliveryTime || "--"} mins`}</span>
      </div>
      <p className="search-restaurant-cuisine">{Array.isArray(restaurant.cuisines) ? restaurant.cuisines.join(", ") : ""}</p>
      <p className="search-restaurant-area">{restaurant.areaName || restaurant.locality || ""}</p>
    </div>
  </div>
);

export default SearchRestaurantCard;
