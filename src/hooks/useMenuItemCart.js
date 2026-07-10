import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, increaseQuantity, decreaseQuantity } from "../utils/cartSlice";
import { MENU_CDN } from "../utils/constants";

const useMenuItemCart = (item, restaurantName, price) => {
  const dispatch = useDispatch();
  const [showAdded, setShowAdded] = useState(false);
  const timeoutRef = useRef(null);

  const quantity = useSelector(
    (state) => state.cart.items.find((cartItem) => cartItem.id === item?.id)?.quantity || 0
  );

  const handleAddItem = () => {
    const payload = {
      id: item?.id,
      name: item?.name,
      price,
      image: item?.imageId ? MENU_CDN + item.imageId : "",
      restaurantName: restaurantName || "Unknown Restaurant",
    };
    dispatch(addItem(payload));
    setShowAdded(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setShowAdded(false), 1500);
  };

  const increaseQty = () => dispatch(increaseQuantity({ id: item?.id }));
  const decreaseQty = () => dispatch(decreaseQuantity({ id: item?.id }));

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return { quantity, showAdded, handleAddItem, increaseQty, decreaseQty };
};

export default useMenuItemCart;
