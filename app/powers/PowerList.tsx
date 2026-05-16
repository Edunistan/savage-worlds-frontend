"use client";

import { useState } from "react";
import { getPower } from "@/lib/api";

type Power = {
  id: number;
  name: string;
  rank: string;
  power_points: string;
  range: string;
  duration: string;
  description: string;
  summary: string;
};

type Modifier = {
  id: number;
  name: string;
  cost: string;
  description: string;
};

type PowerDetail = {
  id: number;
  name: string;
  rank: string;
  power_points: string;
  range: string;
  duration: string;
  trappings: string;
  modifiers?: Modifier[];
};

const rankMap: Record<string, string> = {
  n: "Novice",
  s: "Seasoned",
  v: "Veteran",
  h: "Heroic",
  l: "Legendary",
};

export default function PowerList({ powers }: { powers: Power[] }) {
  const [openId, setOpenId] = useState<number | null>(null);
  const [visibleId, setVisibleId] = useState<number | null>(null);
  const [details, setDetails] = useState<Record<number, PowerDetail>>({});

  const handleClick = async (id: number) => {
    // CLOSE
    if (openId === id) {
      setVisibleId(null);

      setTimeout(() => {
        setOpenId(null);
      }, 300);

      return;
    }

    // OPEN
    setOpenId(id);

    setTimeout(() => {
      setVisibleId(id);
    }, 150);

    // FETCH
    if (!details[id]) {
      const data = await getPower(id);

      setDetails((prev) => ({
        ...prev,
        [id]: data,
      }));
    }
  };

  return (
    <div className="max-h-[75vh] overflow-y-auto pr-2 space-y-4 mt-4">
      {powers?.map((power) => {
        const isOpen = openId === power.id;
        const isVisible = visibleId === power.id;
        const data = details[power.id];

        return (
          <div
            key={power.id}
            className="bg-[#0f172a] border border-blue-900/30 rounded-2xl shadow-lg overflow-hidden transition-all"
          >
            {/* HEADER */}
            <div
              onClick={() => handleClick(power.id)}
              className="cursor-pointer p-5 hover:bg-[#1e293b] transition-colors"
            >
              <div className="flex justify-between items-center gap-4">
                <div className="flex flex-col gap-2">
                  {/* NAME */}
                  <h2 className="text-xl font-semibold text-blue-400">
                    {power.name}
                  </h2>

                  {/* TAGS */}
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-purple-800 text-xs font-medium px-2 py-0.5 rounded-full">
                      {rankMap[power.rank] || power.rank}
                    </span>

                    <span className="bg-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                      {power.power_points} PP
                    </span>

                    <span className="bg-cyan-800 text-xs font-medium px-2 py-0.5 rounded-full">
                      {power.range}
                    </span>

                    <span className="bg-green-800 text-xs font-medium px-2 py-0.5 rounded-full">
                      {power.duration}
                    </span>
                  </div>
                </div>

                {/* ICON */}
                <span
                  className={`text-gray-400 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </div>

              {/* SUMMARY */}
              <p
                className={`text-gray-400 transition-all duration-200 mt-3 ${
                  isOpen
                    ? "opacity-0 -translate-y-2 max-h-0 overflow-hidden"
                    : "opacity-100 max-h-20"
                }`}
              >
                {power.summary}
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
                {!data ? (
                  <p className="text-gray-500">Loading...</p>
                ) : (
                  <>
                    {/* DESCRIPTION */}
                    <div className="mb-6">
                      <h3 className="text-blue-300 font-semibold mb-2">
                        Description
                      </h3>

                      <p className="text-gray-300 whitespace-pre-line">
                        {power.description}
                      </p>
                    </div>

                    {/* TRAPPINGS */}
                    {data.trappings && (
                      <div className="mb-6">
                        <h3 className="text-blue-300 font-semibold mb-2">
                          Trappings
                        </h3>

                        <p className="text-gray-400 italic">
                          {data.trappings}
                        </p>
                      </div>
                    )}

                    {/* MODIFIERS */}
                    {data.modifiers?.length > 0 && (
                      <div>
                        <h3 className="text-blue-300 font-semibold mb-3">
                          Modifiers
                        </h3>

                        <div className="space-y-3">
                          {data.modifiers.map((modifier) => (
                            <div
                              key={modifier.id}
                              className="bg-[#020617] border border-blue-900/20 rounded-xl p-4"
                            >
                              <div className="flex justify-between items-start gap-3 mb-2">
                                <p className="text-blue-400 font-semibold">
                                  {modifier.name}
                                </p>

                                <span className="bg-blue-900 text-xs px-2 py-1 rounded-full whitespace-nowrap">
                                  +{modifier.cost} PP
                                </span>
                              </div>

                              <p className="text-gray-400 text-sm whitespace-pre-line">
                                {modifier.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
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