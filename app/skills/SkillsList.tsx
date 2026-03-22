"use client";

import { useState } from "react";

type Skill = {
  id: number;
  name: string;
  description: string;
  summary: string;
  linked_attribute: string;
  is_core: boolean;
};

export default function SkillsList({ skills }: { skills: Skill[] }) {
  const [openId, setOpenId] = useState<number | null>(null);
  const [visibleId, setVisibleId] = useState<number | null>(null);

  const handleClick = async (id: number) => {
    if (openId === id) {
      setVisibleId(null);
      setTimeout(() => setOpenId(null), 300);
      return;
    }

    setOpenId(id);
    setTimeout(() => setVisibleId(id), 150);
  };

  return (
    <div className="max-h-[75vh] overflow-y-auto pr-2 space-y-4 mt-4">
      {skills?.map((skill) => {
        const isOpen = openId === skill.id;
        const isVisible = visibleId === skill.id;

        return (
          <div
            key={skill.id}
            className="bg-[#0f172a] border border-blue-900/30 rounded-2xl shadow-lg overflow-hidden transition-all"
          >
            {/* HEADER */}
            <div
              onClick={() => handleClick(skill.id)}
              className="cursor-pointer p-5 hover:bg-[#1e293b] transition-colors"
            >
              <div className="flex justify-between items-center">
                {/* NAME + ATTRIBUTE + CORE STAR */}
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <h2
                    className={`text-xl font-semibold flex items-center gap-1 ${
                      skill.is_core ? "text-red-500" : "text-blue-400"
                    }`}
                  >
                    {skill.is_core && <span className="text-red-500">★</span>}
                    {skill.name}
                  </h2>

                  {skill.linked_attribute && (
                    <span className="bg-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                      {skill.linked_attribute}
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
              <p
                className={`text-gray-400 transition-all duration-200 mt-1`}
              >
                {skill.summary}
              </p>
            </div>

            {/* EXPAND */}
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isVisible ? "max-h-screen opacity-100 p-5 pt-0" : "max-h-0 opacity-0"
              }`}
            >
              <div className="text-gray-300 border-t border-blue-900/30 pt-4">
                <p className="mb-4">{skill.description}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}