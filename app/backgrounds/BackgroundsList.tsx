"use client";

type ArcaneBackground = {
  id: number;
  name: string;
  arcane_skill: string;
  starting_powers: number;
  power_points: number;
  description: string;
};

export default function ArcaneBackgroundList({
  backgrounds,
}: {
  backgrounds: ArcaneBackground[];
}) {
  return (
    <div className="max-h-[75vh] overflow-y-auto pr-2 space-y-4 mt-4">
      {backgrounds?.map((background) => (
        <div
          key={background.id}
          className="bg-[#0f172a] border border-blue-900/30 rounded-2xl shadow-lg overflow-hidden transition-all"
        >
          <div className="p-5">
            {/* HEADER */}
            <div className="flex justify-between items-start gap-4 mb-3">
              <div className="flex flex-col gap-2">
                {/* NAME */}
                <h2 className="text-xl font-semibold text-blue-400">
                  {background.name}
                </h2>

                {/* TAGS */}
                <div className="flex flex-wrap gap-2">
                  <span className="bg-purple-800 text-xs font-medium px-2 py-0.5 rounded-full">
                    {background.arcane_skill}
                  </span>

                  <span className="bg-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                    {background.starting_powers} Starting Powers
                  </span>

                  <span className="bg-cyan-800 text-xs font-medium px-2 py-0.5 rounded-full">
                    {background.power_points} PP
                  </span>
                </div>
              </div>
            </div>

            {/* DESCRIPTION */}
            <p className="text-white-400 whitespace-pre-line">
              {background.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}