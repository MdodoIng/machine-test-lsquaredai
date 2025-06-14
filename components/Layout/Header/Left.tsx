"use client";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import blr from "@/assets/blur.png";
import { useState } from "react";

const Left = () => {
  const [active, setActive] = useState<number>(0);

  const dummiData = [
    "Employees summary",
    "Daily attendance",
    "Performance",
    "Payroll",
    "Recruitment",
  ];
  return (
    <div className="flex items-center justify-start gap-10 px-6 overflow-hidden">
      <Image
        src={logo}
        alt="logo"
        quality={50}
        className="size-12 object-contain object-left"
        placeholder="blur"
        blurDataURL={blr.blurDataURL}
      />

      <menu className="flex items-center justify-start gap-2 overflow-x-scroll hide-scrollbar snap-mandatory">
        {dummiData.map((item, idx) => (
          <button
            key={idx}
            onClick={() => (active === idx ? "" : setActive(idx))}
            className={`text-sm shrink-0 px-4 h-12 flex items-center rounded-full text-black bg-secondary hover:bg-primary hover:text-white cursor-pointer ${
              active === idx && "!bg-primary !text-white"
            } duration-300 ease-in-out`}
          >
            {item}
          </button>
        ))}
      </menu>
    </div>
  );
};

export default Left;
