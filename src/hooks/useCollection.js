import { useState, useEffect } from "react";
import { COLLECTION_URL } from "../utils/constants";

const useCollection = (collectionID, tag, coords) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [resExplore, setResExplore] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetch(COLLECTION_URL(coords, collectionID, tag));
        if (!data.ok) throw new Error(`HTTP ${data.status}`);
        const json = await data.json();

        const collectionData = json?.data?.cards?.[0]?.card?.card;
        const exploreTxtCard = json?.data?.cards?.find((card) =>
          card?.card?.card?.["@type"]?.includes("GridWidget")
        );
        const exploretxt = exploreTxtCard?.card?.card?.gridElements?.infoWithStyle?.text;
        const restaurantData = json?.data?.cards
          ?.filter((card) => card?.card?.card?.info)
          ?.map((card) => card?.card?.card?.info);

        if (!ignore) {
          setRestaurants(restaurantData ?? []);
          setTitle(collectionData?.title ?? "");
          setDescription(collectionData?.description ?? "");
          setResExplore(exploretxt ?? "");
        }
      } catch (err) {
        if (!ignore) setError("Failed to load collection. Please try again.");
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchData();
    return () => { ignore = true; };
  }, [collectionID, tag, coords]);

  return { title, description, resExplore, restaurants, loading, error };
};

export default useCollection;
