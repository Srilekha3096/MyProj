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
    useMediaQuery,
    useTheme,
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
import WorkflowApproverStatus from "app/shared/ReuseComponents/WorkflowApproverStatus";
import { DateFormatter } from "app/shared/ReuseComponents/DateFormatter";
import HistoryOverview from "app/shared/ReuseComponents/HistoryOverview";


const ViewMaterialConversionRequest = ({
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
    const theme = useTheme();
    const isMdUp = useMediaQuery(theme.breakpoints.up('md'));


    const urlParams = new URLSearchParams(window.location.search);
    const Id = urlParams.get("Id");


    const [matRequestTransaction, setMatRequestTransaction] = useState([]);
    const [value, setValue] = useState("1");
    const [overviewStatus, setOverviewStatus] = useState([]);
    const [approvalStatus, setApprovalStatus] = useState([]);
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
                    `${BASE_URL}/Erpapp/MaterialconvertionRequestCRUD/?Matcon_Req_Id=${currentDesignations?.Matcon_Req_Id}`,
                    header
                )
                .then((res) => {
                    console.error(res?.data);
                    setOverviewStatus(res?.data);

                    // get approval status
                    axios
                        .get(
                            `${BASE_URL}/Erpapp/Purchaserequestworkflow/?Request_Id=${res.data?.Matcon_Req_Id}`
                        )
                        .then((res) => {
                            console.log("REE", res?.data);
                            setApprovalStatus(res?.data[0]?.Approve);
                        })
                        .catch((res) => {
                            console.log(res.message);
                        });

                    // get transactions
                    try {
                        axios.get(
                            `${BASE_URL}/Erpapp/Meterialrequestandissuetransaction/?Matcon_Req_Id=${res?.data?.id}`
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
                            `${BASE_URL}/Erpapp/Updaterecordsfilter/?Partner_Id=${Partner_Id}&Document_Id=${res?.data?.Matcon_Req_Id}`,
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
                    `${BASE_URL}/Erpapp/MaterialconvertionRequestCRUD/?Matcon_Req_Id=${currentDesignations?.Matcon_Req_Id}`,
                    header
                )
                .then((res) => {
                    console.error(res?.data);
                    setOverviewStatus(res?.data);
                })
                .catch((res) => {
                    console.log(res.message);
                });

            // get approval status
            axios
                .get(
                    `${BASE_URL}/Erpapp/Purchaserequestworkflow/?Request_Id=${currentDesignations?.Matcon_Req_Id}`
                )
                .then((res) => {
                    console.log("REE", res?.data);
                    setApprovalStatus(res?.data[0]?.Approve);
                })
                .catch((res) => {
                    console.log(res.message);
                });


            // get transactions
            try {
                axios.get(
                    `${BASE_URL}/Erpapp/Meterialrequestandissuetransaction/?Matcon_Req_Id=${currentDesignations?.id}`
                ).then((res) => {
                    console.log("matRequestTransaction", res?.data);
                    setMatRequestTransaction(res?.data);
                })
                    .catch((error) => {
                        console.log(error);
                    });
            } catch (error) {
                console.log(error.message);
            }

            // for history
            axios
                .get(
                    `${BASE_URL}/Erpapp/Updaterecordsfilter/?Partner_Id=${Partner_Id}&Document_Id=${currentDesignations?.Matcon_Req_Id}`,
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
    }, [currentDesignations?.Matcon_Req_Id, currentDesignations?.id, Id]);

    const WorkflowName = "Material Conversion Request";


    return (
        <>
            <Div className="row">
                <Div className="col-sm-12 col-md-10">
                    <Typography variant="h3" sx={{ fontWeight: 600 }}>
                        Material Conversion Request Overview
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
                                    <Typography variant="h4" sx={{ fontSize: isMdUp ? "14px !important" : "12px !important" }}>MC Request No</Typography>
                                    <Typography variant="h4" sx={{ fontSize: isMdUp ? "14px !important" : "12px !important" }}>Business Unit</Typography>
                                    <Typography variant="h4" sx={{ fontSize: isMdUp ? "14px !important" : "12px !important" }}>Requested By</Typography>
                                    <Typography variant="h4" sx={{ fontSize: isMdUp ? "14px !important" : "12px !important" }}>Request Date</Typography>
                                    <Typography variant="h4" sx={{ fontSize: isMdUp ? "14px !important" : "12px !important" }}>Store Name</Typography>
                                    <Typography variant="h4" sx={{ fontSize: isMdUp ? "14px !important" : "12px !important" }}>Conversion Ratio</Typography>
                                    <Typography variant="h4" sx={{ fontSize: isMdUp ? "14px !important" : "12px !important" }}>Purpose</Typography>
                                </Div>
                                <Div className="col col-lg-5 col-xl-4">
                                    <Typography variant="h4" sx={{ fontSize: isMdUp ? "14px !important" : "12px !important" }}>
                                        : {overviewStatus?.Matcon_Req_Id && overviewStatus?.Matcon_Req_Id}
                                    </Typography>
                                    <Typography variant="h4" sx={{ fontSize: isMdUp ? "14px !important" : "12px !important" }}>
                                        :{" "}
                                        {overviewStatus?.Partner_Id?.Partner_Name &&
                                            overviewStatus?.Partner_Id?.Partner_Name}
                                    </Typography>
                                    <Typography variant="h4" sx={{ fontSize: isMdUp ? "14px !important" : "12px !important" }}>
                                        :{" "}
                                        {overviewStatus?.Requester_Id?.Employee_FirstName}{" "}{overviewStatus?.Requester_Id?.Employee_LasttName}
                                    </Typography>
                                    <Typography variant="h4" sx={{ fontSize: isMdUp ? "14px !important" : "12px !important" }}>
                                        :{" "}
                                        {overviewStatus?.Request_Date && <DateFormatter date={overviewStatus?.Request_Date} />}
                                    </Typography>
                                    <Typography variant="h4" sx={{ fontSize: isMdUp ? "14px !important" : "12px !important" }}>
                                        :{" "}
                                        {overviewStatus?.Store_Id?.Store_Name &&
                                            overviewStatus?.Store_Id?.Store_Name}
                                    </Typography>
                                    <Typography variant="h4" sx={{ fontSize: isMdUp ? "14px !important" : "12px !important" }}>
                                        :{" "}
                                        {overviewStatus?.Convertion_Ratio &&
                                            overviewStatus?.Convertion_Ratio}
                                    </Typography>
                                    <Typography variant="h4" sx={{ fontSize: isMdUp ? "14px !important" : "12px !important" }}>
                                        :{" "}
                                        {overviewStatus?.Purpose &&
                                            overviewStatus?.Purpose}
                                    </Typography>
                                </Div>
                                <Div className="col-sm-12 col-lg-2" sx={{ mt: 2 }}>
                                    {overviewStatus?.Approve_Flag === true ? (
                                        <img
                                            src="./../../../../../images/StatusFlg/Approved.png"
                                            width={160}
                                            height={60}
                                        />
                                    ) : overviewStatus?.Approve_Flag === false &&
                                        overviewStatus?.Status === true ? (
                                        <div>
                                            <img
                                                src="./../../../../../images/StatusFlg/Rejected.png"
                                                width={160}
                                                height={60}
                                            />
                                        </div>
                                    ) : (
                                        <img
                                            src="./../../../../../images/StatusFlg/Pending.png"
                                            width={160}
                                            height={60}
                                        />
                                    )}
                                </Div>
                            </Div>

                            <Div className="card mt-1" sx={{ p: 1.5 }}>
                                <WorkflowApproverStatus WorkflowName={WorkflowName} approvalStatus={approvalStatus} partnerId={currentDesignations?.Partner_Id?.id} />
                            </Div>

                        </TabPanel>

                        <TabPanel value="2" sx={{ p: 1.5, minHeight: "350px" }}>
                            <JumboScrollbar
                                autoHeight={true}
                                autoHideTimeout={4000}
                                autoHeightMin={scrollHeight ? scrollHeight : 300}
                                autoHide={true}
                                hideTracksWhenNotNeeded
                            >
                                <Table sx={{ mt: 1 }} className="table table-bordered">
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
                        </TabPanel>

                        <TabPanel value="3" sx={{ p: 1.5, minHeight: "350px" }}>
                            <HistoryOverview updatedHistory={updateHistory} itemId={"MC Request No"} />
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

export default React.memo(ViewMaterialConversionRequest)
