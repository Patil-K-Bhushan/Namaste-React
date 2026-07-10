import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SEARCH_API } from "../utils/constants";
import { addItem, increaseQuantity, decreaseQuantity } from "../utils/cartSlice";

const parseDishes = (json) => {
  const cards = json?.data?.cards ?? [];
  const cardGroupMap =
    cards.find((c) => c?.groupedCard?.cardGroupMap)?.groupedCard?.cardGroupMap ||
    cards.find((c) => c?.card?.groupedCard?.cardGroupMap)?.card?.groupedCard?.cardGroupMap;

  const groupCards = cardGroupMap?.DISH?.cards ?? [];
  const fromGroup = groupCards.map((c) => c?.card?.card).filter((d) => d?.info?.id && d?.restaurant);
  if (fromGroup.length) return fromGroup;

  return cards.map((c) => c?.card?.card).filter((d) => d?.info?.id && d?.restaurant);
};

const useSearchDishes = (query, coords) => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [addedId, setAddedId] = useState(null);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const timeoutRef = useRef(null);

  const handleAddItem = (payload) => {
    dispatch(addItem(payload));
    setAddedId(payload.id);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setAddedId(null), 1500);
  };

  const increaseQty = (id) => dispatch(increaseQuantity({ id }));
  const decreaseQty = (id) => dispatch(decreaseQuantity({ id }));

  useEffect(() => {
    if (!query?.trim()) {
      setDishes([]);
      return;
    }
    let ignore = false;
    const fetchDishes = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(SEARCH_API(coords, encodeURIComponent(query)));
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        const json = await res.json();
        const list = parseDishes(json);
        if (!ignore) setDishes(list);
      } catch (err) {
        if (!ignore) setError(err.message || "Something went wrong");
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetchDishes();
    return () => {
      ignore = true;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [query, coords]);

  return { dishes, loading, error, cartItems, addedId, handleAddItem, increaseQty, decreaseQty };
};

export default useSearchDishes;
