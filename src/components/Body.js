import { useEffect, useState } from "react";
import MindSection from "./MindSection";
import RestaurantChain from "./RestaurantChain";
import Restaurants from "./Restaurants";
import { SWIGGY_API } from "../utils/constants";
import useOnlineStatus from "../utils/useOnlineStatus";

/**
 * Robust parser for the Swiggy /dapi/restaurants/list/v5 response.
 *
 * Swiggy frequently changes the ORDER of cards in `data.cards`, so reading
 * a fixed index like cards[4] breaks without warning. Instead we scan all
 * cards and locate the right data by SHAPE, not position.
 */
const parseHomeResponse = (json) => {
  const cards = json?.data?.cards ?? [];

  // Unwrap each card to its inner `card.card` object
  const inners = cards.map((c) => c?.card?.card).filter(Boolean);

  // "What's on your mind" — the card whose grid holds an `info` array
  const mindGrid = inners.find(
    (i) => Array.isArray(i?.gridElements?.infoWithStyle?.info)
  );

  // Every card that carries a restaurants[] grid, largest list first
  const grids = inners
    .filter((i) => Array.isArray(i?.gridElements?.infoWithStyle?.restaurants))
    .map((i) => ({
      id: i?.id,
      title: i?.title ?? i?.header?.title ?? "",
      list: i.gridElements.infoWithStyle.restaurants,
    }))
    .sort((a, b) => b.list.length - a.list.length);

  // Largest grid = the main "restaurants near you" listing.
  const mainGrid = grids[0];

  // Chains carousel — prefer the known id, else any grid that isn't the main one.
  const chainGrid =
    grids.find((g) => g.id === "top_brands_for_you") ||
    grids.find((g) => g !== mainGrid);

  return {
    dishes: mindGrid?.gridElements?.infoWithStyle?.info ?? [],
    chainHeader: chainGrid?.title || "Top restaurant chains near you",
    chains: chainGrid?.list ?? [],
    restaurantsHeader:
      mainGrid?.title || "Restaurants with online food delivery near you",
    restaurants: mainGrid?.list ?? [],
    foundAnyGrid: grids.length > 0,
  };
};

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

      const parsed = parseHomeResponse(json);

      setMindData(parsed.dishes);
      setChainHeader(parsed.chainHeader);
      setChains(parsed.chains);
      setRestaurantsHeader(parsed.restaurantsHeader);
      setRestaurants(parsed.restaurants);

      if (!parsed.foundAnyGrid) {
        setFetchError(
          "Swiggy responded, but no restaurant list was found for this location. " +
            "Try changing the lat/lng in src/utils/constants.js to a serviceable city."
        );
      }
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
