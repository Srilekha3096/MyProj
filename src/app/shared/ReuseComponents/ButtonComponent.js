import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FaPlus, FaSave } from 'react-icons/fa'
import {
    Button,
    ButtonGroup,
    IconButton,
    InputAdornment,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import { TiCancel } from 'react-icons/ti';
import { HiOutlineSearch } from 'react-icons/hi';
import ClickOutsideWrapper from '../../pages/ClickOutsideWrapper';
import Div from '@jumbo/shared/Div';
import { BiEdit, BiSolidFilePdf } from 'react-icons/bi';
import { MdCalendarToday, MdDelete } from 'react-icons/md';
import { RiFileExcel2Fill } from 'react-icons/ri';
//import { format } from 'date-fns';
import RefreshImage from './../../../assets/images/circular.png';
import ApplyImage from './../../../assets/images/apply.png';


export const ErpCreateButton = ({ handleClick, name, disableButton = false }) => {
    return (
        <ButtonGroup
            aria-label="split button"
            onClick={handleClick}
            disabled={disableButton}
            sx={{ width: { xs: "100% !important", lg: "100% !important", xl: "100% !important" }, display: "flex", justifyContent: "end", textAlign: "right" }}
        >
            <Button className="create-button" disabled={disableButton}>{name}</Button>
            <Button variant="contained" className="icon-button" disabled={disableButton}>
                <FaPlus size={16} />
            </Button>
        </ButtonGroup>
    )
}


export const ErpSaveUpdateButton = ({ name, type, className = 'plus-button' }) => {
    console.log("type", type)
    return (
        <ButtonGroup
            aria-label="split button"
            type={type}
            sx={{
                mt: { xs: 0.5, lg: 0 },
                mr: { xs: 0, md: 1 },
            }}
        >
            <Button type={type} className={className}>
                {name}
            </Button>
            <Button variant="contained" className="icon-button">
                <FaSave size={18} />
            </Button>
        </ButtonGroup>
    )
}


export const ErpCancelButton = ({ handleClick }) => {
    return (
        <ButtonGroup
            aria-label="split button"
            onClick={handleClick}
            sx={{
                mt: { xs: 0.5, lg: 0 },
                mr: { xs: 0, md: 1 },
            }}
        >
            <Button className="plus-button">Cancel</Button>
            <Button variant="contained" className="icon-button">
                <TiCancel size={24} />
            </Button>
        </ButtonGroup>
    )
}


// export const ErpSearchBox = ({ handleChange }) => {
//     return (
//         <TextField
//             className="col-12 input-box"
//             id="outlined-search"
//             type="search"
//             placeholder="Search..."
//             autoComplete="off"
//             onChange={handleChange}
//             InputProps={{
//                 startAdornment: (
//                     <InputAdornment position="start">
//                         <HiOutlineSearch size={20} />
//                     </InputAdornment>
//                 ),
//             }}
//         />
//     )
// }


export const ErpSearchBox = ({ handleChange, searchData = "" }) => {
    return (
        <TextField
            className="col-12 input-box"
            id="outlined-search"
            type="search"
            placeholder="Search..."
            autoComplete="off"
            value={searchData || ""}
            onChange={handleChange}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <HiOutlineSearch size={20} />
                    </InputAdornment>
                ),
            }}
        />
    )
}


