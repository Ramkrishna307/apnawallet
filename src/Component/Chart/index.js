import React from 'react';
import './style.css';
import { Line, Pie } from '@ant-design/charts';
// import PieChart from './PieChart';
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
  
    if (item.tag === "food") {
      spendingData[0].amount += amount;
    } else if (item.tag === "education") {
      spendingData[1].amount += amount;
    } else {
      spendingData[2].amount += amount;
    }
  });

  const config = {
    data,
    xField: 'date',
    yField: 'amount',
  };
  console.log("spending",spendingData );
  console.log("final spending",finalSpendings);
  const spendingConfig = {
    data: spendingData,
    width: 500,
    angleField: 'amount',
    colorField: 'tag',
    
  };

  // Declare the variable pieChart
  let pieChart;

  return (
    <div className='chart-container'>
      <div className='line-chart'>
        <Line {...config} />
      </div>
      <div className='pie-chart'>
        <Pie
          {...spendingConfig}
          onReady={(chartInstance) => {
            pieChart = chartInstance;
          }}
        />
      
      {/* <PieChart/> */}
      </div>
    </div>
  );
};

export default ChartComponent;
