import { formatIndianNumber } from 'app/shared/ReuseComponents/DateFormatter';
import React from 'react';
import ReactSpeedometer from "react-d3-speedometer";

const CreditScoreChart = ({ data, listData, totalReceivedAmount, score }) => {
    return (
        // <ReactSpeedometer
        //     value={listData?.TotalBudgetTarget}
        //     maxSegmentLabels={0}
        //     segments={2}
        //     ringWidth={20}
        //     needleColor={"#555"}
        //     needleHeightRatio={0.4}
        //     needleTransitionDuration={4000}
        //     needleTransition="easeElastic"
        //     segmentColors={['#E00930', '#8DCD03']}
        //     currentValueText={`${totalReceivedAmount}`}
        //     valueTextFontSize={'18px'}
        //     valueTextFontWeight={"normal"}
        //     textColor={"#6200EE"}
        //     width={250}
        //     height={150}
        // />
        <ReactSpeedometer
            needleHeightRatio={0.5}
            needleTransitionDuration={4000}
            needleTransition="easeElastic"
            needleColor={"#555"}
            ringWidth={30}
            maxSegmentLabels={2}
            segments={2}
            customSegmentStops={[
                0,
                (totalReceivedAmount),
                (listData)
            ]}
            minValue={0}
            maxValue={listData}
            segmentColors={score ? ['#13A553', '#E00930'] : ['#E00930', '#13A553']}
            value={totalReceivedAmount}
            valueTextFontSize={'14px'}
            valueTextFontWeight={"normal"}
            textColor={"#6200EE"}
            width={250}
            height={190}
            paddingVertical={5}
        />
    );
};

export default CreditScoreChart;
