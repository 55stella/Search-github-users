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
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.candy";

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
  // console.log(data)
  // i'm looking for the data props

  const chartConfigs = {
    type: "doughnut2d", // The chart type
    width: "400", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        //Set the chart caption
        caption: "Stars per Language",
        
        decimal: 0,
        // in the pieRadius, we want to change the size of the pie
        doughnutRadius: "45%",
        showPercentValues: 0,
        theme: 'candy'
        //  theme is going to change the appearance of the charts. first of all
        // go to the the imports for fusion, change the theme to theme.candy


        // here we want to remove the decimal part of the data representation
      },
      // Chart Data
      data,
      // here , the data that we are using here is in repos.js, so we passed it
      // in here as props to be accesed in the in this component.
    },
  };

  return <ReactFC {...chartConfigs} className="section-center" />;
};
// the fusion chart was in the app component, we deleted it and then created our own component
// then exported it. copied the return and then added.
export default ChartComponent;
