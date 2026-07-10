import { MENU_CDN } from "../../utils/constants";
import "./RestaurantInfo.css";

const RestaurantInfo = ({ restaurant })=>{
return (
    <div className="restaurant-info">

      <h1 className="restaurant-name">{restaurant?.name}</h1>

      {restaurant?.cloudinaryImageId && (
        <img
          className="restaurant-image"
          src={MENU_CDN + restaurant.cloudinaryImageId}
          alt={restaurant?.name}
        />
      )}

      <h3 className="restaurant-cuisine">
        {restaurant?.cuisines?.join(", ")}
      </h3>

      <h4 className="restaurant-cost">
        {restaurant?.costForTwoMessage}
      </h4>

    </div>
  );
}

export default RestaurantInfo;
