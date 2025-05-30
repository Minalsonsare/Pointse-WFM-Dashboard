import React from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
import { StatisticsCard } from "@/widgets/cards"; // Assuming this is correctly pathed
import { statisticsCardsData } from "@/data"; // Assuming this is correctly pathed

// Recharts components
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip as ReTooltip,
  Legend,
  CartesianGrid,
} from "recharts";

// Chart Data
const employeeChartData = [
  { time: "08:00 AM", sale: 400, visitors: 100, employees: 80 },
  { time: "10:00 AM", sale: 390, visitors: 100, employees: 60 },
  { time: "12:00 PM", sale: 0, visitors: 0, employees: 40 },
  { time: "02:00 PM", sale: 0, visitors: 0, employees: 0 },
  { time: "04:00 PM", sale: 0, visitors: 0, employees: 0 },
  { time: "06:00 PM", sale: 0, visitors: 0, employees: 0 },
  { time: "08:00 PM", sale: 0, visitors: 0, employees: 0 },
];

// Shared styles for consistent Card Headers
const sharedCardHeaderStyles = {
  backgroundColor: "#00695c",
  color: "white",
  margin: 0,
  padding: "12px 16px",
  borderRadius: "4px 4px 0 0",
};

const sharedCardHeaderTypographyStyles = {
  margin: 0,
  fontWeight: "bold",
  fontSize: "1.1em", // Consistent title size
};


// InfoCard Component (Now a Material Tailwind Card)
const InfoCard = ({
  title,
  data = [],
  columns = [
    { id: "name", label: "Name", flex: 2, textAlign: "left" },
    { id: "date", label: "Date", flex: 1, textAlign: "left" },
    { id: "status", label: "Status", flex: 1, textAlign: "left" },
  ],
  noDataMessage,
}) => {
  // Styles for the internal layout of the card body
  const columnHeaderRowStyle = {
    display: "flex",
    paddingBottom: "8px",
    marginBottom: "8px",
    borderBottom: "1px solid #b0bec5", // Light gray line
  };

  const columnHeaderCellStyle = (col) => ({
    flex: col.flex || 1,
    fontWeight: "bold",
    color: "#333", // Darker text for headers
    fontSize: "0.9em",
    paddingRight: "8px",
    textAlign: col.textAlign || "left",
  });

  const dataRowStyle = (isLastRow) => ({
    display: "flex",
    padding: "10px 0",
    borderBottom: isLastRow ? "none" : "1px solid #e0e0e0", // Lighter line for data rows
    fontSize: "0.9em",
    color: "#333",
  });

  const dataCellStyle = (col) => ({
    flex: col.flex || 1,
    paddingRight: "8px",
    textAlign: col.textAlign || "left",
  });

  const noDataMessageContainerStyle = {
    border: "1px solid #b0bec5",
    borderRadius: "3px",
    backgroundColor: "white", // White box for the message
  };

  const noDataMessageTextStyle = {
    padding: "12px 16px",
    color: "#555", // Muted text color
    textAlign: "left",
    fontSize: "0.9em",
  };

  return (
    <Card className="mb-6 border border-blue-gray-100 shadow-sm"> {/* Each InfoCard is a Card */}
      <CardHeader floated={false} shadow={false} style={sharedCardHeaderStyles}>
        <Typography style={sharedCardHeaderTypographyStyles} color="white">
          {title}
        </Typography>
      </CardHeader>
      <CardBody className="pt-4 px-4 pb-4 overflow-x-auto min-w-[300px]"> {/* Ensure body can scroll, set a reasonable min-width for content */}
        <div style={{ minWidth: columns.length * 150 }}> {/* Inner div to enforce min-width for flex items if needed */}
          <div style={columnHeaderRowStyle}>
            {columns.map((col) => (
              <div key={col.id} style={columnHeaderCellStyle(col)}>
                {col.label}
              </div>
            ))}
          </div>
          {data && data.length > 0 ? (
            data.map((row, idx) => (
              <div key={idx} style={dataRowStyle(idx === data.length - 1)}>
                {columns.map((col) => (
                  <div key={col.id} style={dataCellStyle(col)}>
                    {row[col.id]}
                  </div>
                ))}
              </div>
            ))
          ) : noDataMessage ? (
            <div style={noDataMessageContainerStyle}>
              <div style={noDataMessageTextStyle}>{noDataMessage}</div>
            </div>
          ) : (
             // Render an empty div or a subtle placeholder if noDataMessage is null
             // to maintain structure if needed, matching the visual of an empty area.
             // For "Flagged Time card" and "No show employees", this will leave the area empty.
            null
          )}
        </div>
      </CardBody>
    </Card>
  );
};

