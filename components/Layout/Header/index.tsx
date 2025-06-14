import Left from "./Left";
import Right from "./Right";

const Header = () => {
  return (
    <nav className="fixed top-4 z-50 wrapper mx-auto gap-10 grid grid-cols-[1fr_400px] ">
      <Left />
      <Right />
    </nav>
  );
};

export default Header;
