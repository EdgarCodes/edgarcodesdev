import NavItem from "./navigation/NavItem";
import NavIcon from "./navigation/NavIcon";
import logo from "../assets/logo_2.png"

function Sidebar() {
  return (
    <div className="flex flex-col text-white min-w-65 h-screen border-r border-[#363636]">
      <div className="px-4 py-6">
        <div className="flex items-center mb-1">
          <div className="w-11 mb-1 mr-1">
            <img src={logo}/>
          </div>
          <span className="text-2xl font-bold tracking-tight">edgar-codes</span>
        </div>
        <p className="text-xs text-gray-500 font-mono ml-12">~/portfolio</p>
      </div>

      <div className="border-t border-[#363636] mx-4" />

      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        <p className="text-xs text-gray-600 font-mono px-2 mb-2">navigation</p>
        <NavItem to="/" icon="hn-home" label="/overview" end />
        <NavItem to="/projects" icon="hn-retro-pc" label="/projects" />
        <NavItem to="/blogs" icon="hn-save" label="/blogs" />
        <NavItem to="/contact" icon="hn-message-dots" label="/contact" />
      </nav>

      <div className="border-t border-[#363636] mx-4" />

      <div className="px-4 py-2">
        <p className="text-xs text-gray-600 font-mono mb-3">socials</p>
        <div className="flex gap-1">
          <NavIcon to="/" icon="hn-github" />
          <NavIcon to="/" icon="hn-linkedin" />
          <NavIcon to="/" icon="hn-youtube" />
          <NavIcon to="/" icon="hn-envelope-solid" />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
