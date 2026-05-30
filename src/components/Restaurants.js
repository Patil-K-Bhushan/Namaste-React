import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import RestaurantCard from "./RestaurantCard";
import "./styles/Restaurants.css";

const Restaurants = ({ RestaurantHeader, Restaurants }) => {
  const ITEMS_PER_LOAD = 15;

  const [visibleRestaurants, setVisibleRestaurants] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loaderRef = useRef(null);

  // Initial Load
  useEffect(() => {
    if (Restaurants?.length) {
      setVisibleRestaurants(
        Restaurants.slice(0, ITEMS_PER_LOAD)
      );

      setPage(1);
      setHasMore(Restaurants.length > ITEMS_PER_LOAD);
    }
  }, [Restaurants]);

  // Load More Restaurants
  const loadMoreRestaurants = () => {
    if (!hasMore || !Restaurants?.length) return;

    const start = page * ITEMS_PER_LOAD;
    const end = start + ITEMS_PER_LOAD;

    const nextRestaurants = Restaurants.slice(start, end);

    if (nextRestaurants.length > 0) {
      setVisibleRestaurants((prev) => [
        ...prev,
        ...nextRestaurants,
      ]);

      setPage((prev) => prev + 1);
    }

    if (end >= Restaurants.length) {
      setHasMore(false);
    }
  };

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasMore
        ) {
          loadMoreRestaurants();
        }
      },
      {
        root: null,
        rootMargin: "100px",
        threshold: 0.1,
      }
    );

    const currentLoader = loaderRef.current;

    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }

      observer.disconnect();
    };
  }, [page, hasMore, visibleRestaurants]);

  return (
    <div className="restaurants-container">
      <h2 className="restaurants-title">
        {RestaurantHeader}
      </h2>

      <div className="restaurants-grid">
        {visibleRestaurants?.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={`/restaurant/${restaurant.info.id}`}
          >
            <RestaurantCard
              data={restaurant.info}
            />
          </Link>
        ))}
      </div>

      {hasMore ? (
        <div
          ref={loaderRef}
          className="loading"
        >
          Loading more restaurants...
        </div>
      ) : (
        <div className="loading">
          No more restaurants to show
        </div>
      )}
    </div>
  );
};

export default Restaurants;