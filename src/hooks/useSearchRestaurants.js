import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SEARCH_API } from "../utils/constants";

const parseRestaurants = (json) => {
  const cards = json?.data?.cards || [];
  const restaurants = [];

  const traverse = (obj) => {
    if (!obj || typeof obj !== "object") return;
    if (obj?.info?.id && obj?.info?.name && (obj?.info?.cuisines || obj?.info?.avgRating)) {
      restaurants.push(obj.info);
    }
    Object.values(obj).forEach((value) => {
      if (typeof value === "object") traverse(value);
    });
  };

  cards.forEach((card) => traverse(card));
  return [...new Map(restaurants.map((r) => [r.id, r])).values()];
};

const useSearchRestaurants = (query, coords) => {
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
        const res = await fetch(SEARCH_API(coords, encodeURIComponent(query.trim())));
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
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
    return () => { ignore = true; };
  }, [query, coords]);

  return { restaurants, loading, error, navigate };
};

export default useSearchRestaurants;
