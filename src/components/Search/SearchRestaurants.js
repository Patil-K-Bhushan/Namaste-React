import React from "react";
import "./SearchRestaurants.css";
import useSearchRestaurants from "../../hooks/useSearchRestaurants";
import SearchRestaurantCard from "./SearchRestaurantCard";

const SKELETON_COUNT = 8;

const SearchRestaurants = ({ query, coords }) => {
  const { restaurants, loading, error, navigate } = useSearchRestaurants(query, coords);

  if (loading) {
    return (
      <div className="restaurant-grid">
        {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
          <div key={index} className="search-restaurant-card">
            <div className="skeleton skeleton-img"></div>
            <div className="skeleton skeleton-line"></div>
            <div className="skeleton skeleton-line short"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) return <div className="search-message error">Couldn't load restaurants: {error}</div>;
  if (!restaurants.length) return <div className="search-message">No restaurants found</div>;

  return (
    <div className="restaurant-grid">
      {restaurants.map((r) => (
        <SearchRestaurantCard key={r.id} restaurant={r} navigate={navigate} />
      ))}
    </div>
  );
};

export default SearchRestaurants;
