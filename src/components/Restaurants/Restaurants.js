import React from "react";
import { Link } from "react-router-dom";
import RestaurantCard from "../RestaurantCard/RestaurantCard";
import "./Restaurants.css";
import useLazyLoadRestaurants from "../../hooks/useLazyLoadRestaurants";

const Restaurants = ({ RestaurantHeader, Restaurants: restaurantsList }) => {
  const { visibleRestaurants, hasMore, loaderRef } = useLazyLoadRestaurants(restaurantsList);

  return (
    <div className="restaurants-container">
      <h2 className="restaurants-title">{RestaurantHeader}</h2>
      <div className="restaurants-grid">
        {visibleRestaurants.map((restaurant) => (
          <Link key={restaurant?.info?.id} to={`/restaurant/${restaurant?.info?.id}`}>
            <RestaurantCard data={restaurant?.info} />
          </Link>
        ))}
      </div>
      {visibleRestaurants.length === 0 && <div className="loading">No restaurants found</div>}
      {hasMore && <div ref={loaderRef} className="loading">Loading more restaurants...</div>}
    </div>
  );
};

export default Restaurants;
