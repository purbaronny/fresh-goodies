"use client";

import { useState, useMemo, useCallback } from "react";
import AddToCartButton from "@/components/AddToCartButton";
import CartScreen from "@/components/CartScreen";
import ProductCard from "@/components/ProductCard";
import useActiveProductContext from "@/context/ActiveProductContext";
import useCategoryContext from "@/context/CategoryContext";
import useCart from "@/hooks/useCart";
import useProduct from "@/hooks/useProduct";
import cn from "classnames";

type ProductListProps = {
  searchQuery: string;
  sortBy: string;
};

const ProductList: React.FC<ProductListProps> = ({ searchQuery, sortBy }) => {
  const { products, isLoading, error, categories, productCategoryGroup } = useProduct();
  const { cart } = useCart();
  const { updateProductNavigation } = useActiveProductContext();
  const { activeCategory } = useCategoryContext();
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const isCartEmpty = useMemo(() => !cart || cart.length === 0, [cart]);

  // 🔹 Filter produk berdasarkan kategori dan pencarian
  const filteredProducts = useMemo(() => {
    if (!products) return [];

    return products.filter((item) => {
      const matchCategory = activeCategory ? item.category === activeCategory : true;
      const matchSearch = searchQuery ? item.name.toLowerCase().includes(searchQuery.toLowerCase()) : true;
      return matchCategory && matchSearch;
    });
  }, [activeCategory, products, searchQuery]);

  // 🔹 Sorting berdasarkan pilihan pengguna
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case "Price":
          return a.price - b.price;
        case "Calorie":
          return a.metadata.calorie - b.metadata.calorie;
        case "Protein":
          return a.metadata.proteins - b.metadata.proteins;
        case "Carbs":
          return a.metadata.carbs - b.metadata.carbs;
        default:
          return 0;
      }
    });
  }, [filteredProducts, sortBy]);

  // 🔹 Fungsi untuk navigasi ke detail produk
  const handleOpenDetail = useCallback(
    (productId: number) => {
      const productIdList: number[] = [];

      if (!activeCategory) {
        categories.forEach((category) => {
          const innerList = productCategoryGroup[category]?.map((item) => item.id) || [];
          productIdList.push(...innerList);
        });
      } else {
        const innerList = filteredProducts.map((item) => item.id);
        productIdList.push(...innerList);
      }

      updateProductNavigation(productIdList, productId);
    },
    [activeCategory, categories, filteredProducts, productCategoryGroup, updateProductNavigation]
  );

  // 🔹 Menampilkan status loading
  if (isLoading) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  // 🔹 Menampilkan error jika terjadi masalah
  if (error) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <div className="text-2xl">Something went wrong</div>
      </div>
    );
  }

  // 🔹 Jika tidak ada produk
  if (!products) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <div className="text-2xl">No products available</div>
      </div>
    );
  }

  // 🔹 Jika kategori belum dipilih & pencarian kosong, tampilkan semua kategori
  if (!activeCategory && searchQuery.trim().length === 0) {
    return (
      <div className={cn("py-5 px-4 flex flex-col gap-5", !isCartEmpty ? "pb-32" : "")}>
        {categories.map((category) => (
          <div key={category} className="flex flex-col">
            <h1 className="font-bold text-2xl">{category}</h1>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {productCategoryGroup[category]?.map((item) => (
                <ProductCard onClick={handleOpenDetail} key={item.id} {...item} />
              ))}
            </div>
          </div>
        ))}
        {!isCartEmpty && (
          <div className="fixed bottom-0 left-0 w-full h-fit px-4 pb-[56px]">
            <AddToCartButton withProductThumbnails />
          </div>
        )}
      </div>
    );
  }

  // 🔹 Tampilkan hasil pencarian atau produk dari kategori aktif
  return (
    <div className={cn("py-5 px-4", !isCartEmpty ? "pb-32" : "")}>
      <div className="grid grid-cols-2 gap-[10px]">
        {sortedProducts.map((item) => (
          <ProductCard onClick={handleOpenDetail} key={item.id} {...item} />
        ))}
      </div>
      {!isCartEmpty && (
        <div className="fixed bottom-0 left-0 w-full h-fit px-4 pb-[56px]">
          <AddToCartButton withProductThumbnails />
        </div>
      )}

      {/* Modal CartScreen */}
      {isCartOpen && <CartScreen onClose={() => setIsCartOpen(false)} />}
    </div>
  );
};

export default ProductList;
