import "./styles/RestaurantCard.css";
import { IMG_CDN } from "../utils/constants";

const RestaurantCard = ({ data = {} }) => {
  const {
    name,
    cloudinaryImageId,
    avgRating,
    sla,
    cuisines = [],
    areaName,
  } = data;

  return (
    <div className="home-restaurant-card">
      <img
        className="home-restaurant-img"
        src={IMG_CDN + cloudinaryImageId}
        alt={name}
      />

      <div className="home-restaurant-info">
        <h4 className="home-restaurant-name">{name}</h4>

        <p className="home-rating">
          ★ {avgRating} • {sla?.deliveryTime} mins
        </p>

        <p className="home-cuisines">
          {cuisines.join(", ")}
        </p>

        <p className="home-area">
          {areaName}
        </p>
      </div>
    </div>
  );
};

export default RestaurantCard;