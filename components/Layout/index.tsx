import React from "react";
import { twMerge } from "tailwind-merge";
import Header from "./Header";

const Layout = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className="wrapper flex flex-col relative z-auto">
      <Header />
      <main
        className={twMerge(
          "flex size-full items-center justify-center ",
          className
        )}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
