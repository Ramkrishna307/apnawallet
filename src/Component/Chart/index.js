import React from 'react';
import './style.css';
import { Line, Pie } from '@ant-design/charts';

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
    if (item.tag === "food") {
      spendingData[0].amount += item.amount;
    } else if (item.tag === "education") {
      spendingData[1].amount += item.amount;
    } else {
      spendingData[2].amount += item.amount;
    }
  });

  const config = {
    data,
    xField: 'date',
    yField: 'amount',
  };

  const spendingConfig = {
    data: Object.values(finalSpendings),
    width: 500,
    angleField: 'amount',
    colorField: 'tag',
  };

  // Declare the variable pieChart
  let pieChart;

  return (
    <div className='chart-container'>
      <div>
        <Line {...config} />
      </div>
      <div>
        <Pie
          {...spendingConfig}
          onReady={(chartInstance) => {
            pieChart = chartInstance;
          }}
        />
      </div>
    </div>
  );
};

export default ChartComponent;
