import JumboScrollbar from '@jumbo/components/JumboScrollbar';
import { Box, Button, ButtonGroup, CircularProgress, Grid, IconButton, List, ListItem, ListItemText, Table, TableBody, TableCell, TableHead, TableRow, TextField, Tooltip, Typography } from '@mui/material';
import React, { memo, useEffect, useState } from 'react'
import { DateFormatter, ScrollheightForScreenSize, formatIndianNumber } from './DateFormatter';
import Div from '@jumbo/shared/Div';
import { BiSolidFilePdf } from 'react-icons/bi';
import Skeleton from '@mui/material/Skeleton';
import { RiArrowDownSFill, RiFileExcel2Fill } from 'react-icons/ri';
import { MdPlayArrow } from 'react-icons/md';
import useResponsive from 'app/pages/useResponsive';
import loadingDotsImage from '../../../assets/images/loadingDots.gif';
import companyImage from '../../../assets/images/test1.jpg';
import bankImage from '../../../assets/images/Bank.png';
import cashImage from '../../../assets/images/Cash.png';
import NoDataImage from '../../../assets/images/NoData.jpg';
import NoPermissionsImage from '../../../assets/images/403-forbidden.png';
import axios from 'axios';
import { styled, lighten, darken } from '@mui/system';
import convertRupeesIntoWords from 'convert-rupees-into-words';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { BASE_URL } from 'app/services/auth-services';
import JumboContentLayoutMain from '@jumbo/components/JumboContentLayout/JumboContentLayoutMain';

export const darkColors = [
    "#8e44ad",
    "#e91e63",
    "#e67d21",
    "#2196f3",
    "#198754",
    "#6610f2",
    "#dc3545",
    "#0dcaf0",
    "#20c997",
    "#6673FC",
];

export const lightColors = [
    "#3686FF",
    "#7C47F7",
    "#8E6AC1",
    "#EB5F9F",
    "#FF6B77",
    "#FFA14E",
    "#2BB673",
    "#31D9FF",
    "#45E8B6",
    "#7785FF",
];

export const ExcelColors = {
    bgcolor: "#EAECEC",
    color: "#31D9FF",
}

