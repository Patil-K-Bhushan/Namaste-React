import "./styles/Cart.css";
import { TiShoppingCart } from "react-icons/ti";
import { useSelector, useDispatch } from "react-redux";
import { useMemo, useState } from "react";
import { MdDeliveryDining } from "react-icons/md";

import {
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  clearCart,
} from "../utils/cartSlice";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);

  const dispatch = useDispatch();

  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);

  const formatPrice = (price) => new Intl.NumberFormat("en-IN").format(price);

  const { totalItems, subtotal } = useMemo(() => {
    return {
      totalItems: cartItems.reduce((sum, item) => sum + item.quantity, 0),

      subtotal: cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      ),
    };
  }, [cartItems]);

  const deliveryFee = subtotal >= 499 ? 0 : cartItems.length > 0 ? 40 : 0;

  const gst = Number((subtotal * 0.05).toFixed(2));

  const grandTotal = subtotal + deliveryFee + gst - discount;

  const handleClearCart = () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear the entire cart?",
    );

    if (confirmClear) {
      dispatch(clearCart());
      setDiscount(0);
      setCouponApplied(false);
      setCouponCode("");
    }
  };

  const handleCouponApply = () => {
    const code = couponCode.trim().toUpperCase();

    if (code === "NAMASTE50") {
      setDiscount(50);
      setCouponApplied(true);
    } else if (code === "FOOD100") {
      setDiscount(100);
      setCouponApplied(true);
    } else {
      alert("Invalid Coupon Code");
      setDiscount(0);
      setCouponApplied(false);
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);

    setTimeout(() => {
      alert(`
🎉 Order Placed Successfully!

Items: ${totalItems}

Subtotal: ₹${formatPrice(subtotal)}

Final Amount: ₹${formatPrice(grandTotal)}

🚴 Estimated Delivery:
25 - 35 Minutes
      `);

      dispatch(clearCart());

      setDiscount(0);
      setCouponApplied(false);
      setCouponCode("");

      setIsCheckingOut(false);
    }, 1500);
  };

  if (cartItems.length === 0) {
    return (
      <div className="Cart">
        <div className="cart-container">
          <div className="cart-items-section empty-state">
            <TiShoppingCart size={80} />

            <h1>Your Cart is Empty</h1>

            <p>Looks like you haven't added anything yet.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="Cart">
      <div className="cart-container">
        {/* LEFT SECTION */}
        <div className="cart-items-section">
          <div className="cart-header">
            <h1 className="cart-title">
              Your Cart <TiShoppingCart />
            </h1>

            <button
              type="button"
              className="clear-cart-btn"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>
          </div>

          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                className="food-image"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/200x200?text=Food";
                }}
              />

              <div className="item-details">
                <h2>{item.name}</h2>

                {item.restaurantName && (
                  <p className="item-restaurant">{item.restaurantName}</p>
                )}

                <div className="price-qty">
                  <span>₹{formatPrice(item.price)}</span>

                  <div className="qty-box">
                    <button
                      type="button"
                      aria-label={`Decrease quantity of ${item.name}`}
                      onClick={() =>
                        dispatch(
                          decreaseQuantity({
                            id: item.id,
                          }),
                        )
                      }
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      type="button"
                      aria-label={`Increase quantity of ${item.name}`}
                      onClick={() =>
                        dispatch(
                          increaseQuantity({
                            id: item.id,
                          }),
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  className="remove-btn"
                  aria-label={`Remove ${item.name}`}
                  onClick={() =>
                    dispatch(
                      removeItem({
                        id: item.id,
                      }),
                    )
                  }
                >
                  Remove
                </button>
              </div>

              <div className="item-total">
                ₹{formatPrice(item.price * item.quantity)}
              </div>
            </div>
          ))}
        </div>

        {/* BILL SECTION */}
        <div className="bill-section">
          <h2>Bill Details</h2>

          <div className="bill-row">
            <span>Total Items</span>
            <span>{totalItems}</span>
          </div>

          <div className="bill-row">
            <span>Subtotal</span>
            <span>₹{formatPrice(subtotal)}</span>
          </div>

          <div className="bill-row">
            <span>Delivery Fee</span>
            <span>
              {deliveryFee === 0 ? "FREE" : `₹${formatPrice(deliveryFee)}`}
            </span>
          </div>

          {subtotal >= 499 ? (
            <div className="free-delivery">🎉 Free Delivery Applied</div>
          ) : (
            <div className="free-delivery">
              Add ₹{formatPrice(499 - subtotal)} more for FREE delivery
            </div>
          )}

          {/* Coupon */}

          <div className="coupon-section">
            <input
              type="text"
              placeholder="Enter Coupon"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />

            <button type="button" onClick={handleCouponApply}>
              Apply
            </button>
          </div>

          {couponApplied && (
            <div className="bill-row discount">
              <span>Coupon Discount</span>

              <span>
                -₹
                {formatPrice(discount)}
              </span>
            </div>
          )}

          <div className="bill-row">
            <span>GST (5%)</span>

            <span>₹{formatPrice(gst)}</span>
          </div>

          <hr />

          <div className="bill-row total">
            <span>Grand Total</span>

            <span>₹{formatPrice(grandTotal)}</span>
          </div>

          <div className="delivery-info">
            <MdDeliveryDining /> Estimated Delivery: 25–35 mins
          </div>

          <button
            type="button"
            className="checkout-btn"
            disabled={isCheckingOut}
            onClick={handleCheckout}
          >
            {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
