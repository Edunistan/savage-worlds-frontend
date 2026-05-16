"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const types = [
    "Animals & tack",
    "Adventuring Gear",
    "Clothing",
    "Computers & Electronics",
    "Firearms Accessories",
    "Food",
    "Personal Defense",
    "Surveillance",
    "Ammo",
    "Shield",
    "Armor",
    "Melee weapon",
    "Ranged weapon",
];

export default function GearFilter({ initialQ="", initialT="", initialMaxC="", initialMaxW="" }) {
    const [q, setQ] = useState(initialQ);
    const [t, setT] = useState(initialT);
    const [max_c, setMaxC] = useState(initialMaxC);
    const [max_w, setMaxW] = useState(initialMaxW);

    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (q) params.set("q", q);
        if (t) params.set("t", t);
        if (max_c) params.set("max_c", max_c);
        if (max_w) params.set("max_w", max_w);
        router.push(`/gear?${params.toString()}`);
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
            placeholder="Maximum cost..."
            value={max_c}
            onChange={(e) => setMaxC(e.target.value)}
            className="p-2 rounded-md bg-[#0f172a] border border-blue-900/30 text-gray-200 flex-1"
        />

        <input
            type="text"
            placeholder="Maximum weight..."
            value={max_w}
            onChange={(e) => setMaxW(e.target.value)}
            className="p-2 rounded-md bg-[#0f172a] border border-blue-900/30 text-gray-200 flex-1"
        />

        <select
            value={t}
            onChange={(e) => setT(e.target.value)}
            className="p-2 rounded-md bg-[#0f172a] border border-blue-900/30 text-gray-200 flex-1"
        >
            <option value="">All Types</option>
            {types.map((cat) => (
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