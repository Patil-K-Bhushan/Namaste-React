import React from "react";
import MenuItem from "../MenuItem/MenuItem";
import "./MenuCategory.css";

const MenuCategory = ({ category, restaurantName, isOpen, setOpen }) => {
  return (
    <div className="menu-category">
      <div className="menu-category-header" onClick={setOpen}>
        <span>
          {category?.title} ({category?.itemCards?.length})
        </span>
        <span className={`accordion-arrow ${isOpen ? "open" : ""}`}>▼</span>
      </div>

      {isOpen && (
        <div className="menu-items">
          {category?.itemCards?.map((item) => (
            <MenuItem
              key={item?.card?.info?.id}
              item={item?.card?.info}
              restaurantName={restaurantName}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuCategory;
