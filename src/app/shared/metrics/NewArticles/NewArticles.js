import React, { useEffect, useState } from 'react';
import NewArticlesChart from "./NewArticlesChart";
import { Typography } from "@mui/material";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import { useTranslation } from "react-i18next";
import axios from 'axios';
import { BASE_URL } from 'app/services/auth-services';
import purchaseOrderServices from 'app/services/purchase-order-services';
import moment from 'moment';
import Div from '@jumbo/shared/Div';


const data = {
    "month_wise_data": {
        "August 2023": [],
        "September 2023": [],
        "October 2023": [],
        "November 2023": [],
        "December 2023": [],
        "January 2024": [
            {
                "id": 4,
                "PO_Id": "POR000000001",
                "Po_Date": "2024-01-10",
                "Buyer_Name": "Tamil",
                "Delivery_Date": "2024-01-15",
                "Payment_Term": "Standard Terms of Condition",
                "Pay_Mode": "XYZ Store",
                "Price_term": "Megamart Catalogue",
                "Freight": "10",
                "Desp_Instruction": "Provide this Items with perticuler date",
                "Tax_comp": "18",
                "Total_POAmount": 20000.0,
                "POCancel_Flag": false,
                "POAmend_Flag": true,
                "PO_Remarks": "nothing",
                "Advpaid_Flag": false,
                "Advance_Amount": 0.0,
                "Filter_status": null,
                "Cur_code": "amount",
                "Items": [
                    {
                        "id": 4,
                        "UOM": "ltr",
                        "Amount": 20000,
                        "Quantity": "200",
                        "Item_Name": "car washing liquid",
                        "Unit_Price": "100"
                    }
                ],
                "Itemshcedule": [
                    {
                        "id": 4,
                        "UOM": "ltr",
                        "Amount": 20000,
                        "Quantity": "200",
                        "Item_Name": "car washing liquid",
                        "Unit_Price": "100"
                    }
                ],
                "Is_Deleted": false,
                "Delivery_Address": {
                    "doorNo": "",
                    "cityName": "",
                    "stateName": "",
                    "storeName": "",
                    "streetName": "",
                    "countryName": ""
                },
                "Approved_Flag": true,
                "Status": true,
                "Order_Placed": false,
                "Order_Closed": true,
                "Termsandcondition": "<p>Testing Terms and Conditions</p>",
                "Unit_Rate": "500",
                "Created_Date": "2024-01-10",
                "Updated_Date": "2024-01-10",
                "Company_Id": 1,
                "Partner_Id": 2,
                "PR_Id": 6,
                "Supplier_Id": 4,
                "Created_By": 1,
                "Updated_By": 1,
                "Attached_file": []
            },
            {
                "id": 12,
                "PO_Id": "POR000000009",
                "Po_Date": "2024-01-19",
                "Buyer_Name": "Ponkumar",
                "Delivery_Date": "2024-01-26",
                "Payment_Term": "",
                "Pay_Mode": "XYZ Store",
                "Price_term": "Ram info",
                "Freight": "",
                "Desp_Instruction": "",
                "Tax_comp": "",
                "Total_POAmount": 20000.0,
                "POCancel_Flag": false,
                "POAmend_Flag": true,
                "PO_Remarks": "nothing",
                "Advpaid_Flag": false,
                "Advance_Amount": 0.0,
                "Filter_status": null,
                "Cur_code": "amount",
                "Items": [
                    {
                        "id": 5,
                        "UOM": "pieces",
                        "Amount": 20000,
                        "Quantity": "200",
                        "Item_Name": "Micro Fiber 500 GSM",
                        "Unit_Price": "80"
                    }
                ],
                "Itemshcedule": [
                    {
                        "id": 5,
                        "UOM": "pieces",
                        "Amount": 20000,
                        "Quantity": "200",
                        "Item_Name": "Micro Fiber 500 GSM",
                        "Unit_Price": "80"
                    }
                ],
                "Is_Deleted": false,
                "Delivery_Address": {
                    "doorNo": "",
                    "cityName": "",
                    "stateName": "",
                    "storeName": "",
                    "streetName": "",
                    "countryName": ""
                },
                "Approved_Flag": true,
                "Status": true,
                "Order_Placed": true,
                "Order_Closed": false,
                "Termsandcondition": "",
                "Unit_Rate": "500",
                "Created_Date": "2024-01-19",
                "Updated_Date": "2024-01-19",
                "Company_Id": 1,
                "Partner_Id": 2,
                "PR_Id": 9,
                "Supplier_Id": 5,
                "Created_By": 1,
                "Updated_By": 1,
                "Attached_file": []
            },
            {
                "id": 5,
                "PO_Id": "POR000000002",
                "Po_Date": "2024-01-11",
                "Buyer_Name": "Tamil",
                "Delivery_Date": "2024-01-14",
                "Payment_Term": "Standard Terms of Condition",
                "Pay_Mode": "XYZ Store",
                "Price_term": "Megamart Catalogue",
                "Freight": "20",
                "Desp_Instruction": "Thank you....",
                "Tax_comp": "18",
                "Total_POAmount": 3000.0,
                "POCancel_Flag": false,
                "POAmend_Flag": true,
                "PO_Remarks": "nothing",
                "Advpaid_Flag": false,
                "Advance_Amount": 0.0,
                "Filter_status": null,
                "Cur_code": "amount",
                "Items": [
                    {
                        "id": 5,
                        "UOM": "pieces",
                        "Amount": 3000,
                        "Quantity": "30",
                        "Item_Name": "Micro Fiber 500 GSM",
                        "Unit_Price": "1000"
                    }
                ],
                "Itemshcedule": [
                    {
                        "id": 5,
                        "UOM": "pieces",
                        "Amount": 3000,
                        "Quantity": "30",
                        "Item_Name": "Micro Fiber 500 GSM",
                        "Unit_Price": "1000"
                    }
                ],
                "Is_Deleted": false,
                "Delivery_Address": {
                    "doorNo": "",
                    "cityName": "",
                    "stateName": "",
                    "storeName": "",
                    "streetName": "",
                    "countryName": ""
                },
                "Approved_Flag": true,
                "Status": true,
                "Order_Placed": true,
                "Order_Closed": true,
                "Termsandcondition": "<p>Testing Terms and Conditions</p>",
                "Unit_Rate": "500",
                "Created_Date": "2024-01-11",
                "Updated_Date": "2024-01-11",
                "Company_Id": 1,
                "Partner_Id": 2,
                "PR_Id": 8,
                "Supplier_Id": 4,
                "Created_By": 1,
                "Updated_By": 1,
                "Attached_file": []
            },
            {
                "id": 13,
                "PO_Id": "POR000000010",
                "Po_Date": "2024-01-19",
                "Buyer_Name": "Parkavi",
                "Delivery_Date": "2024-01-24",
                "Payment_Term": "Standard Terms of Condition",
                "Pay_Mode": "XYZ Store",
                "Price_term": "Ram info",
                "Freight": "12",
                "Desp_Instruction": "Thanks for the business..",
                "Tax_comp": "12",
                "Total_POAmount": 20000.0,
                "POCancel_Flag": false,
                "POAmend_Flag": false,
                "PO_Remarks": "Testing Terms and Conditions",
                "Advpaid_Flag": false,
                "Advance_Amount": 0.0,
                "Filter_status": null,
                "Cur_code": "amount",
                "Items": [
                    {
                        "id": 5,
                        "UOM": "pieces",
                        "Amount": 20000,
                        "Quantity": "200",
                        "Item_Name": "Micro Fiber 500 GSM",
                        "Unit_Price": "80"
                    }
                ],
                "Itemshcedule": [
                    {
                        "id": 5,
                        "UOM": "pieces",
                        "Amount": 20000,
                        "Quantity": "200",
                        "Item_Name": "Micro Fiber 500 GSM",
                        "Unit_Price": "80"
                    }
                ],
                "Is_Deleted": false,
                "Delivery_Address": {
                    "doorNo": "",
                    "cityName": "",
                    "stateName": "",
                    "storeName": "",
                    "streetName": "",
                    "countryName": ""
                },
                "Approved_Flag": true,
                "Status": true,
                "Order_Placed": false,
                "Order_Closed": false,
                "Termsandcondition": "Testing Terms and Conditions",
                "Unit_Rate": "500",
                "Created_Date": "2024-01-23",
                "Updated_Date": "2024-01-19",
                "Company_Id": 1,
                "Partner_Id": 2,
                "PR_Id": 9,
                "Supplier_Id": 5,
                "Created_By": 1,
                "Updated_By": 1,
                "Attached_file": []
            },
            {
                "id": 25,
                "PO_Id": "POR000000022",
                "Po_Date": "2024-01-26",
                "Buyer_Name": "Tamil",
                "Delivery_Date": "2024-01-26",
                "Payment_Term": "",
                "Pay_Mode": "ABC Store",
                "Price_term": "test catlouge 1",
                "Freight": "21",
                "Desp_Instruction": "",
                "Tax_comp": "12",
                "Total_POAmount": 12000.0,
                "POCancel_Flag": false,
                "POAmend_Flag": false,
                "PO_Remarks": "nothing",
                "Advpaid_Flag": true,
                "Advance_Amount": 0.0,
                "Filter_status": null,
                "Cur_code": "amount",
                "Items": [
                    {
                        "id": 12,
                        "UOM": "ltr",
                        "Amount": 10000,
                        "Quantity": "50",
                        "Item_Name": "Dettol",
                        "Unit_Price": "100"
                    },
                    {
                        "id": 10,
                        "UOM": "ltr",
                        "Amount": 2000,
                        "Quantity": "20",
                        "Item_Name": "Car Cleaner",
                        "Unit_Price": "50"
                    }
                ],
                "Itemshcedule": [
                    {
                        "id": 12,
                        "UOM": "ltr",
                        "Amount": 10000,
                        "Quantity": "50",
                        "Item_Name": "Dettol",
                        "Deliver_By": "2024-02-09",
                        "Unit_Price": "100",
                        "Pending_Quantity": 0,
                        "Schedule_Quantity": 30
                    },
                    {
                        "id": 10,
                        "UOM": "ltr",
                        "Amount": 2000,
                        "Quantity": "20",
                        "Item_Name": "Car Cleaner",
                        "Deliver_By": "2024-02-09",
                        "Unit_Price": "50",
                        "Pending_Quantity": 0,
                        "Schedule_Quantity": 20
                    },
                    {
                        "UOM": "ltr",
                        "Amount": 10000,
                        "Quantity": "50",
                        "Item_Name": "Dettol",
                        "Deliver_By": "2024-02-10",
                        "Unit_Price": "100",
                        "Pending_Quantity": 0,
                        "Schedule_Quantity": 20
                    }
                ],
                "Is_Deleted": false,
                "Delivery_Address": {
                    "doorNo": "",
                    "cityName": "",
                    "stateName": "",
                    "storeName": "",
                    "streetName": "",
                    "countryName": ""
                },
                "Approved_Flag": true,
                "Status": true,
                "Order_Placed": false,
                "Order_Closed": false,
                "Termsandcondition": "",
                "Unit_Rate": "500",
                "Created_Date": "2024-01-29",
                "Updated_Date": "2024-01-26",
                "Company_Id": 1,
                "Partner_Id": 2,
                "PR_Id": 21,
                "Supplier_Id": 4,
                "Created_By": 1,
                "Updated_By": 1,
                "Attached_file": []
            },
            {
                "id": 15,
                "PO_Id": "POR000000012",
                "Po_Date": "2024-01-24",
                "Buyer_Name": "Tamil",
                "Delivery_Date": "2024-01-24",
                "Payment_Term": "Standard Terms of Condition",
                "Pay_Mode": "ABC Store",
                "Price_term": "test catlouge 1",
                "Freight": "2000",
                "Desp_Instruction": "Thanks",
                "Tax_comp": "10",
                "Total_POAmount": 1200.0,
                "POCancel_Flag": false,
                "POAmend_Flag": true,
                "PO_Remarks": "Testing Terms and Conditions",
                "Advpaid_Flag": true,
                "Advance_Amount": 0.0,
                "Filter_status": null,
                "Cur_code": "amount",
                "Items": [
                    {
                        "id": 7,
                        "UOM": "ltr",
                        "Amount": 1200,
                        "Quantity": "10",
                        "Item_Name": "Car Brush",
                        "Unit_Price": "150"
                    }
                ],
                "Itemshcedule": [
                    {
                        "id": 0,
                        "UOM": "ltr",
                        "Amount": 1200,
                        "addRow": true,
                        "Quantity": "10",
                        "Item_Name": "Car Brush",
                        "Deliver_By": "2024-01-25",
                        "Unit_Price": "150",
                        "Pending_Quantity": 6,
                        "Schedule_Quantity": "4"
                    },
                    {
                        "UOM": "ltr",
                        "Amount": 1200,
                        "Quantity": "10",
                        "Item_Name": "Car Brush",
                        "Deliver_By": "2024-02-01",
                        "Unit_Price": "150",
                        "Pending_Quantity": 4,
                        "Schedule_Quantity": "2"
                    },
                    {
                        "UOM": "ltr",
                        "Amount": 1200,
                        "Quantity": "10",
                        "Item_Name": "Car Brush",
                        "Deliver_By": "2024-01-25",
                        "Unit_Price": "150",
                        "Pending_Quantity": 3,
                        "Schedule_Quantity": "1"
                    },
                    {
                        "UOM": "ltr",
                        "Amount": 1200,
                        "Quantity": "10",
                        "Item_Name": "Car Brush",
                        "Deliver_By": "2024-01-30",
                        "Unit_Price": "150",
                        "Pending_Quantity": 2,
                        "Schedule_Quantity": "1"
                    }
                ],
                "Is_Deleted": false,
                "Delivery_Address": {
                    "doorNo": "",
                    "cityName": "",
                    "stateName": "",
                    "storeName": "",
                    "streetName": "",
                    "countryName": ""
                },
                "Approved_Flag": true,
                "Status": true,
                "Order_Placed": true,
                "Order_Closed": true,
                "Termsandcondition": "Testing Terms and Conditions",
                "Unit_Rate": "500",
                "Created_Date": "2024-01-24",
                "Updated_Date": "2024-01-24",
                "Company_Id": 1,
                "Partner_Id": 2,
                "PR_Id": 20,
                "Supplier_Id": 4,
                "Created_By": 1,
                "Updated_By": 1,
                "Attached_file": []
            },
            {
                "id": 17,
                "PO_Id": "POR000000014",
                "Po_Date": "2024-01-24",
                "Buyer_Name": "Tamil",
                "Delivery_Date": "2024-01-24",
                "Payment_Term": "",
                "Pay_Mode": "XYZ Store",
                "Price_term": "Ram info",
                "Freight": "10",
                "Desp_Instruction": "",
                "Tax_comp": "10",
                "Total_POAmount": 20000.0,
                "POCancel_Flag": false,
                "POAmend_Flag": false,
                "PO_Remarks": "nothing",
                "Advpaid_Flag": false,
                "Advance_Amount": 0.0,
                "Filter_status": null,
                "Cur_code": "amount",
                "Items": [
                    {
                        "id": 5,
                        "UOM": "pieces",
                        "Amount": 20000,
                        "Quantity": "200",
                        "Item_Name": "Micro Fiber 500 GSM",
                        "Unit_Price": "80"
                    }
                ],
                "Itemshcedule": [
                    {
                        "id": 0,
                        "UOM": "pieces",
                        "Amount": 20000,
                        "addRow": true,
                        "Quantity": "200",
                        "Item_Name": "Micro Fiber 500 GSM",
                        "Deliver_By": "2024-02-02",
                        "Unit_Price": "80",
                        "Pending_Quantity": 110,
                        "Schedule_Quantity": "90"
                    },
                    {
                        "UOM": "pieces",
                        "Amount": 0,
                        "Quantity": 0,
                        "Item_Name": "Micro Fiber 500 GSM",
                        "Deliver_By": "2024-03-02",
                        "Unit_Price": 0,
                        "Pending_Quantity": 20,
                        "Schedule_Quantity": "90"
                    },
                    {
                        "UOM": "pieces",
                        "Amount": 0,
                        "Quantity": 0,
                        "Item_Name": "Micro Fiber 500 GSM",
                        "Deliver_By": "2024-01-26",
                        "Unit_Price": 0,
                        "Pending_Quantity": 0,
                        "Schedule_Quantity": "20"
                    }
                ],
                "Is_Deleted": false,
                "Delivery_Address": {
                    "doorNo": "",
                    "cityName": "",
                    "stateName": "",
                    "storeName": "",
                    "streetName": "",
                    "countryName": ""
                },
                "Approved_Flag": true,
                "Status": true,
                "Order_Placed": false,
                "Order_Closed": false,
                "Termsandcondition": "",
                "Unit_Rate": "500",
                "Created_Date": "2024-01-25",
                "Updated_Date": "2024-01-24",
                "Company_Id": 1,
                "Partner_Id": 2,
                "PR_Id": 9,
                "Supplier_Id": 5,
                "Created_By": 1,
                "Updated_By": 1,
                "Attached_file": []
            },
            {
                "id": 30,
                "PO_Id": "POR000000027",
                "Po_Date": "2024-01-30",
                "Buyer_Name": "Tamil",
                "Delivery_Date": "2024-01-30",
                "Payment_Term": "Standard Terms of Condition",
                "Pay_Mode": "Oil Store",
                "Price_term": "Megamart Catalogue",
                "Freight": "",
                "Desp_Instruction": "",
                "Tax_comp": "",
                "Total_POAmount": 8000.0,
                "POCancel_Flag": false,
                "POAmend_Flag": false,
                "PO_Remarks": "nothing",
                "Advpaid_Flag": false,
                "Advance_Amount": 0.0,
                "Filter_status": null,
                "Cur_code": "",
                "Items": [
                    {
                        "id": 11,
                        "UOM": "ltr",
                        "Amount": 4000,
                        "Quantity": "20",
                        "Item_Name": "Car",
                        "Unit_Price": "200"
                    },
                    {
                        "id": 10,
                        "UOM": "ltr",
                        "Amount": 4000,
                        "Quantity": "20",
                        "Item_Name": "Car Cleaner",
                        "Unit_Price": "100"
                    }
                ],
                "Itemshcedule": [
                    {
                        "id": 11,
                        "UOM": "ltr",
                        "Amount": 4000,
                        "Quantity": "20",
                        "Item_Name": "Car",
                        "Deliver_By": "2024-02-02",
                        "Unit_Price": "200",
                        "Pending_Quantity": 0,
                        "Schedule_Quantity": "20"
                    },
                    {
                        "id": 10,
                        "UOM": "ltr",
                        "Amount": 4000,
                        "Quantity": "20",
                        "Item_Name": "Car Cleaner",
                        "Deliver_By": "2024-02-01",
                        "Unit_Price": "100",
                        "Pending_Quantity": 0,
                        "Schedule_Quantity": "20"
                    }
                ],
                "Is_Deleted": false,
                "Delivery_Address": {
                    "doorNo": "",
                    "cityName": "",
                    "stateName": "",
                    "storeName": "",
                    "streetName": "",
                    "countryName": ""
                },
                "Approved_Flag": true,
                "Status": true,
                "Order_Placed": false,
                "Order_Closed": true,
                "Termsandcondition": "",
                "Unit_Rate": "500",
                "Created_Date": "2024-01-30",
                "Updated_Date": "2024-01-30",
                "Company_Id": 1,
                "Partner_Id": 2,
                "PR_Id": 23,
                "Supplier_Id": 4,
                "Created_By": 1,
                "Updated_By": 1,
                "Attached_file": []
            },
            {
                "id": 26,
                "PO_Id": "POR000000023",
                "Po_Date": "2024-01-26",
                "Buyer_Name": "Tamil",
                "Delivery_Date": "2024-01-26",
                "Payment_Term": "Standard Terms of Condition",
                "Pay_Mode": "ABC Store",
                "Price_term": "test catlouge 1",
                "Freight": "",
                "Desp_Instruction": "",
                "Tax_comp": "",
                "Total_POAmount": 12000.0,
                "POCancel_Flag": false,
                "POAmend_Flag": true,
                "PO_Remarks": "nothing",
                "Advpaid_Flag": true,
                "Advance_Amount": 0.0,
                "Filter_status": "Closed",
                "Cur_code": "",
                "Items": [
                    {
                        "id": 12,
                        "UOM": "ltr",
                        "Amount": 10000,
                        "Quantity": "50",
                        "Item_Name": "Dettol",
                        "Unit_Price": "100"
                    },
                    {
                        "id": 10,
                        "UOM": "ltr",
                        "Amount": 2000,
                        "Quantity": "20",
                        "Item_Name": "Car Cleaner",
                        "Unit_Price": "50"
                    }
                ],
                "Itemshcedule": [
                    {
                        "id": 12,
                        "UOM": "ltr",
                        "Amount": 10000,
                        "Quantity": "50",
                        "Item_Name": "Dettol",
                        "Deliver_By": "2024-02-08",
                        "Unit_Price": "100",
                        "Pending_Quantity": 0,
                        "Schedule_Quantity": 40
                    },
                    {
                        "id": 10,
                        "UOM": "ltr",
                        "Amount": 2000,
                        "Quantity": "20",
                        "Item_Name": "Car Cleaner",
                        "Deliver_By": "2024-02-09",
                        "Unit_Price": "50",
                        "Pending_Quantity": 0,
                        "Schedule_Quantity": 20
                    },
                    {
                        "UOM": "ltr",
                        "Amount": 10000,
                        "Quantity": "50",
                        "Item_Name": "Dettol",
                        "Deliver_By": "2024-02-10",
                        "Unit_Price": "100",
                        "Pending_Quantity": 0,
                        "Schedule_Quantity": 10
                    }
                ],
                "Is_Deleted": false,
                "Delivery_Address": {
                    "doorNo": "",
                    "cityName": "",
                    "stateName": "",
                    "storeName": "",
                    "streetName": "",
                    "countryName": ""
                },
                "Approved_Flag": true,
                "Status": true,
                "Order_Placed": true,
                "Order_Closed": true,
                "Termsandcondition": "<p>Testing Terms and Conditions</p>",
                "Unit_Rate": "500",
                "Created_Date": "2024-01-29",
                "Updated_Date": "2024-01-26",
                "Company_Id": 1,
                "Partner_Id": 2,
                "PR_Id": 21,
                "Supplier_Id": 4,
                "Created_By": 1,
                "Updated_By": 1,
                "Attached_file": []
            },
            {
                "id": 33,
                "PO_Id": "POR000000030",
                "Po_Date": "2024-01-30",
                "Buyer_Name": "Tamil",
                "Delivery_Date": "2024-01-30",
                "Payment_Term": "Standard Terms of Condition",
                "Pay_Mode": "ABC Store",
                "Price_term": "test catlouge 1",
                "Freight": "12",
                "Desp_Instruction": "...",
                "Tax_comp": "12",
                "Total_POAmount": 12000.0,
                "POCancel_Flag": false,
                "POAmend_Flag": true,
                "PO_Remarks": "nothing",
                "Advpaid_Flag": true,
                "Advance_Amount": 0.0,
                "Filter_status": null,
                "Cur_code": "amount",
                "Items": [
                    {
                        "id": 12,
                        "UOM": "ltr",
                        "Amount": 10000,
                        "Quantity": "50",
                        "Item_Name": "Dettol",
                        "Unit_Price": "100"
                    },
                    {
                        "id": 10,
                        "UOM": "ltr",
                        "Amount": 2000,
                        "Quantity": "20",
                        "Item_Name": "Car Cleaner",
                        "Unit_Price": "50"
                    }
                ],
                "Itemshcedule": [
                    {
                        "id": 12,
                        "UOM": "ltr",
                        "Amount": 10000,
                        "Quantity": "50",
                        "Item_Name": "Dettol",
                        "Deliver_By": "2024-02-09",
                        "Unit_Price": "100",
                        "Pending_Quantity": 0,
                        "Schedule_Quantity": "50"
                    },
                    {
                        "id": 10,
                        "UOM": "ltr",
                        "Amount": 2000,
                        "Quantity": "20",
                        "Item_Name": "Car Cleaner",
                        "Deliver_By": "2024-02-09",
                        "Unit_Price": "50",
                        "Pending_Quantity": 0,
                        "Schedule_Quantity": "10"
                    },
                    {
                        "UOM": "ltr",
                        "Amount": 2000,
                        "Quantity": "20",
                        "Item_Name": "Car Cleaner",
                        "Deliver_By": "2024-02-08",
                        "Unit_Price": "50",
                        "Pending_Quantity": 0,
                        "Schedule_Quantity": "10"
                    }
                ],
                "Is_Deleted": false,
                "Delivery_Address": {
                    "doorNo": "",
                    "cityName": "",
                    "stateName": "",
                    "storeName": "",
                    "streetName": "",
                    "countryName": ""
                },
                "Approved_Flag": true,
                "Status": true,
                "Order_Placed": false,
                "Order_Closed": true,
                "Termsandcondition": "<p>Testing Terms and Conditions</p>",
                "Unit_Rate": "500",
                "Created_Date": "2024-01-30",
                "Updated_Date": "2024-01-30",
                "Company_Id": 1,
                "Partner_Id": 2,
                "PR_Id": 21,
                "Supplier_Id": 4,
                "Created_By": 1,
                "Updated_By": 1,
                "Attached_file": []
            },
            {
                "id": 34,
                "PO_Id": "POR000000031",
                "Po_Date": "2024-01-31",
                "Buyer_Name": "Tamil",
                "Delivery_Date": "2024-01-31",
                "Payment_Term": "Standard Terms of Condition",
                "Pay_Mode": "ABC Store",
                "Price_term": "test catlouge 1",
                "Freight": "12",
                "Desp_Instruction": "",
                "Tax_comp": "12",
                "Total_POAmount": 1200.0,
                "POCancel_Flag": false,
                "POAmend_Flag": true,
                "PO_Remarks": "nothing",
                "Advpaid_Flag": true,
                "Advance_Amount": 0.0,
                "Filter_status": null,
                "Cur_code": "amount",
                "Items": [
                    {
                        "id": 7,
                        "UOM": "ltr",
                        "Amount": 1200,
                        "Quantity": "10",
                        "Item_Name": "Car Brush",
                        "Unit_Price": "150"
                    }
                ],
                "Itemshcedule": [
                    {
                        "id": 7,
                        "UOM": "ltr",
                        "Amount": 1200,
                        "Quantity": "10",
                        "Item_Name": "Car Brush",
                        "Deliver_By": "2024-02-09",
                        "Unit_Price": "150",
                        "Pending_Quantity": 0,
                        "Schedule_Quantity": "5"
                    },
                    {
                        "UOM": "ltr",
                        "Amount": 1200,
                        "Quantity": "10",
                        "Item_Name": "Car Brush",
                        "Deliver_By": "2024-02-09",
                        "Unit_Price": "150",
                        "Pending_Quantity": 0,
                        "Schedule_Quantity": "5"
                    }
                ],
                "Is_Deleted": false,
                "Delivery_Address": {
                    "doorNo": "",
                    "cityName": "",
                    "stateName": "",
                    "storeName": "",
                    "streetName": "",
                    "countryName": ""
                },
                "Approved_Flag": true,
                "Status": true,
                "Order_Placed": false,
                "Order_Closed": true,
                "Termsandcondition": "",
                "Unit_Rate": "500",
                "Created_Date": "2024-01-31",
                "Updated_Date": "2024-01-31",
                "Company_Id": 1,
                "Partner_Id": 2,
                "PR_Id": 20,
                "Supplier_Id": 4,
                "Created_By": 1,
                "Updated_By": 1,
                "Attached_file": []
            },
            {
                "id": 28,
                "PO_Id": "POR000000025",
                "Po_Date": "2024-01-26",
                "Buyer_Name": "Tamil",
                "Delivery_Date": "2024-01-26",
                "Payment_Term": "Standard Terms of Condition",
                "Pay_Mode": "ABC Store",
                "Price_term": "test catlouge 1",
                "Freight": "12",
                "Desp_Instruction": "",
                "Tax_comp": "12",
                "Total_POAmount": 12000.0,
                "POCancel_Flag": false,
                "POAmend_Flag": false,
                "PO_Remarks": "",
                "Advpaid_Flag": true,
                "Advance_Amount": 0.0,
                "Filter_status": null,
                "Cur_code": "amount",
                "Items": [
                    {
                        "id": 12,
                        "UOM": "ltr",
                        "Amount": 10000,
                        "Quantity": "50",
                        "Item_Name": "Dettol",
                        "Unit_Price": "100"
                    },
                    {
                        "id": 10,
                        "UOM": "ltr",
                        "Amount": 2000,
                        "Quantity": "20",
                        "Item_Name": "Car Cleaner",
                        "Unit_Price": "50"
                    }
                ],
                "Itemshcedule": [
                    {
                        "id": 12,
                        "UOM": "ltr",
                        "Amount": 10000,
                        "Quantity": "50",
                        "Item_Name": "Dettol",
                        "Deliver_By": "2024-02-08",
                        "Unit_Price": "100",
                        "Pending_Quantity": 0,
                        "Schedule_Quantity": "35"
                    },
                    {
                        "id": 10,
                        "UOM": "ltr",
                        "Amount": 2000,
                        "Quantity": "20",
                        "Item_Name": "Car Cleaner",
                        "Deliver_By": "2024-02-10",
                        "Unit_Price": "50",
                        "Pending_Quantity": 0,
                        "Schedule_Quantity": "20"
                    },
                    {
                        "UOM": "ltr",
                        "Amount": 10000,
                        "Quantity": "50",
                        "Item_Name": "Dettol",
                        "Deliver_By": "2024-02-08",
                        "Unit_Price": "100",
                        "Pending_Quantity": 0,
                        "Schedule_Quantity": "11"
                    },
                    {
                        "UOM": "ltr",
                        "Amount": 10000,
                        "Quantity": "50",
                        "Item_Name": "Dettol",
                        "Deliver_By": "2024-02-01",
                        "Unit_Price": "100",
                        "Pending_Quantity": 0,
                        "Schedule_Quantity": "4"
                    }
                ],
                "Is_Deleted": false,
                "Delivery_Address": {
                    "doorNo": "",
                    "cityName": "",
                    "stateName": "",
                    "storeName": "",
                    "streetName": "",
                    "countryName": ""
                },
                "Approved_Flag": true,
                "Status": true,
                "Order_Placed": false,
                "Order_Closed": false,
                "Termsandcondition": "",
                "Unit_Rate": "500",
                "Created_Date": "2024-01-29",
                "Updated_Date": "2024-01-26",
                "Company_Id": 1,
                "Partner_Id": 2,
                "PR_Id": 21,
                "Supplier_Id": 4,
                "Created_By": 1,
                "Updated_By": 1,
                "Attached_file": []
            },
            {
                "id": 29,
                "PO_Id": "POR000000026",
                "Po_Date": "2024-01-30",
                "Buyer_Name": "Tamil",
                "Delivery_Date": "2024-01-30",
                "Payment_Term": "Standard Terms of Condition",
                "Pay_Mode": "XYZ Store",
                "Price_term": "test catlouge 1",
                "Freight": "",
                "Desp_Instruction": "",
                "Tax_comp": "",
                "Total_POAmount": 12000.0,
                "POCancel_Flag": false,
                "POAmend_Flag": true,
                "PO_Remarks": "nothing",
                "Advpaid_Flag": true,
                "Advance_Amount": 0.0,
                "Filter_status": "PO Amended",
                "Cur_code": "amount",
                "Items": [
                    {
                        "id": 12,
                        "UOM": "ltr",
                        "Amount": 10000,
                        "Quantity": "50",
                        "Item_Name": "Dettol",
                        "Unit_Price": "100"
                    },
                    {
                        "id": 10,
                        "UOM": "ltr",
                        "Amount": 2000,
                        "Quantity": "20",
                        "Item_Name": "Car Cleaner",
                        "Unit_Price": "50"
                    }
                ],
                "Itemshcedule": [
                    {
                        "id": 12,
                        "UOM": "ltr",
                        "Amount": 10000,
                        "Quantity": "50",
                        "Item_Name": "Dettol",
                        "Deliver_By": "2024-02-02",
                        "Unit_Price": "100",
                        "Pending_Quantity": 0,
                        "Schedule_Quantity": "50"
                    },
                    {
                        "id": 10,
                        "UOM": "ltr",
                        "Amount": 2000,
                        "Quantity": "20",
                        "Item_Name": "Car Cleaner",
                        "Deliver_By": "2024-02-02",
                        "Unit_Price": "50",
                        "Pending_Quantity": 0,
                        "Schedule_Quantity": "10"
                    },
                    {
                        "UOM": "ltr",
                        "Amount": 2000,
                        "Quantity": "20",
                        "Item_Name": "Car Cleaner",
                        "Deliver_By": "2024-02-02",
                        "Unit_Price": "50",
                        "Pending_Quantity": 0,
                        "Schedule_Quantity": "10"
                    }
                ],
                "Is_Deleted": false,
                "Delivery_Address": {
                    "doorNo": "77",
                    "cityName": "Chennai",
                    "stateName": "Tamil Nadu",
                    "storeName": "XYZ Store",
                    "streetName": "Perungudi",
                    "countryName": "India"
                },
                "Approved_Flag": true,
                "Status": true,
                "Order_Placed": false,
                "Order_Closed": true,
                "Termsandcondition": "<p>Testing Terms and Conditions</p>",
                "Unit_Rate": "500",
                "Created_Date": "2024-01-30",
                "Updated_Date": "2024-01-30",
                "Company_Id": 1,
                "Partner_Id": 2,
                "PR_Id": 21,
                "Supplier_Id": 4,
                "Created_By": 1,
                "Updated_By": 1,
                "Attached_file": [
                    88
                ]
            }
        ],
        "February 2024": [
            {
                "id": 37,
                "PO_Id": "POR000000032",
                "Po_Date": "2024-02-01",
                "Buyer_Name": "Tamil",
                "Delivery_Date": "2024-02-01",
                "Payment_Term": "Standard Terms of Condition",
                "Pay_Mode": "XYZ Store",
                "Price_term": "test catlouge 1",
                "Freight": "12",
                "Desp_Instruction": "",
                "Tax_comp": "11",
                "Total_POAmount": 5840.0,
                "POCancel_Flag": false,
                "POAmend_Flag": false,
                "PO_Remarks": "nothing",
                "Advpaid_Flag": true,
                "Advance_Amount": 0.0,
                "Filter_status": null,
                "Cur_code": "amount",
                "Items": [
                    {
                        "id": 7,
                        "UOM": "ltr",
                        "Amount": 1440,
                        "Quantity": "12",
                        "Item_Name": "Car Brush",
                        "Unit_Price": "150"
                    },
                    {
                        "id": 8,
                        "UOM": "ltr",
                        "Amount": 4400,
                        "Quantity": "20",
                        "Item_Name": "Clean liquid",
                        "Unit_Price": "130"
                    }
                ],
                "Itemshcedule": [
                    {
                        "id": 7,
                        "UOM": "ltr",
                        "Amount": 1440,
                        "Quantity": "12",
                        "Item_Name": "Car Brush",
                        "Deliver_By": "2024-02-22",
                        "Unit_Price": "150",
                        "Pending_Quantity": 0,
                        "Schedule_Quantity": "12"
                    },
                    {
                        "id": 8,
                        "UOM": "ltr",
                        "Amount": 4400,
                        "Quantity": "20",
                        "Item_Name": "Clean liquid",
                        "Deliver_By": "2024-02-17",
                        "Unit_Price": "130",
                        "Pending_Quantity": 0,
                        "Schedule_Quantity": "20"
                    }
                ],
                "Is_Deleted": false,
                "Delivery_Address": {
                    "doorNo": "",
                    "cityName": "",
                    "stateName": "",
                    "storeName": "",
                    "streetName": "",
                    "countryName": ""
                },
                "Approved_Flag": true,
                "Status": true,
                "Order_Placed": false,
                "Order_Closed": true,
                "Termsandcondition": "",
                "Unit_Rate": "500",
                "Created_Date": "2024-02-01",
                "Updated_Date": "2024-02-01",
                "Company_Id": 1,
                "Partner_Id": 2,
                "PR_Id": 25,
                "Supplier_Id": 4,
                "Created_By": 1,
                "Updated_By": 1,
                "Attached_file": []
            },
            {
                "id": 41,
                "PO_Id": "POR000000036",
                "Po_Date": "2024-02-14",
                "Buyer_Name": "Tamil",
                "Delivery_Date": "2024-02-14",
                "Payment_Term": "New Terms of Condition",
                "Pay_Mode": "ABC Store",
                "Price_term": "Gokart Catalouge",
                "Freight": "200",
                "Desp_Instruction": "Thanks",
                "Tax_comp": "32",
                "Total_POAmount": 200.0,
                "POCancel_Flag": true,
                "POAmend_Flag": false,
                "PO_Remarks": "<p>Thanks</p>",
                "Advpaid_Flag": true,
                "Advance_Amount": 0.0,
                "Filter_status": null,
                "Cur_code": "amount",
                "Items": [
                    {
                        "id": 5,
                        "UOM": "pieces",
                        "Amount": 200,
                        "Quantity": "20",
                        "Item_Name": "Micro Fiber 500 GSM",
                        "Unit_Price": "10"
                    }
                ],
                "Itemshcedule": [
                    {
                        "id": 5,
                        "UOM": "pieces",
                        "Amount": 200,
                        "Quantity": "20",
                        "Item_Name": "Micro Fiber 500 GSM",
                        "Deliver_By": "2024-02-17",
                        "Unit_Price": "10",
                        "Pending_Quantity": 0,
                        "Schedule_Quantity": "20"
                    }
                ],
                "Is_Deleted": false,
                "Delivery_Address": {
                    "doorNo": "PPPD Complex",
                    "cityName": "Chennai",
                    "stateName": "Tamil Nadu",
                    "storeName": "ABC Store",
                    "streetName": "Perungudi",
                    "countryName": "India"
                },
                "Approved_Flag": true,
                "Status": true,
                "Order_Placed": false,
                "Order_Closed": false,
                "Termsandcondition": "<p>Thanks</p>",
                "Unit_Rate": "500",
                "Created_Date": "2024-02-17",
                "Updated_Date": "2024-02-14",
                "Company_Id": 1,
                "Partner_Id": 2,
                "PR_Id": 35,
                "Supplier_Id": 6,
                "Created_By": 5,
                "Updated_By": 5,
                "Attached_file": []
            },
            {
                "id": 40,
                "PO_Id": "POR000000035",
                "Po_Date": "2024-02-14",
                "Buyer_Name": "Muthu",
                "Delivery_Date": "2024-02-22",
                "Payment_Term": "New Terms of Condition",
                "Pay_Mode": "ABC Store",
                "Price_term": "Ram info",
                "Freight": "100",
                "Desp_Instruction": "Thannks",
                "Tax_comp": "10",
                "Total_POAmount": 1600.0,
                "POCancel_Flag": false,
                "POAmend_Flag": false,
                "PO_Remarks": "Thanks",
                "Advpaid_Flag": false,
                "Advance_Amount": 20.0,
                "Filter_status": "Pending",
                "Cur_code": "amount",
                "Items": [
                    {
                        "id": 5,
                        "UOM": "pieces",
                        "Amount": 1600,
                        "Quantity": "20",
                        "Item_Name": "Micro Fiber 500 GSM",
                        "Unit_Price": 80
                    }
                ],
                "Itemshcedule": [
                    {
                        "id": 5,
                        "UOM": "pieces",
                        "Amount": 200,
                        "Quantity": "20",
                        "Item_Name": "Micro Fiber 500 GSM",
                        "Deliver_By": "",
                        "Unit_Price": "50",
                        "Pending_Quantity": "20",
                        "Schedule_Quantity": ""
                    }
                ],
                "Is_Deleted": false,
                "Delivery_Address": {
                    "doorNo": "PPPD Complex",
                    "cityName": "Chennai",
                    "stateName": "Tamil Nadu",
                    "storeName": "ABC Store",
                    "streetName": "Perungudi",
                    "countryName": "India"
                },
                "Approved_Flag": false,
                "Status": true,
                "Order_Placed": false,
                "Order_Closed": false,
                "Termsandcondition": "Thanks",
                "Unit_Rate": "500",
                "Created_Date": "2024-02-19",
                "Updated_Date": "2024-02-14",
                "Company_Id": 1,
                "Partner_Id": 2,
                "PR_Id": 35,
                "Supplier_Id": 5,
                "Created_By": 5,
                "Updated_By": 5,
                "Attached_file": []
            },
            {
                "id": 38,
                "PO_Id": "POR000000033",
                "Po_Date": "2024-02-01",
                "Buyer_Name": "Tamil",
                "Delivery_Date": "2024-02-01",
                "Payment_Term": "Standard Terms of Condition",
                "Pay_Mode": "XYZ Store",
                "Price_term": "test catlouge 1",
                "Freight": "12",
                "Desp_Instruction": "Need a quality products.",
                "Tax_comp": "10",
                "Total_POAmount": 4400.0,
                "POCancel_Flag": false,
                "POAmend_Flag": false,
                "PO_Remarks": "Testing Terms and Conditions",
                "Advpaid_Flag": true,
                "Advance_Amount": 0.0,
                "Filter_status": "Pending",
                "Cur_code": "amount",
                "Items": [
                    {
                        "id": 7,
                        "UOM": "ltr",
                        "Amount": 1800,
                        "Quantity": "12",
                        "Item_Name": "Car Brush",
                        "Unit_Price": 150
                    },
                    {
                        "id": 8,
                        "UOM": "ltr",
                        "Amount": 2600,
                        "Quantity": "20",
                        "Item_Name": "Clean liquid",
                        "Unit_Price": 130
                    }
                ],
                "Itemshcedule": [
                    {
                        "id": 7,
                        "UOM": "ltr",
                        "Amount": 1440,
                        "Quantity": "12",
                        "Item_Name": "Car Brush",
                        "Deliver_By": "2024-02-22",
                        "Unit_Price": "150",
                        "Pending_Quantity": 0,
                        "Schedule_Quantity": "12"
                    },
                    {
                        "id": 8,
                        "UOM": "ltr",
                        "Amount": 4400,
                        "Quantity": "20",
                        "Item_Name": "Clean liquid",
                        "Deliver_By": "2024-02-22",
                        "Unit_Price": "130",
                        "Pending_Quantity": 0,
                        "Schedule_Quantity": "20"
                    }
                ],
                "Is_Deleted": false,
                "Delivery_Address": {
                    "doorNo": "77",
                    "cityName": "Chennai",
                    "stateName": "Tamil Nadu",
                    "storeName": "XYZ Store",
                    "streetName": "Perungudi",
                    "countryName": "India"
                },
                "Approved_Flag": false,
                "Status": false,
                "Order_Placed": false,
                "Order_Closed": false,
                "Termsandcondition": "Testing Terms and Conditions",
                "Unit_Rate": "500",
                "Created_Date": "2024-02-28",
                "Updated_Date": "2024-02-01",
                "Company_Id": 1,
                "Partner_Id": 2,
                "PR_Id": 25,
                "Supplier_Id": 4,
                "Created_By": 1,
                "Updated_By": 1,
                "Attached_file": []
            },
            {
                "id": 43,
                "PO_Id": "POR000000038",
                "Po_Date": "2024-02-17",
                "Buyer_Name": "Muthu",
                "Delivery_Date": "2024-02-29",
                "Payment_Term": "New Terms of Condition",
                "Pay_Mode": "XYZ Store",
                "Price_term": "Ram info",
                "Freight": "20",
                "Desp_Instruction": "Check and update",
                "Tax_comp": "10",
                "Total_POAmount": 600.0,
                "POCancel_Flag": true,
                "POAmend_Flag": true,
                "PO_Remarks": "nothing",
                "Advpaid_Flag": false,
                "Advance_Amount": 0.0,
                "Filter_status": "Approved",
                "Cur_code": "amount",
                "Items": [
                    {
                        "id": 12,
                        "UOM": "ltr",
                        "Amount": 600,
                        "Quantity": "20",
                        "Item_Name": "Dettol",
                        "Unit_Price": "30"
                    }
                ],
                "Itemshcedule": [
                    {
                        "id": 12,
                        "UOM": "ltr",
                        "Amount": 600,
                        "Quantity": "20",
                        "Item_Name": "Dettol",
                        "Deliver_By": "",
                        "Unit_Price": "30",
                        "Pending_Quantity": "20",
                        "Schedule_Quantity": ""
                    }
                ],
                "Is_Deleted": false,
                "Delivery_Address": {
                    "doorNo": "77",
                    "cityName": "Chennai",
                    "stateName": "Tamil Nadu",
                    "storeName": "XYZ Store",
                    "streetName": "Perungudi",
                    "countryName": "India"
                },
                "Approved_Flag": true,
                "Status": true,
                "Order_Placed": false,
                "Order_Closed": true,
                "Termsandcondition": "<p>Thanks&nbsp;</p>",
                "Unit_Rate": "500",
                "Created_Date": "2024-02-19",
                "Updated_Date": "2024-02-17",
                "Company_Id": 1,
                "Partner_Id": 2,
                "PR_Id": 39,
                "Supplier_Id": 5,
                "Created_By": 5,
                "Updated_By": 5,
                "Attached_file": []
            },
            {
                "id": 42,
                "PO_Id": "POR000000037",
                "Po_Date": "2024-02-14",
                "Buyer_Name": "Ponkumar",
                "Delivery_Date": "2024-02-14",
                "Payment_Term": "Standard Terms of Condition",
                "Pay_Mode": "Oil Store",
                "Price_term": "Megamart Catalogue",
                "Freight": "5678",
                "Desp_Instruction": "",
                "Tax_comp": "10",
                "Total_POAmount": 39660.0,
                "POCancel_Flag": false,
                "POAmend_Flag": false,
                "PO_Remarks": "nothing",
                "Advpaid_Flag": true,
                "Advance_Amount": 0.0,
                "Filter_status": null,
                "Cur_code": "amount",
                "Items": [
                    {
                        "id": 12,
                        "UOM": "ltr",
                        "Amount": 2900,
                        "Quantity": "29",
                        "Item_Name": "Dettol",
                        "Unit_Price": "100"
                    },
                    {
                        "id": 10,
                        "UOM": "ltr",
                        "Amount": 11560,
                        "Quantity": "34",
                        "Item_Name": "Car Cleaner",
                        "Unit_Price": "100"
                    },
                    {
                        "id": 5,
                        "UOM": "pieces",
                        "Amount": 25200,
                        "Quantity": "56",
                        "Item_Name": "Micro Fiber 500 GSM",
                        "Unit_Price": "50"
                    }
                ],
                "Itemshcedule": [
                    {
                        "id": 12,
                        "UOM": "ltr",
                        "Amount": 2900,
                        "Quantity": "29",
                        "Item_Name": "Dettol",
                        "Deliver_By": "2024-02-23",
                        "Unit_Price": "100",
                        "Pending_Quantity": 0,
                        "Schedule_Quantity": "28"
                    },
                    {
                        "id": 10,
                        "UOM": "ltr",
                        "Amount": 11560,
                        "Quantity": "34",
                        "Item_Name": "Car Cleaner",
                        "Deliver_By": "2024-02-29",
                        "Unit_Price": "100",
                        "Pending_Quantity": 0,
                        "Schedule_Quantity": "34"
                    },
                    {
                        "id": 5,
                        "UOM": "pieces",
                        "Amount": 25200,
                        "Quantity": "56",
                        "Item_Name": "Micro Fiber 500 GSM",
                        "Deliver_By": "2024-02-23",
                        "Unit_Price": "50",
                        "Pending_Quantity": 0,
                        "Schedule_Quantity": "56"
                    },
                    {
                        "UOM": "ltr",
                        "Amount": 2900,
                        "Quantity": "29",
                        "Item_Name": "Dettol",
                        "Deliver_By": "2024-02-29",
                        "Unit_Price": "100",
                        "Pending_Quantity": 0,
                        "Schedule_Quantity": "1"
                    }
                ],
                "Is_Deleted": false,
                "Delivery_Address": {
                    "doorNo": "32A1",
                    "cityName": "Chennai",
                    "stateName": "Tamil Nadu",
                    "storeName": "Oil Store",
                    "streetName": "Madipakkam",
                    "countryName": "India"
                },
                "Approved_Flag": true,
                "Status": true,
                "Order_Placed": false,
                "Order_Closed": true,
                "Termsandcondition": "",
                "Unit_Rate": "500",
                "Created_Date": "2024-02-14",
                "Updated_Date": "2024-02-14",
                "Company_Id": 1,
                "Partner_Id": 2,
                "PR_Id": 36,
                "Supplier_Id": 4,
                "Created_By": 2,
                "Updated_By": 2,
                "Attached_file": []
            },
            {
                "id": 45,
                "PO_Id": "POR000000040",
                "Po_Date": "2024-02-21",
                "Buyer_Name": "Parkavi",
                "Delivery_Date": "2024-03-23",
                "Payment_Term": "Standard Terms of Condition",
                "Pay_Mode": "XYZ Store",
                "Price_term": "Item Catalouges",
                "Freight": "100",
                "Desp_Instruction": "Thanks",
                "Tax_comp": "20",
                "Total_POAmount": 10000.0,
                "POCancel_Flag": false,
                "POAmend_Flag": false,
                "PO_Remarks": "nothing",
                "Advpaid_Flag": false,
                "Advance_Amount": 0.0,
                "Filter_status": "Closed",
                "Cur_code": "amount",
                "Items": [
                    {
                        "id": 17,
                        "UOM": "pieces",
                        "Amount": 2000,
                        "Quantity": 20,
                        "Item_Name": "Brush",
                        "Unit_Price": 100
                    },
                    {
                        "id": 16,
                        "UOM": "pieces",
                        "Amount": 1000,
                        "Quantity": 10,
                        "Item_Name": "Scruber",
                        "Unit_Price": 100
                    },
                    {
                        "id": 15,
                        "UOM": "pieces",
                        "Amount": 1000,
                        "Quantity": 10,
                        "Item_Name": "Car Washing Soap",
                        "Unit_Price": 100
                    },
                    {
                        "id": 14,
                        "UOM": "pieces",
                        "Amount": 10000,
                        "Quantity": 100,
                        "Item_Name": "Sponge",
                        "Unit_Price": 100
                    }
                ],
                "Itemshcedule": [
                    {
                        "id": 17,
                        "UOM": "pieces",
                        "Amount": 2000,
                        "Quantity": 20,
                        "Item_Name": "Brush",
                        "Deliver_By": "",
                        "Unit_Price": 100,
                        "Pending_Quantity": 20,
                        "Schedule_Quantity": ""
                    },
                    {
                        "id": 16,
                        "UOM": "pieces",
                        "Amount": 1000,
                        "Quantity": 10,
                        "Item_Name": "Scruber",
                        "Deliver_By": "",
                        "Unit_Price": 100,
                        "Pending_Quantity": 10,
                        "Schedule_Quantity": ""
                    },
                    {
                        "id": 15,
                        "UOM": "pieces",
                        "Amount": 1000,
                        "Quantity": 10,
                        "Item_Name": "Car Washing Soap",
                        "Deliver_By": "",
                        "Unit_Price": 100,
                        "Pending_Quantity": 10,
                        "Schedule_Quantity": ""
                    },
                    {
                        "id": 14,
                        "UOM": "pieces",
                        "Amount": 10000,
                        "Quantity": 100,
                        "Item_Name": "Sponge",
                        "Deliver_By": "",
                        "Unit_Price": 100,
                        "Pending_Quantity": 100,
                        "Schedule_Quantity": ""
                    }
                ],
                "Is_Deleted": false,
                "Delivery_Address": {
                    "doorNo": "77",
                    "cityName": "Chennai",
                    "stateName": "Tamil Nadu",
                    "storeName": "XYZ Store",
                    "streetName": "Perungudi",
                    "countryName": "India"
                },
                "Approved_Flag": true,
                "Status": true,
                "Order_Placed": false,
                "Order_Closed": true,
                "Termsandcondition": "<p>Testing Terms and Conditions</p>",
                "Unit_Rate": "500",
                "Created_Date": "2024-02-22",
                "Updated_Date": "2024-02-21",
                "Company_Id": 1,
                "Partner_Id": 2,
                "PR_Id": 41,
                "Supplier_Id": 7,
                "Created_By": 5,
                "Updated_By": 5,
                "Attached_file": []
            },
            {
                "id": 44,
                "PO_Id": "POR000000039",
                "Po_Date": "2024-02-21",
                "Buyer_Name": "Parkavi",
                "Delivery_Date": "2024-02-28",
                "Payment_Term": "Standard Terms of Condition",
                "Pay_Mode": "RST Store",
                "Price_term": "KartCatalouge",
                "Freight": "10",
                "Desp_Instruction": "Thanks",
                "Tax_comp": "30",
                "Total_POAmount": 900.0,
                "POCancel_Flag": false,
                "POAmend_Flag": false,
                "PO_Remarks": "nothing",
                "Advpaid_Flag": false,
                "Advance_Amount": 0.0,
                "Filter_status": "Closed",
                "Cur_code": "amount",
                "Items": [
                    {
                        "id": 17,
                        "UOM": "pieces",
                        "Amount": 400,
                        "Quantity": 20,
                        "Item_Name": "Brush",
                        "Unit_Price": 20
                    },
                    {
                        "id": 16,
                        "UOM": "pieces",
                        "Amount": 1500,
                        "Quantity": 30,
                        "Item_Name": "Scruber",
                        "Unit_Price": 50
                    },
                    {
                        "id": 14,
                        "UOM": "pieces",
                        "Amount": 900,
                        "Quantity": 30,
                        "Item_Name": "Sponge",
                        "Unit_Price": 30
                    }
                ],
                "Itemshcedule": [
                    {
                        "id": 17,
                        "UOM": "pieces",
                        "Amount": 400,
                        "Quantity": 20,
                        "Item_Name": "Brush",
                        "Deliver_By": "",
                        "Unit_Price": 20,
                        "Pending_Quantity": 20,
                        "Schedule_Quantity": ""
                    },
                    {
                        "id": 16,
                        "UOM": "pieces",
                        "Amount": 1500,
                        "Quantity": 30,
                        "Item_Name": "Scruber",
                        "Deliver_By": "",
                        "Unit_Price": 50,
                        "Pending_Quantity": 30,
                        "Schedule_Quantity": ""
                    },
                    {
                        "id": 14,
                        "UOM": "pieces",
                        "Amount": 900,
                        "Quantity": 30,
                        "Item_Name": "Sponge",
                        "Deliver_By": "",
                        "Unit_Price": 30,
                        "Pending_Quantity": 30,
                        "Schedule_Quantity": ""
                    }
                ],
                "Is_Deleted": false,
                "Delivery_Address": {
                    "doorNo": "78,Apart",
                    "cityName": "Chennai",
                    "stateName": "Tamil Nadu",
                    "storeName": "RST Store",
                    "streetName": "Perungudi",
                    "countryName": "India"
                },
                "Approved_Flag": true,
                "Status": true,
                "Order_Placed": false,
                "Order_Closed": true,
                "Termsandcondition": "<p>Testing Terms and Conditions</p>",
                "Unit_Rate": "500",
                "Created_Date": "2024-02-21",
                "Updated_Date": "2024-02-21",
                "Company_Id": 1,
                "Partner_Id": 2,
                "PR_Id": 40,
                "Supplier_Id": 7,
                "Created_By": 5,
                "Updated_By": 5,
                "Attached_file": []
            },
            {
                "id": 24,
                "PO_Id": "POR000000021",
                "Po_Date": "2024-01-26",
                "Buyer_Name": "Tamil",
                "Delivery_Date": "2024-01-26",
                "Payment_Term": "Standard Terms of Condition",
                "Pay_Mode": "ABC Store",
                "Price_term": "test catlouge 1",
                "Freight": "12",
                "Desp_Instruction": "Thanks",
                "Tax_comp": "12",
                "Total_POAmount": 6000.0,
                "POCancel_Flag": false,
                "POAmend_Flag": false,
                "PO_Remarks": "Testing Terms and Conditions",
                "Advpaid_Flag": true,
                "Advance_Amount": 0.0,
                "Filter_status": "Pending",
                "Cur_code": "amount",
                "Items": [
                    {
                        "id": 12,
                        "UOM": "ltr",
                        "Amount": 5000,
                        "Quantity": "50",
                        "Item_Name": "Dettol",
                        "Unit_Price": 100
                    },
                    {
                        "id": 10,
                        "UOM": "ltr",
                        "Amount": 1000,
                        "Quantity": "20",
                        "Item_Name": "Car Cleaner",
                        "Unit_Price": 50
                    }
                ],
                "Itemshcedule": [
                    {
                        "id": 12,
                        "UOM": "ltr",
                        "Amount": 10000,
                        "Quantity": "50",
                        "Item_Name": "Dettol",
                        "Deliver_By": "2024-02-01",
                        "Unit_Price": "100",
                        "Pending_Quantity": 0,
                        "Schedule_Quantity": 30
                    },
                    {
                        "id": 10,
                        "UOM": "ltr",
                        "Amount": 2000,
                        "Quantity": "20",
                        "Item_Name": "Car Cleaner",
                        "Deliver_By": "2024-02-08",
                        "Unit_Price": "50",
                        "Pending_Quantity": 0,
                        "Schedule_Quantity": 10
                    },
                    {
                        "UOM": "ltr",
                        "Amount": 10000,
                        "Quantity": "50",
                        "Item_Name": "Dettol",
                        "Deliver_By": "2024-01-31",
                        "Unit_Price": "100",
                        "Pending_Quantity": 0,
                        "Schedule_Quantity": 20
                    },
                    {
                        "UOM": "ltr",
                        "Amount": 2000,
                        "Quantity": "20",
                        "Item_Name": "Car Cleaner",
                        "Deliver_By": "2024-02-01",
                        "Unit_Price": "50",
                        "Pending_Quantity": 0,
                        "Schedule_Quantity": 10
                    }
                ],
                "Is_Deleted": false,
                "Delivery_Address": {
                    "doorNo": "PPPD Complex",
                    "cityName": "Chennai",
                    "stateName": "Tamil Nadu",
                    "storeName": "ABC Store",
                    "streetName": "Perungudi",
                    "countryName": "India"
                },
                "Approved_Flag": false,
                "Status": false,
                "Order_Placed": false,
                "Order_Closed": false,
                "Termsandcondition": "Testing Terms and Conditions",
                "Unit_Rate": "500",
                "Created_Date": "2024-02-28",
                "Updated_Date": "2024-01-26",
                "Company_Id": 1,
                "Partner_Id": 2,
                "PR_Id": 21,
                "Supplier_Id": 4,
                "Created_By": 1,
                "Updated_By": 1,
                "Attached_file": []
            },
            {
                "id": 47,
                "PO_Id": "POR3210000000422024",
                "Po_Date": "2024-02-26",
                "Buyer_Name": "Prakash",
                "Delivery_Date": "2024-02-29",
                "Payment_Term": "Standard Terms of Condition",
                "Pay_Mode": "Oil Store",
                "Price_term": "Megamart Catalogue",
                "Freight": "4100",
                "Desp_Instruction": "",
                "Tax_comp": "20",
                "Total_POAmount": 1500.0,
                "POCancel_Flag": false,
                "POAmend_Flag": false,
                "PO_Remarks": "nothing",
                "Advpaid_Flag": false,
                "Advance_Amount": 0.0,
                "Filter_status": "Pending",
                "Cur_code": "amount",
                "Items": [
                    {
                        "id": 17,
                        "UOM": "pieces",
                        "Amount": 1500,
                        "Quantity": 10,
                        "Item_Name": "Brush",
                        "Unit_Price": 150
                    }
                ],
                "Itemshcedule": [
                    {
                        "id": 17,
                        "UOM": "pieces",
                        "Amount": 1500,
                        "Quantity": 10,
                        "Item_Name": "Brush",
                        "Deliver_By": "",
                        "Unit_Price": 150,
                        "Pending_Quantity": 10,
                        "Schedule_Quantity": ""
                    }
                ],
                "Is_Deleted": false,
                "Delivery_Address": {
                    "doorNo": "32A1",
                    "cityName": "Chennai",
                    "stateName": "Tamil Nadu",
                    "storeName": "Oil Store",
                    "streetName": "Madipakkam",
                    "countryName": "India"
                },
                "Approved_Flag": true,
                "Status": true,
                "Order_Placed": true,
                "Order_Closed": false,
                "Termsandcondition": "<p>Testing Terms and Conditions</p>",
                "Unit_Rate": "500",
                "Created_Date": "2024-02-27",
                "Updated_Date": "2024-02-26",
                "Company_Id": 1,
                "Partner_Id": 2,
                "PR_Id": 48,
                "Supplier_Id": 4,
                "Created_By": 3,
                "Updated_By": 3,
                "Attached_file": []
            },
            {
                "id": 46,
                "PO_Id": "POR000000041",
                "Po_Date": "2024-02-26",
                "Buyer_Name": "Tamil",
                "Delivery_Date": "2024-02-29",
                "Payment_Term": "Standard Terms of Condition",
                "Pay_Mode": "Oil Store",
                "Price_term": "Megamart Catalogue",
                "Freight": "10",
                "Desp_Instruction": "",
                "Tax_comp": "10",
                "Total_POAmount": 21000.0,
                "POCancel_Flag": false,
                "POAmend_Flag": false,
                "PO_Remarks": "nothing",
                "Advpaid_Flag": true,
                "Advance_Amount": 0.0,
                "Filter_status": "Approved",
                "Cur_code": "percentage",
                "Items": [
                    {
                        "id": 17,
                        "UOM": "pieces",
                        "Amount": 3000,
                        "Quantity": 20,
                        "Item_Name": "Brush",
                        "Unit_Price": 150
                    },
                    {
                        "id": 16,
                        "UOM": "pieces",
                        "Amount": 7500,
                        "Quantity": 30,
                        "Item_Name": "Scruber",
                        "Unit_Price": 250
                    },
                    {
                        "id": 14,
                        "UOM": "pieces",
                        "Amount": 10500,
                        "Quantity": 30,
                        "Item_Name": "Sponge",
                        "Unit_Price": 350
                    }
                ],
                "Itemshcedule": [
                    {
                        "id": 17,
                        "UOM": "pieces",
                        "Amount": 3000,
                        "Quantity": 20,
                        "Item_Name": "Brush",
                        "Deliver_By": "",
                        "Unit_Price": 150,
                        "Pending_Quantity": 20,
                        "Schedule_Quantity": 10
                    },
                    {
                        "id": 16,
                        "UOM": "pieces",
                        "Amount": 7500,
                        "Quantity": 30,
                        "Item_Name": "Scruber",
                        "Deliver_By": "2024-03-20",
                        "Unit_Price": 250,
                        "Pending_Quantity": 30,
                        "Schedule_Quantity": 10
                    },
                    {
                        "id": 14,
                        "UOM": "pieces",
                        "Amount": 10500,
                        "Quantity": 30,
                        "Item_Name": "Sponge",
                        "Deliver_By": "",
                        "Unit_Price": 350,
                        "Pending_Quantity": 30,
                        "Schedule_Quantity": ""
                    }
                ],
                "Is_Deleted": false,
                "Delivery_Address": {
                    "doorNo": "32A1",
                    "cityName": "Chennai",
                    "stateName": "Tamil Nadu",
                    "storeName": "Oil Store",
                    "streetName": "Madipakkam",
                    "countryName": "India"
                },
                "Approved_Flag": true,
                "Status": true,
                "Order_Placed": true,
                "Order_Closed": false,
                "Termsandcondition": "<p>Testing Terms and Conditions</p>",
                "Unit_Rate": "500",
                "Created_Date": "2024-02-27",
                "Updated_Date": "2024-02-26",
                "Company_Id": 1,
                "Partner_Id": 2,
                "PR_Id": 40,
                "Supplier_Id": 4,
                "Created_By": 3,
                "Updated_By": 3,
                "Attached_file": [
                    32,
                    33
                ]
            }
        ],
        "March 2024": [
            {
                "id": 39,
                "PO_Id": "POR000000034",
                "Po_Date": "2024-02-06",
                "Buyer_Name": "Tamil",
                "Delivery_Date": "2024-02-06",
                "Payment_Term": "Standard Terms of Condition",
                "Pay_Mode": "XYZ Store",
                "Price_term": "test catlouge 1",
                "Freight": "",
                "Desp_Instruction": "",
                "Tax_comp": "",
                "Total_POAmount": 4400.0,
                "POCancel_Flag": false,
                "POAmend_Flag": false,
                "PO_Remarks": "Testing Terms and Conditions",
                "Advpaid_Flag": true,
                "Advance_Amount": 0.0,
                "Filter_status": "Pending",
                "Cur_code": "amount",
                "Items": [
                    {
                        "id": 7,
                        "UOM": "ltr",
                        "Amount": 1800,
                        "Quantity": "12",
                        "Item_Name": "Car Brush",
                        "Unit_Price": 150
                    },
                    {
                        "id": 8,
                        "UOM": "ltr",
                        "Amount": 2600,
                        "Quantity": "20",
                        "Item_Name": "Clean liquid",
                        "Unit_Price": 130
                    }
                ],
                "Itemshcedule": [
                    {
                        "id": 7,
                        "UOM": "ltr",
                        "Amount": 1440,
                        "Quantity": "12",
                        "Item_Name": "Car Brush",
                        "Deliver_By": "2024-02-22",
                        "Unit_Price": "150",
                        "Pending_Quantity": 0,
                        "Schedule_Quantity": "12"
                    },
                    {
                        "id": 8,
                        "UOM": "ltr",
                        "Amount": 4400,
                        "Quantity": "20",
                        "Item_Name": "Clean liquid",
                        "Deliver_By": "2024-02-23",
                        "Unit_Price": "130",
                        "Pending_Quantity": 0,
                        "Schedule_Quantity": "20"
                    }
                ],
                "Is_Deleted": false,
                "Delivery_Address": {
                    "doorNo": "77",
                    "cityName": "Chennai",
                    "stateName": "Tamil Nadu",
                    "storeName": "XYZ Store",
                    "streetName": "Perungudi",
                    "countryName": "India"
                },
                "Approved_Flag": false,
                "Status": false,
                "Order_Placed": false,
                "Order_Closed": false,
                "Termsandcondition": "Testing Terms and Conditions",
                "Unit_Rate": "500",
                "Created_Date": "2024-03-04",
                "Updated_Date": "2024-02-06",
                "Company_Id": 1,
                "Partner_Id": 2,
                "PR_Id": 25,
                "Supplier_Id": 4,
                "Created_By": 1,
                "Updated_By": 1,
                "Attached_file": [
                    27
                ]
            },
            {
                "id": 48,
                "PO_Id": "POR3210000000432024",
                "Po_Date": "2024-02-26",
                "Buyer_Name": "Prakash",
                "Delivery_Date": "2024-02-29",
                "Payment_Term": "Standard Terms of Condition",
                "Pay_Mode": "Oil Store",
                "Price_term": "test catlouge 1",
                "Freight": "200",
                "Desp_Instruction": "",
                "Tax_comp": "10",
                "Total_POAmount": 1000.0,
                "POCancel_Flag": false,
                "POAmend_Flag": false,
                "PO_Remarks": "<p>Testing Terms and Conditions</p>",
                "Advpaid_Flag": false,
                "Advance_Amount": 0.0,
                "Filter_status": "Order Placed",
                "Cur_code": "amount",
                "Items": [
                    {
                        "id": 12,
                        "UOM": "ltr",
                        "Amount": 1000,
                        "Quantity": "10",
                        "Item_Name": "Dettol",
                        "Unit_Price": 100
                    }
                ],
                "Itemshcedule": [
                    {
                        "id": 12,
                        "UOM": "ltr",
                        "Amount": 1000,
                        "Quantity": "10",
                        "Item_Name": "Dettol",
                        "Deliver_By": "",
                        "Unit_Price": 100,
                        "Pending_Quantity": "10",
                        "Schedule_Quantity": ""
                    }
                ],
                "Is_Deleted": false,
                "Delivery_Address": {
                    "doorNo": "32A1",
                    "cityName": "Chennai",
                    "stateName": "Tamil Nadu",
                    "storeName": "Oil Store",
                    "streetName": "Madipakkam",
                    "countryName": "India"
                },
                "Approved_Flag": true,
                "Status": true,
                "Order_Placed": true,
                "Order_Closed": false,
                "Termsandcondition": "<p>Testing Terms and Conditions</p>",
                "Unit_Rate": "500",
                "Created_Date": "2024-03-04",
                "Updated_Date": "2024-02-26",
                "Company_Id": 1,
                "Partner_Id": 2,
                "PR_Id": 39,
                "Supplier_Id": 4,
                "Created_By": 3,
                "Updated_By": 3,
                "Attached_file": [
                    73
                ]
            }
        ],
        "April 2024": []
    },
    "total_count": 26
}

const NewArticles = ({ headerSx }) => {
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
        await axios.post(`${BASE_URL}/Erpapp/PurchaseDashboard/`, payload, header).then((res) => {
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


    console.log("chartData1", chartData, totalReceivedQty)

    return (
        <JumboCardQuick
            noWrapper
            title={<Typography variant={"h3"}>{listData?.total_count} Nos</Typography>}
            subheader={
                <Typography
                    variant={"h6"}
                    color={"text.secondary"}>{t(
                        // 'widgets.subheader.newArticles'
                        'Purchases'
                    )}</Typography>
            }
            // action={<BookmarkIcon/>}
            headerSx={headerSx}
        >
            <Div sx={{ p: 1 }}>
                <NewArticlesChart data={chartData} />
            </Div>
        </JumboCardQuick>
    );
};

export default NewArticles;
