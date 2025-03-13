"use client";

import { useState } from "react";
import Image from "next/image";
import SearchIcon from "@/public/icons/search.svg";
import FilterIcon from "@/public/icons/filter.svg";

const FilterAndSearch: React.FC<{ onSearch: (query: string, sortBy: string) => void }> = ({ onSearch }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="flex gap-7">
      <Image src={FilterIcon} alt="Filter" className="w-6 h-6" />
      <Image
        src={SearchIcon}
        alt="Search"
        className="w-6 h-6 cursor-pointer"
        onClick={() => setIsSearchOpen(true)}
      />
      {isSearchOpen && <SearchScreen onClose={() => setIsSearchOpen(false)} onApply={onSearch} />}
    </div>
  );
};

export default FilterAndSearch;

const SearchScreen: React.FC<{ onClose: () => void; onApply: (query: string, sortBy: string) => void }> = ({ onClose, onApply }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Category");

  return (
    <div className="fixed inset-0 bg-white p-4 flex flex-col gap-4 shadow-lg z-50">
      <button onClick={onClose} className="self-end text-lg font-bold">✕</button>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 border rounded-md"
      />
      <label htmlFor="sortBy" className="font-medium">Sort By</label>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="w-full p-2 border rounded-md"
      >
        <option value="Category">Category</option>
        <option value="Price">Price</option>
        <option value="Calorie">Calorie</option>
        <option value="Protein">Protein</option>
        <option value="Carbs">Carbs</option>
      </select>
      <button
        className="w-full p-2 bg-blue-500 text-white rounded-md mt-2"
        onClick={() => { onApply(searchQuery, sortBy); onClose(); }}
      >
        Apply
      </button>
    </div>
  );
};