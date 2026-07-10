import { useState, useEffect } from "react";
import { MENU_API } from "../utils/constants";

const useRestaurantMenu = (resID, coords) => {
  const [restaurant, setRestaurant] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMenu = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(MENU_API(coords, resID));
      if (!res.ok) throw new Error(`Failed to load menu (HTTP ${res.status})`);
      const json = await res.json();

      const restaurantCard = json?.data?.cards?.find((card) => card?.card?.card?.info);
      const restaurantInfo = restaurantCard?.card?.card?.info;

      const regularCard = json?.data?.cards?.find((card) => card?.groupedCard);
      const menuCategories = regularCard?.groupedCard?.cardGroupMap?.REGULAR?.cards;
      const itemCategories = menuCategories?.filter((c) => c?.card?.card?.itemCards);

      setRestaurant(restaurantInfo || null);
      setCategories(itemCategories || []);
    } catch (err) {
      setError(err.message || "Failed to load menu. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, [resID, coords]);

  return { restaurant, categories, loading, error, fetchMenu };
};

export default useRestaurantMenu;
