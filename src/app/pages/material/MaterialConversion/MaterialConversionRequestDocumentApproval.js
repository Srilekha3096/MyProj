import Div from "@jumbo/shared/Div/Div";
import {
    TabContext,
    TabList,
    TabPanel,
} from "@mui/lab";
import {
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Tab,
    Typography,
} from "@mui/material";
import WorkflowApproverStatus from "app/shared/ReuseComponents/WorkflowApproverStatus";
import { BASE_URL } from "app/services/auth-services";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import HistoryOverview from "app/shared/ReuseComponents/HistoryOverview";
import { DateFormatter } from "app/shared/ReuseComponents/DateFormatter";


const MaterialConversionRequestDocumentApproval = ({
    scrollHeight,
    openViewRequest,
    setOpenViewRequest,
    requests,
}) => {
    const token = localStorage.getItem("accesstoken");
    const header = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    };

    // const Partner_Id = parseInt(localStorage.getItem("PartnerId"));

    const [value, setValue] = useState("1");
    const [overviewStatus, setOverviewStatus] = useState({});
    const [approvalStatus, setApprovalStatus] = useState([]);
    const [updateHistory, setUpdateHistory] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const WorkflowName = "Material Conversion Request";

    useEffect(() => {
        axios
            .get(
                `${BASE_URL}/Erpapp/Purchaserequestworkflow/?Request_Id=${requests?.Matcon_Req_Id}`
            )
            .then((res) => {
                console.log("REE", res?.data);
                setApprovalStatus(res?.data[0]?.Approve);
            })
            .catch((res) => {
                console.log(res.message);
            });

        axios
            .get(`${BASE_URL}/Erpapp/StoreAdjustmentCRUD/?id=${requests?.id}`, header)
            .then((res) => {
                console.error(res?.data);
                setOverviewStatus(res?.data);
            })
            .catch((res) => {
                console.log(res.message);
            });
    }, [openViewRequest, requests]);

    const items = requests?.Item?.map((opt) => opt);
    useEffect(() => {

        // for history
        axios
            .get(
                `${BASE_URL}/Erpapp/Updaterecordsfilter/?Partner_Id=${requests?.Partner_Id?.id}&Document_Id=${requests?.Matcon_Req_Id}`,
                header
            )
            .then((res) => {
                console.error("data", res?.data);
                setUpdateHistory(res?.data);
            })
            .catch((error) => {
                console.log("ds", error);
            });
    }, [requests?.Matcon_Req_Id]);

    return (
        <Dialog maxWidth="xl" fullWidth open={openViewRequest}>
            <DialogTitle sx={{ display: "flex", justifyContent: "space-between", mb: -1 }}>
                <Div sx={{ fontSize: "18px" }}>View Material Conversion Request</Div>
                <Div>
                    <IconButton onClick={() => setOpenViewRequest(false)}>
                        <MdClose />
                    </IconButton>
                </Div>
            </DialogTitle>
            <DialogContent>
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

                                <Tab
                                    label="History"
                                    value="3"
                                    sx={{ fontSize: "16px", color: "#000000" }}
                                />
                            </TabList>
                        </Box>

                        <TabPanel value="1" sx={{ minHeight: "350px" }}>
                            <Div className="row mt-2">
                                <Div className="col col-sm-6 col-lg-4 col-xl-2">
                                    <Typography variant="h4">MC Request No</Typography>
                                    <Typography variant="h4">Business Unit</Typography>
                                    <Typography variant="h4">Requested By</Typography>
                                    <Typography variant="h4">Request Date</Typography>
                                    <Typography variant="h4">Store Name</Typography>
                                    <Typography variant="h4">Conversion Ratio</Typography>
                                    <Typography variant="h4">Purpose</Typography>
                                </Div>
                                <Div className="col col-sm-6 col-lg-5 col-xl-4">
                                    <Typography variant="h4">
                                        : {requests?.Matcon_Req_Id && requests?.Matcon_Req_Id}
                                    </Typography>
                                    <Typography variant="h4">
                                        :{" "}
                                        {requests?.Partner_Id?.Partner_Name &&
                                            requests?.Partner_Id?.Partner_Name}
                                    </Typography>
                                    <Typography variant="h4">
                                        :{" "}
                                        {requests?.Requester_Id?.Employee_FirstName}{" "}{requests?.Requester_Id?.Employee_LasttName}
                                    </Typography>
                                    <Typography variant="h4">
                                        :{" "}
                                        {requests?.Request_Date && <DateFormatter date={requests?.Request_Date} />}
                                    </Typography>
                                    <Typography variant="h4">
                                        :{" "}
                                        {requests?.Store_Id?.Store_Name &&
                                            requests?.Store_Id?.Store_Name}
                                    </Typography>
                                    <Typography variant="h4">
                                        :{" "}
                                        {requests?.Convertion_Ratio &&
                                            requests?.Convertion_Ratio}
                                    </Typography>
                                    <Typography variant="h4">
                                        :{" "}
                                        {requests?.Purpose &&
                                            requests?.Purpose}
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
                                        overviewStatus?.Purpose !== "" ? (
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

                            <Div>
                                <WorkflowApproverStatus WorkflowName={WorkflowName} approvalStatus={approvalStatus} partnerId={requests?.Partner_Id?.id} />
                            </Div>

                        </TabPanel>


                        <TabPanel value="3" sx={{ minHeight: "350px" }}>
                            <HistoryOverview updatedHistory={updateHistory} itemId={"MC Request No"} />
                        </TabPanel>
                    </TabContext>
                </Div>
            </DialogContent>
        </Dialog>
    );
};

export default MaterialConversionRequestDocumentApproval
