import { getProducts } from "@/api/getProducts";
import { GET_PRODUCTS } from "@/constants/queryKey";
import { Product } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

interface ProductCategoryGroup {
  // Category name: Multiple products
  // Hashmap category as its key,
  // Array of product as its value
  [key: string]: Product[];
}

interface ProductMap {
  // Hashmap product ID as its key,
  // Product as its value
  [key: number]: Product;
}

const useProduct = () => {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: [GET_PRODUCTS],
    queryFn: async () => await getProducts(),
  });

  const productMap: ProductMap = useMemo(() => {
    const newMap: ProductMap = {};
    if (!products) return newMap;
    products.forEach((item) => {
      newMap[item.id] = item;
    });
    return newMap;
  }, [products]);

  const categories: string[] = useMemo(() => {
    if (!products) return []
    const uniqueCategories = new Set(products.map(product => product.category));
    const categoriesArray = Array.from(uniqueCategories);
    console.log("ini category: " + categoriesArray.length);
    return categoriesArray
  }, [products]);

//   const categories: string[] = useMemo(() => {
//   if (!products || products.length === 0) return [];

//   // Ambil kategori unik dari produk
//   const uniqueCategories = Array.from(new Set(products.map(product => product.category)));

//   console.log("Daftar kategori:", uniqueCategories);
//   return uniqueCategories;
// }, [products]); // Akan dieksekusi ulang hanya jika `products` berubah

  const productCategoryGroup: ProductCategoryGroup = useMemo(() => {
    const newGroup: ProductCategoryGroup = {};
    if (!products) return newGroup;
    categories.forEach((category) => {
      const productList = products.filter(each => each.category === category);
      newGroup[category] = productList;
    });
    return newGroup;
  }, [categories, products]);

  return { products, productMap, productCategoryGroup, categories, isLoading, error };
};

export default useProduct;
