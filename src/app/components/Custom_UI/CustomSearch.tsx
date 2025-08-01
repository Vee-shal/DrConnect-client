"use client";
import React from "react";
import { FaSearch } from "react-icons/fa";

type SearchBarProps = {
  placeholder?: string;
  onChange: (value: string) => void;
};

const CustomSearch = ({ placeholder = "Search...", onChange }: SearchBarProps) => {
  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-0">
      <div className="flex items-center bg-white border border-[var(--color-border)] rounded-full px-4 py-2 shadow-sm w-full max-w-md mx-auto">
        <FaSearch className="text-[var(--color-text-light)] mr-3 text-sm sm:text-base" />
        <input
          type="search"
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="bg-transparent focus:outline-none text-black w-full placeholder:text-[var(--color-text-light)] text-sm sm:text-base"
        />
      </div>
    </div>
  );
};

export default CustomSearch;
