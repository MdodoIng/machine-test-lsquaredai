import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

const Search = ({
  setFormHover,
  formHover,
}: {
  formHover: boolean;
  setFormHover: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <form
      onTouchStart={() => setFormHover(true)}
      onTouchCancel={() => setFormHover(false)}
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
      className={`flex items-center justify-start gap-3 text-base px-4 h-12 max-lg:bg-off-white max-md:bg-transparent max-md:border border-off-white  rounded-full text-black bg-white cursor-pointer  duration-1000 transition-all  ease-in-out overflow-hidden md:w-full max-md:aspect-square max-md:shrink-0 ${formHover && "max-md:w-full"}`}
    >
      <Icon
        icon="material-symbols:search-rounded"
        className="text-lg shrink-0"
      />
      <input
        type="text"
        placeholder="Search..."
        className="outline-none bg-transparent md:placeholder:text-black placeholder:text-transparent  text-sm w-min"
      />
    </form>
  );
};

export default Search;
