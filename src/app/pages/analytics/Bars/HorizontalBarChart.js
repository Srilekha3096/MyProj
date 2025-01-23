import React from 'react';
import Chart, {
    ArgumentAxis,
    Legend,
    Series,
    ValueAxis,
    Label,
    Export,
    Tick,
    CommonAxisSettings,
    Grid,
} from 'devextreme-react/chart';
import { BarColor } from '../CustomStyle';

const customizeText = (e) => `${e.value}`;

function HorizontalBarChart({barData=[],}) {

    const dummyData = [
        { "label": "Operation Department", "sales": 333 },
        { "label": "Marketing Department", "sales": 166 },
        { "label": "Sales Department", "sales": 106 },
        { "label": "IT Department", "sales": 73 },
        { "label": "FI Department", "sales": 72 },
        { "label": "HR Department", "sales": 10 },
    ]?.reverse()

    return (
        <Chart
            dataSource={dummyData}
            rotated={true}
            id="chart"
        >
            <ArgumentAxis>
                <Label font={{size:"10px",color:"red"}} customizeText={customizeText} />
            </ArgumentAxis>

            <ValueAxis>
                <Tick visible={false} />
                <Label visible={true} />
            </ValueAxis>

            <Series
                valueField="sales"
                argumentField="label"
                type="bar"
                barWidth={15}
                color={BarColor.SpendColor.color}
            >
                <Label
                    visible={true}
                    font={{size:"10px",color:"#6c757d"}}
                    backgroundColor="#ffff"
                    
                />
            </Series>
            <CommonAxisSettings>
                <Grid visible={false} />
            </CommonAxisSettings>

            <Legend visible={false} />

            <Export enabled={false} />
        </Chart>
    );
}

export default HorizontalBarChart;
