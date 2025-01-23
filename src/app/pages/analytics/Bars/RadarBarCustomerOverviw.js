import React from 'react';
import ReactApexChart from 'react-apexcharts';

const RadarBarCustomerOverviw = ({height=300,label=[]}) => {
  const series = [{
    name: 'Series 1',
    data: [80, 50, 30, 40, 100, 20],
  }];

  const options = {
    chart: {
      height: height,
      type: 'radar',
    },
    title: {
      text: ''
    },
    xaxis: {
      categories:label
    }
  };

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={options} series={series} type="radar" height={height} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}

export default RadarBarCustomerOverviw;
