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
      console.log("Fetching data...");

      const data = await fetch(SWIGGY_API);

      console.log("Status:", data.status);

      const json = await data.json();

      console.log("Response:", json);

      // Keep your existing extraction code here
    } catch (err) {
      console.error("FETCH ERROR:", err);
      alert("Fetch Error: " + err.message);
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