export const formatNumber = (number) => {
    if (number === 0) return '0.00';

    return new Intl.NumberFormat('en-US', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(number);
}

export const NumberandFloatRegex = /^-?\d*\.?\d*$/;

// FirstLetterCaps
export const FirstLetterCaps = (value = "") => {
    return value?.charAt(0)?.toUpperCase() + value.slice(1);
}

export const formatKey = (key = "") => {
    console.log("formatKey");
    return key?.replace(/_/g, ' ').replace(/\b\w/g, char => char?.toUpperCase());
}

export const AllImages = [
    {
        name: "lodingImg",
        source: loadingDotsImage
    },
    {
        name: "companyImag",
        source: companyImage
    },
    {
        name: "noDataImg",
        source: NoDataImage
    },
    {
        name: "noPermissionsImg",
        source: NoPermissionsImage
    },
    {
        name: "bankImage",
        source: bankImage
    },
    {
        name: "cashImage",
        source: cashImage
    },
]

export const CommonOverviewSkeleton = memo(() => {
    return (
        <List
            disablePadding
            sx={{
                mr: 2,
                pb: 2,
            }}
        >
            {
                [...Array(10).keys()].map((index) => (
                    <ListItem sx={{ p: .25 }} key={index}>
                        <ListItemText primary={<Skeleton width={"100%"} height={40} />} />
                    </ListItem>
                ))
            }
        </List>
    )
})

// export const findChangedKeys = (
//     previousArray = [],
//     newArray = []
// ) => {
//     console.log("findChangedKeys", previousArray, newArray);
//     let ChangedValueKey = [];

//     newArray.forEach((newObj, index) => {
//         let ChangedKeys = [];
//         let PrevObj = previousArray[index];

//         Object.keys(newObj)?.forEach(newProp => {
//             if (newObj[newProp] != PrevObj[newProp]) {
//                 ChangedKeys.push(formatKey(newProp));
//             }
//         });

//         if (ChangedKeys.length > 0) {
//             ChangedValueKey.push({ keys: [`Line ${index + 1}`, ...ChangedKeys] });
//         }
//     });

//     return ChangedValueKey;
// }

export const findChangedKeys = (
    previousArray = [],
    newArray = [],
    name = "",
    withKeysOnly = ["accountName", "GLaccount_Id", "Particulars", "debit", "credit"]
) => {

    console.log("previousArray", previousArray, newArray);
    console.log("withKeysOnly", withKeysOnly);

    let ChangedValueKey = [];

    const numLinesAdded = newArray?.length - previousArray?.length; // 10 -9 or 9-10

    const numLinesDeleted = previousArray?.length - newArray?.length; // 20-10 or 15-20

    newArray?.forEach((newObj, index) => {
        let ChangedKeys = [];
        let PrevObj = previousArray[index];

        if (PrevObj) {
            Object.keys(newObj)?.forEach(newProp => {
                if (withKeysOnly?.includes(newProp) && newObj[newProp] !== PrevObj[newProp]) { // checking without property name provied and check both are not wuals.           
                    ChangedKeys?.push(formatKey(newProp));
                }
            });
        } else {
            // console.log("withoutline key", Object.keys(newObj)?.filter(item => withKeysOnly.includes(item)), withKeysOnly.includes("Opening_Balance"));
            ChangedKeys = Object.keys(newObj)?.filter(item => withKeysOnly.includes(item))?.map(item => formatKey(item));
        }

        if (ChangedKeys?.length > 0) {
            ChangedValueKey?.push({ keys: [`${name} Line ${index + 1}`, ...ChangedKeys] });
        }
    });

    if (numLinesAdded > 0) {
        // 9, 9 < 10 ,i++
        for (let i = previousArray.length; i < newArray.length; i++) {
            ChangedValueKey?.push({ keys: [`${name} Line ${i + 1}`, "Added"] });
        }
    }

    if (numLinesDeleted > 0) {
        //      10, 10 < 20 ,i++ 
        for (let i = newArray.length; i < previousArray.length; i++) {
            ChangedValueKey?.push({ keys: [`${name} Line ${i + 1}`, "Removed"] });
        }
    }

    return ChangedValueKey;
};


export const HeaderLength = (header = []) => {
    let value = header?.filter(item => item?.boolean)?.length
    if (value <= 3) {
        return 30;
    } else if (value <= 4) {
        return 20;
    } else {
        return 17;
    }
}

// Report Table Headings
export const ReportTableHead = memo(({ heads = [], colSpans = 2 }) => {
    console.log("heads", heads);
    return (
        <TableRow>
            {heads?.map((head, index) => (
                <TableCell colSpan={colSpans} key={index + 99} style={{ fontWeight: 600, textAlign: Boolean(head?.align == "right") ? "right " : "left", display: "flex", justifyContent: "flex-end" }} >
                    {head?.label}
                </TableCell>
            ))}
        </TableRow>
    )
})

export const FormatFileName = (filename = "file.png", lengthNumber = 10) => {
    console.log("Formatting file", filename);
    const dotIndex = filename.lastIndexOf('.');
    const namePart = filename.substring(0, dotIndex);
    const extPart = filename.substring(dotIndex);
    const formattedName = namePart.length > lengthNumber ? namePart.substring(0, lengthNumber) : namePart;
    return `${formattedName}${extPart}`;
};

export const CustomTooltip = memo(({ value = "", char = 10 }) => {
    return (
        <Tooltip
            title={value?.length > char ? FirstLetterCaps(value) : ""}
            placement="right-end"
        >
            <span>{FirstLetterCaps(value && (value?.length > char ? value?.slice(0, char) + "..." : value))}</span>
        </Tooltip>
    )
})

export const CustomScrollBar = memo(({
    stateValue = true,
    childrens = <></>,
    fromDate = "",
    toDate = "",
    formName = "",
    userDetails = {},
    companyLogo = companyImage,
    TotalAmount = 0,
    Notes = "",
    ImageState = {
        state: false,
        name: ""
    },
    LeftContent = [],
    scrollHeight,
    scrollPercent = 1.92
}) => {

    let [screenHeight, screenWidth] = ScrollheightForScreenSize()
    const CurrentDate = new Date().toJSON().slice(0, 10);

    let isMobile = useResponsive("down", "md");

    const toWordsCustom = (num) => {
        if (num === 0) return 'ZERO Only';

        const words = convertRupeesIntoWords(num);
        return `${words.toUpperCase()}`;
    };

    // change the amount to text
    const amountWords = toWordsCustom(Number(TotalAmount));
    console.log("scrollHeight", { scrollHeight, ImageState });
    if (stateValue) {
        return (
            <>
                <JumboScrollbar
                    autoHeight={true}
                    autoHideTimeout={4000}
                    autoHeightMin={Boolean(scrollHeight) ? scrollHeight : isMobile ? 400 : Math.round(screenHeight / scrollPercent)}
                    autoHide={true}
                    hideTracksWhenNotNeeded
                // id="no-more-tables"
                >
                    {childrens}
                </JumboScrollbar>
            </>
        )
    } else {
        return (
            <>
                <Div className='row' sx={{ px: 2, mt: { xs: 0, md: 2 }, display: { xs: "flex", md: "flex" } }}>
                    <Div className='col-sm-12 col-md-4'>
                        <img
                            src={companyLogo}
                            alt="ABC Logo"
                            width={100}
                            height={60}
                        />
                        <Typography variant="h4" sx={{ fontWeight: 600 }}>
                            test PRIVATE LIMITED
                        </Typography>
                    </Div>
                    <Div className='col-sm-12 col-md-4' sx={{ textAlign: "center" }}>
                        <Typography sx={{
                            fontWeight: 900,
                            fontSize: "19px !important",
                            display: "inline-block",
                            borderBottom: "1px solid gray",
                        }}>
                            {formName}
                        </Typography>
                    </Div>
                    <Div className='col-sm-12 col-md-4' sx={{ textAlign: "right" }}>
                        {Boolean(ImageState?.state) &&
                            <Typography sx={{
                                fontWeight: 600,
                                fontSize: "22px !important",
                            }}>
                                {ImageState?.name == "CASH" ? <img
                                    src={cashImage}
                                    alt="Cash Logo"
                                    width={120}
                                    height={65}
                                /> : <img
                                    src={bankImage}
                                    alt="Bank Logo"
                                    width={120}
                                    height={65}
                                />}
                            </Typography>
                        }
                    </Div>
                </Div>

                {(Boolean(fromDate) && Boolean(toDate)) &&
                    <Div sx={{ display: "flex", fontSize: "14px", mt: 3, px: 2 }}>
                        <Div item className="col-4" sx={{ textAlign: "left" }}>
                            <Typography variant="h4">  Date :  <DateFormatter date={CurrentDate} dateFormat={userDetails?.DateFormat} /></Typography>
                        </Div>
                        {Boolean(fromDate) && <Div item className="col-4" sx={{ textAlign: "left" }}>
                            <Typography variant="h4">  From :  <DateFormatter date={fromDate} dateFormat={userDetails?.DateFormat} /></Typography>
                        </Div>}
                        {Boolean(toDate) && <Div item className="col-4" sx={{ textAlign: "left" }}>
                            <Typography variant="h4">  To :  <DateFormatter date={toDate} dateFormat={userDetails?.DateFormat} /></Typography>
                        </Div>}
                    </Div>
                }

                {
                    LeftContent?.length > 0 && <Grid columns={12} sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", fontSize: "14px", mt: 3, px: 2 }}>
                        {LeftContent?.map((item, index) => (
                            <Div className='col-6' sx={{ textAlign: index % 2 == 0 ? "left" : "right" }}>
                                <Typography variant="h4">{item?.name}  : &nbsp; {item?.value}</Typography>
                            </Div>
                        ))}
                    </Grid>
                }
                <Div sx={{ px: 2, mt: 2 }}>
                    {childrens}
                </Div>

                <Grid columns={12} sx={{ px: 2, mt: 15, display: "flex", justifyContent: "space-between" }}>
                    <Div className="row col-8">
                        <Div className="col-2">
                            {Boolean(Notes) && <Typography variant="h4">Notes</Typography>}
                            {Boolean(TotalAmount) && <Typography variant="h4">Rupees</Typography>}
                        </Div>
                        <Div className="col-10">
                            {Boolean(Notes) && <Typography variant="h4">
                                : &nbsp; {Boolean(Notes) ? FirstLetterCaps(Notes) : "-"}
                            </Typography>}
                            {Boolean(TotalAmount) && <Typography variant="h4">
                                : &nbsp; {FirstLetterCaps(amountWords?.toUpperCase())} Only,
                            </Typography>}
                        </Div>
                    </Div>
                    {Boolean(TotalAmount) && <Div className="row col-4">
                        <Typography sx={{
                            fontWeight: 600,
                            fontSize: "15px !important",
                            textAlign: "right"
                        }}>

                        </Typography>
                        <Typography variant="h4" sx={{
                            fontSize: "16px !important",
                            textAlign: "right"
                        }}>
                            Signature
                        </Typography>
                    </Div>}
                </Grid>
            </>
        )
    }
})


export const CustomTableFooter = memo(({
    dataLists,
    colValue = 1,
    loadingStatus = false,
    credit = "credit",
    debit = "debit",
    printPageState = false,
}) => {

    let isMobile = useResponsive("down", "md");

    return (
        <>
            {!Boolean(loadingStatus) && dataLists?.length > 0 &&
                <TableRow sx={{ bgcolor: "#EFEFEF !important", position: Boolean(printPageState) ? "none" : "sticky", bottom: isMobile ? "0px" : "-2px" }}>

                    {!isMobile && (
                        <>
                            <TableCell colSpan={colValue - 1}>

                            </TableCell>
                            <TableCell sx={{ textAlign: "center", fontSize: "16px", fontWeight: 900, minHeight: "55px !important" }}>
                                Total
                            </TableCell>
                        </>
                    )}

                    <TableCell data-title={`Total ${FirstLetterCaps(credit == "TotalCredit" ? " Credit" : credit)}`} sx={{ textAlign: "right", fontSize: "16px", fontWeight: 500 }}>
                        <Div sx={{ display: "flex", justifyContent: "right" }}>
                            <span style={{ backgroundColor: "#FFEBAD", color: "#966F03", fontWeight: 900, padding: isMobile ? "5px" : "5px 8px", borderRadius: "10px" }}>
                                {formatIndianNumber(dataLists?.reduce((acc, cur) => acc + parseFloat(Math.abs(cur?.[debit])) || 0, 0))}
                            </span>
                        </Div>
                    </TableCell>

                    <TableCell data-title={`Total ${FirstLetterCaps(debit == "TotalDebit" ? " Debit" : debit)}`} sx={{ textAlign: "right", fontSize: "16px", fontWeight: 500 }}>
                        <Div sx={{ display: "flex", justifyContent: "right" }}>
                            <span style={{ backgroundColor: "#B3FFAE", color: "#057B1B", fontWeight: 900, padding: isMobile ? "5px" : "5px 8px", borderRadius: "10px" }}>
                                {formatIndianNumber(dataLists?.reduce((acc, cur) => acc + parseFloat(Math.abs(cur?.[credit])) || 0, 0))}
                            </span>
                        </Div>
                    </TableCell>

                </TableRow>
            }
        </>
    )
})

const useCounter = (minimum, maximum, duration) => {
    const [count, setCount] = useState(minimum);

    useEffect(() => {
        if (maximum <= minimum) {
            setCount(maximum); // If maximum is less than or equal to minimum, set count to maximum directly
            return;
        }

        const totalSteps = maximum - minimum;
        const stepTime = duration / totalSteps;
        let currentStep = 0;
        const startTime = performance.now();

        const updateCount = (currentTime) => {
            const elapsed = currentTime - startTime;
            currentStep = Math.min(totalSteps, Math.floor(elapsed / stepTime));
            setCount(minimum + currentStep);
            if (currentStep < totalSteps) {
                requestAnimationFrame(updateCount);
            }
        };

        setCount(minimum);
        requestAnimationFrame(updateCount);

        return () => setCount(minimum); // Clean up function
    }, [minimum, maximum, duration]);

    return count;
};

export const Counter = memo(({ minimum = 0, maximum, duration = 3 }) => {
    const durations = duration > 2 ? 1 : duration == 0 ? 0 : 1.3;
    const count = useCounter(minimum, maximum, parseFloat(durations) * 1000);
    // console.log("counterssss",{ count, maximum,duration});
    return <>{count}</>;
});

export const CustomExcelOverview = ({
    headersTable = [],
    childerns = <></>,
    fromDate,
    toDate,
    FormName = "",
    cols = [2, 3, 2],
    dateCols = [2, 3, 3, 2],
    id = "table-to-xlsx"
}) => {

    const token = localStorage.getItem('accesstoken');

    const header = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    };
    const [companyDetails, setComapanyDetails] = useState({})

    useEffect(async () => {
        try {
            await axios.get(`${BASE_URL}/Erpapp/CompanyCRUD/?id=${localStorage.getItem("OrganizationId")}`, header)
                .then((res) => {
                    console.log("CompanyCRUD", res?.data);
                    setComapanyDetails(res?.data)
                }).catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <Table id={id} borderd className="table table-bordered" sx={{ display: "none" }}>
            <TableHead className="table-head">
                <TableRow>
                    <TableCell colSpan={1} style={{ textAlign: "left" }}></TableCell>
                    <TableCell colSpan={cols[0] - 1} style={{ textAlign: "left" }}>
                        <img
                            src={`${BASE_URL}${companyDetails?.CompanyLogo}`}
                            alt={companyDetails?.Company_Name}
                            width={120}
                            height={"5%"}
                        />
                    </TableCell>
                    <TableCell colSpan={cols[1]} style={{ textAlign: "center" }}>
                        <Typography variant="h3">
                            {FormName}
                        </Typography>
                    </TableCell>
                    <TableCell colSpan={cols[2]}>
                    </TableCell>
                </TableRow>

                {Boolean(fromDate && toDate) && <TableRow >
                    <TableCell colSpan={dateCols[0]}>
                    </TableCell>
                    <TableCell colSpan={dateCols[1]} style={{ textAlign: "center", display: "flex", justifyContent: "center" }}>
                        From :   <DateFormatter date={fromDate} />
                    </TableCell>
                    <TableCell colSpan={dateCols[2]} style={{ textAlign: "center", display: "flex", justifyContent: "center" }}>
                        To : <DateFormatter date={toDate} />
                    </TableCell>
                    <TableCell colSpan={dateCols[3]}>
                    </TableCell>
                </TableRow>}

                <TableRow>
                    <TableCell colSpan={7}>

                    </TableCell>
                </TableRow>

                <ReportTableHead
                    heads={headersTable}
                    ActionMenus={{ cell: false, actionIcon: false }}
                />

            </TableHead>
            <TableBody>
                {childerns}
            </TableBody>
        </Table>
    )
}


export const PdfDownloadButton = memo(({
    setPrintPageState = false,
    conditions = false,
    stopAnimation = true
}) => {
    console.log("conditionsss", !Boolean(conditions), Boolean(stopAnimation));
    return (
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
            onClick={() => setPrintPageState(true)}
            disabled={conditions}
        >
            PDF
        </Button>
    )
})

export const ExcelDownloadButton = memo(({
    ExportToExcel = "",
    conditions = false,
    stopAnimation = true
}) => {
    return (
        <Button
            className={`${(!Boolean(conditions) && Boolean(stopAnimation)) ? "PDF-Excel-Button ButtonHover" : "GrayExcelText"}`}
            sx={{
                position: "relative",
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
            disabled={conditions}
        >
            Excel
            <ReactHTMLTableToExcel
                id="test-table-xls-button"
                table="table-to-xlsx"
                filename={`${ExportToExcel}`}
                sheet="Sheet1"
                buttonText=""
                className="ReactHTMLTableToExcel"
            />
        </Button>
    )
})

export const CustomSkeleton = memo(({ rowCount = 10, headCount = 8 }) => {
    console.log("skeleton calling from styeld");
    return (
        <>
            {Array(rowCount).fill().map((item, index) => (
                <TableRow key={index + 1}>
                    {Array(headCount).fill().map(data => (
                        <TableCell>
                            <Skeleton height={30} />
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </>
    )
})

export const OverviewListSkeleton = memo(({ listCount = 10 }) => {
    console.log("skeleton calling from styeld");
    return (
        <>
            <Div className="row mt-2" sx={{ display: { xs: "none", md: "flex" } }}>
                <Div className="col col-sm-2 col-md-3">
                    {Array(listCount).fill().map((item, index) => (
                        <Skeleton height={25} />
                    ))}
                </Div>
                <Div className="col col-sm-4 col-md-5">
                    {Array(listCount).fill().map((item, index) => (
                        <Skeleton height={25} />
                    ))}
                </Div>
            </Div>
        </>
    )
})

export const TreeIconsLevel1 = memo(({
    value = false,
    margins = "-0 8px 0px 0px"
}) => {

    console.log("TreeIconsLevel1");
    return (
        <IconButton size="small" sx={{ margin: margins }}>
            {Boolean(value) ? <RiArrowDownSFill size={18} style={{ borderRadius: "3px", border: "1px solid #00BFFF", color: "#00BFFF" }} />
                : <MdPlayArrow size={18} style={{ borderRadius: "3px", border: "1px solid #D6D8D9", color: "#898989" }} />
            }
        </IconButton>
    )
})

export const getGeocode = async (address) => {
    // Encode the address to be URL-safe
    const url = `https://geocode.xyz/${encodeURIComponent(address)}?json=1`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        if (data && data.latt && data.longt) {
            const latitude = data.latt;
            const longitude = data.longt;
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
            return { latitude, longitude };
        } else {
            console.error('No geocoding results found');
        }
    } catch (error) {
        console.error('Error fetching geocoding data:', error);
    }
};

export const GroupByOptions = (filteredAccounts = [], keyName = "Account_Name") => {
    return filteredAccounts.map((option) => {
        const firstLetter = option[keyName][0].toUpperCase();
        return {
            firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
            ...option,
        };
    });
}

export const ListHeader = styled('div')(({ theme }) => ({
    position: 'sticky',
    top: '-8px',
    padding: '4px 10px',
    color: theme.palette.primary.main,
    backgroundColor:
        theme.palette.mode === 'light'
            ? "#EFEFEF"
            : darken(theme.palette.primary.main, 0.8),
}));

export const ListItems = styled('ul')({
    padding: 0,
});


export const CustomScrollbarBox = styled(Box)(({
    scrollWidth = "100%",
    scrollHeight = "100%",
    overflowX = false,
    overflowY = false
}) => ({
    width: scrollWidth,
    height: scrollHeight,
    overflowX: overflowX ? 'hidden' : 'auto',
    overflowY: overflowY ? 'hidden' : 'auto',
    position: 'relative',
    transition: 'overflow 0.3s linear',

    '&:hover': {
        overflowX: overflowX ? 'auto' : 'hidden',
        overflowY: overflowY ? 'auto' : 'hidden',
    },

    '&:hover::-webkit-scrollbar': {
        opacity: 1,
    },
    '&::-webkit-scrollbar': {
        height: overflowX ? '7px' : '0px',
        width: overflowY ? '7px' : '0px',
        transition: 'opacity 0.3s ease',
        opacity: 0,
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#CFCFCF',
        borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor: '#CFCFCF',
        cursor: 'grabbing'
    },
    '&::-webkit-scrollbar-track': {
        backgroundColor: '#fff',
    },
}));


export const ERPCustomLoader = () => {
    return (
        <JumboContentLayoutMain>
            <Div sx={{ height: "80vh", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 999 }}>
                <CircularProgress />
            </Div>
        </JumboContentLayoutMain>
    )
}


export const errorFilter = (err, transactionSeriesType) => {
    let errors = {};

    if (err && typeof err === "object" && !Array.isArray(err)) {
        Object.keys(err).forEach((field) => {
            if (typeof err[field] === "string") {
                if (!err[field].trim()) {
                    errors[field] = `${field} is required.`; // Customize your error message
                }

            } else if (typeof err[field] === "object") {
                errors[field] = errorFilter(err[field], transactionSeriesType); // Recursively process nested errors
            }
        });
    }

    console.log("Validation Errors:", err, errors);
    return errors;
};


// export const useCustomAutoChange = (initialState = {}) => {
//     const [fields, setFields] = useState(initialState);

//     const handleCustomChange = useCallback((name = "", key = "") => (e, newValue) => {
//         const { name: eventName, value: eventValue } = e.target;
//         const updatedState = {
//             ...fields,
//             [name || eventName]: key ? newValue?.[key] ?? fields[name || eventName] : newValue ?? eventValue ?? ""
//         };

//         setFields(updatedState);
//     }, [fields]);

//     return {
//         getFields: fields,
//         handleCustomChange,
//     };
// }



export const NumericTextField = ({
    value = 0,
    onChange,
    name,
    id,
    placeholder,
    variant = "outlined",
    sx = { minWidth: "150px" },
    ...rest
}) => {

    return (
        <TextField
            type="number"
            className="col-md-12 input-box"
            name={name}
            id={id}
            value={value}
            onChange={onChange}
            variant={variant}
            placeholder={placeholder}
            inputProps={{
                inputMode: "decimal",
                pattern: "[0-9]*\.?[0-9]*",
                style: {
                    MozAppearance: "textfield",
                    WebkitAppearance: "none",
                    appearance: "none",
                    overflow: "hidden",
                },
                onWheel: (e) => e.preventDefault(),
                onKeyDown: (e) => {
                    // Prevent default action for arrow keys to avoid scrolling
                    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                        e.preventDefault();
                    }
                }
            }}
            autoComplete="off"
            sx={{
                ...sx,
                textAlign: "right",
                "& input[type=number]": {
                    MozAppearance: "textfield",
                    WebkitAppearance: "none",
                    appearance: "none",
                    overflow: "hidden",
                },
                "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button": {
                    WebkitAppearance: "none",
                    margin: 0,
                },
            }}
            {...rest}  // Spread the rest of the props
        />
    );
};



export const allowedFileTypes = [
    "application/pdf",        // PDF
    "text/plain",             // Text files
    "text/csv",               // CSV
    "application/vnd.ms-excel",               // Older Excel
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" // Newer Excel
];


export const ErpOverviewLoader = () => {
    return (
        <Div sx={{ position: "absolute", top: "50%", left: "50%", zIndex: 999 }}>
            <CircularProgress />
        </Div>
    )
}