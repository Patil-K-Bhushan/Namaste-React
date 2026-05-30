import { useState, useRef } from "react";
import "./styles/MenuItem.css";
import { MENU_CDN } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  increaseQuantity,
  decreaseQuantity,
} from "../utils/cartSlice";

const MenuItem = ({ item, restaurantName }) => {
  const dispatch = useDispatch();

  const [showAdded, setShowAdded] = useState(false);
  const timeoutRef = useRef(null);

  const price = (item?.price || item?.defaultPrice || 0) / 100;

  const isVeg = item?.isVeg === 1;

  const quantity = useSelector(
    (state) =>
      state.cart.items.find((cartItem) => cartItem.id === item?.id)?.quantity ||
      0,
  );

  const buildPayload = () => ({
    id: item?.id,
    name: item?.name,
    price,
    image: item?.imageId ? MENU_CDN + item.imageId : "",
    restaurantName: restaurantName || "Unknown Restaurant",
  });

  const handleAddItem = () => {
    dispatch(addItem(buildPayload()));

    setShowAdded(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setShowAdded(false);
    }, 1500);
  };

  const increaseQty = () => {
    dispatch(
      increaseQuantity({
        id: item?.id,
      }),
    );
  };

  const decreaseQty = () => {
    dispatch(
      decreaseQuantity({
        id: item?.id,
      }),
    );
  };

  return (
    <div className="menu-item">
      {/* LEFT SECTION */}
      <div className="menu-item-left">
        <div className={isVeg ? "veg-icon" : "nonveg-icon"} />

        <h4 className="item-name">{item?.name}</h4>

        <p className="item-price">₹{Math.round(price)}</p>

        {item?.description && <p className="item-desc">{item.description}</p>}
      </div>

      {/* RIGHT SECTION */}
      <div className="menu-item-right">
        {item?.imageId && (
          <>
            <img
              className="item-image"
              src={MENU_CDN + item.imageId}
              alt={item?.name}
              loading="lazy"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/300x200?text=Food";
              }}
            />

            {quantity === 0 ? (
              <button
                type="button"
                className="add-btn"
                onClick={handleAddItem}
                aria-label={`Add ${item?.name} to cart`}
              >
                ADD
              </button>
            ) : (
              <div className="qty-container">
                <button
                  type="button"
                  className="qty-btn"
                  aria-label={`Decrease quantity of ${item?.name}`}
                  onClick={decreaseQty}
                >
                  -
                </button>

                <span className="qty-count">{quantity}</span>

                <button
                  type="button"
                  className="qty-btn"
                  aria-label={`Increase quantity of ${item?.name}`}
                  onClick={increaseQty}
                >
                  +
                </button>
              </div>
            )}

            {showAdded && <div className="added-message">✓ Added to cart</div>}
          </>
        )}
      </div>
    </div>
  );
};

export default MenuItem;
