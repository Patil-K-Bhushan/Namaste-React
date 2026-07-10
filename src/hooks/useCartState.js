import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../utils/cartSlice";

export const useCartState = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);

  const formatPrice = (price) => new Intl.NumberFormat("en-IN").format(price);

  const { totalItems, subtotal } = useMemo(() => ({
    totalItems: cartItems.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
  }), [cartItems]);

  const deliveryFee = subtotal >= 499 ? 0 : cartItems.length > 0 ? 40 : 0;
  const gst = Number((subtotal * 0.05).toFixed(2));
  const grandTotal = subtotal + deliveryFee + gst - discount;

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear the entire cart?")) {
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
      alert(`🎉 Order Placed Successfully!\n\nItems: ${totalItems}\nSubtotal: ₹${formatPrice(subtotal)}\nFinal Amount: ₹${formatPrice(grandTotal)}\n\n🚴 Estimated Delivery: 25 - 35 Minutes`);
      dispatch(clearCart());
      setDiscount(0);
      setCouponApplied(false);
      setCouponCode("");
      setIsCheckingOut(false);
    }, 1500);
  };

  return {
    cartItems,
    isCheckingOut,
    couponCode,
    setCouponCode,
    discount,
    couponApplied,
    totalItems,
    subtotal,
    deliveryFee,
    gst,
    grandTotal,
    formatPrice,
    handleClearCart,
    handleCouponApply,
    handleCheckout,
    dispatch,
  };
};

export default useCartState;
