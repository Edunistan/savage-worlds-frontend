"use client";

import { useState } from "react";

type Edge = {
    id: number;
    name: string;
    category: string;
    requirements: string;
    description: string;
    summary: string;
};

export default function EdgeList({ edges }: {edges: Edge[] }) {
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
            {edges?.map((edge) => {
                const isOpen = openId === edge.id;
                const isVisible = visibleId === edge.id;

                return (
                    <div
                        key={edge.id}
                        className="bg-[#0f172a] border border-blue-900/30 rounded-2xl shadow-lg overflow-hidden transition-all"
                    >
                        {/* HEADER */}
                        <div
                        onClick={() => handleClick(edge.id)}
                        className="cursor-pointer p-5 hover:bg-[#1e293b] transition-colors"
                        >
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col md:flex-row md:items-center gap-2">
                                <h2 className="text-xl font-semibold text-blue-400">{edge.name}</h2>
                                
                                {edge.requirements && (
                                <span className="bg-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                                    {edge.requirements}
                                </span>
                                )}

                                {edge.category && (
                                <span className="bg-red-800 text-xs font-medium px-2 py-0.5 rounded-full">
                                    {edge.category}
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
                            {edge.summary}
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
                                <p className="mb-4">{edge.description}</p>

                                
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