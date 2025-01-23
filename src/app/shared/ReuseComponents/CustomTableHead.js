import React, { memo } from 'react';
import { TableHead, TableRow, TableCell, IconButton, Menu, Typography, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { BsArrowDownUp, BsThreeDotsVertical } from 'react-icons/bs';
import Div from '@jumbo/shared/Div';

// ---------------------------Sorting-----------------------------------------

const SortableTableCell = ({
    label = "",
    className = "",
    alignItems = "left",
    fullWidth = "auto",
    sortKey,
    handleSort,
    sortConfig
}) => {
    return (
        <TableCell onClick={() => handleSort(sortKey)} className={className} sx={{ cursor: "pointer", minWidth: fullWidth, width: fullWidth, maxWidth: "auto !important", textAlign: alignItems }}>
            {label}
            {sortConfig.key === sortKey && (
                <IconButton size="small">
                    <BsArrowDownUp />
                </IconButton>
            )}
        </TableCell>
    );
};

// ---------------------------Gear Icon-----------------------------------------

const ColumnMenu = ({ anchorEl, handleClose, GrearBox }) => {
    return (
        <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            sx={{
                mt: 7,
                maxHeight: "300px",
                scrollBehavior: "smooth",
            }}
        >
            <Typography variant="h4" sx={{ p: 2, mb: -2 }}>
                Choose Columns
            </Typography>
            <FormGroup sx={{ p: 2 }}>
                {GrearBox?.map((item, index) => (
                    <FormControlLabel
                        key={index}
                        control={
                            <Checkbox
                                checked={item.state}
                                onChange={(e) => item.setState(e.target.checked)}
                            />
                        }
                        label={item.label}
                    />
                ))}
            </FormGroup>
        </Menu>
    );
};
// ---------------------------customized table heads  main code-----------------------------------------
const CustomTableHead = ({
    headers = [],
    handleClickOpen = () => { },
    anchorEl = null,
    handleClose = () => { },
    sortConfig = { key: null, direction: "ascending", },
    handleSort = () => { },
    GrearBox = [],
    ActionMenus = { cell: true, actionIcon: true }
}) => {
    console.log("CustomTableHead renders");
    return (
        <>
            <TableHead className="table-head" key={100 * 100}>
                <TableRow>
                    {headers?.map((header, index) => (
                        Boolean(header?.boolean) && (
                            <SortableTableCell
                                key={index}
                                alignItems={header?.align}
                                fullWidth={header?.fullWidth}
                                label={header?.label}
                                className={header?.class}
                                sortKey={header?.sortKey}
                                handleSort={handleSort}
                                sortConfig={sortConfig}
                            />
                        )
                    ))}
                    {Boolean(ActionMenus?.cell) && <TableCell sx={{ textAlign: "center !important", minWidth: "70px !important", maxWidth: "80px !important" }}>
                        <Div
                            sx={{
                                textAlign: "center !important",
                                display: "flex",
                                // justifyContent: "flex-end",
                                justifyContent: ActionMenus?.actionIcon ? "flex-end" : "center",
                                lineHeight: 2.5,
                            }}
                        >
                            Action
                            {Boolean(ActionMenus?.actionIcon) &&
                                <span
                                    onClick={handleClickOpen}
                                    style={{ cursor: "pointer" }}
                                >
                                    <IconButton>
                                        <BsThreeDotsVertical size={18} color="black" />
                                    </IconButton>
                                </span>
                            }
                        </Div>
                    </TableCell>}
                    {/* ----------Gear icon menu---------- */}
                    {Boolean(ActionMenus?.actionIcon) && <ColumnMenu anchorEl={anchorEl} handleClose={handleClose} GrearBox={GrearBox} />}
                </TableRow>
            </TableHead>
            {Boolean(ActionMenus?.actionIcon) && <Div sx={{ mr: 1, display: { xs: "flex", md: "none !important", lg: "none !important" }, alignItems: "center", justifyContent: "right" }}>
                <IconButton onClick={handleClickOpen}>
                    <IconButton>
                        <BsThreeDotsVertical size={18} color="black" />
                    </IconButton>
                </IconButton>
            </Div>}
        </>
    );
};

export default memo(CustomTableHead);
