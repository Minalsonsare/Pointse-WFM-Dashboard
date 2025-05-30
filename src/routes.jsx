import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Schedule",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Timesheet",
        path: "/tables",
        element: <Tables />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Team",
        path: "/notifications",
        element: <Notifications />,
      },
       {
        icon: <InformationCircleIcon {...icon} />,
        name: "Task",
        path: "/notifications",
        element: <Notifications />,
      },
       {
         icon: <TableCellsIcon {...icon} />,
        name: "Reports",
        path: "/notifications",
        element: <Notifications />,
      },
       {
        icon: <InformationCircleIcon {...icon} />,
        name: "Settings",
        path: "/notifications",
        element: <Notifications />,
      },
       {
        icon: <InformationCircleIcon {...icon} />,
        name: "Logs",
        path: "/notifications",
        element: <Notifications />,
      },
    ],
  },
  // {
  //   title: "auth pages",
  //   layout: "auth",
  //   pages: [
  //     {
  //       icon: <ServerStackIcon {...icon} />,
  //       name: "sign in",
  //       path: "/sign-in",
  //       element: <SignIn />,
  //     },
  //     {
  //       icon: <RectangleStackIcon {...icon} />,
  //       name: "sign up",
  //       path: "/sign-up",
  //       element: <SignUp />,
  //     },
  //   ],
  // },
];

export default routes;
