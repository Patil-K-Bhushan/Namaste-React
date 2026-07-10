import { useState, useEffect } from "react";
import { SWIGGY_API } from "../utils/constants";

const parseHomeResponse = (json) => {
  const cards = json?.data?.cards ?? [];
  const inners = cards.map((c) => c?.card?.card).filter(Boolean);
  const mindGrid = inners.find((i) => Array.isArray(i?.gridElements?.infoWithStyle?.info));
  const grids = inners
    .filter((i) => Array.isArray(i?.gridElements?.infoWithStyle?.restaurants))
    .map((i) => ({
      id: i?.id,
      title: i?.title ?? i?.header?.title ?? "",
      list: i.gridElements.infoWithStyle.restaurants,
    }))
    .sort((a, b) => b.list.length - a.list.length);

  const mainGrid = grids[0];
  const chainGrid = grids.find((g) => g.id === "top_brands_for_you") || grids.find((g) => g !== mainGrid);

  return {
    dishes: mindGrid?.gridElements?.infoWithStyle?.info ?? [],
    chainHeader: chainGrid?.title || "Top restaurant chains near you",
    chains: chainGrid?.list ?? [],
    restaurantsHeader: mainGrid?.title || "Restaurants with online food delivery near you",
    restaurants: mainGrid?.list ?? [],
    foundAnyGrid: grids.length > 0,
  };
};

const useRestaurantsData = (coords) => {
  const [mindData, setMindData] = useState([]);
  const [chainHeader, setChainHeader] = useState("");
  const [chains, setChains] = useState([]);
  const [restaurantsHeader, setRestaurantsHeader] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      try {
        setFetchError(null);
        const data = await fetch(SWIGGY_API(coords));
        if (!data.ok) throw new Error(`Server error: ${data.status}`);
        const json = await data.json();
        const parsed = parseHomeResponse(json);
        if (!ignore) {
          setMindData(parsed.dishes);
          setChainHeader(parsed.chainHeader);
          setChains(parsed.chains);
          setRestaurantsHeader(parsed.restaurantsHeader);
          setRestaurants(parsed.restaurants);
          if (!parsed.foundAnyGrid) {
            setFetchError("Swiggy responded, but no restaurant list was found for this location.");
          }
        }
      } catch (err) {
        if (!ignore) setFetchError("Unable to load restaurants right now. Please try again later.");
      }
    };
    fetchData();
    return () => { ignore = true; };
  }, [coords]);

  return { mindData, chainHeader, chains, restaurantsHeader, restaurants, fetchError };
};

export default useRestaurantsData;
