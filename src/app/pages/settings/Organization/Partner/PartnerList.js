import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import Div from "@jumbo/shared/Div";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Menu,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { BASE_URL } from "app/services/auth-services";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CreatePartner from "./CreatePartner";
import EditPartnerList from "./EditPartnerList";
import "./partners.css";
//import { format } from "date-fns";
import { BsArrowDownUp, BsThreeDotsVertical } from "react-icons/bs";
import PartnerOverview from "./partnerOverview";
import { DataContext } from "app/pages/settings/Organization/OrganizationStructure";
import { ErpAlertViewDialogBox, ErpDeleteDialogBox } from "app/shared/ReuseComponents/ErpDialogBoxes";
import { ErpActionButton, ErpCreateButton } from "app/shared/ReuseComponents/ButtonComponent";

const PartnerList = ({ scrollHeight }) => {

  const {
    checkId6,
    setCheckId6,
    name4,
    name5,
    setName5,
    getId5,
    setGetId5,
    userRolePermissions,
  } = useContext(DataContext);

  const [PartnerListData, setPartnerListData] = useState([])
  const [openDelete, setOpenDelete] = useState(false);
  const [currentDeleteId, setCurrentDeleteId] = useState("");
  const [currentDeleteAccountId, setCurrentDeleteAccountId] = useState("");
  const [deleteName, setDeleteName] = useState("");


  const [editPartnerList, setEditPartnerList] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [setValue] = useState("My Material Transfer");
  const [createMaterial, setCreateMaterial] = useState(false);
  const [listMaterial, setListMaterial] = useState(true);
  const [ListOverview, setListOverview] = useState(false);
  const [overviewAlert, setOverviewAlert] = useState(false);

  const [id, setId] = useState("");

  const handleOverView = (id) => {
    if (Array.isArray(userRolePermissions) && userRolePermissions.includes(743)) {
      setListMaterial(false);
      setListOverview(true);
      setId(id)
    } else {
      setOverviewAlert(true);
      setListMaterial(true);
      setListOverview(false);
    }
  };

  const navigate = useNavigate();
  const token = localStorage.getItem("accesstoken");

  // gear box icon states


  const [anchorEl, setAnchorEl] = useState(null);
  const [Date1, setDate] = useState(true)
  const [BU_Id, setBU_Id] = useState(true);
  const [BU_Name, setBU_Name] = useState(true);
  const [Contact_No, setContact_No] = useState(false)
  const [Email_Id, setEmail_Id] = useState(true);
  const [Location, setLocation] = useState(true);
  const [Web, setWeb] = useState(false);
  const [fromTime, setFromTime] = useState(false);
  const [toTime, setToTime] = useState(false);
  const [commisionPaid, setCommisionPaid] = useState(false);


  const handleClickOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };


  const handleClosegear = () => {
    setAnchorEl(null);
  };

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  //Date format 
  let userDetails = localStorage.getItem("UserDetails");
  userDetails = JSON.parse(userDetails);
  let companyId = userDetails && userDetails.Organization_Id;
  let dateid = userDetails && userDetails.id;


  const [dateFormat, setDateFormat] = useState("");

  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  // get date format from organization get api
  useEffect(() => {
    if (companyId) {
      axios
        .get(`${BASE_URL}/Erpapp/CompanyCRUD/?id=${companyId}`, header)
        .then((res) => {
          console.log("D", res?.data);
          setDateFormat(res?.data?.DateFormat);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  // state for pagination
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [visitedPages, setVisitedPages] = useState(page - 1);
  const rowsPerPageOptions = [10];
  const totalRecords = count;
  const totalPages = Math.ceil(totalRecords / rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
    setVisitedPages(visitedPages);
  };

  // get data
  const getData = async () => {
    await axios.get(`${BASE_URL}/Erpapp/PartnerListDropdown/`, header)
      .then((response) => {
        console.log("Partner Response", response);
        const list = response?.data?.filter((opt) => opt?.BusinessUnit_City === name4);
        setPartnerListData(list)
        setCount(list?.length)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getData();
  }, [listMaterial]);

  console.log(PartnerListData);

  // delete & edit States

  const [setOpen] = React.useState(false);
  const [setSelectedValue] = React.useState();
  const [currentPart, setCurrentPart] = useState({
    id: "",
    Partner_Id: ""
  });


  const handleDeletePopup = async (item) => {
    const previousRecordResponse = await handleGetAllServiceRelatedDatas(item);
    if (previousRecordResponse?.length > 0) {
      toast.warning("You cannot delete this record because it is being used somewhere.")
    } else {
      setOpenDelete(true);
      setCurrentDeleteId(item?.id);
      setCurrentDeleteAccountId(item?.Partner_Id);
      setDeleteName(item?.Partner_Name)
    }
  };

  // delete
  const handleDelete = async () => {
    const data = await axios
      .delete(`${BASE_URL}/Erpapp/PartnerCRUD/?Partner_Id=${currentDeleteAccountId}`, header)
      .then((res) => {
        console.log(res?.data);
        toast.success(`${currentDeleteAccountId} Partner is deleted successfully`);
        setOpenDelete(false);
        getData();
      })
      .catch((error) => {
        console.log("ds", error);
      });
    return data;
  };
  // edit
  const handleClickEdit = (item) => {
    setEditPartnerList(true);
    setListMaterial(false);
    setCurrentPart({
      id: item?.id,
      Partner_Id: item?.Partner_Id,
    });
  }

  //Search
  const searchItems = (e) => {
    console.log(e.target.value);
    e.target.value !== "" ? handleSearch(e.target.value) : getData();
  }

  const handleSearch = (search) => {
    axios.get(`${BASE_URL}/Erpapp/Partnersearch/?Search=${search}`, header)
      .then((response) => {
        setPartnerListData(response?.data)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const CreateForm = () => {
    setCreateMaterial(true);
    setListMaterial(false);
  };


  //code for table sorting
  const sortData = (key, direction) => {
    const sortedData = [...PartnerListData];

    sortedData.sort((a, b) => {
      if (key === "Created_By") {
        const valueA =
          typeof a[key].Business_Unit === "string"
            ? a[key].Business_Unit.toLowerCase()
            : a[key].Business_Unit;
        const valueB =
          typeof b[key].Business_Unit === "string"
            ? b[key].Business_Unit.toLowerCase()
            : b[key].Business_Unit;
        if (valueA < valueB) {
          return direction === "ascending" ? -1 : 1;
        }
        if (valueA > valueB) {
          return direction === "ascending" ? 1 : -1;
        }
      }
      else {
        const valueA =
          typeof a[key] === "string" ? a[key].toLowerCase() : a[key];
        const valueB =
          typeof b[key] === "string" ? b[key].toLowerCase() : b[key];
        if (valueA < valueB) {
          return direction === "ascending" ? -1 : 1;
        }
        if (valueA > valueB) {
          return direction === "ascending" ? 1 : -1;
        }
      }
      return 0;
    });
    setPartnerListData(sortedData);
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
    sortData(key, direction);
  };

  const handleGetAllServiceRelatedDatas = async (data) => {
    try {
      const response = await axios.get(`${BASE_URL}/Erpapp/Partnerslotlist/?Partner_Id=${data?.id}`, header);
      const partnerResponse = await axios.get(`${BASE_URL}/Erpapp/HREmployeelistwithoutpagination/`, header);
      const filterData = response?.data;
      const partnerFilterData = partnerResponse?.data?.filter((opt) => opt?.Partner_Id?.id === data?.id)

      return filterData?.length > 0 ? filterData : partnerFilterData;
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>
      <Div className="card"
        sx={{ p: 2, borderRadius: 0, m: 0 }}
      >
        <Div sx={{ display: listMaterial === true ? "block" : "none" }}>
          <Div
            sx={{
              position: "absolute",
              right: 15,
              // width: "100%",
              display: "flex",
              justifyContent: "flex-end"
            }}
          >
            {Array.isArray(userRolePermissions) && userRolePermissions.includes(741) && (
              <ErpCreateButton handleClick={CreateForm} name={"Create BU"} />
            )}
          </Div>
          <br />

          <Div sx={{ mt: { lg: 3, md: 5, xs: 5 }, minHeight: "300px" }}>
            <JumboScrollbar
              autoHeight={true}
              autoHideTimeout={4000}
              autoHeightMin={scrollHeight ? scrollHeight : 300}
              autoHide={true}
              hideTracksWhenNotNeeded
              id="no-more-tables"
            >
              <Table stickyHeader className="table table-borderless">
                <TableHead className="table-head">
                  <TableRow>
                    <TableCell sx={{ height: "53px !important" }}>

                    </TableCell>
                    {Date1 && (
                      <TableCell onClick={() => handleSort("Created_Date")} sx={{ height: "53px !important" }}>
                        Date
                        {sortConfig.key === "Created_Date" &&
                          (sortConfig.direction === "ascending" ? (
                            <IconButton size="small">
                              <BsArrowDownUp />
                            </IconButton>
                          ) : (
                            <IconButton size="small">
                              <BsArrowDownUp />
                            </IconButton>
                          ))}
                      </TableCell>)}
                    {BU_Id && (
                      <TableCell onClick={() => handleSort("Partner_Id")} sx={{ height: "53px !important" }}>
                        BU Id
                        {sortConfig.key === "Partner_Id" &&
                          (sortConfig.direction === "ascending" ? (
                            <IconButton size="small">
                              <BsArrowDownUp />
                            </IconButton>
                          ) : (
                            <IconButton size="small">
                              <BsArrowDownUp />
                            </IconButton>
                          ))}
                      </TableCell>)}
                    {BU_Name && (
                      <TableCell onClick={() => handleSort("Partner_Name")}>
                        BU Name
                        {sortConfig.key === "Partner_Name" &&
                          (sortConfig.direction === "ascending" ? (
                            <IconButton size="small">
                              <BsArrowDownUp />
                            </IconButton>
                          ) : (
                            <IconButton size="small">
                              <BsArrowDownUp />
                            </IconButton>
                          ))}
                      </TableCell>)}
                    {Contact_No && (
                      <TableCell onClick={() => handleSort("BusinessUnit_Phone")}
                        xl={2}
                      >
                        Contact No
                        {sortConfig.key === "BusinessUnit_Phone" &&
                          (sortConfig.direction === "ascending" ? (
                            <IconButton size="small">
                              <BsArrowDownUp />
                            </IconButton>
                          ) : (
                            <IconButton size="small">
                              <BsArrowDownUp />
                            </IconButton>
                          ))}
                      </TableCell>)}
                    {Email_Id && (
                      <TableCell onClick={() => handleSort("BusinessUnit_EMail")}
                        xl={4}
                      >
                        Email Id
                        {sortConfig.key === "BusinessUnit_EMail" &&
                          (sortConfig.direction === "ascending" ? (
                            <IconButton size="small">
                              <BsArrowDownUp />
                            </IconButton>
                          ) : (
                            <IconButton size="small">
                              <BsArrowDownUp />
                            </IconButton>
                          ))}
                      </TableCell>)}
                    {fromTime && (
                      <TableCell onClick={() => handleSort("Ofc_Starttime")} xl={4}>
                        Office Start Time
                        {sortConfig.key === "Ofc_Starttime" &&
                          (sortConfig.direction === "ascending" ? (
                            <IconButton size="small">
                              <BsArrowDownUp />
                            </IconButton>
                          ) : (
                            <IconButton size="small">
                              <BsArrowDownUp />
                            </IconButton>
                          ))}
                      </TableCell>)}
                    {toTime && (
                      <TableCell onClick={() => handleSort("Ofc_Endtime")} xl={4}>
                        Office End Time
                        {sortConfig.key === "Ofc_Endtime" &&
                          (sortConfig.direction === "ascending" ? (
                            <IconButton size="small">
                              <BsArrowDownUp />
                            </IconButton>
                          ) : (
                            <IconButton size="small">
                              <BsArrowDownUp />
                            </IconButton>
                          ))}
                      </TableCell>)}
                    {commisionPaid && (
                      <TableCell onClick={() => handleSort("Commision_Paid")} xl={4}>
                        Commision Paid
                        {sortConfig.key === "Commision_Paid" &&
                          (sortConfig.direction === "ascending" ? (
                            <IconButton size="small">
                              <BsArrowDownUp />
                            </IconButton>
                          ) : (
                            <IconButton size="small">
                              <BsArrowDownUp />
                            </IconButton>
                          ))}
                      </TableCell>)}
                    {Location && (
                      <TableCell onClick={() => handleSort("BusinessUnit_City")}
                      >
                        Location
                        {sortConfig.key === "BusinessUnit_City" &&
                          (sortConfig.direction === "ascending" ? (
                            <IconButton size="small">
                              <BsArrowDownUp />
                            </IconButton>
                          ) : (
                            <IconButton size="small">
                              <BsArrowDownUp />
                            </IconButton>
                          ))}
                      </TableCell>)}
                    {Web && (
                      <TableCell onClick={() => handleSort("BusinessUnit_Web")}
                      >
                        Web
                        {sortConfig.key === "BusinessUnit_Web" &&
                          (sortConfig.direction === "ascending" ? (
                            <IconButton size="small">
                              <BsArrowDownUp />
                            </IconButton>
                          ) : (
                            <IconButton size="small">
                              <BsArrowDownUp />
                            </IconButton>
                          ))}
                      </TableCell>)}
                    <TableCell
                    >
                      <Div
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          lineHeight: 2.5,
                        }}
                      >
                        Action
                        <span
                          onClick={handleClickOpen}
                          style={{ cursor: "pointer" }}
                        >
                          <IconButton>
                            <BsThreeDotsVertical size={18} color="black" />
                          </IconButton>
                        </span>
                      </Div>
                    </TableCell>


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
                      onClose={handleClosegear}
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


                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={Date1}
                              onChange={(e) => setDate(e.target.checked)}
                            />
                          }
                          label="Date"
                        />
                        {/* <FormControlLabel
                        control={
                          <Checkbox
                            checked={BU}
                            onChange={(e) => setBU(e.target.checked)}
                          />
                        }
                        label="Bussiness unit"
                      /> */}
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={BU_Id}
                              onChange={(e) => setBU_Id(e.target.checked)}
                            />
                          }
                          label="BU Id"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={BU_Name}
                              onChange={(e) => setBU_Name(e.target.checked)}
                            />
                          }
                          label="BU Name"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={Contact_No}
                              onChange={(e) => setContact_No(e.target.checked)}
                            />
                          }
                          label="Contact No"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={Email_Id}
                              onChange={(e) => setEmail_Id(e.target.checked)}
                            />
                          }
                          label="Email Id"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={fromTime}
                              onChange={(e) => setFromTime(e.target.checked)}
                            />
                          }
                          label="Office From Time"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={toTime}
                              onChange={(e) => setToTime(e.target.checked)}
                            />
                          }
                          label="Office End Time"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={commisionPaid}
                              onChange={(e) => setCommisionPaid(e.target.checked)}
                            />
                          }
                          label="Commision Paid"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={Location}
                              onChange={(e) => setLocation(e.target.checked)}
                            />
                          }
                          label="Location"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={Web}
                              onChange={(e) => setWeb(e.target.checked)}
                            />
                          }
                          label="Web"
                        />
                      </FormGroup>
                    </Menu>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {PartnerListData?.length > 0 ? PartnerListData?.map((item, index) => {
                    let formattedDate = ""
                    // if (dateFormat !== undefined && dateFormat !== null && dateFormat !== "") {
                    //   const date = new Date(item?.Created_Date);
                    //   formattedDate = dateFormat && item?.Created_Date && format(date, dateFormat);
                    // }
                    return (
                      <TableRow hover key={index}>
                        <TableCell data-title="Status" sx={{ textAlign: "center" }}>
                          <FormControlLabel
                            control={<Radio
                              color="primary"
                              size="small"
                              value={item?.Partner_Id}
                              checked={checkId6 === item?.Partner_Id}
                              onChange={(e) => {
                                setCheckId6(e.target.value);
                                setGetId5(item?.id);
                                setName5(item?.Partner_Name);
                              }} />}
                          />
                        </TableCell>
                        {/* {
                          Date1 && (
                            <TableCell data-title="Date">
                              {formattedDate || item?.Created_Date}
                            </TableCell>)
                        } */}
                        {
                          BU_Id && (
                            <TableCell
                              sx={{ color: "#00BFFF", cursor: "pointer" }}
                              onClick={() => { handleOverView(item?.Partner_Id) }} data-title="BU Id">
                              {item?.Partner_Id}
                            </TableCell>)
                        }
                        {
                          BU_Name && (
                            <TableCell data-title="BU Name">
                              {item?.Partner_Name}
                            </TableCell>)
                        }
                        {
                          Contact_No && (
                            <TableCell data-title="Contact No">
                              {item?.BusinessUnit_Phone}
                            </TableCell>)
                        }
                        {
                          Email_Id && (
                            <TableCell data-title="Email Id">
                              {item?.BusinessUnit_EMail}
                            </TableCell>)
                        }
                        {
                          fromTime && (
                            <TableCell data-title="Office Start Time">
                              {item?.Ofc_Starttime}
                            </TableCell>)
                        }
                        {
                          toTime && (
                            <TableCell data-title="Office End Time">
                              {item?.Ofc_Endtime}
                            </TableCell>)
                        }
                        {
                          commisionPaid && (
                            <TableCell data-title="Commision Paid">
                              {item?.Commision_Paid}
                            </TableCell>)
                        }
                        {
                          Location && (
                            <TableCell data-title="Location">
                              {item?.BusinessUnit_City}
                            </TableCell>)
                        }
                        {
                          Web && (
                            <TableCell data-title="Web">
                              {item?.BusinessUnit_Web}
                            </TableCell>)
                        }

                        <TableCell data-title="Action">
                          <ErpActionButton userRolePermissions={userRolePermissions} editPermissionId={742} deletePermissionId={744} onClickEdit={() => handleClickEdit(item)} onClickDelete={() => handleDeletePopup(item)} align="left" />
                        </TableCell>
                      </TableRow>
                    )
                  }) : (
                    <TableRow>
                      <TableCell colSpan={10} sx={{ textAlign: "center" }}>No Records</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </JumboScrollbar>
          </Div>

        </Div>

        {/* for delate popup */}
        <ErpDeleteDialogBox flag={openDelete} setFlag={setOpenDelete} handleClick={handleDelete} content={"Are you sure you want to delete the BU"} id={deleteName} />


        <Div sx={{ display: createMaterial === true ? "block" : "none" }}>
          <CreatePartner
            setCreateMaterial={setCreateMaterial}
            setListMaterial={setListMaterial}
          />
        </Div>

        <Div sx={{ display: editPartnerList === true ? "block" : "none" }}>
          <EditPartnerList
            setEditPartnerList={setEditPartnerList}
            setListMaterial={setListMaterial}
            setCurrentPart={setCurrentPart}
            currentPart={currentPart}
            getData1={getData}
          />
        </Div>

        {ListOverview && Array.isArray(userRolePermissions) && userRolePermissions.includes(743) ? (
          <PartnerOverview
            setListOverview={setListOverview}
            setListMaterial={setListMaterial}
            buid={id}
          />
        ) : (
          <>
            <ErpAlertViewDialogBox flag={overviewAlert} setFlag={setOverviewAlert} />
          </>
        )}
      </Div>
    </>
  );
};

export default PartnerList;