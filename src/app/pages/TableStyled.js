import styled from '@emotion/styled';
import { Table, TableCell, TableRow } from '@mui/material';

export const CellNoborder = styled(TableCell)(({ theme }) => ({
    border: "none !important"
}))
export const TableNoborder = styled(Table)(({ theme }) => ({
    border: "none !important"
}))
export const TableRowNoborder = styled(TableRow)(({ theme }) => ({
    border: "none !important"
}))