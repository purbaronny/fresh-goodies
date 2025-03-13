"use client";

import AddToCartButton from "@/components/AddToCartButton";
import ProductCard from "@/components/ProductCard";
import useActiveProductContext from "@/context/ActiveProductContext";
import useCategoryContext from "@/context/CategoryContext";
import useCart from "@/hooks/useCart";
import useProduct from "@/hooks/useProduct";
import cn from "classnames";
import { useCallback, useMemo, useState } from "react";

type ProductListProps = {
  searchQuery: string;
  sortBy: string;
};


const ProductList: React.FC<ProductListProps> = ({ searchQuery, sortBy }) => {
  console.log("jah:: " + searchQuery);
  const { products, isLoading, error, categories, productCategoryGroup } =
    useProduct();
    console.log("jah856656565651:: " + products?.length);
  const { cart } = useCart();
  

  const isCartEmpty = useMemo(() => {
    return cart === undefined || cart.length === 0
  }, [cart])
  console.log("jah2:: " + searchQuery);
  const { updateProductNavigation } = useActiveProductContext();
  const { activeCategory } = useCategoryContext();

  // const filteredProducts = useMemo(() => {
  //   if (!products || !activeCategory) return [];
  //   return products.filter((item) => item.category === activeCategory);
  // }, [activeCategory, products]);
  console.log("jah33:: " + searchQuery);
  // const filteredProducts = useMemo(() => {
  //   console.log("masuk: " + searchQuery)
  //   if (!products || !activeCategory) {
  //     console.log("kenapa ke sini: " + products);  
  //     console.log("kenapa ke sini2: " + activeCategory);  
  //     return [];
  //   }
  //   console.log("cari " + searchQuery);
  //   return products.filter((item) => item.category === activeCategory);
  // }, [activeCategory, products]);
  // console.log("jah44:: " + filteredProducts);

  // if(filteredProducts.length === 0 && searchQuery.trim().length > 0) {
  //   //console.log("jah55:: " + filteredProducts);
  //   const filteredProducts = products?.filter(product =>
  //       product.category.toLowerCase().includes(searchQuery.toLowerCase())
  //     ) || [];

  //     console.log("ggiii " + filteredProducts.length);
  // }

  const filteredProducts = useMemo(() => {
    console.log("Search Query:", searchQuery);
    console.log("Active Category:", activeCategory);

    if (!products) return []; // Pastikan products ada
    console.log("Search Query222: ", products.length);
    let as = products.filter((item) => {
        const matchCategory = activeCategory ? item.category === activeCategory : true;
        const matchSearch = searchQuery
            ? item.category.toLowerCase().includes(searchQuery.toLowerCase())
            : true;

        return matchCategory && matchSearch;
    });
    
    console.log("aass: " + as.length);
    
    // const uniqueCategories = new Set(as.map(b => b.category));

    // const [categories, setCategories] = useState(uniqueCategories);
    
    // Mengubah Set ke dalam array
    //return Array.from(uniqueCategories);

    return as;
}, [activeCategory, products, searchQuery]);

  // const filteredProducts = products?.filter(product =>
  //   product.name.toLowerCase().includes(searchQuery.toLowerCase())
  // ) || [];
  console.log("jah6:: " + searchQuery);
  const sortedProducts = [...filteredProducts].sort((a, b) => {
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
  console.log("jah7:: " + searchQuery);
  const handleOpenDetail = useCallback(
    (productId: number) => {
      const productIdList: number[] = [];
      if (!activeCategory) {
        categories.forEach((category) => {
          const innerList = productCategoryGroup[category].map(
            (item) => item.id
          );
          productIdList.push(...innerList);
        });
      } else {
        const innerList = filteredProducts.map((item) => item.id);
        productIdList.push(...innerList);
      }
      updateProductNavigation(productIdList, productId);
    },
    [
      activeCategory,
      categories,
      filteredProducts,
      productCategoryGroup,
      updateProductNavigation,
    ]
  );
  console.log("jah7777777777777:: " + products?.length);

  if (isLoading)
    return (
      <div className="h-full w-full flex justify-center items-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
    console.log("jah88:: " + searchQuery);
  if (!products)
    return (
      <div className="h-full w-full flex justify-center items-center">
        <div className="text-2xl">No products</div>
      </div>
    );

  if (error)
    return (
      <div className="h-full w-full flex justify-center items-center">
        <div className="text-2xl">Something is wrong</div>
      </div>
    );
    console.log("jah99:: " + searchQuery);
    console.log("jah99activeCategory:: " + activeCategory);
  if (!activeCategory && searchQuery.trim().length == 0) {
    console.log("jah1000000:: " + searchQuery);
    return (
      <div className={cn("py-5 px-4 flex flex-col gap-5", !isCartEmpty ? "pb-32" : "")}>
        {categories.map((category) => (
          <div key={category} className="flex flex-col">
            <h1 className="font-bold text-2xl">{category}</h1>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {productCategoryGroup[category].map((item, index) => (
                <ProductCard
                  onClick={handleOpenDetail}
                  key={item.id}
                  {...item}
                />
              ))}
            </div>
          </div>
        ))}
        {!isCartEmpty ? (
          <div className="fixed bottom-0 left-0 w-full h-fit px-4 pb-[56px]">
            <AddToCartButton withProductThumbnails />
          </div>
        ) : null}
      </div>
    );
  }
  console.log("jah1111111111:: " + searchQuery);
  return (
    <div className={cn("py-5 px-4", !isCartEmpty ? "pb-32" : "")}>
      <div className="grid grid-cols-2 gap-[10px]">
        {filteredProducts.map((item, index) => (
          <ProductCard onClick={handleOpenDetail} key={item.id} {...item} />
        ))}
      </div>
      {!isCartEmpty ? (
        <div className="fixed bottom-0 left-0 w-full h-fit px-4 pb-[56px]">
          <AddToCartButton withProductThumbnails />
        </div>
      ) : null}
    </div>
  );
};

export default ProductList;
