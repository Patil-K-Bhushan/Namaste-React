import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { COLLECTION_URL } from "../utils/constants";
import RestaurantCard from "./RestaurantCard";
import "./styles/Collections.css";

const Collections = () => {
  const { collectionID, tag } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [resExplore, setResExplore] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [restaurants, setRestaurants] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetch(COLLECTION_URL(collectionID, tag));

      if (!data.ok) {
        throw new Error(`HTTP ${data.status}`);
      }

      const json = await data.json();

      const collectionData = json?.data?.cards?.[0]?.card?.card;

      const exploreTxtCard = json?.data?.cards?.find((card) =>
        card?.card?.card?.["@type"]?.includes("GridWidget")
      );
      const exploretxt =
        exploreTxtCard?.card?.card?.gridElements?.infoWithStyle?.text;

      const restaurantData = json?.data?.cards
        ?.filter((card) => card?.card?.card?.info)
        ?.map((card) => card?.card?.card?.info);

      setRestaurants(restaurantData ?? []);
      setTitle(collectionData?.title ?? "");
      setDescription(collectionData?.description ?? "");
      setResExplore(exploretxt ?? "");
    } catch (err) {
      setError("Failed to load collection. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [collectionID, tag]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="collection-container">
      <h1 className="Title">{title}</h1>
      <p className="Description">{description}</p>
      <div className="Res-Explore">
        <h2 className="Heading">{resExplore}</h2>
        <div className="ResCards">
          {restaurants.map((info) => (
            <Link key={info?.id} to={"/restaurant/" + info?.id}>
              <RestaurantCard data={info} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collections;
