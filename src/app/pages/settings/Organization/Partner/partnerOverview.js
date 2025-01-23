import Div from "@jumbo/shared/Div";
import {
  Button,
  Typography,
  Box,
  ButtonGroup,
  Tab,
  useTheme,
  useMediaQuery,
  Grid,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  TabContext,
  TabList,
  TabPanel
} from "@mui/lab";
import { BASE_URL } from "app/services/auth-services";
import axios from "axios";
import { MdClose } from "react-icons/md";
import { format } from "date-fns";
import HistoryOverview from "app/shared/ReuseComponents/HistoryOverview";


const PartnerOverview = ({
  setListOverview,
  setListMaterial,
  buid,
  scrollHeight
}) => {
  const token = localStorage.getItem("accesstoken");

  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  //Date format 
  let userDetails = localStorage.getItem("UserDetails");
  userDetails = JSON.parse(userDetails);
  let companyId = userDetails && userDetails.Organization_Id;
  let id1 = userDetails && userDetails.id;
  const Partner_Id = parseInt(localStorage.getItem("PartnerId"));



  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

  const [updateHistory, setUpdateHistory] = useState([]);
  const [dateFormat, setDateFormat] = useState("");

  const [value, setValue] = useState("1");


  const [Businessunitlist, setBusinessunitlist] = useState([])


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClose = () => {
    setListOverview(false);
    setListMaterial(true);
  };


  // get date format from organization get api
  useEffect(() => {
    if (id1) {
      axios
        .get(`${BASE_URL}/Erpapp/CompanyCRUD/?id=${companyId}`, header)
        .then((res) => {
          console.log("D", res?.data);
          console.log("res.data?.DateFormat", res?.data?.DateFormat);
          setDateFormat(res?.data?.DateFormat);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);


  const getList = async () => {
    await axios.get(`${BASE_URL}/Erpapp/PartnerCRUD/?Partner_Id=${buid}`, header)
      .then((res) => {
        setBusinessunitlist(res?.data)
        // for history
        axios
          .get(
            `${BASE_URL}/Erpapp/Updaterecordsfilter/?Partner_Id=${Partner_Id}&Document_Id=${res?.data?.Partner_Id}`,
            header
          )
          .then((res) => {
            console.error("data", res?.data);
            setUpdateHistory(res?.data);
          })
          .catch((err) => {
            console.log("ds", err);
          });

      })
      .catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    getList();
  }, [buid]);

  return (

    <>
      <Div className="row">

        <Div className="col-sm-12 col-md-10">
          <Typography variant="h3" sx={{ fontWeight: 500 }}>
            Bussiness Unit Overview
          </Typography>
        </Div>


        <Div>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 0, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab
                  label="Overview"
                  value="1"
                  sx={{ fontSize: "16px", color: "#000000" }}
                />

                <Tab
                  label="History"
                  value="3"
                  sx={{ fontSize: "16px", color: "#000000" }}
                />
              </TabList>
            </Box>

            <TabPanel value="1" sx={{ p: { xs: 1, md: 2 } }}>
              <Grid container>
                <Grid item xs={5.5} md={4} lg={3} xl={2}>
                  <Typography variant="h4" sx={{ fontSize: isMdUp ? "14px !important" : "12px !important" }}>Date</Typography>
                  <Typography variant="h4" sx={{ fontSize: isMdUp ? "14px !important" : "12px !important" }}>BU Id</Typography>
                  <Typography variant="h4" sx={{ fontSize: isMdUp ? "14px !important" : "12px !important" }}>BU Name</Typography>
                  <Typography variant="h4" sx={{ fontSize: isMdUp ? "14px !important" : "12px !important" }}>Head of Operation</Typography>
                  <Typography variant="h4" sx={{ fontSize: isMdUp ? "14px !important" : "12px !important" }}>Contact No</Typography>
                  <Typography variant="h4" sx={{ fontSize: isMdUp ? "14px !important" : "12px !important" }}>Email Id</Typography>
                  {/* <Typography variant="h4" sx={{ fontSize: isMdUp ? "14px !important" : "12px !important" }}>Location</Typography> */}
                  <Typography variant="h4" sx={{ fontSize: isMdUp ? "14px !important" : "12px !important" }}>Web</Typography>
                  <Typography variant="h4" sx={{ fontSize: isMdUp ? "14px !important" : "12px !important" }}>Office From Time</Typography>
                  <Typography variant="h4" sx={{ fontSize: isMdUp ? "14px !important" : "12px !important" }}>Office End Time</Typography>
                  <Typography variant="h4" sx={{ fontSize: isMdUp ? "14px !important" : "12px !important" }}>Commision Paid</Typography>
                  <Typography variant="h4" sx={{ fontSize: isMdUp ? "14px !important" : "12px !important" }}>Address</Typography>
                  <Typography variant="h4" sx={{ fontSize: isMdUp ? "14px !important" : "12px !important" }}>Corporate BU</Typography>
                </Grid>

                <Grid item xs={6.5} md={8} lg={8}>
                  <Typography variant="h4" sx={{ fontSize: isMdUp ? "14px !important" : "12px !important" }}>: {dateFormat &&
                    Businessunitlist?.Created_Date &&
                    format(new Date(Businessunitlist?.Created_Date), dateFormat)
                    || Businessunitlist?.Created_Date}</Typography>
                  <Typography variant="h4" sx={{ fontSize: isMdUp ? "14px !important" : "12px !important" }}>: {Businessunitlist?.Partner_Id} </Typography>
                  <Typography variant="h4" sx={{ fontSize: isMdUp ? "14px !important" : "12px !important" }}>: {Businessunitlist?.Partner_Name}</Typography>
                  <Typography variant="h4" sx={{ fontSize: isMdUp ? "14px !important" : "12px !important" }}>: {Businessunitlist?.HeadOf_Operation} </Typography>
                  <Typography variant="h4" sx={{ fontSize: isMdUp ? "14px !important" : "12px !important" }}>: {Businessunitlist?.BusinessUnit_Phone} </Typography>
                  <Typography variant="h4" sx={{ fontSize: isMdUp ? "14px !important" : "12px !important" }}>: {Businessunitlist?.BusinessUnit_EMail} </Typography>
                  {/* <Typography variant="h4" sx={{ fontSize: isMdUp ? "14px !important" : "12px !important" }}>: {Businessunitlist?.BusinessUnit_City} </Typography> */}
                  <Typography variant="h4" sx={{ fontSize: isMdUp ? "14px !important" : "12px !important" }}>: {Businessunitlist?.BusinessUnit_Web || "-"} </Typography>
                  <Typography variant="h4" sx={{ fontSize: isMdUp ? "14px !important" : "12px !important" }}>: {Businessunitlist?.Ofc_Starttime} </Typography>
                  <Typography variant="h4" sx={{ fontSize: isMdUp ? "14px !important" : "12px !important" }}>: {Businessunitlist?.Ofc_Endtime} </Typography>
                  <Typography variant="h4" sx={{ fontSize: isMdUp ? "14px !important" : "12px !important" }}>: {Businessunitlist?.Commision_Paid} % </Typography>
                  <Typography variant="h4" sx={{ fontSize: isMdUp ? "14px !important" : "12px !important" }}>: {Businessunitlist?.BusinessUnit_Addressline1},{Businessunitlist?.BusinessUnit_City}, {Businessunitlist?.BusinessUnit_State},
                    {Businessunitlist?.BusinessUnit_Country} - {Businessunitlist?.BusinessUnit_Pincode}
                  </Typography>
                  <Typography variant="h4" sx={{ fontSize: isMdUp ? "14px !important" : "12px !important" }}>: {Businessunitlist?.Corporate_BU ? "Yes" : "No"} </Typography>
                </Grid>
              </Grid>
            </TabPanel>


            <TabPanel value="3" sx={{ p: 1.5 }}>
              <HistoryOverview updatedHistory={updateHistory} itemId={"Business Unit Id"} />
            </TabPanel>
          </TabContext>
        </Div>

      </Div>
      <Div sx={{ mt: { xs: 5, md: 20 } }}>
        <ButtonGroup
          aria-label="split button"
          sx={{
            mt: { xs: 0.5, lg: 0 },
            mr: { xs: 0, md: 1 }
          }}
          onClick={handleClose}>
          <Button className="plus-button" sx={{ width: "99px !important" }}>Close</Button>
          <Button variant="contained" className="icon-button" sx={{ p: 1 }}>
            <MdClose size={18} />
          </Button>
        </ButtonGroup>
      </Div>
    </>
  );
};

export default PartnerOverview;
