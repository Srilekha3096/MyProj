import Div from '@jumbo/shared/Div'
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from '@mui/lab'
import { Box, Table, TableBody, TableHead, TableRow, Tooltip, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useCompanyData } from './CompanyDataProvider'
import JumboScrollbar from '@jumbo/components/JumboScrollbar'
import { format } from 'date-fns'

const WorkflowApproverStatus = ({ WorkflowName, partnerId, scrollHeight, approvalStatus, HeadApproverName }) => {

    const { dateFormat, workflows, fetchApprovalData, flagOfHeadApprover } = useCompanyData();

    const headApproverName = localStorage.getItem("ReportHeadName")

    useEffect(() => {
        fetchApprovalData(WorkflowName, partnerId);
    }, [WorkflowName]);



    return (
        <>
            {approvalStatus ?
                <JumboScrollbar
                    autoHeight={true}
                    autoHideTimeout={4000}
                    autoHeightMin={scrollHeight ? scrollHeight : 250}
                    autoWidthtMin={scrollHeight ? scrollHeight : { xs: 100, md: 400 }}
                    autoHide={true}
                    hideTracksWhenNotNeeded
                // id="no-more-tables"
                >
                    <Table stickyHeader>
                        <TableHead sx={{ backgroundColor: "#f5f7fa", position: "sticky", top: 0, zIndex: 10, opacity: 1 }}>
                            <TableRow sx={{ display: "flex", alignItems: "center", padding: "12px 0px 8px 0px", lineHeight: 2 }}>
                                <Div sx={{ display: "flex", }}>
                                    <Typography variant='h4' sx={{ textAlign: "center", color: "#00BFFF", borderBottom: "0px solid #f5f7fa !important", minWidth: "210px", ml: -2.5 }}>Approver</Typography>
                                    <Typography variant='h4' sx={{ textAlign: "left", color: "#00BFFF", borderBottom: "0px solid #f5f7fa !important", minWidth: "90px", maxWidth: "100px !important", width: "65px !important" }}>Status</Typography>
                                </Div>
                                <Div sx={{ display: "flex", }}>
                                    <Typography variant='h4' sx={{ textAlign: "left", color: "#00BFFF", borderBottom: "0px solid #f5f7fa !important", minWidth: "145px" }}>Time</Typography>
                                    <Typography variant='h4' sx={{ textAlign: "left", color: "#00BFFF", borderBottom: "0px solid #f5f7fa !important", minWidth: "170px" }}>Comment</Typography>
                                </Div>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                {approvalStatus?.length > 0 ?
                                    (
                                        <Div sx={{ minWidth: { md: "600px !important", display: "flex", flexWrap: "wrap" } }}>
                                            {approvalStatus && approvalStatus?.map((step, index) => (
                                                <div key={index}>
                                                    <Timeline>
                                                        <TimelineItem
                                                            sx={{
                                                                "&::before": {
                                                                    display: "none",
                                                                },
                                                            }}
                                                            style={{ textAlign: "center" }}
                                                        >
                                                            <TimelineSeparator sx={{ mb: -4 }}>
                                                                <TimelineDot
                                                                    sx={{
                                                                        m: (theme) => theme.spacing(0.5, 0),
                                                                        width: 14,
                                                                        height: 14,
                                                                        mb: 0.5,
                                                                        bgcolor:
                                                                            step?.Approved_flg === true &&
                                                                                step?.status === true
                                                                                ? "#3BD2A2"
                                                                                : step?.Approved_flg === false &&
                                                                                    step?.status === false
                                                                                    ? "#E73145"
                                                                                    : "#F39711",
                                                                        color: "#00BFFF",
                                                                        boxShadow:
                                                                            "0 0 0 4px #fff,inset 0 2px 0 rgba(0,0,0,.08),0 3px 0 4px rgba(0,0,0,.05)",
                                                                    }}
                                                                >
                                                                    {step.icon}
                                                                </TimelineDot>
                                                                {index !== approvalStatus?.length - 1 && (
                                                                    <TimelineConnector color="primary" />
                                                                )}
                                                            </TimelineSeparator>

                                                            <TimelineContent sx={{ ml: 1 }}>
                                                                <Div key={index} sx={{ display: "flex", }}>
                                                                    <Typography
                                                                        variant="h5"
                                                                        data-title="Approver"
                                                                        sx={{ fontWeight: 600, width: "135px", textWrap: "wrap", whiteSpace: step?.Approvername?.length > 10 ? "wrap" : "none" }}
                                                                    >
                                                                        {step?.Approvername}
                                                                        {/* <Tooltip
                                                                    title={step?.Approvername}
                                                                    placement="right-end"
                                                                >
                                                                    <span> {step?.Approvername?.length > 15 ? `${step?.Approvername.slice(0, 15)}...` : step?.Approvername}</span>
                                                                </Tooltip> */}
                                                                    </Typography>

                                                                    {step?.Approved_flg === true &&
                                                                        step?.status === true ? (
                                                                        <Typography
                                                                            variant="h5"
                                                                            className="approve-button"
                                                                            data-title="Status"
                                                                            sx={{ minWidth: "90px", textAlign: "left", ml: { xs: 1, md: 0 } }}
                                                                        >
                                                                            Approved
                                                                        </Typography>
                                                                    ) : step?.Approved_flg === false &&
                                                                        step?.status === false ? (
                                                                        <Typography
                                                                            variant="h5"
                                                                            className="rejected-button"
                                                                            data-title="Status"
                                                                            sx={{ minWidth: "90px", textAlign: "left", ml: { xs: 1, md: 0 } }}
                                                                        >
                                                                            Rejected
                                                                        </Typography>
                                                                    ) : (
                                                                        <Typography
                                                                            variant="h5"
                                                                            className="pending-button"
                                                                            data-title="Status"
                                                                            sx={{ minWidth: "90px", textAlign: "left", ml: { xs: 1, md: 0 } }}
                                                                        >
                                                                            Pending
                                                                        </Typography>
                                                                    )}

                                                                    <Typography variant="h5" data-title="Time" sx={{ minWidth: "145px", textAlign: "left" }}>
                                                                        {step?.time ? step?.time && dateFormat ? `${format(
                                                                            new Date(step?.time),
                                                                            dateFormat
                                                                        )} ${new Date(
                                                                            step?.time
                                                                        ).getHours()}: ${new Date(
                                                                            step?.time
                                                                        ).getMinutes()}` : `${new Date(step?.time).getHours()} : ${new Date(step?.time).getMinutes()}` : '-'}
                                                                    </Typography>

                                                                    <Typography variant="h5" data-title="Comment" sx={{ minWidth: "180px", textAlign: "left", textWrap: "wrap" }}>
                                                                        {step?.comments ? step?.comments : '-'}
                                                                    </Typography>
                                                                </Div>
                                                            </TimelineContent>
                                                        </TimelineItem>
                                                    </Timeline>
                                                </div>
                                            ))}
                                        </Div>
                                    )
                                    :
                                    (
                                        <Div sx={{ minWidth: { md: "600px !important" } }}>
                                            {flagOfHeadApprover === true && (
                                                <Div>
                                                    <Timeline
                                                        sx={{ pr: 0.5, pl: 1, mb: 0 }}
                                                    >
                                                        <TimelineItem
                                                            sx={{
                                                                "&::before": {
                                                                    display: "none",
                                                                },
                                                            }}
                                                        >
                                                            <TimelineSeparator sx={{ mb: -4 }}>
                                                                <TimelineDot
                                                                    sx={{
                                                                        m: (theme) =>
                                                                            theme.spacing(0.5, 0),
                                                                        width: 14,
                                                                        height: 14,
                                                                        bgcolor: "#F39711",
                                                                        color: "#00BFFF",
                                                                        mb: 0.5,
                                                                        boxShadow:
                                                                            "0 0 0 4px #fff,inset 0 2px 0 rgba(0,0,0,.08),0 3px 0 4px rgba(0,0,0,.05)",
                                                                    }}
                                                                >
                                                                </TimelineDot>
                                                                <TimelineConnector color="primary" />
                                                            </TimelineSeparator>
                                                            <TimelineContent
                                                                sx={{
                                                                    p: (theme) =>
                                                                        theme.spacing(0.5, 0),
                                                                    ml: { xs: 3, md: 3 },
                                                                }}
                                                            >
                                                                <Div sx={{ display: "flex", }}>
                                                                    <Typography
                                                                        variant="h5"
                                                                        data-title="Approver"
                                                                        sx={{ fontWeight: 600, minWidth: "145px", textWrap: "wrap", whiteSpace: HeadApproverName ? HeadApproverName?.length > 15 ? "wrap" : "none" : headApproverName?.length > 15 ? "wrap" : "none" }}
                                                                    >
                                                                        {/* {HeadApproverName ? HeadApproverName : headApproverName} */}
                                                                        <Tooltip
                                                                            title={HeadApproverName ? HeadApproverName : headApproverName}
                                                                            placement="right-end"
                                                                        >
                                                                            <span> {HeadApproverName ? HeadApproverName?.length > 15 : headApproverName?.length > 15 ? `${HeadApproverName ? HeadApproverName.slice(0, 15) : headApproverName.slice(0, 15)}...` : HeadApproverName ? HeadApproverName : headApproverName}</span>
                                                                        </Tooltip>
                                                                    </Typography>
                                                                    <Typography
                                                                        variant="h5"
                                                                        className="pending-button"
                                                                        data-title="Status"
                                                                        sx={{ minWidth: "95px", ml: { xs: 1, md: 0 } }}
                                                                    >
                                                                        Pending
                                                                    </Typography>
                                                                    <Typography variant="h5" data-title="Time" sx={{ minWidth: "130px", textAlign: "left" }}>
                                                                        -
                                                                    </Typography>
                                                                    <Typography variant="h5" data-title="Comment" sx={{ minWidth: "140px", textAlign: "left", pl: 3 }}>
                                                                        -
                                                                    </Typography>
                                                                </Div>
                                                            </TimelineContent>
                                                        </TimelineItem>
                                                    </Timeline>
                                                </Div>
                                            )}
                                            {workflows?.map((option, index) => {
                                                const Approvers = option?.Amountjosn?.map(
                                                    (opt) => opt
                                                );
                                                console.log("Approvers", Approvers)
                                                return (
                                                    <>
                                                        {Approvers?.map((step, indx) => {
                                                            return (
                                                                <>
                                                                    <Div key={option?.id}>
                                                                        <Timeline
                                                                            sx={{ pr: 0.5, pl: 1, mb: 0 }}
                                                                        >
                                                                            <TimelineItem
                                                                                sx={{
                                                                                    "&::before": {
                                                                                        display: "none",
                                                                                    },
                                                                                }}
                                                                            >
                                                                                <TimelineSeparator sx={{ mb: -4 }}>
                                                                                    <TimelineDot
                                                                                        sx={{
                                                                                            m: (theme) =>
                                                                                                theme.spacing(0.5, 0),
                                                                                            width: 14,
                                                                                            height: 14,
                                                                                            bgcolor: "#F39711",
                                                                                            color: "#00BFFF",
                                                                                            mb: 0.5,
                                                                                            boxShadow:
                                                                                                "0 0 0 4px #fff,inset 0 2px 0 rgba(0,0,0,.08),0 3px 0 4px rgba(0,0,0,.05)",
                                                                                        }}
                                                                                    >
                                                                                        {step?.icon}
                                                                                    </TimelineDot>
                                                                                    {indx !==
                                                                                        Approvers?.length - 1 && (
                                                                                            <TimelineConnector color="primary" />
                                                                                        )}
                                                                                </TimelineSeparator>
                                                                                <TimelineContent sx={{ ml: 1 }}>
                                                                                    <Div key={indx} sx={{ display: "flex", }}>
                                                                                        <Typography
                                                                                            variant="h5"
                                                                                            data-title="Approver"
                                                                                            sx={{ fontWeight: 600, minWidth: "140px", textWrap: "wrap", whiteSpace: step?.approver_name?.length > 10 ? "wrap" : "none" }}
                                                                                        >
                                                                                            {/* {step?.approver_name} */}
                                                                                            <Tooltip
                                                                                                title={step?.approver_name}
                                                                                                placement="right-end"
                                                                                            >
                                                                                                <span> {step?.approver_name?.length > 10 ? `${step?.approver_name.slice(0, 10)}...` : step?.approver_name}</span>
                                                                                            </Tooltip>
                                                                                        </Typography>
                                                                                        <Typography
                                                                                            variant="h5"
                                                                                            className="pending-button"
                                                                                            data-title="Status"
                                                                                            sx={{ minWidth: "95px", textAlign: "left", ml: { xs: 1, md: 0 } }}
                                                                                        >
                                                                                            Pending
                                                                                        </Typography>
                                                                                        <Typography variant="h5" data-title="Time" sx={{ minWidth: "130px", textAlign: "left" }}>
                                                                                            -
                                                                                        </Typography>
                                                                                        <Typography variant="h5" data-title="Comment" sx={{ minWidth: "140px", textAlign: "left", pl: 3 }}>
                                                                                            -
                                                                                        </Typography>
                                                                                    </Div>
                                                                                </TimelineContent>
                                                                            </TimelineItem>
                                                                        </Timeline>
                                                                    </Div>
                                                                </>
                                                            );
                                                        })}
                                                    </>
                                                );
                                            })}
                                        </Div>
                                    )
                                }
                            </TableRow>
                        </TableBody>
                    </Table>
                </JumboScrollbar>
                : (
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        minHeight="360px"
                        style={{ backgroundColor: '#f5f5f5' }}
                    >
                        <Typography
                            variant="h4"
                            component="div"
                            style={{
                                color: '#333',
                                padding: '20px',
                                borderRadius: '8px',
                                backgroundColor: '#fff',
                                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            Approver is not there for your business unit.
                        </Typography>
                    </Box>
                )
            }
        </>
    )

}

export default WorkflowApproverStatus;
