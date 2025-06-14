import { Icon } from "@iconify/react/dist/iconify.js";

const NavButton = ({
  icon,
  children,
}: {
  icon?: string;
  children?: React.ReactNode;
}) => (
  <button
    className={`text-base aspect-square h-12 flex items-center justify-center rounded-full text-black lg:bg-white bg-off-white hover:bg-primary hover:text-white cursor-pointer  duration-300 ease-in-out overflow-hidden shrink-0 group`}
  >
    {" "}
    {children ? children : <Icon icon={icon!} className="text-lg" />}
  </button>
);

export default NavButton;
