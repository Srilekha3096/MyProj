import JumboScrollbar from '@jumbo/components/JumboScrollbar'
import { Table, TableBody, TableHead, TableRow, TableCell, Grow } from '@mui/material'
import React from 'react'
import { CellNoborder } from '../../pages/TableStyled'
import { DateFormatter } from './DateFormatter'
import Div from '@jumbo/shared/Div'
import useResponsive from 'app/pages/useResponsive'

const HistoryOverview = ({ updatedHistory, itemId = "Item Id" }) => {

    let isMobile = useResponsive("down", "md");

    console.log("updatedHistory", updatedHistory);
    return (
        <JumboScrollbar
            autoHeight={true}
            autoHideTimeout={4000}
            autoHeightMin={300}
            autoHide={true}
            hideTracksWhenNotNeeded
            id="no-more-tables"
        >
            <Grow
                in={true}
                style={{ transformOrigin: '0 0 0' }}
                {...(true ? { timeout: 500 } : {})}
            >
                <Table stickyHeader className="table">
                    <TableHead className="history-header">
                        <TableRow>
                            <CellNoborder sx={{ fontWeight: 900, minWidth: { xs: "auto", md: "200px !important" } }}>Activity Date</CellNoborder>
                            <CellNoborder sx={{ fontWeight: 900, minWidth: { xs: "auto", md: "200px !important" } }}>{itemId}</CellNoborder>
                            <CellNoborder sx={{ fontWeight: 900, minWidth: { xs: "auto", md: "200px !important" } }}>History</CellNoborder>
                            <CellNoborder sx={{ fontWeight: 900, minWidth: { xs: "auto", md: "200px !important" } }}>Updated Fields</CellNoborder>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {updatedHistory?.length > 0 ? (
                            updatedHistory?.map((data1, index) => (
                                <TableRow>
                                    <CellNoborder sx={{ minWidth: { xs: "auto", md: "200px !important" } }} data-title="Activity Date">
                                        <DateFormatter date={data1?.Updated_Date} />
                                        <span style={{ marginLeft: "5px" }}>
                                            {data1?.Updated_Time ? data1?.Updated_Time?.slice(0, 8) : isMobile ? "-" : ""}
                                        </span>
                                    </CellNoborder>
                                    <CellNoborder sx={{ minWidth: { xs: "auto", md: "200px !important" } }} data-title={itemId}>
                                        {data1?.Document_Id ? data1?.Document_Id : isMobile ? "-" : ""}
                                    </CellNoborder>
                                    <CellNoborder sx={{ minWidth: { xs: "auto", md: "200px !important" } }} data-title="History">
                                        {data1?.Updated_Person ? data1?.Updated_Person : isMobile ? "-" : ""}
                                    </CellNoborder>
                                    <CellNoborder sx={{ minWidth: { xs: "auto", md: "200px !important" } }} data-title="Updated Fields">
                                        {data1?.Updated_Field ? data1?.Updated_Field : isMobile ? "-" : ""}
                                        {Array.isArray(data1?.Histroy) ? data1?.Histroy?.map(item => (
                                            <Div sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
                                                {item?.keys?.map((i, idx) => {
                                                    return (
                                                        <span style={{ color: idx == 0 ? "#00BFFF" : "", marginRight: idx == 0 ? "8px" : "" }}>{i} {idx == 0 ? "-" : idx == item?.keys.length - 1 ? "" : ","}</span>
                                                    )
                                                })}
                                            </Div>
                                        )) : ""}
                                    </CellNoborder>
                                </TableRow>
                            )
                            )) :
                            <TableRow>
                                <TableCell colSpan={4} sx={{ textAlign: "center" }}>
                                    No Records
                                </TableCell>
                            </TableRow>
                        }
                    </TableBody>
                </Table>
            </Grow>
        </JumboScrollbar>
    )
}

export default HistoryOverview;