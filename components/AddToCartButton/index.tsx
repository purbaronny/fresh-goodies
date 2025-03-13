"use client";

import useCart from "@/hooks/useCart";
import { Button } from "../ui/button";
import Image from "next/image";
import cn from "classnames";
import { useRouter } from "next/navigation";

interface AddToCartButtonProps {
  withProductThumbnails?: boolean;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ withProductThumbnails }) => {
  const { getTotalPrice, lastTwoItems } = useCart();
  const totalPrice = getTotalPrice();
  const router = useRouter();

  return (
    <Button
      className="mt-4 w-full px-6 py-[14px] rounded-full flex justify-between h-fit !bg-black"
      onClick={() => router.push("/cart")} // 🔹 Tambahkan navigasi ke halaman Cart
    >
      <div className="flex gap-2">
        <div className="font-medium text-xl">
          {withProductThumbnails ? "Cart" : "To Checkout"}
        </div>
        {withProductThumbnails && (
          <div className="flex">
            {(lastTwoItems ?? []).map((item, index) => (
              <div key={item.id} className={cn("h-[30px] flex", index > 0 ? "-ml-2" : "ml-0")}>
                <div className="w-auto h-full aspect-square rounded-full bg-white">
                  <Image
                    width={30}
                    height={30}
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-auto h-full aspect-square mix-blend-multiply object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="font-medium text-xl">${totalPrice.toFixed(1)}</div>
    </Button>
  );
};

export default AddToCartButton;
