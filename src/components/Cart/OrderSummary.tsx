import { selectTotalPrice } from "@/redux/features/cart-slice";
import { useAppSelector } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const OrderSummary = () => {
  const cartItems = useAppSelector((state) => state.cartReducer.items);
  const totalPrice = useSelector(selectTotalPrice);
  const router = useRouter();
  const handleProceedToCheckout = () => {
    localStorage.removeItem("checkoutOrder");
    const orderData = {
      items: cartItems,
      total: totalPrice,
    };
    localStorage.setItem('checkoutOrder', JSON.stringify(orderData));
    router.push('/checkout');
  };
  return (
    <div className="lg:max-w-[455px] w-full">
      {/* <!-- order list box --> */}
      <div className="bg-white shadow-1 rounded-[10px]"
        style={{
          background:
            "linear-gradient(to right,rgb(162, 197, 189),rgb(177, 201, 185),rgb(200, 196, 153),rgb(190, 151, 151))",
        }}
      >
        <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
          <h3 className="font-medium text-xl text-white">Order Summary</h3>
        </div>

        <div className="pt-2.5 pb-8.5 px-4 sm:px-8.5">
          {/* <!-- title --> */}
          <div className="flex items-center justify-between py-5 border-b border-gray-3">
            <div>
              <h4 className="font-medium text-white">Product</h4>
            </div>
            <div>
              <h4 className="font-medium text-white text-right">Subtotal</h4>
            </div>
          </div>

          {/* <!-- product item --> */}
          {cartItems.map((item, key) => (
            <div key={key} className="flex items-center justify-between py-5 border-b border-gray-3">
              <div>
                <p className="text-white">{item.name}</p>
              </div>
              <div>
                <p className="text-white text-right">
                  ₹{item.price * item.quantity}
                </p>
              </div>
            </div>
          ))}

          {/* <!-- total --> */}
          <div className="flex items-center justify-between pt-5">
            <div>
              <p className="font-medium text-lg text-white">Total</p>
            </div>
            <div>
              <p className="font-medium text-lg text-white text-right">
                ₹{totalPrice}
              </p>
            </div>
          </div>

          {/* <!-- checkout button --> */}
          <button
            type="submit"
            onClick={handleProceedToCheckout}
            className="w-full flex justify-center font-medium text-white bg-blue py-3 px-6 rounded-md ease-out duration-200 hover:bg-blue-dark mt-7.5"
          >
            Process to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
