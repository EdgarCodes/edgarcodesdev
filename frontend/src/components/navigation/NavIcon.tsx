import { Link } from "react-router-dom";

interface NavIconProps {
  icon: string;
  to: string;
}

function NavIcon({ icon, to }: NavIconProps) {
  return (
    <Link
      to={to}
      key={icon}
      className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-[#292929] transition-all duration-150 cursor-pointer"
    >
      <i className={`hn ${icon} text-xl`} />
    </Link>
  );
}

export default NavIcon;
