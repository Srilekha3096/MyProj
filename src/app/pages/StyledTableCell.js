import styled from "@emotion/styled";
import { TableCell, tableCellClasses } from "@mui/material";
import React from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    lineHeight: "2.2rem",
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#f5f7fa",
        color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        borderBottom: "1px solid #D6EAF8"
    },

}));

export default StyledTableCell;