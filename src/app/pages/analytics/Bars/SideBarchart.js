import React from 'react';
import Chart from 'react-apexcharts';

const SideBarchart = ({Series,label,height=380,legend,colors="#32cbff"}) => {


    const options = {
        chart: {
            stacked: true,
            toolbar: {
                show: false,
              },
              
        },
        plotOptions: {
            bar: {
                horizontal: true,
            },
        },
        xaxis: {
            categories: label,
        },
        legend:{
            show:Boolean(legend)
        },
        colors:colors,
    };


    return (
        <Chart
            options={options}
            series={Series}
            type="bar"
            height={height}
        />
    );
};

export default SideBarchart;
