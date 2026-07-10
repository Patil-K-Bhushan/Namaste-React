import "./RestaurantCard.css";
import { IMG_CDN } from "../../utils/constants";

const PLACEHOLDER =
  "https://via.placeholder.com/320x170?text=Restaurant";

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
        src={cloudinaryImageId ? IMG_CDN + cloudinaryImageId : PLACEHOLDER}
        alt={name ?? "Restaurant"}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        onError={(e) => {
          e.target.src = PLACEHOLDER;
        }}
      />

      <div className="home-restaurant-info">
        <h4 className="home-restaurant-name">{name}</h4>

        <p className="home-rating">
          ★ {avgRating} • {sla?.deliveryTime} mins
        </p>

        <p className="home-cuisines">{cuisines.join(", ")}</p>

        <p className="home-area">{areaName}</p>
      </div>
    </div>
  );
};

export default RestaurantCard;
