import React from 'react';
import ReactApexChart from 'react-apexcharts';

const SideBarCharSteped = ({Series=[],label=[],height=200,legend=false,colors=["#32cbff"]}) => {
  const series = [{
    data: [44, 55, 41, 64, 22, 43, 21]
  }, {
    data: [53, 32, 33, 52, 13, 44, 32]
  }];

  const options = {
    chart: {
      type: 'bar',
      height: height
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          position: 'top',
        },
      }
    },
    dataLabels: {
      enabled: true,
      offsetX: -6,
      style: {
        fontSize: '12px',
        colors: ['#fff']
      }
    },
    stroke: {
      show: true,
      width: 1,
      colors: ['#fff']
    },
    tooltip: {
      shared: true,
      intersect: false
    },
    xaxis: {
      categories: label,
    },
    legend:{
        show:Boolean(legend)
    },
    export: {
        enabled: false
      },
    colors:colors
  };

  return (
    <div>
      {/* <div id="chart"> */}
        <ReactApexChart options={options} series={Series} type="bar" height={height} />
      {/* </div> */}
      <div id="html-dist"></div>
    </div>
  );
};

export default SideBarCharSteped;
