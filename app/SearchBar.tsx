"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchBar({ initialValue }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(initialValue || "");

  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("q", value);
    } else {
      params.delete("q");
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="mb-2">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search ancestries..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="flex-1 bg-[#0f172a] border border-blue-900/40 rounded-xl px-4 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 transition-colors px-4 py-2 rounded-xl font-medium"
        >
          Search
        </button>
      </div>
    </form>
  );
}