import { useState, useEffect, useRef } from "react";

const useLazyLoadRestaurants = (restaurantsList, itemsPerLoad = 15) => {
  const [visibleRestaurants, setVisibleRestaurants] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const loaderRef = useRef(null);

  useEffect(() => {
    if (restaurantsList && restaurantsList.length > 0) {
      setVisibleRestaurants(restaurantsList.slice(0, itemsPerLoad));
      setPage(1);
      setHasMore(restaurantsList.length > itemsPerLoad);
    } else {
      setVisibleRestaurants([]);
      setHasMore(false);
    }
  }, [restaurantsList, itemsPerLoad]);

  const loadMore = () => {
    if (!hasMore || !restaurantsList?.length) return;
    const start = page * itemsPerLoad;
    const end = start + itemsPerLoad;
    const nextList = restaurantsList.slice(start, end);

    if (nextList.length > 0) {
      setVisibleRestaurants((prev) => [...prev, ...nextList]);
      setPage((prev) => prev + 1);
    }
    if (end >= restaurantsList.length) setHasMore(false);
  };

  useEffect(() => {
    if (!hasMore) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { rootMargin: "100px" }
    );
    const currentLoader = loaderRef.current;
    if (currentLoader) observer.observe(currentLoader);
    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
      observer.disconnect();
    };
  }, [page, hasMore, restaurantsList]);

  return { visibleRestaurants, hasMore, loaderRef };
};

export default useLazyLoadRestaurants;
