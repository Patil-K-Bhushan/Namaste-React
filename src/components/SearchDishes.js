import { useEffect, useRef, useState } from "react";
import { SEARCH_API, IMG_CDN } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  increaseQuantity,
  decreaseQuantity,
} from "../utils/cartSlice";
import "./styles/SearchDishes.css";

const SKELETON_COUNT = 8;

// Extract dish cards from Swiggy search response
const parseDishes = (json) => {
  const cards = json?.data?.cards ?? [];

  const cardGroupMap =
    cards.find((c) => c?.groupedCard?.cardGroupMap)?.groupedCard
      ?.cardGroupMap ||
    cards.find((c) => c?.card?.groupedCard?.cardGroupMap)?.card?.groupedCard
      ?.cardGroupMap;

  const groupCards = cardGroupMap?.DISH?.cards ?? [];

  const fromGroup = groupCards
    .map((c) => c?.card?.card)
    .filter((d) => d?.info?.id && d?.restaurant);

  if (fromGroup.length) return fromGroup;

  return cards
    .map((c) => c?.card?.card)
    .filter((d) => d?.info?.id && d?.restaurant);
};

const SearchDishes = ({ query, coords }) => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const [addedId, setAddedId] = useState(null);

  const timeoutRef = useRef(null);

  const handleAddItem = (payload) => {
    dispatch(addItem(payload));

    setAddedId(payload.id);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setAddedId(null);
    }, 1500);
  };

  const increaseQty = (id) => {
    dispatch(
      increaseQuantity({
        id,
      })
    );
  };

  const decreaseQty = (id) => {
    dispatch(
      decreaseQuantity({
        id,
      })
    );
  };

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
        const res = await fetch(
          SEARCH_API(coords, encodeURIComponent(query))
        );

        if (!res.ok) {
          throw new Error(
            `Request failed (${res.status})`
          );
        }

        const json = await res.json();

        const list = parseDishes(json);

        if (!ignore) {
          setDishes(list);
        }
      } catch (err) {
        console.error(err);

        if (!ignore) {
          setError(
            err.message ||
              "Something went wrong"
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchDishes();

    return () => {
      ignore = true;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [query, coords]);

  if (loading) {
    return (
      <div className="dish-list">
        {Array.from({
          length: SKELETON_COUNT,
        }).map((_, i) => (
          <div
            key={i}
            className="dish-card"
          >
            <div className="dish-details">
              <div className="skeleton skeleton-line" />
              <div className="skeleton skeleton-line short" />
              <div className="skeleton skeleton-line short" />
            </div>

            <div className="skeleton skeleton-dish-img" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="search-message error">
        Couldn't load dishes: {error}
      </div>
    );
  }

  if (dishes.length === 0) {
    return (
      <div className="search-message">
        No dishes found
      </div>
    );
  }

  return (
    <div className="dish-list">
      {dishes.map((d) => {
        const info = d.info;
        const restaurant =
          d.restaurant?.info;

        const rawPrice =
          info?.price ??
          info?.defaultPrice ??
          info?.finalPrice ??
          0;

        const price = rawPrice
          ? Math.round(rawPrice / 100)
          : 0;

        const rating =
          info?.ratings?.aggregatedRating
            ?.rating;

        const count =
          cartItems.find(
            (ci) => ci.id === info.id
          )?.quantity || 0;

        const payload = {
          id: info.id,
          name: info?.name,
          price,
          image: info?.imageId
            ? IMG_CDN + info.imageId
            : "",
          restaurantName:
            restaurant?.name ||
            "Unknown Restaurant",
        };

        return (
          <div
            key={info.id}
            className="dish-card"
          >
            <div className="dish-details">
              <h3 className="dish-name">
                {info?.name}
              </h3>

              <p className="dish-price">
                ₹{price}
              </p>

              {rating && (
                <p className="dish-rating">
                  ★ {rating}
                </p>
              )}

              <p className="dish-restaurant">
                By{" "}
                {restaurant?.name ||
                  "Unknown Restaurant"}
              </p>

              {info?.description && (
                <p className="dish-desc">
                  {info.description}
                </p>
              )}
            </div>

            <div className="dish-img-wrap">
              {info?.imageId && (
                <img
                  className="dish-img"
                  src={
                    IMG_CDN + info.imageId
                  }
                  alt={info?.name}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/300x200?text=Food";
                  }}
                />
              )}

              {count === 0 ? (
                <button
                  type="button"
                  className="add-btn"
                  aria-label={`Add ${info?.name} to cart`}
                  onClick={() =>
                    handleAddItem(
                      payload
                    )
                  }
                >
                  ADD
                </button>
              ) : (
                <div className="qty-container">
                  <button
                    type="button"
                    className="qty-btn"
                    aria-label={`Decrease quantity of ${info?.name}`}
                    onClick={() =>
                      decreaseQty(
                        info.id
                      )
                    }
                  >
                    -
                  </button>

                  <span className="qty-count">
                    {count}
                  </span>

                  <button
                    type="button"
                    className="qty-btn"
                    aria-label={`Increase quantity of ${info?.name}`}
                    onClick={() =>
                      increaseQty(
                        info.id
                      )
                    }
                  >
                    +
                  </button>
                </div>
              )}

              {addedId === info.id && (
                <span
                  className="added-message"
                >
                  ✓ Added
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SearchDishes;