import { NavLink } from "react-router-dom";

interface NavItemProps {
  to: string;
  icon: string;
  label: string;
  end?: boolean;
}

function NavItem({ to, icon, label, end }: NavItemProps) {
  return (
  <NavLink
    to={to}
    end={end}
    className={({ isActive }) =>
      `flex items-center ml-1 text-lg font-light py-2 pl-2 rounded-md transition-all duration-150 border-l-2 ${
        isActive
          ? "bg-[#292929] border-[#f8ba74] text-white"
          : "border-transparent text-gray-400 hover:bg-[#1f1f1f] hover:text-white"
      }`
    }
  >
    <i className={`hn ${icon} mr-3 text-xl`}/>
    {label}
  </NavLink>
  );
}

export default NavItem;
