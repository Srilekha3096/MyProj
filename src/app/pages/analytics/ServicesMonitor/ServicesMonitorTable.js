import React from 'react'
import DataGrid from 'devextreme-react/data-grid';
import { Grid } from '@mui/material';
import { FaRegCircle } from "react-icons/fa";

const ServicesMonitorTable = () => {


    // const getData = async () => {

    //     try {
    //         const payload = {
    //             "Business_Unit": 2,
    //             "Period": [
    //                 "2024-03-01",
    //                 "2024-03-05"
    //             ]
    //         };

    //         const response = await axios.post(`${BASE_URL}/Erpapp/ServiceMonitorAnalyticsReport/`, payload, header);

    //         console.log("fetchingdata:", response.data);

    //         const data = response.data;

    //         // setMoniterData(data);
    //     }
    //     catch (error) {
    //         console.error("Error fetching data:", error);
    //     }
    // };

    // useEffect(() => {
    //     getData()
    // }, [])


    const store = [
        {
            "Service_Name": "Polishings 2",
            "Sales_Target": 2605795,
            "Sales_Ordered": 0,
            "Percentage": "0.0%",
            "SalesCanceled": 0
        },
        {
            "Service_Name": "Subscription Interear",
            "Sales_Target": 2605795,
            "Sales_Ordered": 12000.0,
            "Percentage": "0.46%",
            "SalesCanceled": 0
        },
        {
            "Service_Name": "Cleaning",
            "Sales_Target": 2605795,
            "Sales_Ordered": 0,
            "Percentage": "0.0%",
            "SalesCanceled": 0
        },
        {
            "Service_Name": "One Time",
            "Sales_Target": 2605795,
            "Sales_Ordered": 0,
            "Percentage": "0.0%",
            "SalesCanceled": 0
        },
        {
            "Service_Name": "CarWashingSubService",
            "Sales_Target": 2605795,
            "Sales_Ordered": 0,
            "Percentage": "0.0%",
            "SalesCanceled": 0
        },
        {
            "Service_Name": "Bike",
            "Sales_Target": 2605795,
            "Sales_Ordered": 1000.0,
            "Percentage": "0.04%",
            "SalesCanceled": 449.0
        },
        {
            "Service_Name": "Maintenance Int and Ext",
            "Sales_Target": 2605795,
            "Sales_Ordered": 0,
            "Percentage": "0.0%",
            "SalesCanceled": 0
        },
        {
            "Service_Name": "Car Cleaning service",
            "Sales_Target": 2605795,
            "Sales_Ordered": 0,
            "Percentage": "0.0%",
            "SalesCanceled": 0
        }
    ]
    const columns = ['Service_Name', 'Sales_Target', 'Sales_Ordered', 'Percentage', "SalesCanceled"];

    return (
        <>
            <DataGrid
            
                dataSource={store}
                defaultColumns={columns}
                showBorders={false}
            />
        </>
    )
}

export default ServicesMonitorTable