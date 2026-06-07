import { useEffect, useState } from "react";
import MindSection from "./MindSection";
import RestaurantChain from "./RestaurantChain";
import Restaurants from "./Restaurants";
import { SWIGGY_API } from "../utils/constants";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  const [mindData, setMindData] = useState([]);
  const [chainHeader, setChainHeader] = useState("");
  const [chains, setChains] = useState([]);
  const [restaurantsHeader, setRestaurantsHeader] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  const fetchData = async () => {
    try {
      setFetchError(null);

      const data = await fetch(SWIGGY_API);

      if (!data.ok) {
        throw new Error(`Server error: ${data.status}`);
      }

      const json = await data.json();

      const dishes =
        json?.data?.cards?.[0]?.card?.card?.gridElements?.infoWithStyle?.info;

      const chainHeader =
        json?.data?.cards?.[1]?.card?.card?.header?.title;

      const chains =
        json?.data?.cards?.[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants;

      const restaurantsHeader =
        json?.data?.cards?.[2]?.card?.card?.title;

      const restaurants =
        json?.data?.cards?.[4]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants;

      setMindData(dishes || []);
      setChainHeader(chainHeader || "");
      setChains(chains || []);
      setRestaurantsHeader(restaurantsHeader || "");
      setRestaurants(restaurants || []);
    } catch (err) {
      setFetchError(
        "Unable to load restaurants right now. Please try again later."
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false) {
    return (
      <h1 className="offline-banner">
        Looks like you are offline!! Please check your Internet Connection.
      </h1>
    );
  }

  return (
    <div className="Body">
      {fetchError && (
        <div className="error-banner" role="alert">
          ⚠ {fetchError}
        </div>
      )}

      {/* What's on your Mind Section */}
      <div className="Mind-Section">
        <MindSection dishes={mindData} />
      </div>

      {/* Top Restaurant Chains Section */}
      <div className="Restaurant-Chains">
        <RestaurantChain ChainHeader={chainHeader} Chains={chains} />
      </div>

      {/* Restaurants with Online Food Delivery */}
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
