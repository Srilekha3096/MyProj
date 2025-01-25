import React, { useEffect, useState } from 'react'
import { useCompanyData } from './CompanyDataProvider';
import JumboScrollbar from '@jumbo/components/JumboScrollbar';
import { Table, TableBody, TableHead, TableRow } from '@mui/material';
import { CellNoborder } from '../../pages/TableStyled';
import commonServices from 'app/services/common-services';
import axios from 'axios';
import { BASE_URL } from 'app/services/auth-services';
//import { format } from 'date-fns';
import { handleError } from 'app/pages/auth-pages/login/AuthGuard';
import settingServices from 'app/services/setting-api-services';
import { todayDate } from './DateFormatter';


export const UpdatedHistoryRecords = ({ documentId, scrollHeight }) => {
    const { dateFormat, updatedHistory, fetchHistoryData } = useCompanyData();

    useEffect(() => {
        fetchHistoryData(documentId);
    }, [documentId]);

    return (
        <JumboScrollbar
            autoHeight={true}
            autoHideTimeout={4000}
            autoHeightMin={scrollHeight ? scrollHeight : 340}
            autoHide={true}
            hideTracksWhenNotNeeded
            id="no-more-tables"
        >
            <Table stickyHeader className="table">
                <TableHead className="history-header">
                    <TableRow>
                        <CellNoborder sx={{ fontWeight: 600, minWidth: { xs: "auto", md: "200px !important" } }}>Activity Date</CellNoborder>
                        <CellNoborder sx={{ fontWeight: 600, minWidth: { xs: "auto", md: "200px !important" } }}>PR No</CellNoborder>
                        <CellNoborder sx={{ fontWeight: 600, minWidth: { xs: "auto", md: "200px !important" } }}>History</CellNoborder>
                        <CellNoborder sx={{ fontWeight: 600, minWidth: { xs: "auto", md: "200px !important" } }}>Updated Fields</CellNoborder>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {updatedHistory?.length > 0 ? (
                        updatedHistory?.map((data, index) => {
                            console.log("datadata", data)
                            return (
                                <TableRow>
                                    {/* <CellNoborder sx={{ minWidth: { xs: "auto", md: "200px !important" } }} data-title="Activity Date">
                                        {dateFormat && data?.Updated_Date && format(
                                            new Date(data?.Updated_Date),
                                            dateFormat
                                        ) || data?.Updated_Date}
                                        <span style={{ marginLeft: "5px" }}>
                                            {data?.Updated_Time?.slice(0, 8)}
                                        </span>
                                    </CellNoborder> */}
                                    <CellNoborder sx={{ minWidth: { xs: "auto", md: "200px !important" } }} data-title="PR No">
                                        {data?.Document_Id ? data?.Document_Id : ""}
                                    </CellNoborder>
                                    <CellNoborder sx={{ minWidth: { xs: "auto", md: "200px !important" } }} data-title="History">
                                        {data?.Updated_Person ? data?.Updated_Person : ""}
                                    </CellNoborder>
                                    <CellNoborder sx={{ minWidth: { xs: "auto", md: "200px !important" } }} data-title="Updated Fields">
                                        {data?.Updated_Field ? data?.Updated_Field : ""}
                                    </CellNoborder>
                                </TableRow>
                            )
                        }
                        )) :
                        <TableRow>
                            <CellNoborder colSpan={8} sx={{ textAlign: "center" }}>
                                No Records
                            </CellNoborder>
                        </TableRow>
                    }
                </TableBody>
            </Table>
        </JumboScrollbar>
    )
}



export const handleCreateHistory = async (requestId, partnerId, name, header) => {
    try {
        axios
            .get(
                `${BASE_URL}/Erpapp/Updaterecordsfilter/?Partner_Id=${partnerId}&Document_Id=${requestId}`,
                header
            )
            .then((resp) => {
                console.error("data", resp?.data);
                const filterlistIds = resp?.data?.map((opt) => opt?.id)
                if (resp?.data?.length > 0) {
                    commonServices.deletePreviousHistory({
                        "id": filterlistIds
                    }, header).then((res) => {
                        console.log(res);

                        // history of updated records
                        let editUser = localStorage.getItem("Username");
                        axios
                            .post(
                                `${BASE_URL}/Erpapp/Updaterecordscrud/`,
                                {
                                    Document_Id: requestId,
                                    Updated_Person: `${editUser} created this ${name}.`,
                                    Updated_Time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
                                    Updated_Date: new Date().toJSON().slice(0, 10),
                                    Is_Deleted: false,
                                    Partner_Id: parseInt(localStorage.getItem("PartnerId")),
                                    Updated_By: parseInt(localStorage.getItem("UserId")),
                                },
                                header
                            )
                            .then((res) => {
                                console.log("Result", res?.data);
                            })
                            .catch((res) => {
                                console.log(res.message);
                            });
                    }).catch((error) => {
                        console.log(error)
                    });

                } else {
                    // history of updated records
                    let editUser = localStorage.getItem("Username");
                    axios
                        .post(
                            `${BASE_URL}/Erpapp/Updaterecordscrud/`,
                            {
                                Document_Id: requestId,
                                Updated_Person: `${editUser} created this ${name}.`,
                                Updated_Time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
                                Updated_Date: new Date().toJSON().slice(0, 10),
                                Is_Deleted: false,
                                Partner_Id: parseInt(localStorage.getItem("PartnerId")),
                                Updated_By: parseInt(localStorage.getItem("UserId")),
                            },
                            header
                        )
                        .then((res) => {
                            console.log("Result", res?.data);
                        })
                        .catch((res) => {
                            console.log(res.message);
                        });
                }
            })
            .catch((error) => {
                console.log("ds", error);
            });
    } catch (error) {
        console.log(error)
    }
}



