"use client";

import { useState } from "react";
import { getAncestry } from "@/lib/api";

type Ancestry = {
  id: number;
  name: string;
  description: string;
};

type Ability = {
  id: number;
  name: string;
  description: string;
};

type AncestryDetail = {
  id: number;
  name: string;
  description: string;
  abilities?: Ability[];
};

export default function AncestryList({ ancestries }: { ancestries: Ancestry[] }) {
  const [openId, setOpenId] = useState<number | null>(null);
  const [visibleId, setVisibleId] = useState<number | null>(null);
  const [details, setDetails] = useState<Record<number, AncestryDetail>>({});

  const handleClick = async (id: number) => {
    if (openId === id) {
      // CERRAR
      setVisibleId(null);

      setTimeout(() => {
        setOpenId(null);
      }, 300);

      return;
    }

    // ABRIR
    setOpenId(id);

    setTimeout(() => {
      setVisibleId(id);
    }, 150);

    if (!details[id]) {
      const data = await getAncestry(id);
      setDetails((prev) => ({ ...prev, [id]: data }));
    }
  };

  return (
    <div className="max-h-[75vh] overflow-y-auto pr-2 space-y-4 mt-4">
      {ancestries?.map((ancestry) => {
        const isOpen = openId === ancestry.id;
        const isVisible = visibleId === ancestry.id;
        const data = details[ancestry.id];

        return (
          <div
            key={ancestry.id}
            className="bg-[#0f172a] border border-blue-900/30 rounded-2xl shadow-lg overflow-hidden transition-all"
          >
            {/* HEADER */}
            <div
              onClick={() => handleClick(ancestry.id)}
              className="cursor-pointer p-5 hover:bg-[#1e293b] transition-colors"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-blue-400">
                  {ancestry.name}
                </h2>

                <span
                  className={`transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </div>

              <p
                className={`text-gray-400 transition-all duration-200 ${
                  isOpen
                    ? "opacity-0 -translate-y-2 max-h-0 overflow-hidden"
                    : "opacity-100 max-h-20"
                }`}
              >
                {ancestry.description}
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
                    {/* FULL DESCRIPTION */}
                    <p className="mb-4">{data.ancestry.description}</p>

                    {/* ABILITIES */}
                    {data.abilities?.length > 0 ? (
                      <div>
                        <h3 className="text-blue-300 font-semibold mb-3">
                          Abilities
                        </h3>

                        <div className="space-y-3">
                          {data.abilities.map((ability) => (
                            <div
                              key={ability.id}
                              className="bg-[#020617] border border-blue-900/20 rounded-xl p-4"
                            >
                              <p className="text-blue-400 font-semibold mb-1">
                                {ability.name}
                              </p>

                              <p className="text-gray-400 text-sm whitespace-pre-line">
                                {ability.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">
                        No abilities found
                      </p>
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