import { useEffect, useState } from "react";
import MindSection from "./MindSection";
import RestaurantChain from "./RestaurantChain";
import Restaurants from "./Restaurants";
import { SWIGGY_API } from "../utils/constants";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  const [mindData, setMindData] = useState([]);
  const [chainHeader, setChainHeader] = useState();
  const [chains, setChains] = useState([]);
  const [restaurantsHeader, setRestaurantsHeader] = useState();
  const [restaurants, setRestaurants] = useState([]);

  const fetchData = async () => {
    try {
      const data = await fetch(SWIGGY_API);

      if (!data.ok) {
        throw new Error("Failed to fetch");
      }

      const json = await data.json();

      console.log(json);

      const cards = json?.data?.cards || [];

      const mindCard = cards.find(
        (c) => c?.card?.card?.id === "whats_on_your_mind",
      );

      const topRestaurantCard = cards.find(
        (c) => c?.card?.card?.id === "top_brands_for_you",
      );

      const restaurantCard = cards.find(
        (c) => c?.card?.card?.gridElements?.infoWithStyle?.restaurants,
      );

      setMindData(mindCard?.card?.card?.gridElements?.infoWithStyle?.info);

      setChainHeader(topRestaurantCard?.card?.card?.header?.title);

      setChains(
        topRestaurantCard?.card?.card?.gridElements?.infoWithStyle?.restaurants,
      );

      setRestaurantsHeader(restaurantCard?.card?.card?.title);

      setRestaurants(
        restaurantCard?.card?.card?.gridElements?.infoWithStyle?.restaurants,
      );
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false) {
    return (
      <h1>
        Looks like you are offline!! Please check your Internet Connection
      </h1>
    );
  }

  return (
    <div className="Body">
      {/* Whats on your Mind Section */}
      <div className="Mind-Section">
        <MindSection dishes={mindData} />
      </div>

      {/* Top Restaurants Chains in Location Section */}
      <div className="Restaurant-Chains">
        <RestaurantChain ChainHeader={chainHeader} Chains={chains} />
      </div>

      {/* Restaurants with Online food delivery in Loaction */}
      <div className="Restaurants">
        <Restaurants
          RestaurantHeader={restaurantsHeader}
          Restaurants={restaurants}
        />
      </div>
    </div>
  );
};

export default Body;
