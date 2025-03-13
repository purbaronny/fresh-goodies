"use client";

import useCart from "@/hooks/useCart";
import Image from "next/image";
import { Button } from "../ui/button";

const CartScreen: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { cart, getTotalPrice, updateItemQuantity, removeItem } = useCart();
  const totalPrice = getTotalPrice();

  return (
    <div className="fixed inset-0 bg-white p-4 flex flex-col h-screen shadow-lg z-50">
      {/* Tombol Close di atas */}
      <button onClick={onClose} className="self-end text-lg font-bold">
        ✕
      </button>

      <h2 className="text-2xl font-bold mb-4">Cart</h2>

      {/* List Item di dalam scrollable container */}
      <div className="flex-grow overflow-auto">
        {cart?.length ? (
          <div className="flex flex-col gap-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center gap-4">
                  <Image
                    src={`/products/${item.productId}.png`}
                    alt={item.productId.toString()}
                    width={50}
                    height={50}
                    className="rounded"
                  />
                  <div>
                    <p className="font-medium">Product {item.productId}</p>
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateItemQuantity(item.productId, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateItemQuantity(item.productId, item.quantity + 1)}>+</button>
                    </div>
                  </div>
                </div>
                <button onClick={() => removeItem(item.productId)} className="text-red-500">
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Your cart is empty</p>
        )}
      </div>

      {/* Total Harga */}
      <div className="mt-4">
        <div className="flex justify-between items-center font-bold text-xl">
          <span>Total</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>

        {/* Tombol Check Out */}
        <Button className="w-full bg-black text-white p-3 rounded-md mt-2">Check out</Button>

        {/* Tombol Close untuk kembali ke layar utama */}
        <Button onClick={onClose} className="w-full bg-gray-500 text-white p-3 rounded-md mt-2">
          Close
        </Button>
      </div>
    </div>
  );
};

export default CartScreen;
