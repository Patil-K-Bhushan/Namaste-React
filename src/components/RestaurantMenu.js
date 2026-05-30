import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MENU_API } from "../utils/constants";
import RestaurantInfo from "./RestaurantInfo";
import MenuCategory from "./MenuCategory";
import "./styles/RestaurantMenu.css";

const RestaurantMenu = () => {
  const { resID } = useParams();

  const [restaurant, setRestaurant] = useState(null);
  const [categories, setCategories] = useState([]);

  const [openIndex, setOpenIndex] = useState();

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const data = await fetch(MENU_API + resID);
    const json = await data.json();

    const restaurantCard = json?.data?.cards?.find(
      (card) => card?.card?.card?.info,
    );

    const restaurantInfo = restaurantCard?.card?.card?.info;

    const regularCard = json?.data?.cards?.find((card) => card?.groupedCard);

    const menuCategories =
      regularCard?.groupedCard?.cardGroupMap?.REGULAR?.cards;

    const itemCategories = menuCategories?.filter(
      (c) => c?.card?.card?.itemCards,
    );

    setRestaurant(restaurantInfo);
    setCategories(itemCategories);
  };

  if (!restaurant) return <h1 className="loading-text">Loading...</h1>;

  return (
    <div className="restaurant-menu">
      <RestaurantInfo restaurant={restaurant} />

      <h2 className="menu-title">Menu</h2>

      {categories.map((category, index) => (
        <MenuCategory
          key={category?.card?.card?.title}
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
