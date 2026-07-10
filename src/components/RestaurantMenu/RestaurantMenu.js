import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import RestaurantInfo from "../RestaurantInfo/RestaurantInfo";
import MenuCategory from "../MenuCategory/MenuCategory";
import "./RestaurantMenu.css";
import LocationContext from "../../contexts/LocationContext";
import useRestaurantMenu from "../../hooks/useRestaurantMenu";

const RestaurantMenu = () => {
  const { resID } = useParams();
  const coords = useContext(LocationContext);
  const { restaurant, categories, loading, error, fetchMenu } = useRestaurantMenu(resID, coords);
  const [openIndex, setOpenIndex] = useState(0);

  if (loading) return <h1 className="loading-text">Loading...</h1>;
  if (error) {
    return (
      <div className="restaurant-menu">
        <div className="error-state">
          <p>⚠ {error}</p>
          <button onClick={fetchMenu} className="retry-btn">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="restaurant-menu">
      <RestaurantInfo restaurant={restaurant} />
      <h2 className="menu-title">Menu</h2>
      {categories.map((category, index) => (
        <MenuCategory
          key={category?.card?.card?.title + index}
          category={category?.card?.card}
          restaurantName={restaurant?.name}
          isOpen={index === openIndex}
          setOpen={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
    </div>
  );
};

export default RestaurantMenu;