export const ErpFilterBox = ({ handleClickOutside, showFilter, handleFilter, RefreshData, overflowY = "scroll", children }) => {
    return (
        <ClickOutsideWrapper onClickOutside={handleClickOutside}>
            <form onSubmit={handleFilter}>
                <Div
                    className="card filter-box mt-2"
                    id="openFilter"
                    sx={{
                        maxWidth: { xs: "400px !important", md: "300px !important" },
                        margin: { xs: "10px 20px 0px -20px !important", md: "0px !important" },
                        display: showFilter === true ? `block` : `none`,
                    }}
                >
                    <Div
                        sx={{
                            p: 1.5,
                            pb: 0,
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography variant="h3">Filters</Typography>
                        <IconButton
                            onClick={RefreshData}
                            color="primary"
                            sx={{ mt: -1.5, mr: -1.5 }}
                        >
                            <img
                                src={RefreshImage}
                                alt="Refresh"
                                width={20}
                                height={20}
                            />
                        </IconButton>
                    </Div>
                    <Div
                        sx={{
                            p: 1.5,
                            pt: 0,
                            maxHeight: "350px",
                            overflowY: "scroll",
                        }}
                    >
                        {children}
                    </Div>
                    <Div
                        sx={{
                            mt: 2,
                            mb: 1,
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <ButtonGroup aria-label="split button">
                            <Button className="plus-button" type="submit">
                                Apply
                            </Button>
                            <Button
                                variant="contained"
                                type="submit"
                                className="icon-button"
                            >
                                <img
                                    src={ApplyImage}
                                    alt="apply"
                                    width={20}
                                    height={20}
                                />
                            </Button>
                        </ButtonGroup>
                    </Div>
                </Div>
            </form>
        </ClickOutsideWrapper>
    )
}


export const ErpActionButton = ({ userRolePermissions, editPermissionId, deletePermissionId, onClickEdit, onClickDelete, align = "center" }) => {
    return (
        <Div sx={{ textAlign: align, pr: align === "right" ? 1 : 0 }}>
            {editPermissionId &&
                <Tooltip title="Edit">
                    <IconButton
                        size="small"
                        className="edit-icon"
                        onClick={onClickEdit}
                        disabled={Array.isArray(userRolePermissions) && (userRolePermissions || [])?.includes(editPermissionId) ? false : true}
                    >
                        <BiEdit
                            color={Array.isArray(userRolePermissions) && (userRolePermissions || [])?.includes(editPermissionId) ? "" : "#C7C8CC"}
                        />
                    </IconButton>
                </Tooltip>
            }

            {deletePermissionId &&
                <Tooltip title="Delete">
                    <IconButton
                        size="small"
                        className="delete-icon"
                        onClick={onClickDelete}
                        disabled={Array.isArray(userRolePermissions) && (userRolePermissions || [])?.includes(deletePermissionId) ? false : true}
                    >
                        <MdDelete
                            color={Array.isArray(userRolePermissions) && (userRolePermissions || [])?.includes(deletePermissionId) ? "" : "#C7C8CC"}
                        />
                    </IconButton>
                </Tooltip>
            }
        </Div>
    )
}


export const ErpPDFExcelDownloadButton = ({
    handleDownloadPDF,
    handleDownloadExcel,
    conditions = false,
    stopAnimation = true }) => {
    return (
        <Div sx={{ display: "flex", justifyContent: "flex-end", alignItems: "end", gap: 1 }}>
            <Button
                className={(!Boolean(conditions) && Boolean(stopAnimation)) ? "PDF-Excel-Button" : ""}
                sx={{
                    minWidth: "110px !important",
                    height: "34px !important",
                    "&:hover": {
                        bgcolor: "#00bfff !important",
                        color: "white !important",
                    },
                }}
                variant={(Boolean(conditions) && Boolean(stopAnimation)) ? "contained" : "outlined"}
                startIcon={<BiSolidFilePdf size={22} />}
                onClick={() => handleDownloadPDF()}
                disabled={conditions}
            >
                PDF
            </Button>

            <Button
                className={(!Boolean(conditions) && Boolean(stopAnimation)) ? "PDF-Excel-Button" : ""}
                sx={{
                    minWidth: "110px !important",
                    height: "34px !important",
                    "&:hover": {
                        bgcolor: "#3FD3A4 !important",
                        color: "white !important",
                    },
                }}
                variant={(Boolean(conditions) && Boolean(stopAnimation)) ? "contained" : "outlined"}
                color="success"
                startIcon={<RiFileExcel2Fill size={20} />}
                onClick={() => handleDownloadExcel()}
                disabled={conditions}
            >
                Excel
            </Button>
        </Div>
    )
}


export const ErpDateField = ({ inputValue, handleInputChange, InputProps: parentInputProps, ...props }) => {
    const [showDateField, setShowDateField] = useState(false);
    const [dateFormat, setDateFormat] = useState(localStorage.getItem("DateFormat"));
    const dateFieldRef = useRef(null);
    const handleBlurDateField = useCallback((event) => {
        if (dateFieldRef.current && !dateFieldRef.current.contains(event.target)) {
            setShowDateField(false);
        }
    }, []);
    useEffect(() => {
        document.addEventListener("click", handleBlurDateField, true);
        return () => {
            document.removeEventListener("click", handleBlurDateField, true);
        };
    }, [handleBlurDateField]);

    useEffect(() => {
        const storedDateFormat = localStorage.getItem("DateFormat");
        if (storedDateFormat) {
            setDateFormat(storedDateFormat);
        }
    }, []);
    // const formatDate = (date, formatString) => {
    //     try {
    //         return format(new Date(date), formatString);
    //     } catch (error) {
    //         console.error('Date formatting error:', error);
    //         return date;
    //     }
    // };

    const formattedValue = !showDateField && inputValue ? "2025" : inputValue;

    // Merge default InputProps with those from the parent
    const mergedInputProps = {
        ...parentInputProps,
        inputProps: {
            ...(parentInputProps?.inputProps || {}),
            min: parentInputProps?.inputProps?.min,// or any other specific props
            max: props?.inputProps?.max,
        },
        endAdornment: !showDateField && (
            <InputAdornment position="end">
                <IconButton
                    aria-label="toggle calendar"
                    onMouseEnter={() => setShowDateField(true)}
                    edge="end"
                    sx={{ pl: 0, pr: 1.28, mt: -0.2 }}
                >
                    <MdCalendarToday size={13.3} color={Boolean(props?.disabled) ? "gray" : '#000'} />
                </IconButton>
            </InputAdornment>
        ),
    };

    // console.log("mergedInputProps", { mergedInputProps, props, formattedValue })
    return (
        <TextField
            {...props}
            type={showDateField ? 'date' : 'text'}
            className={props?.className ? props?.className?.replaceAll("search-select", "input-box") : `col-12 input-box`}
            onFocus={() => setShowDateField(true)}
            onBlur={() => setShowDateField(false)}
            value={formattedValue || ''}
            onChange={(e) => {
                handleInputChange(e);
            }}
            ref={dateFieldRef}
            placeholder={localStorage.getItem("DateFormat")?.toLocaleLowerCase()?.replaceAll("-", "/")}
            InputProps={mergedInputProps}
            sx={{
                '& input::placeholder': {
                    color: Boolean(props?.disabled) ? "gray" : '#000', // Adjust the color as needed
                    opacity: Boolean(props?.disabled) ? 0.5 : 0.8, /// Adjust the color as needed
                    marginTop: "3px"
                },
                '&:focus-within .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#00BFFF', // Adjust the border color as needed
                }
            }}
        />
    );
};