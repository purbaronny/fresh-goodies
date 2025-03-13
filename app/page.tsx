"use client"

import CategoryList from "@/components/CategoryList";
import Header from "@/components/Header";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import { useState } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Category");

  return (
    <main className="">
      <Header onSearch={(query, sort) => { setSearchQuery(query); setSortBy(sort); }} />
      <CategoryList />
      <ProductList searchQuery={searchQuery} sortBy={sortBy} />
      <ProductDetail />
    </main>
  );
}
