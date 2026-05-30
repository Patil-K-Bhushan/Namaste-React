import { useState } from "react";
import SearchRestaurant from "./SearchRestaurants";
import SearchDishes from "./SearchDishes";
import "./styles/SearchResult.css";

const SearchResult = ({ query }) => {
  const [activeTab, setActiveTab] = useState("restaurants");

  return (
    <div className="search-result">
      <div className="search-tabs">
        <button
          className={activeTab === "restaurants" ? "tab active" : "tab"}
          onClick={() => setActiveTab("restaurants")}
        >
          Restaurants
        </button>
        <button
          className={activeTab === "dishes" ? "tab active" : "tab"}
          onClick={() => setActiveTab("dishes")}
        >
          Dishes
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "restaurants" ? (
          <SearchRestaurant query={query} />
        ) : (
          <SearchDishes query={query} />
        )}
      </div>
    </div>
  );
};

export default SearchResult;
