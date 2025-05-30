import React from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom"; // Import useLocation
import {
  Navbar as MTNavbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  Badge, // Import Badge
} from "@material-tailwind/react";
import {
  Bars3Icon,
  XMarkIcon,
  BellIcon, // Import BellIcon
  ChevronDownIcon, // Import ChevronDownIcon
} from "@heroicons/react/24/outline";

// Simple SVG Logo (replace with your actual logo if available)
const PointsLogo = () => (
  <svg
    width="100"
    height="30"
    viewBox="0 0 150 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <text
      x="45"
      y="28"
      fontFamily="Arial, sans-serif"
      fontSize="24"
      fontWeight="bold"
      fill="#FFFFFF"
    >
      POINTS
    </text>
    <path
      d="M15 8 L35 28 M35 8 L15 28"
      stroke="#6EE7B7"
      strokeWidth="5"
      strokeLinecap="round"
    />
    <path
      d="M20 5 L40 25 M40 5 L20 25"
      stroke="#34D399"
      strokeWidth="3"
      strokeLinecap="round"
      transform="translate(-2, 3)"
    />
  </svg>
);

export function Navbar({ routes, userName = "VendorF", notificationCount = 10 }) {
  const [openNav, setOpenNav] = React.useState(false);
  const location = useLocation(); // Get current path
  const pathname = location.pathname;

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-1 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-1">
      {routes.map(({ name, path, highlight }) => {
        const isActive =
          pathname === path || (pathname.startsWith(path) && path !== "/");
        const isWorkforceManagement = name
          .toLowerCase()
          .includes("workforce management");

        return (
          <Typography
            key={name}
            as="li"
            variant="small"
            color="white"
            className="capitalize"
          >
            <Link
              to={path}
              className={`flex items-center gap-1 p-2 lg:px-3 lg:py-3 font-medium rounded-md transition-colors
                ${
                  isActive || (isWorkforceManagement && highlight)
                    ? "bg-[#3B7F8A] text-white"
                    : "text-white hover:bg-[#3B7F8A]/50"
                }`}
            >
              {name}
            </Link>
          </Typography>
        );
      })}
    </ul>
  );

  return (
    <MTNavbar
      className="w-full max-w-full rounded-none px-4 py-2 lg:px-6 lg:py-3 bg-[#2A636B]"
      fullWidth
    >
      <div className="container mx-auto flex items-center justify-between text-white">
        <Link to="/">
          <PointsLogo />
        </Link>

        <div className="hidden lg:flex lg:ml-8">{navList}</div>

        <div className="hidden lg:flex items-center gap-x-3 lg:gap-x-5 ml-auto">
          <Button
            variant="filled"
            size="sm"
            className="bg-white text-black hover:bg-gray-100 normal-case font-semibold text-sm py-2 px-4"
          >
            Time Card
          </Button>

          <Badge
            content={
              notificationCount > 0
                ? notificationCount.toString()
                : undefined
            }
            withBorder
            color="red"
            invisible={notificationCount === 0}
          >
            <IconButton variant="text">
              <BellIcon className="h-6 w-6 text-white" />
            </IconButton>
          </Badge>

          <div className="flex items-center gap-x-2 cursor-pointer">
            <div className="h-8 w-8 rounded-full bg-gray-500 flex items-center justify-center text-white font-semibold text-sm">
              {userName.charAt(0).toUpperCase()}
            </div>
            <Typography variant="small" color="white" className="font-medium">
              Hi, {userName}
            </Typography>
            <ChevronDownIcon className="h-4 w-4 text-white" />
          </div>
        </div>

        <IconButton
          variant="text"
          size="sm"
          className="ml-auto text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon strokeWidth={2} className="h-6 w-6" />
          ) : (
            <Bars3Icon strokeWidth={2} className="h-6 w-6" />
          )}
        </IconButton>
      </div>

      <Collapse open={openNav}>
        <div className="container mx-auto mt-2 rounded-md bg-[#3B7F8A] p-2">
          {navList}
          <div className="mt-4 flex flex-col gap-y-3 border-t border-white/20 pt-4">
            <Button
              variant="filled"
              size="sm"
              fullWidth
              className="bg-white text-black hover:bg-gray-100 normal-case font-semibold"
            >
              Time Card
            </Button>
            <div className="flex items-center justify-between text-white px-2">
              <div className="flex items-center gap-x-2">
                <BellIcon className="h-6 w-6" />
                <span>Notifications ({notificationCount})</span>
              </div>
              <div className="flex items-center gap-x-2">
                <div className="h-7 w-7 rounded-full bg-gray-500 flex items-center justify-center text-white font-semibold text-xs">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <Typography variant="small" color="white">
                  Hi, {userName}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </Collapse>
    </MTNavbar>
  );
}

Navbar.propTypes = {
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      highlight: PropTypes.bool,
    })
  ).isRequired,
  userName: PropTypes.string,
  notificationCount: PropTypes.number,
};

Navbar.displayName = "/src/widgets/layout/navbar.jsx";

export default Navbar;
