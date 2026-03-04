import { iconMoon, iconSun, logo } from "../assets";
import { useTheme } from "../hooks/useTheme";

const Navbar = () => {
  const { theme, toggle } = useTheme();

  return (
    <div className="bg-neutral-0 dark:bg-neutral-800 rounded-2xl px-4 py-3 flex justify-between shadow my-4 w-full">
      <img src={logo} alt="Logo" className="w-30 lg:w-45" />
      <button
        onClick={toggle}
        className="bg-neutral-100 dark:bg-neutral-700 p-2 rounded-lg cursor-pointer"
        aria-label="Toggle theme"
      >
        <img src={theme === "dark" ? iconSun : iconMoon} alt="theme mode switch" />
      </button>
    </div>
  );
};

export default Navbar;
