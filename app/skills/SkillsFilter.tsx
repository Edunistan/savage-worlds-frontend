"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const attributes = [
    "Agility",
    "Smarts",
    "Spirit",
    "Strength",
    "Vigor",
];

const is_core = [
    "Core skills",
];

export default function SkillsFilter({ initialQ="", initialL="", initialC=""}) {
    const [q, setQ] = useState(initialQ);
    const [l, setL] = useState(initialL);
    const [c, setC] = useState(initialC);

    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (q) params.set("q", q);
        if (l) params.set("l", l);
        if (c) params.set("c", c);
        router.push(`/skills?${params.toString()}`);
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

        <select
            value={l}
            onChange={(e) => setL(e.target.value)}
            className="p-2 rounded-md bg-[#0f172a] border border-blue-900/30 text-gray-200 flex-1"
        >
            <option value="">Any linked attribute</option>
            {attributes.map((cat) => (
            <option key={cat} value={cat}>
                {cat}
            </option>
            ))}
        </select>

        <select
            value={c}
            onChange={(e) => setC(e.target.value)}
            className="p-2 rounded-md bg-[#0f172a] border border-blue-900/30 text-gray-200 flex-1"
        >
            <option value="">Any skills</option>
            {is_core.map((cat) => (
            <option key={cat} value={"true"}>
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