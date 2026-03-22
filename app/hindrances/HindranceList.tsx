"use client";

import { useState } from "react";

type Hindrance = {
    id: number;
    name: string;
    type: string;
    description: string;
    summary: string;
};

export default function HindranceList({ hindrances }: {hindrances: Hindrance[] }) {
    const [openId, setOpenId] = useState<number | null>(null);
    const [visibleId, setVisibleId] = useState<number | null>(null);

    const handleClick = async (id: number) => {
        if (openId == id) {
            setVisibleId(null);

            setTimeout(() => {
                setOpenId(null);
            }, 300);

            return;
        }

        setOpenId(id);

        setTimeout(() => {
            setVisibleId(id);
        }, 150);
    };

    return (
        <div className="max-h-[75vh] overflow-y-auto pr-2 space-y-4 mt-4">
            {hindrances?.map((hindrance) => {
                const isOpen = openId === hindrance.id;
                const isVisible = visibleId === hindrance.id;

                return (
                    <div
                        key={hindrance.id}
                        className="bg-[#0f172a] border border-blue-900/30 rounded-2xl shadow-lg overflow-hidden transition-all"
                    >
                        {/* HEADER */}
                        <div
                        onClick={() => handleClick(hindrance.id)}
                        className="cursor-pointer p-5 hover:bg-[#1e293b] transition-colors"
                        >
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col md:flex-row md:items-center gap-2">
                                <h2 className="text-xl font-semibold text-blue-400">{hindrance.name}</h2>
                                
                                {hindrance.type && (
                                <span className="bg-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                                    {hindrance.type}
                                </span>
                                )}
                            </div>

                            <span
                                className={`text-gray-400 ml-2 transition-transform duration-300 ${
                                isOpen ? "rotate-180" : ""
                                }`}
                            >
                                ▼
                            </span>
                        </div>

                        <p
                            className={`text-gray-400 transition-all duration-200`}
                        >
                            {hindrance.summary}
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
                            {(
                            <>
                                {/* FULL DESCRIPTION */}
                                <p className="mb-4">{hindrance.description}</p>

                                
                            </>
                            )}
                        </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}