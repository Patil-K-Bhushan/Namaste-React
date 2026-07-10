import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import RestaurantCard from "../RestaurantCard/RestaurantCard";
import "./Collections.css";
import LocationContext from "../../contexts/LocationContext";
import useCollection from "../../hooks/useCollection";

const Collections = () => {
  const { collectionID, tag } = useParams();
  const coords = useContext(LocationContext);
  const { title, description, resExplore, restaurants, loading, error } = useCollection(collectionID, tag, coords);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

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