export const SendNotificationToSettingMail = async (requestData, subject, body, companyId, header) => {
    try {
        await settingServices
            .getItemSettings(companyId, header).then(async (res) => {

                var payload = {
                    Tomail: res?.Notifyto,
                    mailsubject: subject,
                    body: body,
                }

                const response = await axios.post(`${BASE_URL}/Erpapp/settingsdirectmailsend/`, payload, header);
                console.log("response", response)
            }).catch((error) => {
                console.log(error);
            });
    } catch (error) {
        handleError(error)
    }
}

const deleteExistingDocumentApprovals = async (requestNo) => {
    try {
        const response = await axios.get(`${BASE_URL}/Erpapp/Documentapprovalgetwithrequestid/?Request_Id=${requestNo}`);
        const filteredDocuments = response?.data;
        const filterlistIds = filteredDocuments?.map(item => item?.id);

        if (filterlistIds?.length > 0) {
            await axios.post(`${BASE_URL}/Erpapp/Documentapprovaldelete/`, { id: filterlistIds });
        }
    } catch (error) {
        console.error("Error deleting existing document approvals:", error);
    }
};

export const handleCreateDocumentApproval = async (requestId, requestNo, userId, approvals, workflowAmountBased = [], name, header) => {

    const headApproverId = parseInt(localStorage.getItem("ReportHead"))
    const HeadApproverName = localStorage.getItem("ReportHeadName");
    const HeadApproverRole = localStorage.getItem("ReportHeadRole");

    let listOfApprovers = []
    let numberOfApproversCount = workflowAmountBased?.length > 0 ? workflowAmountBased?.length : approvals[0]?.Noof_Level

    if (approvals[0]?.Head_Approval === true) {
        const obj = {
            id: headApproverId,
            Approvername: HeadApproverName,
            ApproverRole: HeadApproverRole,
            comments: "",
            approved_flg: "",
            Approved_flg: false,
            status: true,
            time: "",
        };
        listOfApprovers.push(obj);
    }
    for (let i = 0; i < numberOfApproversCount; i++) {
        const obj1 = {
            id: approvals[0]?.Amountjosn[i]?.id,
            Approvername: approvals[0]?.Amountjosn[i]?.approver_name,
            ApproverRole: approvals[0]?.Amountjosn[i]?.role,
            comments: "",
            approved_flg: "",
            Approved_flg: false,
            status: true,
            time: "",
        };
        listOfApprovers.push(obj1);
    }
    try {
        if (Boolean(requestNo)) {
            await deleteExistingDocumentApprovals(requestNo);
            var payload = {
                Request_Id: requestNo,
                Created_By: userId,
                Updated_By: userId,
                Approval_Id: listOfApprovers,
                Approve: listOfApprovers,
                Request_Key: Number(requestId),
                Request_Name: name,
                Initiated_By: localStorage.getItem("Username"),
                Created_Date: todayDate
            };
            const response = await axios.post(`${BASE_URL}/Erpapp/DocumentapprovalCRUD/`, payload)
            console.log("PD12", response)
            return response;
        }
    }
    catch (error) {
        console.log(error)
    }
}


export const handleSendNotificationToApprover = async (requestNo, initiatorName, approverId, userId, partnerId, companyId, header) => {
    try {
        const payload = {
            Notification_Msg: `Request No. ${requestNo || ""} has been submitted by ${initiatorName || "the initiator"} for approval.`,
            User_Id: parseInt(approverId),
            Created_By: parseInt(userId),
            Partner_Id: parseInt(partnerId),
            Company_Id: parseInt(companyId),
        };

        const response = await axios.post(`${BASE_URL}/Erpapp/Notificationscrud/`, payload, header)
        console.log("response", response)

    } catch (error) {
        // handleError(error)
        console.log(error)
    }
}

export const handleSendNotificationToInitiator = async (requestNo, approverName, employeeId, userId, partnerId, companyId, header) => {
    try {
        const payload = {
            Notification_Msg: `Your Request No. ${requestNo || ""} has been submitted to ${approverName || "the approver"} for approval.`,
            User_Id: parseInt(employeeId),
            Created_By: parseInt(userId),
            Partner_Id: parseInt(partnerId),
            Company_Id: parseInt(companyId),
        };

        setTimeout(async () => {
            const response = await axios.post(`${BASE_URL}/Erpapp/Notificationscrud/`, payload, header)
            console.log("response", response)
        }, 1000)

    } catch (error) {
        // handleError(error)
        console.log(error)
    }
}