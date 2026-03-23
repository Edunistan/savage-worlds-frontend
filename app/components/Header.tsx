"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function Header() {
  const pathname = usePathname();

  const links = [
    { label: "Ancestries", href: "/ancestries" },
    { label: "Edges", href: "/edges" },
    { label: "Hindrances", href: "/hindrances" },
    { label: "Skills", href: "/skills" },
    { label: "Gear", href: "/gear" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0f172a] backdrop-blur-md shadow-md p-4 flex justify-center">
      <nav className="flex gap-4 relative">
        {links.map((link) => {
          const isActive = pathname === link.href;
          
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`
                relative px-4 py-2 rounded-md font-semibold text-sm transition-colors z-10
                ${isActive ? "text-blue-200" : "text-gray-300 hover:text-blue-200"}
              `}
            >
              {/* Sliding Background */}
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-blue-700 rounded-md -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}