import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { MENU_API } from "../utils/constants";
import RestaurantInfo from "./RestaurantInfo";
import MenuCategory from "./MenuCategory";
import "./styles/RestaurantMenu.css";
import LocationContext from "../utils/LocationContext";

const RestaurantMenu = () => {
  const { resID } = useParams();
  const coords = useContext(LocationContext);

  const [restaurant, setRestaurant] = useState(null);
  const [categories, setCategories] = useState([]);
  const [openIndex, setOpenIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMenu();
  }, [resID, coords]);

  const fetchMenu = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(MENU_API(coords, resID));

      if (!res.ok) {
        throw new Error(`Failed to load menu (HTTP ${res.status})`);
      }

      const json = await res.json();

      const restaurantCard = json?.data?.cards?.find(
        (card) => card?.card?.card?.info
      );
      const restaurantInfo = restaurantCard?.card?.card?.info;

      const regularCard = json?.data?.cards?.find(
        (card) => card?.groupedCard
      );
      const menuCategories =
        regularCard?.groupedCard?.cardGroupMap?.REGULAR?.cards;
      const itemCategories = menuCategories?.filter(
        (c) => c?.card?.card?.itemCards
      );

      setRestaurant(restaurantInfo || null);
      setCategories(itemCategories || []);
    } catch (err) {
      setError(err.message || "Failed to load menu. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h1 className="loading-text">Loading...</h1>;
  }

  if (error) {
    return (
      <div className="restaurant-menu">
        <div className="error-state">
          <p>⚠ {error}</p>
          <button onClick={fetchMenu} className="retry-btn">
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="restaurant-menu">
        <div className="error-state">
          <p>Restaurant not found.</p>
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
          setOpen={() =>
            setOpenIndex(openIndex === index ? null : index)
          }
        />
      ))}
    </div>
  );
};

export default RestaurantMenu;
