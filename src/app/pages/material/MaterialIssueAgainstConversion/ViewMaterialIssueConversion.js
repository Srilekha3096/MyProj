import Div from "@jumbo/shared/Div";
import {
    Button,
    ButtonGroup,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import axios from "axios";
import { BASE_URL } from "app/services/auth-services";
import { MdClose } from "react-icons/md";
import { format } from "date-fns";
import useResponsive from "app/pages/useResponsive";
import { DateFormatter } from "app/shared/ReuseComponents/DateFormatter";
import HistoryOverview from "app/shared/ReuseComponents/HistoryOverview";


const ViewMaterialIssueConversion = ({
    scrollHeight,
    setListDesignation,
    setViewDesignation,
    currentDesignations,
    dateFormat,
}) => {

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
    let companyId = userDetails && userDetails?.Organization_Id;
    let id = parseInt(userDetails && userDetails?.id);

    const Partner_Id = parseInt(localStorage.getItem("PartnerId"));

    let isMobile = useResponsive("down", "md");


    const urlParams = new URLSearchParams(window.location.search);
    const Id = urlParams.get("Id");


    const [matRequestTransaction, setMatRequestTransaction] = useState([]);
    const [value, setValue] = useState("1");
    const [overviewStatus, setOverviewStatus] = useState([]);
    const [updateHistory, setUpdateHistory] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleClickBack = () => {
        setViewDesignation(false);
        setListDesignation(true);
    };

    const items = currentDesignations?.Item?.map((opt) => opt);
    useEffect(() => {
        if (Id) {
            axios
                .get(
                    `${BASE_URL}/Erpapp/MaterialRequestCRUD/?id=${Id}`,
                    header
                )
                .then((res) => {
                    console.error(res?.data);
                    setOverviewStatus(res?.data);

                    // get transactions
                    try {
                        axios.get(
                            `${BASE_URL}/Erpapp/Meterialrequestandissuetransaction/?MatReq_Id=${res?.data?.id}`
                        ).then((res) => {
                            console.log("matRequestTransaction", res?.data);
                            setMatRequestTransaction(res?.data);
                        }).catch((error) => {
                            console.log(error);
                        });
                    } catch (error) {
                        console.log(error.message);
                    }

                    // for history
                    axios
                        .get(
                            `${BASE_URL}/Erpapp/Updaterecordsfilter/?Partner_Id=${Partner_Id}&Document_Id=${res?.data?.MatReq_Id}`,
                            header
                        )
                        .then((res) => {
                            console.error("data", res?.data);
                            setUpdateHistory(res?.data);
                        })
                        .catch((error) => {
                            console.log("ds", error);
                        });
                })
                .catch((res) => {
                    console.log(res.message);
                });


        } else {
            axios
                .get(
                    `${BASE_URL}/Erpapp/MaterialconvertionIssueCRUD/?Matcon_Issue_Id=${currentDesignations?.Matcon_Issue_Id}`,
                    header
                )
                .then((res) => {
                    console.error(res?.data);
                    setOverviewStatus(res?.data);
                })
                .catch((res) => {
                    console.log(res.message);
                });


            // get transactions
            try {
                axios.get(
                    `${BASE_URL}/Erpapp/Meterialrequestandissuetransaction/?MatReq_Id=${currentDesignations?.id}`
                ).then((res) => {
                    console.log("matRequestTransaction", res?.data);
                    setMatRequestTransaction(res?.data);
                }).catch((error) => {
                    console.log(error);
                });
            } catch (error) {
                console.log(error.message);
            }

            // for history
            axios
                .get(
                    `${BASE_URL}/Erpapp/Updaterecordsfilter/?Partner_Id=${Partner_Id}&Document_Id=${currentDesignations?.Matcon_Issue_Id}`,
                    header
                )
                .then((res) => {
                    console.error("data", res?.data);
                    setUpdateHistory(res?.data);
                })
                .catch((error) => {
                    console.log("ds", error);
                });
        }
    }, [currentDesignations?.Matcon_Req_Id, currentDesignations.id, Id]);

    console.log("currentDesignations", currentDesignations)

    return (
        <>
            <Div className="row">
                <Div className="col-sm-12 col-md-10">
                    <Typography variant="h3" sx={{ fontWeight: 600 }}>
                        Material Conversion Issue Overview
                    </Typography>
                </Div>

                <Div>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 0, borderColor: "divider" }}>
                            <TabList
                                onChange={handleChange}
                                aria-label="lab API tabs example"
                            >
                                <Tab
                                    label="Overview"
                                    value="1"
                                    sx={{ fontSize: "16px", color: "#000000" }}
                                />
                                {/* <Tab
                                    label="Transaction"
                                    value="2"
                                    sx={{ fontSize: "16px", color: "#000000" }}
                                /> */}
                                <Tab
                                    label="History"
                                    value="3"
                                    sx={{ fontSize: "16px", color: "#000000" }}
                                />
                            </TabList>
                        </Box>

                        <TabPanel value="1" sx={{ p: 1.5, minHeight: "350px" }}>
                            <Div className="row mt-1">
                                <Div className="col-5 col-lg-4 col-xl-2">
                                    <Typography variant="h4">MC Issue No</Typography>
                                    <Typography variant="h4">MC Request No</Typography>
                                    <Typography variant="h4">Business Unit</Typography>
                                    <Typography variant="h4">Requested By</Typography>
                                    <Typography variant="h4">Issue Date</Typography>
                                    <Typography variant="h4">Store Name</Typography>
                                    <Typography variant="h4">Conversion Ratio</Typography>
                                    <Typography variant="h4">Purpose</Typography>
                                </Div>
                                <Div className="col col-lg-5 col-xl-4">
                                    <Typography variant="h4">
                                        : {currentDesignations?.Matcon_Issue_Id}
                                    </Typography>
                                    <Typography variant="h4">
                                        : {currentDesignations?.Matcon_Req_Id?.Matcon_Req_Id}
                                    </Typography>
                                    <Typography variant="h4">
                                        :{" "}
                                        {currentDesignations?.Partner_Id &&
                                            currentDesignations?.Partner_Id?.Partner_Name}
                                    </Typography>
                                    <Typography variant="h4">
                                        :{" "}
                                        {currentDesignations?.Requested_By &&
                                            currentDesignations?.Requested_By}
                                    </Typography>
                                    <Typography variant="h4">
                                        :{" "}
                                        {currentDesignations?.Issue_Date && <DateFormatter date={currentDesignations?.Issue_Date} />}
                                    </Typography>
                                    <Typography variant="h4">
                                        :{" "}
                                        {currentDesignations?.Store_Id &&
                                            currentDesignations?.Store_Id?.Store_Name}
                                    </Typography>
                                    <Typography variant="h4">
                                        :{" "}
                                        {currentDesignations?.Convertion_Ratio &&
                                            currentDesignations?.Convertion_Ratio}
                                    </Typography>
                                    <Typography variant="h4">
                                        :{" "}
                                        {currentDesignations?.Purpose &&
                                            currentDesignations?.Purpose}
                                    </Typography>
                                </Div>

                            </Div>

                        </TabPanel>

                        <TabPanel value="2" sx={{ p: 1.5, minHeight: "350px" }}>
                            <Div>
                                <JumboScrollbar
                                    autoHeight={true}
                                    autoHideTimeout={4000}
                                    autoHeightMin={scrollHeight ? scrollHeight : 300}
                                    autoHide={true}
                                    hideTracksWhenNotNeeded
                                >
                                    <Table className="table table-bordered">
                                        <TableHead className="res table-head">
                                            <TableRow>
                                                <TableCell>Trn date</TableCell>
                                                <TableCell>Trn Type</TableCell>
                                                <TableCell>Trn Id</TableCell>
                                                <TableCell>Item Name</TableCell>
                                                <TableCell
                                                    sx={{
                                                        minWidth: "100px !important",
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                    }}
                                                >
                                                    UOM
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        minWidth: "110px !important",
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                    }}
                                                >
                                                    Request Qty
                                                </TableCell>
                                                <TableCell>Issue Qty</TableCell>
                                                <TableCell sx={{ minWidth: "100px !important" }}>Pending Qty</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {matRequestTransaction?.length > 0 ? (
                                                <>
                                                    {matRequestTransaction?.map((receipt, index) => {
                                                        console.log("receipt", receipt);
                                                        const itemForReceipt = receipt?.Item.find((item) =>
                                                            items.some(
                                                                (opt) => opt?.Item_Name === item?.Item_Name
                                                            )
                                                        );

                                                        const date = new Date(receipt?.Created_Date);
                                                        const formattedDate =
                                                            dateFormat && date && format(date, dateFormat);

                                                        console.log("itemForReceipt", itemForReceipt);

                                                        return (
                                                            <TableRow key={index}>
                                                                <TableCell data-title="Trn date">{formattedDate || receipt?.Created_Date}</TableCell>
                                                                <TableCell data-title="Trn Type">Material Issue</TableCell>
                                                                <TableCell data-title="Trn Id">{receipt?.MatIsu_Id}</TableCell>
                                                                <TableCell data-title="Item Name">
                                                                    {itemForReceipt
                                                                        ? itemForReceipt?.Item_Name
                                                                        : " "}
                                                                </TableCell>
                                                                <TableCell data-title="UOM">
                                                                    {itemForReceipt ? itemForReceipt?.UOM : ""}
                                                                </TableCell>
                                                                <TableCell data-title="Request Qty" className="Amount_Fields">
                                                                    {itemForReceipt
                                                                        ? `${itemForReceipt?.request_quantity}`
                                                                        : "0"}
                                                                </TableCell>
                                                                <TableCell data-title="Issue Qty" className="Amount_Fields">
                                                                    {itemForReceipt
                                                                        ? `${itemForReceipt?.issue_quantity}`
                                                                        : "0"}
                                                                </TableCell>
                                                                <TableCell data-title="Pending Qty" sx={{ textAlign: "right", minWidth: "110px !important" }}>
                                                                    {itemForReceipt
                                                                        ? `${Number(
                                                                            itemForReceipt?.request_quantity
                                                                        ) -
                                                                        Number(itemForReceipt?.issue_quantity)
                                                                        }`
                                                                        : "0"}
                                                                </TableCell>
                                                            </TableRow>
                                                        );
                                                    })}
                                                </>
                                            ) : (
                                                <TableRow>
                                                    {isMobile ?
                                                        <Div className="text-center">
                                                            No Records
                                                        </Div> :
                                                        <TableCell colSpan={8} className="text-center">
                                                            No Records
                                                        </TableCell>
                                                    }
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </JumboScrollbar>
                            </Div>
                        </TabPanel>

                        <TabPanel value="3" sx={{ p: 1.5, minHeight: "350px" }}>
                            <HistoryOverview updatedHistory={updateHistory} itemId={"MC Issue No"} />
                        </TabPanel>
                    </TabContext>
                </Div>
            </Div>

            <Div>
                <ButtonGroup aria-label="split button" onClick={handleClickBack}>
                    <Button className="plus-button">Close</Button>
                    <Button variant="contained" className="icon-button">
                        <MdClose size={18} />
                    </Button>
                </ButtonGroup>
            </Div>
        </>
    );
};


export default ViewMaterialIssueConversion
