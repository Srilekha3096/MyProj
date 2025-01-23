import React, { useEffect, useState } from 'react';
import {
    Chart,
    Series,
    CommonSeriesSettings,
    Legend,
    ValueAxis,
    ArgumentAxis,
    Label,
    Border,
    Tooltip,
    Export,
} from 'devextreme-react/chart';

const palette = ['#f48c06', '#1f6924', '#721cb8'];
const customizeTooltip = (pointInfo) => ({
    text: ` Series : ${pointInfo.point.tag}
    <br/>
    Size: ${pointInfo.argumentText}`,
});
function seriesClick(e) {
    const series = e.target;
    if (series.isVisible()) {
        series.hide();
    } else {
        series.show();
    }
}
const customizeText = (e) => `${e.value}`;

function SalesAnalysisServicesPointChart() {

    const [dataSource, setDataSource] = useState([]);

    let Apiresponse = [
        {
            "Car wash Int & Ext cleaning": 20000.0
        },
        {
            "Car wash": 20000.0
        }
    ]

    useEffect(() => {
        const transformedData = Apiresponse.map(item => {
            const seriesName = Object.keys(item)[0];
            const value = item[seriesName];
            return { category: seriesName, value };
        });
        setDataSource(transformedData);
    }, []);

    console.log("dataSource", dataSource);
    return (
        <Chart
            id="chart"
            title=""
            palette={palette}
            dataSource={dataSource}
        >
            <Tooltip
                enabled={true}
                location="edge"
            />
            <CommonSeriesSettings type="bar" />
            <ValueAxis>
                <Label />
            </ValueAxis>
            <ArgumentAxis>
                <Label />
            </ArgumentAxis>

            <Series
                name="Value"
                argumentField="category"
                valueField="value"
            />

            <Legend
                visible={false}
                position="inside"
                horizontalAlignment="left"
            >
                <Border visible={true} />
            </Legend>
            <Export enabled={false} />
        </Chart>
    );
}
export default SalesAnalysisServicesPointChart;
