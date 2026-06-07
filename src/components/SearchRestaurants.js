import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SEARCH_API, IMG_CDN } from "../utils/constants";
import "./styles/SearchRestaurants.css";

const SKELETON_COUNT = 8;

const parseRestaurants = (json) => {
  const cards = json?.data?.cards || [];
  const restaurants = [];

  const traverse = (obj) => {
    if (!obj || typeof obj !== "object") return;
    if (
      obj?.info?.id &&
      obj?.info?.name &&
      (obj?.info?.cuisines || obj?.info?.avgRating)
    ) {
      restaurants.push(obj.info);
    }
    Object.values(obj).forEach((value) => {
      if (typeof value === "object") traverse(value);
    });
  };

  cards.forEach((card) => traverse(card));

  // Deduplicate by restaurant id
  return [...new Map(restaurants.map((r) => [r.id, r])).values()];
};

const SearchRestaurants = ({ query }) => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query?.trim()) {
      setRestaurants([]);
      return;
    }

    let ignore = false;

    const fetchRestaurants = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          SEARCH_API + encodeURIComponent(query.trim())
        );

        if (!res.ok) {
          throw new Error(`Request failed (${res.status})`);
        }

        const json = await res.json();
        const list = parseRestaurants(json);

        if (!ignore) setRestaurants(list);
      } catch (err) {
        if (!ignore) setError(err.message || "Something went wrong");
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchRestaurants();

    return () => {
      ignore = true;
    };
  }, [query]);

  if (loading) {
    return (
      <div className="restaurant-grid">
        {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
          <div key={index} className="restaurant-card">
            <div className="skeleton skeleton-img"></div>
            <div className="skeleton skeleton-line"></div>
            <div className="skeleton skeleton-line short"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="search-message error">
        Couldn't load restaurants: {error}
      </div>
    );
  }

  if (!restaurants.length) {
    return <div className="search-message">No restaurants found</div>;
  }

  return (
    <div className="restaurant-grid">
      {restaurants.map((restaurant) => (
        <div
          key={restaurant.id}
          className="search-restaurant-card"
          onClick={() => navigate(`/restaurant/${restaurant.id}`)}
        >
          <img
            className="search-restaurant-img"
            src={
              restaurant.cloudinaryImageId
                ? IMG_CDN + restaurant.cloudinaryImageId
                : "https://via.placeholder.com/300x200?text=Restaurant"
            }
            alt={restaurant.name}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/300x200?text=Restaurant";
            }}
          />

          <div className="search-restaurant-info">
            <h3 className="search-restaurant-name">{restaurant.name}</h3>

            <div className="search-restaurant-meta">
              <span className="search-rating">
                ★ {restaurant.avgRating || restaurant.avgRatingString || "--"}
              </span>
              <span>•</span>
              <span>
                {restaurant.sla?.slaString ||
                  `${restaurant.sla?.deliveryTime || "--"} mins`}
              </span>
            </div>

            <p className="search-restaurant-cuisine">
              {Array.isArray(restaurant.cuisines)
                ? restaurant.cuisines.join(", ")
                : ""}
            </p>

            <p className="search-restaurant-area">
              {restaurant.areaName || restaurant.locality || ""}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchRestaurants;