// TodaysScheduleTable Component (Wrapped in a Material Tailwind Card)
const TodaysScheduleTable = () => {
  const timeSlots = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00"];
  const employeeData = [
    { name: "Me", role: "AvgCustomer", wage: "$ 0", schedule: Array(timeSlots.length).fill(false) },
    { name: "Test Employee", role: "AvgEmployee", wage: "$ 12", schedule: Array(timeSlots.length).fill(false) },
    { name: "Socium Employee", role: "AvgEmployee", wage: "$ 10", schedule: Array(timeSlots.length).fill(false) },
    {
      name: "Test Test",
      role: "AvgManager",
      wage: "$ 120",
      additionalLines: [{ text: "$ 0" }, { text: "0" }],
      schedule: Array(timeSlots.length).fill(false),
    },
  ];

  const wageSummary = {
    label1: "Wage",
    label2: "Hours",
    totalValue: "", // Empty as per image
    values: Array(timeSlots.length).fill("0"),
  };

  const salesSummary = {
    label: "Sales",
    totalValue: "$ 0.00",
    values: Array(timeSlots.length).fill("0"),
  };

  // Cell styles (mostly unchanged, applied to <td> and <th> within the table)
  const cellStyle = { padding: "8px", border: "1px solid #ddd", textAlign: "left" };
  const baseHeaderCellStyle = { ...cellStyle, fontWeight: "bold", backgroundColor: "white", color: "black" };
  
  const employeeHoursHeaderStyle = { // For "Hours" / "Employees ⌄ >"
    ...baseHeaderCellStyle,
    verticalAlign: "top",
  };
  const emptyHeaderCellStyle = { ...baseHeaderCellStyle, textAlign: "center" }; // For the empty cell above wages
  const timeSlotHeaderCellStyle = { ...baseHeaderCellStyle, textAlign: "center", backgroundColor: "#00695c", color: "white" };

  const centeredCellStyle = { ...cellStyle, textAlign: "center" };
  const rightAlignedCellStyle = { ...cellStyle, textAlign: "right" };

  return (
    <Card className="border border-blue-gray-100 shadow-sm">
      <CardHeader floated={false} shadow={false} style={sharedCardHeaderStyles}>
        <Typography style={sharedCardHeaderTypographyStyles} color="white">
          Today's Schedule
        </Typography>
      </CardHeader>
      <CardBody className="p-0 sm:p-4 overflow-x-auto"> {/* p-0 for table to touch edges on small screens, sm:p-4 for padding on larger */}
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 900 }}>
          <thead>
            <tr>
              <th style={employeeHoursHeaderStyle}>
                <div style={{ fontSize: "0.8em", color: "#666", marginBottom: "4px" }}>Hours &gt;</div>
                <div style={{ fontWeight: "bold" }}>Employees ⌄</div>
              </th>
              <th style={emptyHeaderCellStyle}></th> {/* Empty header for wage column */}
              {timeSlots.map((time) => (
                <th key={time} style={timeSlotHeaderCellStyle}>
                  {time}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {employeeData.map((emp, idx) => (
              <tr key={idx} className="hover:bg-blue-gray-50 cursor-pointer"> {/* Added hover effect */}
                <td style={cellStyle}>
                  <div style={{ fontWeight: "bold" }}>{emp.name}</div>
                  <small style={{ color: "#555", display: "block" }}>{emp.role}</small>
                  {emp.additionalLines &&
                    emp.additionalLines.map((line, lineIdx) => (
                      <div key={lineIdx} style={{ fontSize: "0.9em", color: "#555", textAlign: "right" }}>
                        {line.text}
                      </div>
                    ))}
                </td>
                <td style={rightAlignedCellStyle}>{emp.wage}</td>
                {emp.schedule.map((active, scheduleIdx) => (
                  <td
                    key={`${emp.name}-sch-${scheduleIdx}`}
                    style={{
                      ...centeredCellStyle,
                      backgroundColor: active ? "#b2dfdb" : "transparent", // Example active color
                    }}
                  />
                ))}
              </tr>
            ))}
            {/* Wage Summary Row */}
            <tr style={{ backgroundColor: "#e3f2fd" }}>
              <td style={{ ...cellStyle, fontWeight: "bold", color: "#1976d2" }}>
                <div>{wageSummary.label1}</div>
                <div style={{ fontSize: "0.9em", color: "#1976d2" }}>{wageSummary.label2}</div>
              </td>
              <td style={{ ...rightAlignedCellStyle, fontWeight: "bold", color: "#1976d2" }}>{wageSummary.totalValue}</td>
              {wageSummary.values.map((val, valIdx) => (
                <td key={`wage-val-${valIdx}`} style={{ ...centeredCellStyle, fontWeight: "bold", color: "#1976d2" }}>
                  {val}
                </td>
              ))}
            </tr>
            {/* Sales Summary Row */}
            <tr style={{ backgroundColor: "#5D52CA", color: "white" }}>
              <td style={{ ...cellStyle, fontWeight: "bold", borderColor: "#7c75d9" /* Lighter border for dark bg */ }}>{salesSummary.label}</td>
              <td style={{ ...rightAlignedCellStyle, fontWeight: "bold", borderColor: "#7c75d9" }}>{salesSummary.totalValue}</td>
              {salesSummary.values.map((val, valIdx) => (
                <td key={`sales-val-${valIdx}`} style={{ ...centeredCellStyle, fontWeight: "bold", borderColor: "#7c75d9" }}>
                  {val}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
};

// EmployeeAlertsDashboard Component (Renders a series of InfoCards)
const EmployeeAlertsDashboard = () => {
  const timeOffTodayData = [];
  const flaggedTimeCardData = [];
  const noShowEmployeesData = [];

  const defaultColumns = [
    { id: "name", label: "Name", flex: 2, textAlign: "left" },
    { id: "date", label: "Date", flex: 1, textAlign: "left" },
    { id: "status", label: "Status", flex: 1, textAlign: "left" },
  ];

  return (
    // This component now just groups the InfoCards. Spacing is handled by InfoCard's own margin (mb-6)
    // and the parent layout in Home.js.
    <>
      <InfoCard title="Time-Off today" data={timeOffTodayData} columns={defaultColumns} noDataMessage="No upcoming time off's today" />
      <InfoCard title="Flagged Time card" data={flaggedTimeCardData} columns={defaultColumns} noDataMessage={null} />
      <InfoCard title="No show employees" data={noShowEmployeesData} columns={defaultColumns} noDataMessage={null} />
    </>
  );
};

// Combined Chart Component (Bar + Line) - Now only contains the chart
function EmployeeSaleCustomerChart() {
  return (
    <Card className="border border-blue-gray-100 shadow-sm">
      <CardHeader floated={false} shadow={false} style={sharedCardHeaderStyles}>
        <Typography style={sharedCardHeaderTypographyStyles} color="white">
          Employee/Sale/Customer (ratio)
        </Typography>
      </CardHeader>
      <CardBody className="pt-6 px-2 pb-2 sm:px-4"> {/* Adjusted padding for chart */}
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={employeeChartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}> {/* Adjusted margins for better axis label visibility */}
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="time" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="left" stroke="#391eda" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="right" orientation="right" stroke="#1ad5ee" tick={{ fontSize: 12 }} />
              <ReTooltip />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Bar yAxisId="left" dataKey="sale" fill="#391eda" name="Sale" barSize={30} />
              <Bar yAxisId="right" dataKey="visitors" fill="#1ad5ee" name="Visitors" barSize={30} />
              <Line yAxisId="right" type="monotone" dataKey="employees" stroke="#16a34a" strokeWidth={2} name="Employee" dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        {/* TodaysScheduleTable and EmployeeAlertsDashboard are REMOVED from here */}
      </CardBody>
    </Card>
  );
}

// Home Page - Main layout
export function Home() {
  return (
    <div className="mt-12 px-2 sm:px-4 md:px-6 space-y-12"> {/* Responsive padding and consistent vertical spacing */}
      {/* Statistic Cards */}
      <div className="grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, { className: "w-6 h-6 text-white" })}
            footer={
              footer?.label && (
                <Typography className="font-normal text-blue-gray-600">
                  <strong className={footer.color}>{footer.value}</strong>
                   {footer.label}
                </Typography>
              )
            }
          />
        ))}
      </div>

      {/* Chart Section - Full width */}
      <div>
        <EmployeeSaleCustomerChart />
      </div>

      {/* Today's Schedule Section - Full width */}
      <div>
        <TodaysScheduleTable />
      </div>

      {/* Alerts Section - Renders multiple cards */}
      <div>
        <EmployeeAlertsDashboard />
      </div>
    </div>
  );
}

export default Home;