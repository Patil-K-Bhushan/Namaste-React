import React, { useContext } from "react";
import MindSection from "../MindSection/MindSection";
import RestaurantChain from "../RestaurantChain/RestaurantChain";
import Restaurants from "../Restaurants/Restaurants";
import useOnlineStatus from "../../hooks/useOnlineStatus";
import useRestaurantsData from "../../hooks/useRestaurantsData";
import LocationContext from "../../contexts/LocationContext";

const Body = () => {
  const coords = useContext(LocationContext);
  const onlineStatus = useOnlineStatus();
  const { mindData, chainHeader, chains, restaurantsHeader, restaurants, fetchError } = useRestaurantsData(coords);

  if (!onlineStatus) {
    return <h1 className="offline-banner">Looks like you are offline!! Please check your Internet Connection.</h1>;
  }

  return (
    <div className="Body">
      {fetchError && <div className="error-banner" role="alert">⚠ {fetchError}</div>}
      <div className="Mind-Section"><MindSection dishes={mindData} /></div>
      <div className="Restaurant-Chains"><RestaurantChain ChainHeader={chainHeader} Chains={chains} /></div>
      <div className="Restaurants"><Restaurants RestaurantHeader={restaurantsHeader} Restaurants={restaurants} /></div>
    </div>
  );
};

export default Body;
