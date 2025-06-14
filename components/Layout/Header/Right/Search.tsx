import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

const Search = ({
  setFormHover,
}: {
  formHover: boolean;
  setFormHover: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <form
      onFocus={() => {
        if (document.startViewTransition) {
          document.startViewTransition(() => {
            setFormHover(true);
          });
        } else {
          setFormHover(true);
        }
      }}
      onBlur={() => {
        if (document.startViewTransition) {
          document.startViewTransition(() => {
            setFormHover(false);
          });
        } else {
          setFormHover(false);
        }
      }}
      className={`flex items-center justify-start gap-3 text-base px-4 h-12  rounded-full text-black bg-white cursor-pointer  duration-1000 transition-all  ease-in-out overflow-hidden w-full  `}
    >
      <Icon
        icon="material-symbols:search-rounded"
        className="text-lg shrink-0"
      />
      <input
        type="text"
        placeholder="Search..."
        className="outline-none bg-transparent placeholder:text-black text-sm w-min"
      />
    </form>
  );
};

export default Search;
