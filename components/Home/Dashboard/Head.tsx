import Pro from "@/ui/Pro";
import Typography from "@/ui/typo";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

const Head = () => {
  return (
    <div className="flex items-start justify-between gap-2 ">
      <div className="flex flex-col items-start justify-start gap-2">
        <Typography className="" type="subtitle">
          Dashboard <Pro />
        </Typography>
        <Typography type="title">Employee Summary</Typography>
      </div>
      <div className="flex items-center justify-center gap-2">
        <button
          className={`text-base px-4 h-12 gap-2 flex items-center justify-center rounded-full text-black bg-off-white  hover:bg-primary hover:text-white cursor-pointer  duration-300 ease-in-out overflow-hidden shrink-0 group`}
        >
          <Icon icon="cil:filter" className="text-lg" /> Filter
        </button>
        <button
          className={`text-base px-4 h-12 gap-2 flex items-center justify-center rounded-full text-black bg-off-white  hover:bg-primary hover:text-white cursor-pointer  duration-300 ease-in-out overflow-hidden shrink-0 group`}
        >
          All Departments
          <Icon icon="iconamoon:arrow-down-2" className="text-lg" />
        </button>
      </div>
    </div>
  );
};

export default Head;
