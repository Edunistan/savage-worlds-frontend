"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const ranks = [
  "n",
  "s",
  "v",
  "h",
  "l",
];

export default function PowerFilter({
  initialQ = "",
  initialR = "",
  initialPP = "",
}) {
  const [q, setQ] = useState(initialQ);
  const [r, setR] = useState(initialR);
  const [pp, setPP] = useState(initialPP);

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (q) params.set("q", q);
    if (r) params.set("r", r);
    if (pp) params.set("pp", pp);

    router.push(`/powers?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row gap-3 mb-6"
    >
      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search powers..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="p-2 rounded-md bg-[#0f172a] border border-blue-900/30 text-gray-200 flex-1"
      />

      {/* RANK */}
      <select
        value={r}
        onChange={(e) => setR(e.target.value)}
        className="p-2 rounded-md bg-[#0f172a] border border-blue-900/30 text-gray-200 flex-1"
      >
        <option value="">All Ranks</option>

        {ranks.map((rank) => (
          <option key={rank} value={rank}>
            {rank.toUpperCase()}
          </option>
        ))}
      </select>

      {/* POWER POINTS */}
      <input
        type="text"
        placeholder="Power Points..."
        value={pp}
        onChange={(e) => setPP(e.target.value)}
        className="p-2 rounded-md bg-[#0f172a] border border-blue-900/30 text-gray-200 flex-1"
      />

      {/* BUTTON */}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Apply
      </button>
    </form>
  );
}