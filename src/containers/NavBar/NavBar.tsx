import { faTableColumns, faUsers } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router";
import IconAndTextLabel from "../../components/IconAndTextLabel/IconAndTextLabel";
import { useAppDispatch } from "../../redux/store";
import { setSearch } from "../../redux/querySlice";

const NavBar = () => {
  const dispatch = useAppDispatch();
  const navItems = [
    {
      id: "dashboard",
      to: "/",
      text: "Dashboard",
      icon: faTableColumns,
    },
    {
      id: "employees",
      to: "/employees",
      text: "Employees",
      icon: faUsers,
    },
  ];
  return (
    <div className="w-1/5 h-screen bg-white border-r border-gray-200 p-6 flex flex-col gap-2">
      {navItems.map((navItem) => (
        <NavLink
          key={navItem.id}
          to={navItem.to}
          className={({ isActive }) =>
            "w-full items-center px-4 py-3 rounded-3xl cursor-pointer transition-all duration-200 text-base font-medium text-left " +
            (isActive
              ? "bg-gradient-to-br from-indigo-500 to-purple-500 text-white font-semibold shadow-lg"
              : "text-gray-500 hover:bg-gray-50 hover:text-gray-700")
          }
          onClick={() => dispatch(setSearch(""))}
        >
          <IconAndTextLabel
            icon={navItem.icon}
            text={navItem.text}
            spacing={"compact"}
          />
        </NavLink>
      ))}
    </div>
  );
};

export default NavBar;
