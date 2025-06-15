"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useRef, useState } from "react";

const navItems = [
  { id: "home", icon: "mdi:home", label: "Home" },
  { id: "users", icon: "mdi:account-group", label: "Users" },
  { id: "calendar", icon: "mdi:calendar", label: "Calendar" },
];

const Footer = () => {
  const [active, setActive] = useState("home");
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const timeoutRef = useRef<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;

     
      clearTimeout(timeoutRef.current!);
      timeoutRef.current = setTimeout(() => setVisible(true), 200);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutRef.current!);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 bg-black px-3 py-2 rounded-full flex space-x-3 shadow-2xl z-50 transition-all duration-300 lg:hidden ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-5 pointer-events-none"
      }`}
    >
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
