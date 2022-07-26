// STEP 1 - Include Dependencies
// Include react
import React from "react";


// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import Chart from "fusioncharts/fusioncharts.charts";
// this is a named export so we use column2D, i might as well change it to something else.
//

// Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);
// The ReactFC.fcRoot is a method name, takes in fusionCharts , then the chart that we wnat
// to render on the screen.

// STEP 2 - Chart Data
// const chartData = [
//   {
//     label: "Html",
//     value: "13",
//   },
//   {
//     label: "Css",
//     value: "23",
//   },
//   {
//     label: "Javascript",
//     value: "80",
//   },

// ];

// STEP 3 - Creating the JSON object to store the chart configurations

// STEP 4 - Creating the DOM element to pass the react-fusioncharts component
const ChartComponent = ({ data }) => {
  // i'm looking for the data props

  const chartConfigs = {
    type: "bar3d", // The chart type
    width: "400", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        //Set the chart caption
        caption: "Countries With Most Oil Reserves [2017-18]",
        //Set the chart subcaption
        subCaption: "In MMbbl = One Million barrels",
        //Set the x-axis name
        xAxisName: "Country",
        //Set the y-axis name
        yAxisName: "Reserves (MMbbl)",
        numberSuffix: "K",
        //Set the theme for your chart
        theme: "fusion",
      },
      // Chart Data
      data,
    },
  };

  return <ReactFC {...chartConfigs} />;
  
}
// the fusion chart was in the app component, we deleted it and then created our own component
// then exported it. copied the return and then added.
export default ChartComponent
