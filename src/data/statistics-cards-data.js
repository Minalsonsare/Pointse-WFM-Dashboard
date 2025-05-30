import {
  CalendarDaysIcon,
  UserPlusIcon,
  UsersIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  {
    color: "gray",
    icon: CalendarDaysIcon,
    title: "Tue, Feb ",
    value: "13",
    footer: {
      // color: "text-green-500",
      // value: "+55%",
      // label: "than last week",
    },
  },
  {
    color: "gray",
    icon: UsersIcon,
    title: "Paid Hours",
    value: "8",
    footer: {
      // color: "text-green-500",
      // value: "+3%",
      // label: "than last month",
    },
  },
  {
    color: "gray",
    icon: UserPlusIcon,
    title: "Wages",
    value: "100",
    footer: {
      // color: "text-red-500",
      // value: "-2%",
      // label: "than yesterday",
    },
  },
  {
    color: "gray",
    icon: ChartBarIcon,
    title: "Sales",
    value: "$103,430",
    footer: {
      // color: "text-green-500",
      // value: "+5%",
      // label: "than yesterday",
    },
  },
];

export default statisticsCardsData;
