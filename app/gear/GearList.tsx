"use client";

import { useState } from "react";
import { getItem } from "@/lib/api";

type Gear = {
    id: number;
    name: string;
    type: string;
    cost: number;
    weight: number;
    notes: string;
};

type GearStat = {
    id: number;
    gear_id: number;
    category: string;
    subcategory: string;
    damage: string;
    min_str: number;
    range: string;
    ap: number;
    rof: number;
    shots: number;
};

type GearDetail = Gear & {
    stats: GearStat[];
};

export default function GearList({ gear }: { gear: Gear[] }) {
    const [openId, setOpenId] = useState<number | null>(null);
    const [visibleId, setVisibleId] = useState<number | null>(null);

    // Guarda la data obtenida por getItem(id)
    const [details, setDetails] = useState<Record<number, GearDetail>>({});

    const handleClick = async (id: number) => {
        // cerrar
        if (openId === id) {
            setVisibleId(null);
            setTimeout(() => setOpenId(null), 300);
            return;
        }

        // cargar data si aún no existe
        if (!details[id]) {
            try {
                const data = await getItem(id);
                setDetails((prev) => ({
                    ...prev,
                    [id]: data,
                }));
            } catch (err) {
                console.error(err);
            }
        }

        setOpenId(id);
        setTimeout(() => setVisibleId(id), 150);
    };

    return (
        <div className="max-h-[75vh] overflow-y-auto pr-2 space-y-4 mt-4">
            {gear?.map((item) => {
                const isOpen = openId === item.id;
                const isVisible = visibleId === item.id;

                const itemDetails = details[item.id];

                return (
                    <div
                        key={item.id}
                        className="bg-[#0f172a] border border-blue-900/30 rounded-2xl shadow-lg overflow-hidden transition-all"
                    >
                        {/* HEADER */}
                        <div
                            onClick={() => handleClick(item.id)}
                            className="cursor-pointer p-5 hover:bg-[#1e293b] transition-colors"
                        >
                            <div className="flex justify-between items-center">
                                {/* NAME */}
                                <div className="flex flex-col md:flex-row md:items-center gap-2">
                                    <h2 className="text-xl font-semibold flex items-center gap-1">
                                        {item.name}
                                    </h2>

                                    {item.type && (
                                        <span className="bg-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                                            {item.type}
                                        </span>
                                    )}

                                    {item.weight && (
                                        <span className="bg-purple-800 text-xs font-medium px-2 py-0.5 rounded-full">
                                            {item.weight} lb
                                        </span>
                                    )}

                                    {item.cost && (
                                        <span className="bg-green-800 text-xs font-medium px-2 py-0.5 rounded-full">
                                            ${item.cost}
                                        </span>
                                    )}
                                </div>

                                {/* ICON */}
                                <span
                                    className={`text-gray-400 ml-2 transition-transform duration-300 ${
                                        isOpen ? "rotate-180" : ""
                                    }`}
                                >
                                    ▼
                                </span>
                            </div>

                            {/* SUMMARY */}
                            <p className="text-gray-400 transition-all duration-200 mt-1">
                                {item.notes}
                            </p>
                        </div>

                        {/* EXPAND */}
                        <div
                            className={`transition-all duration-300 ease-in-out overflow-hidden ${
                                isVisible
                                    ? "max-h-screen opacity-100 p-5 pt-0"
                                    : "max-h-0 opacity-0"
                            }`}
                        >
                            <div className="text-gray-300 border-t border-blue-900/30 pt-4">

                                {/* STATS */}
                                {itemDetails?.stats?.length > 0 && (
                                    <div className="space-y-3">
                                        {itemDetails.stats.map((stat) => {
                                            const entries = Object.entries(stat).filter(
                                                ([key, value]) =>
                                                    !["id", "gear_id"].includes(key) &&
                                                    value !== null &&
                                                    value !== ""
                                            );

                                            return (
                                                <div
                                                    key={stat.id}
                                                    className="bg-slate-800 rounded-xl p-4 border border-slate-700"
                                                >
                                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                                                        {entries.map(([key, value]) => (
                                                            <div key={key}>
                                                                <span className="text-gray-400 capitalize">
                                                                    {key.replaceAll("_", " ")}:
                                                                </span>{" "}
                                                                {String(value)}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}