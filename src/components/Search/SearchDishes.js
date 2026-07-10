import React from "react";
import "./SearchDishes.css";
import useSearchDishes from "../../hooks/useSearchDishes";
import SearchDishCard from "./SearchDishCard";

const SKELETON_COUNT = 8;

const SearchDishes = ({ query, coords }) => {
  const state = useSearchDishes(query, coords);

  if (state.loading) {
    return (
      <div className="dish-list">
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <div key={i} className="dish-card">
            <div className="dish-details">
              <div className="skeleton skeleton-line" />
              <div className="skeleton skeleton-line short" />
              <div className="skeleton skeleton-line short" />
            </div>
            <div className="skeleton skeleton-dish-img" />
          </div>
        ))}
      </div>
    );
  }

  if (state.error) return <div className="search-message error">Couldn't load dishes: {state.error}</div>;
  if (state.dishes.length === 0) return <div className="search-message">No dishes found</div>;

  return (
    <div className="dish-list">
      {state.dishes.map((d) => (
        <SearchDishCard key={d.info.id} d={d} {...state} />
      ))}
    </div>
  );
};

export default SearchDishes;
