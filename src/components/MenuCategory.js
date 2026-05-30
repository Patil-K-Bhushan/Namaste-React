import MenuItem from "./MenuItem";
import "./styles/MenuCategory.css";

const MenuCategory = ({ category, restaurantName, isOpen, setOpen }) => {
  return (
    <div className="menu-category">
      <div className="menu-category-header" onClick={setOpen}>
        <span>
          {category?.title} ({category?.itemCards?.length})
        </span>

        {/* Arrow */}
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
