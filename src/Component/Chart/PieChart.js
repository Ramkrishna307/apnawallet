// import { Pie } from "@ant-design/charts";
// import React from "react";


// const Wrapper = styled.div`
//   margin: 64px 32px;
// `;

// function PieChart() {
//   type DataType = "new" | "evaluating" | "ongoing" | "finished" | "archived";

//   interface PieChartData {
//     type: DataType;
//     value: number;
//   }

//   const pieChartData: PieChartData[] = [
//     {
//       type: "new",
//       value: 40
//     },
//     {
//       type: "evaluating",
//       value: 25
//     },
//     {
//       type: "ongoing",
//       value: 22
//     },
//     {
//       type: "finished",
//       value: 22
//     },
//     {
//       type: "archived",
//       value: 10
//     }
//   ];

//   const config = {
//     appendPadding: 10,
//     data: pieChartData,
//     angleField: "value",
//     colorField: "type",
//     radius: 1,
//     innerRadius: 0.5,
//     label: {
//       type: "inner",
//       offset: "-50%",
//       content: "{value}",
//       style: {
//         textAlign: "center",
//         fontSize: 14
//       }
//     },
//     interactions: [{ type: "element-selected" }, { type: "element-active" }],
//     statistic: {
//       title: false ,
//       content: {
//         style: {
//           whiteSpace: "pre-wrap",
//           overflow: "hidden",
//           textOverflow: "ellipsis"
//         },
//         formatter: function formatter() {
//           return `total\n134`;
//         }
//       }
//     }
//   };

//   return (
//     <Wrapper>
//       <Pie {...config} />
//     </Wrapper>
//   );
// }

// export default PieChart;
