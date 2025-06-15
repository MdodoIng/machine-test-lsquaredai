"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";

const navItems = [
  { id: "home", icon: "mdi:home", label: "Home" },
  { id: "users", icon: "mdi:account-group", label: "Users" },
  { id: "calendar", icon: "mdi:calendar", label: "Calendar" },
];

const Footer = () => {
  const [active, setActive] = useState("home");

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-black px-3 py-2 rounded-full flex space-x-3 shadow-2xl z-50 md:hidden">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActive(item.id)}
          className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 ${
            active === item.id
              ? "bg-white text-blue-600"
              : "text-gray-400 bg-off-black"
          }`}
        >
          <Icon icon={item.icon} width={20} height={20} />
        </button>
      ))}
    </div>
  );
};

export default Footer;
