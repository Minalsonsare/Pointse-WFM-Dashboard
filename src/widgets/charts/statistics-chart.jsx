import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";

export function StatisticsChart() {
  const chartData = {
    series: [
      {
        name: "Sale",
        type: "column",
        data: [400, 380, 0, 0, 0, 0],
      },
      {
        name: "Visitors",
        type: "column",
        data: [380, 350, 0, 0, 0, 0],
      },
      {
        name: "Employee",
        type: "line",
        data: [80, 10, 0, 0, 0, 0],
      },
    ],
    options: {
      chart: {
        type: "line",
        stacked: false,
        toolbar: { show: false },
      },
      stroke: {
        width: [0, 0, 3],
      },
      plotOptions: {
        bar: {
          columnWidth: "40%",
        },
      },
      colors: ["#EF4444", "#0EA5E9", "#22C55E"],
      xaxis: {
        categories: [
          "08:00 AM",
          "09:00 AM",
          "12:00 PM",
          "02:00 PM",
          "06:00 PM",
          "09:00 PM",
        ],
      },
      yaxis: [
        {
          title: {
            text: "Sale Amount",
            style: { color: "#EF4444" },
          },
          labels: {
            style: { colors: "#EF4444" },
          },
        },
        {
          opposite: true,
          title: {
            text: "Customer & Employee Number",
            style: { color: "#0EA5E9" },
          },
          labels: {
            style: { colors: "#0EA5E9" },
          },
        },
      ],
      tooltip: {
        shared: true,
        intersect: false,
      },
      legend: {
        position: "top",
        horizontalAlign: "center",
      },
    },
  };

  return (
    <Card className="border border-blue-gray-100 shadow-sm">
      <CardHeader floated={false} shadow={false} className="h-[360px]">
        {/* <Chart
          options={chartData.options}
          series={chartData.series}
          type="line"
          height={350}
        /> */}
      </CardHeader>
      <CardBody className="px-6 pt-0">
        <Typography variant="h6" color="blue-gray">
          Employee/Sale/Customer (ratio)
        </Typography>
        {/* <Typography variant="small" className="font-normal text-blue-gray-600">
          Combined report of hourly performance
        </Typography> */}
      </CardBody>
    </Card>
  );
}

export default StatisticsChart;
