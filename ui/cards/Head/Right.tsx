import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const Right = ({
  className,
  children,
  linkTo,
  linkToClass,
  icon,
}: {
  className?: string;
  children?: ReactNode;
  linkTo?: string;
  linkToClass?: string;
  icon?: string;
}) => {
  return (
    <div
      className={`flex items-center justify-center gap-2 text-sm max-w-[25ch] ${className}`}
    >
      {(() => {
        switch (true) {
          case !!children:
            return children;
          case !!linkTo:
            return (
              <Link
                href={linkTo}
                className={twMerge(`flex items-center justify-center bg-white h-10 aspect-square w-auto rounded-2xl`, linkToClass)}
              >
                <Icon icon="mdi:chevron-right" className="text-2xl" />
              </Link>
            );
          case !!icon:
            return (
              <button className="flex items-center justify-center bg-primary text-white h-10 aspect-square w-auto rounded-2xl">
                <Icon icon={icon} className="text-2xl" />
              </button>
            );
          default:
            return null;
        }
      })()}
    </div>
  );
};

export default Right;
