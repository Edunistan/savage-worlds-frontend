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

export default function AncestriesClient({
  ancestries,
}: {
  ancestries: Ancestry[];
}) {
  const [selected, setSelected] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [activeId, setActiveId] = useState<number | null>(null);

  const handleClick = async (id: number) => {
    setLoading(true);
    setActiveId(id);

    try {
      const data = await getAncestry(id);
      setSelected(data);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        display: "flex",
        height: "85vh",
        background: "#0f172a",
        color: "#e2e8f0",
        borderRadius: "12px",
        overflow: "hidden",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* SIDEBAR */}
      <div
        style={{
          width: "30%",
          overflowY: "auto",
          borderRight: "1px solid #1e293b",
          padding: "1rem",
          background: "#020617",
        }}
      >
        <h2 style={{ marginBottom: "1rem", fontSize: "1.2rem" }}>
          🧬 Ancestries
        </h2>

        <ul style={{ listStyle: "none", padding: 0 }}>
          {ancestries.map((a) => (
            <li
              key={a.id}
              onClick={() => handleClick(a.id)}
              style={{
                padding: "10px",
                borderRadius: "8px",
                marginBottom: "6px",
                cursor: "pointer",
                background:
                  activeId === a.id ? "#1e293b" : "transparent",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#1e293b")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background =
                  activeId === a.id ? "#1e293b" : "transparent")
              }
            >
              {a.name}
            </li>
          ))}
        </ul>
      </div>

      {/* DETALLE */}
      <div
        style={{
          flex: 1,
          padding: "2rem",
          overflowY: "auto",
        }}
      >
        {loading && (
          <p style={{ opacity: 0.7 }}>⏳ Loading ancestry...</p>
        )}

        {!loading && selected && (
          <div
            style={{
              background: "#020617",
              padding: "1.5rem",
              borderRadius: "12px",
              boxShadow: "0 0 20px rgba(0,0,0,0.4)",
            }}
          >
            <h1
              style={{
                fontSize: "1.8rem",
                marginBottom: "0.5rem",
              }}
            >
              {selected.ancestry.name}
            </h1>

            <p
              style={{
                opacity: 0.8,
                lineHeight: "1.6",
                marginBottom: "1.5rem",
              }}
            >
              {selected.ancestry.description}
            </p>

            <h3 style={{ marginBottom: "0.5rem" }}>
              ⚡ Abilities
            </h3>

            <ul style={{ listStyle: "none", padding: 0 }}>
              {selected.abilities.map((ab: Ability) => (
                <li
                  key={ab.id}
                  style={{
                    marginBottom: "1rem",
                    padding: "1rem",
                    background: "#0f172a",
                    borderRadius: "10px",
                    border: "1px solid #1e293b",
                  }}
                >
                  <strong>{ab.name}</strong>
                  <p style={{ opacity: 0.8, marginTop: "4px" }}>
                    {ab.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {!loading && !selected && (
          <div
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: 0.5,
              fontSize: "1.2rem",
            }}
          >
            👉 Select an ancestry
          </div>
        )}
      </div>
    </div>
  );
}