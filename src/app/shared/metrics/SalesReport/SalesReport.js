import React, { useEffect, useState } from 'react';
import SalesReportChart from "./SalesReportChart";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import Div from "@jumbo/shared/Div";
import { useTranslation } from "react-i18next";
import axios from 'axios';
import { BASE_URL } from 'app/services/auth-services';
import moment from 'moment';


const data = {
    "month_wise_data": {
        "August 2023": [],
        "September 2023": [],
        "October 2023": [],
        "November 2023": [],
        "December 2023": [],
        "January 2024": [
            {
                "id": 3,
                "TrfIn_Id": "MRC000000001",
                "Item_LineNo": 1,
                "Trfin_Date": "2024-01-10",
                "Trf_FromStore": "XYZ Store",
                "Item": [
                    {
                        "id": 4,
                        "UOM": "ltr",
                        "Amount": 20000,
                        "Quantity": 200,
                        "Item_Name": "car washing liquid",
                        "Unit_Price": 100,
                        "GI_Quantity": 180,
                        "Stock_After": 630,
                        "AvailableQty": 450
                    }
                ],
                "Quantity_Recevied": 200,
                "Challan_No": "#0000001",
                "Is_Deleted": false,
                "Created_Date": "2024-01-10",
                "Updated_Date": "2024-01-10",
                "Company_Id": 1,
                "Partner_Id": 2,
                "Store_Id": 2,
                "Supplier_Name": 4,
                "Received_By": 1,
                "PO_Id": 4,
                "Created_By": 1,
                "Updated_By": 1,
                "Attached_File": []
            },
            {
                "id": 7,
                "TrfIn_Id": "MRC000000002",
                "Item_LineNo": 1,
                "Trfin_Date": "2024-01-11",
                "Trf_FromStore": "XYZ Store",
                "Item": [
                    {
                        "id": 5,
                        "UOM": "pieces",
                        "Amount": 3000,
                        "Quantity": "30",
                        "Item_Name": "Micro Fiber 500 GSM",
                        "Unit_Price": "1000",
                        "GI_Quantity": 30,
                        "Stock_After": 530,
                        "AvailableQty": 500
                    }
                ],
                "Quantity_Recevied": 30,
                "Challan_No": "CHEE0001",
                "Is_Deleted": false,
                "Created_Date": "2024-01-11",
                "Updated_Date": "2024-01-11",
                "Company_Id": 1,
                "Partner_Id": 2,
                "Store_Id": 2,
                "Supplier_Name": 4,
                "Received_By": 1,
                "PO_Id": 5,
                "Created_By": 1,
                "Updated_By": 1,
                "Attached_File": []
            },
            {
                "id": 13,
                "TrfIn_Id": "MRC000000008",
                "Item_LineNo": 1,
                "Trfin_Date": "2024-01-19",
                "Trf_FromStore": "XYZ Store",
                "Item": [
                    {
                        "id": 5,
                        "UOM": "pieces",
                        "Amount": 3000,
                        "Quantity": "30",
                        "Item_Name": "Micro Fiber 500 GSM",
                        "Unit_Price": "1000",
                        "GI_Quantity": 20,
                        "Stock_After": null
                    }
                ],
                "Quantity_Recevied": 30,
                "Challan_No": "816733335",
                "Is_Deleted": false,
                "Created_Date": "2024-01-19",
                "Updated_Date": "2024-01-19",
                "Company_Id": 1,
                "Partner_Id": 2,
                "Store_Id": 2,
                "Supplier_Name": 4,
                "Received_By": 2,
                "PO_Id": 5,
                "Created_By": 1,
                "Updated_By": 1,
                "Attached_File": []
            },
            {
                "id": 28,
                "TrfIn_Id": "MRC000000023",
                "Item_LineNo": 1,
                "Trfin_Date": "2024-01-24",
                "Trf_FromStore": "XYZ Store",
                "Item": [
                    {
                        "id": 5,
                        "UOM": "pieces",
                        "Amount": 3000,
                        "Quantity": "30",
                        "Item_Name": "Micro Fiber 500 GSM",
                        "Unit_Price": "1000",
                        "GI_Quantity": 20,
                        "Receipt_Qty": 20,
                        "Stock_After": 20
                    }
                ],
                "Quantity_Recevied": 30,
                "Challan_No": "5555555555",
                "Is_Deleted": false,
                "Created_Date": "2024-01-24",
                "Updated_Date": "2024-01-24",
                "Company_Id": 1,
                "Partner_Id": 2,
                "Store_Id": 2,
                "Supplier_Name": 4,
                "Received_By": 1,
                "PO_Id": 5,
                "Created_By": 1,
                "Updated_By": 1,
                "Attached_File": []
            },
            {
                "id": 29,
                "TrfIn_Id": "MRC000000024",
                "Item_LineNo": 1,
                "Trfin_Date": "2024-01-26",
                "Trf_FromStore": "XYZ Store",
                "Item": [
                    {
                        "id": 5,
                        "UOM": "pieces",
                        "Amount": 20000,
                        "Quantity": "30",
                        "Item_Name": "Micro Fiber 500 GSM",
                        "Unit_Price": 1000,
                        "GI_Quantity": 20,
                        "Receipt_Qty": 20,
                        "Stock_After": 39,
                        "AvailableQty": 19
                    }
                ],
                "Quantity_Recevied": 30,
                "Challan_No": "452245421",
                "Is_Deleted": false,
                "Created_Date": "2024-01-26",
                "Updated_Date": "2024-01-26",
                "Company_Id": 1,
                "Partner_Id": 2,
                "Store_Id": 2,
                "Supplier_Name": 4,
                "Received_By": 1,
                "PO_Id": 5,
                "Created_By": 1,
                "Updated_By": 1,
                "Attached_File": []
            },
            {
                "id": 30,
                "TrfIn_Id": "MRC000000025",
                "Item_LineNo": 1,
                "Trfin_Date": "2024-01-30",
                "Trf_FromStore": "XYZ Store",
                "Item": [
                    {
                        "id": 5,
                        "UOM": "pieces",
                        "Amount": 20000,
                        "Quantity": "30",
                        "Item_Name": "Micro Fiber 500 GSM",
                        "Unit_Price": 1000,
                        "GI_Quantity": 20,
                        "Receipt_Qty": 20,
                        "Stock_After": 120,
                        "AvailableQty": 100
                    }
                ],
                "Quantity_Recevied": 30,
                "Challan_No": "78626542517",
                "Is_Deleted": false,
                "Created_Date": "2024-01-30",
                "Updated_Date": "2024-01-30",
                "Company_Id": 1,
                "Partner_Id": 2,
                "Store_Id": 2,
                "Supplier_Name": 4,
                "Received_By": 1,
                "PO_Id": 5,
                "Created_By": 1,
                "Updated_By": 1,
                "Attached_File": []
            }
        ],
        "February 2024": [
            {
                "id": 42,
                "TrfIn_Id": "MRC000000036",
                "Item_LineNo": 1,
                "Trfin_Date": "2024-02-01",
                "Trf_FromStore": "Oil Store",
                "Item": [
                    {
                        "id": 11,
                        "UOM": "ltr",
                        "Amount": 2000,
                        "Quantity": "20",
                        "Item_Name": "Car",
                        "Unit_Price": "200",
                        "GI_Quantity": 10,
                        "Receipt_Qty": 10,
                        "Stock_After": 175,
                        "AvailableQty": 165
                    },
                    {
                        "id": 10,
                        "UOM": "ltr",
                        "Amount": 1200,
                        "Quantity": "20",
                        "Item_Name": "Car Cleaner",
                        "Unit_Price": "100",
                        "GI_Quantity": 12,
                        "Receipt_Qty": 10,
                        "Stock_After": 157,
                        "AvailableQty": 145
                    }
                ],
                "Quantity_Recevied": 20,
                "Challan_No": "1234567890",
                "Is_Deleted": false,
                "Created_Date": "2024-02-01",
                "Updated_Date": "2024-02-01",
                "Company_Id": 1,
                "Partner_Id": 2,
                "Store_Id": 4,
                "Supplier_Name": 4,
                "Received_By": 1,
                "PO_Id": 30,
                "Created_By": 1,
                "Updated_By": 1,
                "Attached_File": []
            },
            {
                "id": 51,
                "TrfIn_Id": "MRC000000044",
                "Item_LineNo": 1,
                "Trfin_Date": "2024-02-21",
                "Trf_FromStore": "Oil Store",
                "Item": [
                    {
                        "id": 12,
                        "UOM": "ltr",
                        "Amount": 5000,
                        "Quantity": "50",
                        "Item_Name": "Dettol",
                        "Unit_Price": "100",
                        "GI_Quantity": 50,
                        "Receipt_Qty": 50,
                        "Stock_After": 50,
                        "AvailableQty": 0
                    },
                    {
                        "id": 10,
                        "UOM": "ltr",
                        "Amount": 1000,
                        "Quantity": "20",
                        "Item_Name": "Car Cleaner",
                        "Unit_Price": "50",
                        "GI_Quantity": 20,
                        "Receipt_Qty": 20,
                        "Stock_After": 110,
                        "AvailableQty": 90
                    }
                ],
                "Quantity_Recevied": 50,
                "Challan_No": "668",
                "Is_Deleted": false,
                "Created_Date": "2024-02-21",
                "Updated_Date": "2024-02-21",
                "Company_Id": 1,
                "Partner_Id": 2,
                "Store_Id": 4,
                "Supplier_Name": 4,
                "Received_By": 3,
                "PO_Id": 28,
                "Created_By": 2,
                "Updated_By": 2,
                "Attached_File": []
            },
            {
                "id": 44,
                "TrfIn_Id": "MRC000000038",
                "Item_LineNo": 1,
                "Trfin_Date": "2024-02-16",
                "Trf_FromStore": "Oil Store",
                "Item": [
                    {
                        "id": 10,
                        "UOM": "ltr",
                        "Amount": 1300,
                        "Quantity": "34",
                        "Item_Name": "Car Cleaner",
                        "Unit_Price": "100",
                        "GI_Quantity": 13,
                        "Receipt_Qty": 14,
                        "Stock_After": 90,
                        "AvailableQty": 76
                    }
                ],
                "Quantity_Recevied": 34,
                "Challan_No": "FGDH554",
                "Is_Deleted": false,
                "Created_Date": "2024-02-16",
                "Updated_Date": "2024-02-16",
                "Company_Id": 1,
                "Partner_Id": 2,
                "Store_Id": 4,
                "Supplier_Name": 4,
                "Received_By": 2,
                "PO_Id": 42,
                "Created_By": 2,
                "Updated_By": 2,
                "Attached_File": []
            },
            {
                "id": 48,
                "TrfIn_Id": "MRC000000041",
                "Item_LineNo": 1,
                "Trfin_Date": "2024-02-21",
                "Trf_FromStore": "RST Store",
                "Item": [
                    {
                        "id": 17,
                        "UOM": "pieces",
                        "Amount": 40,
                        "Quantity": 20,
                        "Item_Name": "Brush",
                        "Unit_Price": 20,
                        "GI_Quantity": 2,
                        "Receipt_Qty": 2,
                        "Stock_After": 2,
                        "AvailableQty": 0
                    },
                    {
                        "id": 16,
                        "UOM": "pieces",
                        "Amount": 1500,
                        "Quantity": 30,
                        "Item_Name": "Scruber",
                        "Unit_Price": 50,
                        "GI_Quantity": 30,
                        "Receipt_Qty": 30,
                        "Stock_After": 140,
                        "AvailableQty": 110
                    }
                ],
                "Quantity_Recevied": 20,
                "Challan_No": "#000001",
                "Is_Deleted": false,
                "Created_Date": "2024-02-21",
                "Updated_Date": "2024-02-21",
                "Company_Id": 1,
                "Partner_Id": 2,
                "Store_Id": 6,
                "Supplier_Name": 7,
                "Received_By": 1,
                "PO_Id": 44,
                "Created_By": 2,
                "Updated_By": 2,
                "Attached_File": []
            },
            {
                "id": 50,
                "TrfIn_Id": "MRC000000043",
                "Item_LineNo": 1,
                "Trfin_Date": "2024-02-21",
                "Trf_FromStore": "Oil Store",
                "Item": [
                    {
                        "id": 17,
                        "UOM": "pieces",
                        "Amount": 2000,
                        "Quantity": 20,
                        "Item_Name": "Brush",
                        "Unit_Price": 100,
                        "GI_Quantity": 20,
                        "Receipt_Qty": 0,
                        "Stock_After": 20,
                        "AvailableQty": 0
                    },
                    {
                        "id": 16,
                        "UOM": "pieces",
                        "Amount": 1000,
                        "Quantity": 10,
                        "Item_Name": "Scruber",
                        "Unit_Price": 100,
                        "GI_Quantity": 10,
                        "Receipt_Qty": 0,
                        "Stock_After": 10,
                        "AvailableQty": 0
                    },
                    {
                        "id": 15,
                        "UOM": "pieces",
                        "Amount": 1000,
                        "Quantity": 10,
                        "Item_Name": "Car Washing Soap",
                        "Unit_Price": 100,
                        "GI_Quantity": 10,
                        "Receipt_Qty": 0,
                        "Stock_After": 10,
                        "AvailableQty": 0
                    },
                    {
                        "id": 14,
                        "UOM": "pieces",
                        "Amount": 10000,
                        "Quantity": 100,
                        "Item_Name": "Sponge",
                        "Unit_Price": 100,
                        "GI_Quantity": 100,
                        "Receipt_Qty": 0,
                        "Stock_After": 100,
                        "AvailableQty": 0
                    }
                ],
                "Quantity_Recevied": 20,
                "Challan_No": "4535",
                "Is_Deleted": false,
                "Created_Date": "2024-02-21",
                "Updated_Date": "2024-02-21",
                "Company_Id": 1,
                "Partner_Id": 2,
                "Store_Id": 4,
                "Supplier_Name": 7,
                "Received_By": 1,
                "PO_Id": 45,
                "Created_By": 2,
                "Updated_By": 2,
                "Attached_File": []
            },
            {
                "id": 53,
                "TrfIn_Id": "MRC000000046",
                "Item_LineNo": 1,
                "Trfin_Date": "2024-02-22",
                "Trf_FromStore": "Oil Store",
                "Item": [
                    {
                        "id": 12,
                        "UOM": "ltr",
                        "Amount": 300,
                        "Quantity": "20",
                        "Item_Name": "Dettol",
                        "Unit_Price": "30",
                        "GI_Quantity": 10,
                        "Receipt_Qty": 10,
                        "Stock_After": 10,
                        "AvailableQty": 0
                    }
                ],
                "Quantity_Recevied": 10,
                "Challan_No": "#7778",
                "Is_Deleted": false,
                "Created_Date": "2024-02-22",
                "Updated_Date": "2024-02-22",
                "Company_Id": 1,
                "Partner_Id": 2,
                "Store_Id": 4,
                "Supplier_Name": 5,
                "Received_By": 1,
                "PO_Id": 43,
                "Created_By": 2,
                "Updated_By": 2,
                "Attached_File": []
            },
            {
                "id": 52,
                "TrfIn_Id": "MRC000000045",
                "Item_LineNo": 1,
                "Trfin_Date": "2024-02-22",
                "Trf_FromStore": "Oil Store",
                "Item": [
                    {
                        "id": 12,
                        "UOM": "ltr",
                        "Amount": 300,
                        "Quantity": "20",
                        "Item_Name": "Dettol",
                        "Unit_Price": "30",
                        "GI_Quantity": 10,
                        "Receipt_Qty": 0,
                        "Stock_After": 10,
                        "AvailableQty": 0
                    }
                ],
                "Quantity_Recevied": 10,
                "Challan_No": "#7778",
                "Is_Deleted": false,
                "Created_Date": "2024-02-22",
                "Updated_Date": "2024-02-22",
                "Company_Id": 1,
                "Partner_Id": 2,
                "Store_Id": 4,
                "Supplier_Name": 5,
                "Received_By": 1,
                "PO_Id": 43,
                "Created_By": 2,
                "Updated_By": 2,
                "Attached_File": []
            },
            {
                "id": 54,
                "TrfIn_Id": "MRC000000047",
                "Item_LineNo": 1,
                "Trfin_Date": "2024-02-22",
                "Trf_FromStore": "Oil Store",
                "Item": [
                    {
                        "id": 12,
                        "UOM": "ltr",
                        "Amount": 4000,
                        "Quantity": "50",
                        "Item_Name": "Dettol",
                        "Unit_Price": "100",
                        "GI_Quantity": 40,
                        "Receipt_Qty": 40,
                        "Stock_After": 40,
                        "AvailableQty": 0
                    },
                    {
                        "id": 10,
                        "UOM": "ltr",
                        "Amount": 600,
                        "Quantity": "20",
                        "Item_Name": "Car Cleaner",
                        "Unit_Price": "50",
                        "GI_Quantity": 12,
                        "Receipt_Qty": 12,
                        "Stock_After": 62,
                        "AvailableQty": 50
                    }
                ],
                "Quantity_Recevied": 52,
                "Challan_No": "#00009",
                "Is_Deleted": false,
                "Created_Date": "2024-02-22",
                "Updated_Date": "2024-02-22",
                "Company_Id": 1,
                "Partner_Id": 2,
                "Store_Id": 4,
                "Supplier_Name": 4,
                "Received_By": 2,
                "PO_Id": 26,
                "Created_By": 2,
                "Updated_By": 2,
                "Attached_File": []
            },
            {
                "id": 55,
                "TrfIn_Id": "MRC000000048",
                "Item_LineNo": 1,
                "Trfin_Date": "2024-02-22",
                "Trf_FromStore": "Oil Store",
                "Item": [
                    {
                        "id": 12,
                        "UOM": "ltr",
                        "Amount": 1000,
                        "Quantity": "50",
                        "Item_Name": "Dettol",
                        "Unit_Price": "100",
                        "GI_Quantity": 10,
                        "Receipt_Qty": 50,
                        "Stock_After": 10,
                        "AvailableQty": 0
                    },
                    {
                        "id": 10,
                        "UOM": "ltr",
                        "Amount": 400,
                        "Quantity": "20",
                        "Item_Name": "Car Cleaner",
                        "Unit_Price": "50",
                        "GI_Quantity": 8,
                        "Receipt_Qty": 20,
                        "Stock_After": 70,
                        "AvailableQty": 62
                    }
                ],
                "Quantity_Recevied": 18,
                "Challan_No": "#0009",
                "Is_Deleted": false,
                "Created_Date": "2024-02-22",
                "Updated_Date": "2024-02-22",
                "Company_Id": 1,
                "Partner_Id": 2,
                "Store_Id": 4,
                "Supplier_Name": 4,
                "Received_By": 2,
                "PO_Id": 26,
                "Created_By": 2,
                "Updated_By": 2,
                "Attached_File": []
            },
            {
                "id": 57,
                "TrfIn_Id": "MRC000000049",
                "Item_LineNo": 1,
                "Trfin_Date": "2024-02-22",
                "Trf_FromStore": "ABC Store",
                "Item": [
                    {
                        "id": 17,
                        "UOM": "pieces",
                        "Amount": 200,
                        "Quantity": 20,
                        "Item_Name": "Brush",
                        "Unit_Price": 20,
                        "GI_Quantity": 10,
                        "Receipt_Qty": 10,
                        "Stock_After": 77,
                        "AvailableQty": 30
                    },
                    {
                        "id": 16,
                        "UOM": "pieces",
                        "Amount": 1000,
                        "Quantity": 30,
                        "Item_Name": "Scruber",
                        "Unit_Price": 50,
                        "GI_Quantity": 20,
                        "Receipt_Qty": 20,
                        "Stock_After": 100,
                        "AvailableQty": 10
                    },
                    {
                        "id": 14,
                        "UOM": "pieces",
                        "Amount": 900,
                        "Quantity": 30,
                        "Item_Name": "Sponge",
                        "Unit_Price": 30,
                        "GI_Quantity": 30,
                        "Receipt_Qty": 30,
                        "Stock_After": 119,
                        "AvailableQty": 0
                    }
                ],
                "Quantity_Recevied": 60,
                "Challan_No": "#00003",
                "Is_Deleted": false,
                "Created_Date": "2024-02-22",
                "Updated_Date": "2024-02-22",
                "Company_Id": 1,
                "Partner_Id": 2,
                "Store_Id": 1,
                "Supplier_Name": 7,
                "Received_By": 2,
                "PO_Id": 44,
                "Created_By": 2,
                "Updated_By": 2,
                "Attached_File": [
                    41
                ]
            }
        ],
        "March 2024": [
            {
                "id": 59,
                "TrfIn_Id": "MRC000000051",
                "Item_LineNo": 1,
                "Trfin_Date": "2024-03-02",
                "Trf_FromStore": "XYZ Store",
                "Item": [
                    {
                        "id": 16,
                        "UOM": "pieces",
                        "Amount": 6250,
                        "Quantity": 30,
                        "Item_Name": "Scruber",
                        "Unit_Price": 250,
                        "GI_Quantity": 25,
                        "Receipt_Qty": 25,
                        "Stock_After": 125,
                        "AvailableQty": 100
                    },
                    {
                        "id": 14,
                        "UOM": "pieces",
                        "Amount": 8750,
                        "Quantity": 30,
                        "Item_Name": "Sponge",
                        "Unit_Price": 350,
                        "GI_Quantity": 25,
                        "Receipt_Qty": 25,
                        "Stock_After": 144,
                        "AvailableQty": 119
                    }
                ],
                "Quantity_Recevied": 50,
                "Challan_No": "CHALLAN NO./ITNS 283",
                "Is_Deleted": false,
                "Created_Date": "2024-03-02",
                "Updated_Date": "2024-03-02",
                "Company_Id": 1,
                "Partner_Id": 2,
                "Store_Id": 2,
                "Supplier_Name": 4,
                "Received_By": 3,
                "PO_Id": 46,
                "Created_By": 3,
                "Updated_By": 3,
                "Attached_File": []
            },
            {
                "id": 60,
                "TrfIn_Id": "MRC000000052",
                "Item_LineNo": 1,
                "Trfin_Date": "2024-03-02",
                "Trf_FromStore": "XYZ Store",
                "Item": [
                    {
                        "id": 16,
                        "UOM": "pieces",
                        "Amount": 500,
                        "Quantity": 30,
                        "Item_Name": "Scruber",
                        "Unit_Price": 250,
                        "GI_Quantity": 2,
                        "Receipt_Qty": 27,
                        "Stock_After": 77,
                        "AvailableQty": 75
                    }
                ],
                "Quantity_Recevied": 2,
                "Challan_No": "",
                "Is_Deleted": false,
                "Created_Date": "2024-03-02",
                "Updated_Date": "2024-03-02",
                "Company_Id": 1,
                "Partner_Id": 2,
                "Store_Id": 2,
                "Supplier_Name": 4,
                "Received_By": 1,
                "PO_Id": 46,
                "Created_By": 3,
                "Updated_By": 3,
                "Attached_File": []
            }
        ],
        "April 2024": []
    },
    "total_count": 18
}

