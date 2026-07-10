import React from "react";
import { MdDeliveryDining } from "react-icons/md";

const CartBill = ({
  totalItems, subtotal, deliveryFee, gst, grandTotal, formatPrice,
  couponCode, setCouponCode, couponApplied, handleCouponApply, handleCheckout, isCheckingOut
}) => (
  <div className="bill-section">
    <h2>Bill Details</h2>
    <div className="bill-row"><span>Total Items</span><span>{totalItems}</span></div>
    <div className="bill-row"><span>Subtotal</span><span>₹{formatPrice(subtotal)}</span></div>
    <div className="bill-row"><span>Delivery Fee</span><span>{deliveryFee === 0 ? "FREE" : `₹${formatPrice(deliveryFee)}`}</span></div>
    <div className="free-delivery">
      {subtotal >= 499 ? "🎉 Free Delivery Applied" : `Add ₹${formatPrice(499 - subtotal)} more for FREE delivery`}
    </div>
    <div className="coupon-section">
      <input type="text" placeholder="Enter Coupon" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
      <button type="button" onClick={handleCouponApply}>Apply</button>
    </div>
    {couponApplied && <div className="bill-row discount"><span>Coupon Discount</span><span>-₹{formatPrice(grandTotal - (subtotal + deliveryFee + gst))}</span></div>}
    <div className="bill-row"><span>GST (5%)</span><span>₹{formatPrice(gst)}</span></div>
    <hr />
    <div className="bill-row total"><span>Grand Total</span><span>₹{formatPrice(grandTotal)}</span></div>
    <div className="delivery-info"><MdDeliveryDining /> Estimated Delivery: 25–35 mins</div>
    <button type="button" className="checkout-btn" disabled={isCheckingOut} onClick={handleCheckout}>
      {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
    </button>
  </div>
);

export default CartBill;
