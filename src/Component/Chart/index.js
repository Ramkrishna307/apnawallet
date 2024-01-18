import React from "react";
import "./style.css";
import { Line, Pie } from "@ant-design/charts";

const ChartComponent = ({ sortedTransaction }) => {
  // Line chart data
  const data = sortedTransaction.map((item) => {
    return { date: item.date, amount: item.amount };
  });

  // Pie chart data
  let finalSpendings = sortedTransaction.reduce((acc, obj) => {
    let key = obj.tag;

    if (!acc[key]) {
      acc[key] = { tag: obj.tag, amount: obj.amount };
    } else {
      acc[key].amount += obj.amount;
    }

    return acc;
  }, {});

  const spendingData = [
    { tag: "food", amount: 0 },
    { tag: "education", amount: 0 },
    { tag: "office", amount: 0 },
  ];

  sortedTransaction.forEach((item) => {
    const amount = Number(item.amount); // Convert to number

    if (item.type !== "Income") {
      if (item.tag === "food") {
        spendingData[0].amount += amount;
      } else if (item.tag === "education") {
        spendingData[1].amount += amount;
      } else {
        spendingData[2].amount += amount;
      }
    }
  });

  const config = {
    data: data,
    xField: "date",
    yField: "amount",
    smooth: true,
    point: {
      size: 5,
    },
    showMarkers: true,
    showContent: true,
    showCrosshairs: true,
  };

  console.log("spending", spendingData);
  console.log("final spending", finalSpendings);

  const spendingConfig = {
    data: spendingData,
    // width: 500,
    angleField: "amount",
    colorField: "tag",
  };

  // Declare the variable pieChart
  let pieChart;

  return (
    <div className="chart-container">
      <div className="line-chart-container">
        <h2 className="chart-heading">Finance Analyst</h2>
        <div className="line-chart">
          <Line {...config} />
        </div>
      </div>
      <div className="pie-chart-container">
        <h2 className="chart-heading">Expense Analyst</h2>
        <div className="pie-chart">
          <Pie
            {...spendingConfig}
            onReady={(chartInstance) => {
              pieChart = chartInstance;
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartComponent;
