"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const links = [
    { label: "Ancestries", href: "/ancestries" },
    { label: "Edges", href: "/edges" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0f172a] backdrop-blur-md shadow-md p-4 flex justify-center">
      <nav className="flex gap-4">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`
                px-4 py-2 rounded-md font-semibold text-sm transition-colors
                ${isActive ? "bg-blue-700 text-blue-200" : "text-gray-300 hover:bg-blue-800 hover:text-blue-200"}
              `}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}