const SalesReport = () => {
    const { t } = useTranslation();

    const token = localStorage.getItem("accesstoken");

    const header = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    };

    let userDetails = localStorage.getItem("UserDetails");
    userDetails = JSON.parse(userDetails);
    let companyId = userDetails?.Organization_Id;


    const [listData, setListData] = useState(data);




    useEffect(async () => {
        var payload = {
            Company_Id: companyId
        }
        await axios.post(`${BASE_URL}/Erpapp/InventoryDashboard/`, payload, header).then((res) => {
            console.log("RRRRRRR", res);
            setListData(res?.data);
        }).catch((error) => {
            console.log(error);
        });
    }, []);



    // Function to calculate monthly totals
    const calculateMonthlyTotals = (data) => {
        const monthlyTotals = {};

        for (const [month, entries] of Object.entries(data)) {
            let totalQuantity = 0;

            // entries.forEach((entry) => {
            //     totalQuantity += entry?.Quantity_Recevied;
            // });

            // monthlyTotals[month] = totalQuantity;
            monthlyTotals[month] = entries?.length;
        }

        return monthlyTotals;
    };

    const monthlyTotals = calculateMonthlyTotals(listData?.month_wise_data);

    let chartData = Object.entries(monthlyTotals).map(([month, total]) => ({
        name: moment(month, 'MMMM YYYY').format('MMM YY'),
        count: total,
    }));


    let totalReceivedQty = 0;
    chartData.forEach((chart) => {
        totalReceivedQty += chart?.count;
    });


    console.log("chartData1",chartData, totalReceivedQty)

    return (
        <JumboCardQuick
            title={<Typography variant={"h4"} mb={0}>{t(
                // 'widgets.title.salesReports'
                'Received Inventory'
            )}</Typography>}
            wrapperSx={{ pt: 0, pb: 1, pl: 3, pr: 3 }}
        >
            <Grid container columnSpacing={2}>
                <Grid item xs={3} alignSelf={"center"}>
                    <Typography variant={"h2"}>{listData?.total_count} Nos</Typography>
                    <Typography variant={"body1"} color={"text.secondary"} sx={{ whiteSpace: 'nowrap' }} mb={0}>Past 9 months</Typography>
                </Grid>
                <Grid item xs={9}>
                    <Div sx={{ my: '-2px' }}>
                        <SalesReportChart data={chartData} />
                    </Div>
                </Grid>
            </Grid>
        </JumboCardQuick>
    );
};

export default SalesReport;
