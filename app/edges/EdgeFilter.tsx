"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const categories = [
  "Background",
  "Combat",
  "Leadership",
  "Power",
  "Professional",
  "Social",
  "Weird",
  "Legendary",
];

export default function EdgeFilter({ initialQ = "", initialR = "", initialC = "" }) {
  const [q, setQ] = useState(initialQ);
  const [r, setR] = useState(initialR);
  const [c, setC] = useState(initialC);

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (r) params.set("r", r);
    if (c) params.set("c", c);
    router.push(`/edges?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 mb-6">
      <input
        type="text"
        placeholder="Search..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="p-2 rounded-md bg-[#0f172a] border border-blue-900/30 text-gray-200 flex-1"
      />

      <input
        type="text"
        placeholder="Requirements..."
        value={r}
        onChange={(e) => setR(e.target.value)}
        className="p-2 rounded-md bg-[#0f172a] border border-blue-900/30 text-gray-200 flex-1"
      />

      <select
        value={c}
        onChange={(e) => setC(e.target.value)}
        className="p-2 rounded-md bg-[#0f172a] border border-blue-900/30 text-gray-200 flex-1"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Apply
      </button>
    </form>
  );
}