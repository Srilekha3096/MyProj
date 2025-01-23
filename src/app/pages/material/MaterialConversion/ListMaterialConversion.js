import JumboContentLayoutMain from "@jumbo/components/JumboContentLayout/JumboContentLayoutMain";
import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import Div from "@jumbo/shared/Div";
import {
    Grid,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableRow,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { BiFilterAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "app/services/auth-services";
import useResponsive from "app/pages/useResponsive";
import ScrollToTop from "app/pages/ScrollToTop";
import CommonPagination from "app/shared/ReuseComponents/CommonPagination";
import { useQuery } from "react-query";
import { DateFormatter } from "app/shared/ReuseComponents/DateFormatter";
import { ErpActionButton, ErpCreateButton, ErpDateField, ErpFilterBox, ErpSearchBox } from "app/shared/ReuseComponents/ButtonComponent";
import { ErpAlertViewDialogBox, ErpDeleteDialogBox } from "app/shared/ReuseComponents/ErpDialogBoxes";
import CustomTableHead from "app/shared/ReuseComponents/CustomTableHead";
import CreateMaterialConversion from "./CreateMaterialConversion";
import ViewMaterialConversionRequest from "./ViewMaterialConversionRequest";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserRolePermissions, selectedUserRolePermissions } from "app/redux/actions/fetchUserRolePermissions";


const ListMaterialConversion = ({ scrollHeight }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("accesstoken");

    const header = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    };

    let isTablet = useResponsive("only", "lg");

    let userDetails = localStorage.getItem("UserDetails");
    userDetails = JSON.parse(userDetails);
    let companyId = userDetails && userDetails.Organization_Id;
    let id = userDetails && userDetails.id;
    let partnerId = parseInt(localStorage.getItem("PartnerId"));
    let userEmail = userDetails && userDetails.User_emailId;

    const dispatch = useDispatch();
    const { userRolePermissions, formPermissions, modulePermissions } = useSelector(selectedUserRolePermissions);


    const [designationName, setDesignationName] = useState("");
    const [cadreName, setCadreName] = useState("");
    const [createdDate, setCreatedDate] = useState("");
    const [lastDate, setLastDate] = useState("");
    const [dateFormat, setDateFormat] = useState("");

    const [searchData, setSearchData] = useState("");
    const [status, setStatus] = useState(true);



    const [showFilter, setShowFilter] = useState(false);
    const [listDesignation, setListDesignation] = useState(true);
    const [createDesignation, setCreateDesignation] = useState(false);
    const [viewDesignation, setViewDesignation] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [overviewAlert, setOverviewAlert] = useState(false);


    const [designationsList, setDesignationsList] = useState([]);
    const [currentDeleteId, setCurrentDeleteId] = useState("");
    const [currentDesignations, setCurrentDesignations] = useState({});


    // Sorting
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: "ascending",
    });

    // gear box state
    const [anchorEl, setAnchorEl] = useState(null);
    const [checkDate, setCheckDate] = useState(true);
    const [checkDesignationNo, setCheckDesignationNo] = useState(true);
    const [checkDesignationName, setCheckDesignationName] = useState(true);
    const [checkBusinessUnit, setCheckBusinessUnit] = useState(false);
    const [checkCadreLevel, setCheckCadreLevel] = useState(true);
    const [checkDescription, setCheckDescription] = useState(true);


    const handleClickOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [visitedPages, setVisitedPages] = useState(page - 1);
    const rowsPerPageOptions = [10];
    const totalRecords = count;
    const totalPages = Math.ceil(totalRecords / rowsPerPage);

    const handleChangePage = async (event, newPage) => {
        setPage(newPage);
        try {
            //  search
            if (Boolean(searchData) && Boolean(searchData?.length > 0)) {
                await axios
                    .get(`${BASE_URL}/Erpapp/Designationsearch/?search=${searchData}&page=${newPage}`, header)
                    .then((res) => {
                        console.log(res.data);
                        setDesignationsList(res?.data?.results);
                        setCount(res?.data?.count);
                    })
                    .catch((error) => {
                        console.log("ds", error);
                    });
            }
            //  filter
            else if (Boolean(createdDate && lastDate) || (Boolean(cadreName))) {
                var payload = {
                    Cadre_Name: cadreName,
                    Designation_Name: designationName,
                    Created_Date: [createdDate, lastDate],
                    Updated_Date: [createdDate, lastDate],
                    page: newPage,
                }
                axios.post(`${BASE_URL}/Erpapp/Designationfilter/`, payload, header).then((res) => {
                    console.log(res);
                    if (res?.status === 200) {
                        setDesignationsList(res?.data?.results);
                        setCount(res?.data?.count);
                        setShowFilter(false);
                    }
                }).catch((error) => {
                    console.log(error);
                })
            } else {
                try {
                    const res = await axios.get(`${BASE_URL}/Erpapp/MaterialconvertionRequestlistwithpagination/?page=${newPage}`, header);

                    if (res?.data?.results) {
                        setDesignationsList(res?.data?.results);
                        setCount(res?.data?.count);
                    } else {
                        throw new Error('No results found in the response');
                    }
                } catch (error) {
                    console.error("Error fetching list:", error);
                    throw error;
                }
            }
        }
        catch (error) {
            console.log(error);
        }

    };


    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1);
        setVisitedPages(visitedPages);
    };


    // get date format from organization get api
    useEffect(() => {
        axios
            .get(`${BASE_URL}/Erpapp/CompanyCRUD/?id=${companyId}`, header)
            .then((res) => {
                console.log("D", res.data);
                setDateFormat(res?.data?.DateFormat);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const headers = [
        { label: "Date", boolean: checkDate, sortKey: "Created_Date" },
        { label: "MC Request No", boolean: checkDesignationNo, sortKey: "Matcon_Req_Id" },
        { label: "Requested By", boolean: checkDesignationName, sortKey: "Requester_Id" },
        { label: "Store Name", boolean: checkBusinessUnit, sortKey: "Store_Id" },
        { label: "Conversion Ratio", boolean: checkCadreLevel, sortKey: "Convertion_Ratio" },
        { label: "Purpose", boolean: checkDescription, sortKey: "Purpose" },
        { label: "Status", boolean: checkDescription, sortKey: "Approve_Flag" },
    ];

    let GrearBox = [
        { state: checkDate, setState: setCheckDate, label: "Date" },
        { state: checkDesignationNo, setState: setCheckDesignationNo, label: "MC Request No" },
        { state: checkDesignationName, setState: setCheckDesignationName, label: "Requested By" },
        { state: checkBusinessUnit, setState: setCheckBusinessUnit, label: "Store Name" },
        { state: checkCadreLevel, setState: setCheckCadreLevel, label: "Conversion Ratio" },
        { state: checkDescription, setState: setCheckDescription, label: "Purpose" },
        { state: checkDescription, setState: setCheckDescription, label: "Status" },
    ]



    // designation lists
    const listOfDesignations = async () => {
        setStatus(!status);

        try {
            const res = await axios.get(`${BASE_URL}/Erpapp/MaterialconvertionRequestlistwithpagination/?page=${page}`, header);
            console.log("getDesignationLists", res?.data)
            if (res?.data) {
                return {
                    data: res?.data?.results,
                    count: res?.data?.count,
                };
            } else {
                throw new Error('No results found in the response');
            }
        } catch (error) {
            console.error("Error fetching list:", error);
            throw error;
        }
    };




    const CreateDesignation = () => {
        // navigate("/purchase/purchase-order-amienment");
        setCreateDesignation(true);
        setListDesignation(false);
        setCurrentDesignations({});
    };

    const handleEditPopup = (data) => {
        setCreateDesignation(true);
        setListDesignation(false);
        setCurrentDesignations(data);
    };

    const handleOpenOverview = (data) => {
        if (Array.isArray(userRolePermissions) && userRolePermissions.includes(576)) {
            setListDesignation(false);
            setViewDesignation(true);
            setCurrentDesignations(data);
        } else {
            setOverviewAlert(true);
            setListDesignation(true);
            setViewDesignation(false);
        }
    }


    const handleDeletePopup = (data) => {
        setOpenDelete(true);
        setCurrentDesignations(data);
        setCurrentDeleteId(data?.Matcon_Req_Id);
    };

    const deleteDesignation = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.delete(`${BASE_URL}/Erpapp/MaterialconvertionRequestCRUD/?Matcon_Req_Id=${currentDeleteId}`, header);
            if (response) {
                setOpenDelete(false);
                toast.success(`${currentDeleteId} is Deleted Successfully`);
                DesignationListsRefetch();
            }
        } catch (error) {
            console.log(error)
        }
    };


    const ShowFilter = () => {
        setShowFilter(!showFilter);
    };

    const handleFilterDesignations = (e) => {
        e.preventDefault();
        var payload = {
            Cadre_Name: cadreName,
            Designation_Name: designationName,
            Created_Date: [createdDate, lastDate],
            Updated_Date: [createdDate, lastDate],
            page: page,
        }
        axios.post(`${BASE_URL}/Erpapp/Designationfilter/`, payload, header).then((res) => {
            console.log(res);
            if (res?.status === 200) {
                setDesignationsList(res?.data?.results);
                setCount(res?.data?.count);
                setShowFilter(false);
            } else {
                toast.error("Please Select From and To Date.")
            }
        }).catch((error) => {
            console.log(error);
            if (error.response && error.response.data) {
                const errorData = error.response.data;
                Object.keys(errorData).forEach((key) => {
                    const errorMessage = errorData[key];
                    toast.error(`${key}: ${errorMessage}`);
                });
            } else {
                toast.error('An unexpected error occurred. Please try again later.');
            }
        })
    }

    const RefreshData = () => {
        setDesignationName("");
        setCadreName("");
        setCreatedDate("");
        setLastDate("");
        DesignationListsRefetch();
    };


    const handleSearch = (data) => {
        axios
            .get(`${BASE_URL}/Erpapp/Designationsearch/?search=${data}`, header)
            .then((res) => {
                console.log(res.data);
                setDesignationsList(res?.data?.results);
                setCount(res?.data?.count);
            })
            .catch((error) => {
                console.log("ds", error);
            });
    };

    const handleSearchDesignations = (e) => {
        var data = e.target.value;
        setSearchData(data);
        data !== "" ? handleSearch(data) : DesignationListsRefetch();
    };


    // table sorting
    const sortData = (key, direction) => {
        const sortedData = [...designationsList];

        sortedData.sort((a, b) => {
            const valueA = typeof a[key] === "string" ? a[key].toLowerCase() : a[key];
            const valueB = typeof b[key] === "string" ? b[key].toLowerCase() : b[key];
            if (valueA < valueB) {
                return direction === "ascending" ? -1 : 1;
            }
            if (valueA > valueB) {
                return direction === "ascending" ? 1 : -1;
            }
            return 0;
        });

        setDesignationsList(sortedData);
    };


    const handleSort = (key) => {
        let direction = "ascending";
        if (sortConfig.key === key && sortConfig.direction === "ascending") {
            direction = "descending";
        }

        setSortConfig({ key, direction });
        sortData(key, direction);
    };


    const handleClickOutside = (event) => {
        setShowFilter(false);
    };



    // get Lists All Data
    const { data: getDesignationLists, isLoading: DesignationListsLoading, isError: DesignationListsError, refetch: DesignationListsRefetch } = useQuery(
        ['DesignationLists', page],
        () => listOfDesignations(),
        { staleTime: Infinity }
    );

    useEffect(() => {
        if (getDesignationLists) {
            setDesignationsList(getDesignationLists?.data);
            setCount(getDesignationLists?.count);
        } else if (DesignationListsError) {
            console.error('Failed to fetch cadre list');
        }
    }, [getDesignationLists, DesignationListsError]);


    useEffect(() => {
        dispatch(fetchUserRolePermissions(token))
    }, []);


    return (
        <>
            <JumboContentLayoutMain>
                <Typography variant="h2" sx={{ fontWeight: 600, mt: -2 }}>
                    Material Conversion Request
                </Typography>
                <Div sx={{ display: listDesignation === true ? "block" : "none" }}>
                    <Typography variant="h3" sx={{ fontWeight: 600 }}>
                        Material Conversion Request List - Count : {count || 0}
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 500 }}>
                        Lists all Material Conversion Request view and action
                    </Typography>

                    <Grid container spacing={1} sx={{ mt: 2, mb: 1, display: "flex", flexDirection: "row", alignItems: "center" }}>

                        <Grid
                            item
                            className="filter"
                            xs={12}
                            md={12}
                            lg={5}
                            xl={5}
                        >
                            <IconButton sx={{ color: "#00BFFF", mr: 2 }} onClick={ShowFilter}>
                                <BiFilterAlt />
                            </IconButton>

                            {/* code for filter dropdown */}
                            <ErpFilterBox handleClickOutside={handleClickOutside} showFilter={showFilter} handleFilter={handleFilterDesignations} RefreshData={RefreshData}>
                                <>
                                    <Div className="row">
                                        <Div className="col-sm-12">
                                            <Typography variant="h5" className="input-label" sx={{ m: 0 }}>
                                                Store Name
                                            </Typography>
                                            <TextField
                                                type="text"
                                                className="col-12 input-box"
                                                value={designationName}
                                                onChange={(e) => setDesignationName(e.target.value)}
                                                autoComplete="off"
                                                placeholder="Store Name"
                                                sx={{ mt: -0.5 }}
                                            ></TextField>
                                        </Div>
                                    </Div>
                                    <Div className="row">
                                        <Div className="col-sm-12">
                                            <Typography variant="h5" className="input-label" sx={{ m: 0 }}>
                                                Request No
                                            </Typography>
                                            <TextField
                                                type="text"
                                                className="col-12 input-box"
                                                value={cadreName}
                                                onChange={(e) => setCadreName(e.target.value)}
                                                autoComplete="off"
                                                placeholder="Request No"
                                                sx={{ mt: -0.5 }}
                                            ></TextField>
                                        </Div>
                                    </Div>

                                    <Div className="col-sm-12" sx={{ mt: 0 }}>
                                        <Div className="row">
                                            <Div className="col-sm-6">
                                                <Typography variant="h5" className="input-label" sx={{ m: 0 }}>
                                                    From Date
                                                </Typography>
                                                <ErpDateField
                                                    id="createdDate"
                                                    name="createdDate"
                                                    inputValue={createdDate}
                                                    handleInputChange={(e) => setCreatedDate(e.target.value)}
                                                    variant="outlined"
                                                />
                                            </Div>
                                            <Div className="col-sm-6">
                                                <Typography variant="h5" className="input-label" sx={{ m: 0 }}>
                                                    To Date
                                                </Typography>
                                                <ErpDateField
                                                    id="lastDate"
                                                    name="lastDate"
                                                    inputValue={lastDate}
                                                    handleInputChange={(e) => setLastDate(e.target.value)}
                                                    variant="outlined"
                                                    InputProps={{
                                                        inputProps: {
                                                            min: createdDate,
                                                        },
                                                    }}
                                                />
                                            </Div>
                                        </Div>
                                    </Div>
                                </>
                            </ErpFilterBox>

                        </Grid>

                        <Grid item xs={12} md={6} lg={3} xl={4}>
                            <ErpSearchBox handleChange={handleSearchDesignations} searchData={searchData} />
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            md={6}
                            lg={4}
                            xl={3}
                            sx={{ display: "flex", justifyContent: "flex-end" }}
                        >
                            {Array.isArray(userRolePermissions) && userRolePermissions.includes(157) && (
                                <ErpCreateButton handleClick={CreateDesignation} name={isTablet ? "Create" : "Create MC Request"} />
                            )}
                        </Grid>

                    </Grid>

                    {/* code for designation list table */}
                    <React.Fragment>
                        <JumboScrollbar
                            autoHeight={true}
                            autoHideTimeout={4000}
                            autoHeightMin={scrollHeight ? scrollHeight : 350}
                            autoHide={true}
                            hideTracksWhenNotNeeded
                            id="no-more-tables"
                        >
                            <Table className="table">
                                <CustomTableHead
                                    headers={headers}
                                    handleClickOpen={handleClickOpen}
                                    anchorEl={anchorEl}
                                    handleClose={handleClose}
                                    sortConfig={sortConfig}
                                    handleSort={handleSort}
                                    GrearBox={GrearBox}
                                />

                                <TableBody>
                                    {designationsList?.length > 0 ? (
                                        designationsList?.map((data, index) => {
                                            return (
                                                <TableRow key={index} hover>
                                                    <TableCell data-title="Date">
                                                        {/* {dateFormat && data.Request_Date && format(new Date(data.Request_Date), dateFormat)} */}
                                                        {data?.Request_Date && <DateFormatter date={data?.Request_Date} />}
                                                    </TableCell>
                                                    {checkDesignationNo && (
                                                        <TableCell data-title="MC Request No" onClick={() => handleOpenOverview(data)} sx={{ color: "#00bfff !important", cursor: "pointer" }}>
                                                            {data?.Matcon_Req_Id}
                                                        </TableCell>
                                                    )}
                                                    {checkDesignationName && (
                                                        <TableCell data-title="Requested By">
                                                            {data?.Requester_Id?.Employee_FirstName}{" "}{data?.Requester_Id?.Employee_LasttName}
                                                        </TableCell>
                                                    )}
                                                    {/* {checkBusinessUnit && (
                                                        <TableCell data-title="Business Unit">
                                                            {data?.Partner_Id?.Partner_Name ? data.Partner_Id?.Partner_Name : " "}
                                                        </TableCell>
                                                    )} */}
                                                    {checkBusinessUnit && (
                                                        <TableCell data-title="Store Name">
                                                            {data?.Store_Id?.Store_Name ? data?.Store_Id?.Store_Name : " "}
                                                        </TableCell>
                                                    )}
                                                    {checkCadreLevel && (
                                                        <TableCell data-title="Conversion Ratio">
                                                            {data?.Convertion_Ratio}
                                                        </TableCell>
                                                    )}
                                                    {checkDescription && (
                                                        <TableCell data-title="Purpose">
                                                            <Tooltip
                                                                title={data?.Purpose}
                                                                placement="right-end"
                                                            >
                                                                <span>{data?.Purpose && (data?.Purpose?.length <= 50 ? data?.Purpose : data?.Purpose.slice(0, 50)) +
                                                                    (data?.Purpose?.length > 50 ? "..." : "")}</span>
                                                            </Tooltip>
                                                        </TableCell>
                                                    )}
                                                    {checkDescription && (
                                                        <TableCell data-title="Status">
                                                            {data?.Approve_Flag === true &&
                                                                data?.Status === true ? (
                                                                <Div
                                                                    className="approve-button"
                                                                    variant="contained"
                                                                    sx={{
                                                                        width: "110px",
                                                                        cursor: "default",
                                                                    }}
                                                                >
                                                                    Approved
                                                                </Div>
                                                            ) : data?.Approve_Flag === true &&
                                                                data?.Status === true ? (
                                                                <Div
                                                                    variant="contained"
                                                                    sx={{
                                                                        width: "110px",
                                                                        cursor: "default",
                                                                        color: "#00bfff",
                                                                    }}
                                                                >
                                                                    Partially Issued
                                                                </Div>
                                                            ) : data?.Approve_Flag === false &&
                                                                data?.Status === false ? (
                                                                <Div
                                                                    className="pending-button"
                                                                    variant="contained"
                                                                    sx={{
                                                                        width: "110px",
                                                                        cursor: "default",
                                                                        color: "#F39711",
                                                                    }}
                                                                >
                                                                    Pending
                                                                </Div>
                                                            ) : data?.Approve_Flag === true &&
                                                                data?.Status === true ? (
                                                                <Div
                                                                    variant="contained"
                                                                    sx={{
                                                                        width: "110px",
                                                                        cursor: "default",
                                                                        color: "#00bfff",
                                                                    }}
                                                                >
                                                                    Closed
                                                                </Div>
                                                            ) : data?.Approve_Flag === false &&
                                                            data?.Status === true && (
                                                                <Div
                                                                    className="rejected-button"
                                                                    variant="contained"
                                                                    sx={{
                                                                        width: "110px",
                                                                        cursor: "default",
                                                                        color: "red",
                                                                    }}
                                                                >
                                                                    Rejected
                                                                </Div>
                                                            )}
                                                        </TableCell>
                                                    )}
                                                    <TableCell data-title="Action">
                                                        {data?.Created_By?.id === id ? (
                                                            <ErpActionButton userRolePermissions={userRolePermissions} editPermissionId={158} deletePermissionId={159} onClickEdit={() => handleEditPopup(data)} onClickDelete={() => handleDeletePopup(data)} align="left" />
                                                        ) : (
                                                            <Div sx={{ textAlign: "center" }}>-</Div>
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={8} align="center">
                                                No Records
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </JumboScrollbar>

                        {/* pagination */}
                        <Div sx={{ display: "flex", flexWrap: "wrap" }}>
                            <CommonPagination
                                totalPages={totalPages}
                                page={page}
                                handleChangePage={handleChangePage}
                                rowsPerPageOptions={rowsPerPageOptions}
                                rowsPerPage={rowsPerPage}
                                handleChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                        </Div>

                    </React.Fragment>

                    {/* Delete designation popup */}
                    <ErpDeleteDialogBox flag={openDelete} setFlag={setOpenDelete} handleClick={deleteDesignation} content={"Are you sure you want to delete the material conversion"} id={currentDeleteId} />

                </Div>

                <Div sx={{ display: createDesignation === true ? "block" : "none" }}>
                    <CreateMaterialConversion
                        setCreateDesignation={setCreateDesignation}
                        setListDesignation={setListDesignation}
                        listOfDesignations={DesignationListsRefetch}
                        responsedata={currentDesignations}
                    />
                </Div>

                {viewDesignation && Array.isArray(userRolePermissions) && userRolePermissions.includes(576) ? (
                    <ViewMaterialConversionRequest
                        setViewDesignation={setViewDesignation}
                        setListDesignation={setListDesignation}
                        currentDesignations={currentDesignations}
                        dateFormat={dateFormat}
                    />
                ) : (
                    <>
                        <ErpAlertViewDialogBox flag={overviewAlert} setFlag={setOverviewAlert} />
                    </>
                )}

                <Div sx={{ display: !openDelete ? "flex" : "none" }}>
                    <ScrollToTop Scrollheight={180} />
                </Div>

            </JumboContentLayoutMain>
        </>
    );
};


export default ListMaterialConversion
