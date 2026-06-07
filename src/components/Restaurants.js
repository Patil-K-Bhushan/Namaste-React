import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import RestaurantCard from "./RestaurantCard";
import "./styles/Restaurants.css";

const Restaurants = ({ RestaurantHeader, Restaurants }) => {
  const ITEMS_PER_LOAD = 15;

  const [visibleRestaurants, setVisibleRestaurants] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const loaderRef = useRef(null);

  useEffect(() => {
    if (Restaurants && Restaurants.length > 0) {
      const initialRestaurants = Restaurants.slice(0, ITEMS_PER_LOAD);
      setVisibleRestaurants(initialRestaurants);
      setPage(1);
      setHasMore(Restaurants.length > ITEMS_PER_LOAD);
    } else {
      setVisibleRestaurants([]);
      setHasMore(false);
    }
  }, [Restaurants]);

  const loadMoreRestaurants = () => {
    if (!hasMore || !Restaurants?.length) return;

    const start = page * ITEMS_PER_LOAD;
    const end = start + ITEMS_PER_LOAD;
    const nextRestaurants = Restaurants.slice(start, end);

    if (nextRestaurants.length > 0) {
      setVisibleRestaurants((prev) => [...prev, ...nextRestaurants]);
      setPage((prev) => prev + 1);
    }

    if (end >= Restaurants.length) {
      setHasMore(false);
    }
  };

  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreRestaurants();
        }
      },
      { rootMargin: "100px" }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
      observer.disconnect();
    };
  }, [page, hasMore, Restaurants]);

  return (
    <div className="restaurants-container">
      <h2 className="restaurants-title">{RestaurantHeader}</h2>

      <div className="restaurants-grid">
        {visibleRestaurants.map((restaurant) => (
          <Link
            key={restaurant?.info?.id}
            to={`/restaurant/${restaurant?.info?.id}`}
          >
            <RestaurantCard data={restaurant?.info} />
          </Link>
        ))}
      </div>

      {visibleRestaurants.length === 0 && (
        <div className="loading">No restaurants found</div>
      )}

      {hasMore && (
        <div ref={loaderRef} className="loading">
          Loading more restaurants...
        </div>
      )}
    </div>
  );
};

export default Restaurants;
