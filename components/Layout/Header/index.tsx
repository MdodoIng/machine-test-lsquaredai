import Left from "./Left";
import Right from "./Right";

const Header = () => {
  return (
    <nav className="absolute top-4 z-50  w-full gap-10 grid grid-cols-[1fr_400px] max-md:hidden">
      <Left />
      <Right />
    </nav>
  );
};

export default Header;
