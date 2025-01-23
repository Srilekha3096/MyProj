import Div from '@jumbo/shared/Div'
import { Button, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { CustomButton } from '../CustomStyle'
import { BASE_URL } from 'app/services/auth-services'
import axios from 'axios'

function HeaderFilter({ filterFunc, title = "Header Name" }) {
  const [Months, setMonth] = useState(['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar',])
  const [filterDate, setFilterDate] = useState({ year: new Date().getFullYear(), month: null, quater: null })

  const id = parseInt(localStorage.getItem("UserId"));
  const token = localStorage.getItem("accesstoken");

  const findYear = (response) => {

    const { Calandermonth, Calendar_MonthName } = response;
    const [year, month] = Calendar_MonthName.split('-');

    if (Calandermonth === "startMonth") {
      const fiscalYearStart = new Date(`${year}-${month}-01`);
      const fiscalYearEnd = new Date(fiscalYearStart);

      fiscalYearEnd.setFullYear(fiscalYearStart.getFullYear() + 1);
      fiscalYearEnd.setMonth(fiscalYearStart.getMonth() - 1);

      const monthLabels = [];

      while (fiscalYearStart <= fiscalYearEnd) {

        const monthLabel = `${fiscalYearStart.toLocaleString('en-US', { month: 'short' })}`;
        monthLabels.push(monthLabel);
        fiscalYearStart.setMonth(fiscalYearStart.getMonth() + 1);
      }

      console.log("monthLabels", monthLabels, response);
      setMonth(monthLabels)
    }
    else {
      console.log("StartMonth Error");
    }
  }

  const getfinanceYear = async () => {
    await axios
      .get(`${BASE_URL}/Erpapp/CompanyCRUD/?Created_By=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        findYear(response.data.Fiscal_Year);
      })
      .catch((error) => {
        console.error(error);
      });
  };


  useEffect(() => getfinanceYear(), [])

  useEffect(() => filterFunc(filterDate), [filterDate])


  return (
    <Div>
      <Grid container alignItems={'center'} justifyContent={'space-between'} spacing={2}>
        <Grid sx={{ display: { xs: "flex", md: "none" }, justifyContent: 'center' }} item xs={12} >
          <Div>
            <Typography sx={{ fontSize: "16px", fontWeight: 600, color: "darkgray", textAlign: "center" }}>
              <span style={{ color: "#ffbe0b" }}>{title?.split(" ")[0]}</span> { title?.split(" ").length == 3 && title?.split(" ")[1]}<span style={{ color: "#32cbff" }}> {title?.split(" ").length == 3 ? title?.split(" ")[2] : title?.split(" ")[1]}</span>
            </Typography>
          </Div>
        </Grid>

        <Grid container item xs={12} md={3.6} >
          <Grid item xs={3} md={3} lg={3} ><Button onClick={() => setFilterDate({ ...filterDate, month: null, quater: null, year: new Date().getFullYear() })} sx={[CustomButton, { bgcolor: filterDate?.year == new Date().getFullYear() ? '#0096c7' : "#32cbff" }]} variant='contained' >{new Date().getFullYear()}</Button></Grid>
          <Grid item xs={3} md={3} lg={3} ><Button onClick={() => setFilterDate({ ...filterDate, month: null, quater: null, year: new Date().getFullYear() + 1 })} sx={[CustomButton, { bgcolor: filterDate?.year == new Date().getFullYear() + 1 ? '#0096c7' : "#32cbff" }]} variant='contained' >{new Date().getFullYear() + 1}</Button></Grid>
          <Grid item xs={3} md={3} lg={3} ><Button onClick={() => setFilterDate({ ...filterDate, month: null, quater: null, year: new Date().getFullYear() + 2 })} sx={[CustomButton, { bgcolor: filterDate?.year == new Date().getFullYear() + 2 ? '#0096c7' : "#32cbff" }]} variant='contained' >{new Date().getFullYear() + 2}</Button></Grid>
          <Grid item xs={3} md={3} lg={3} ><Button onClick={() => setFilterDate({ ...filterDate, month: null, quater: null, year: new Date().getFullYear() + 3 })} sx={[CustomButton, { bgcolor: filterDate?.year == new Date().getFullYear() + 3 ? '#0096c7' : "#32cbff" }]} variant='contained' >{new Date().getFullYear() + 3}</Button></Grid>
          <Grid item xs={3} md={3} lg={3} ><Button onClick={() => setFilterDate({ ...filterDate, month: null, quater: "Q1" })} sx={[CustomButton, { bgcolor: filterDate?.quater == 'Q1' ? "#0096c7" : "#32cbff" }]} variant='contained' >Q1</Button></Grid>
          <Grid item xs={3} md={3} lg={3} ><Button onClick={() => setFilterDate({ ...filterDate, month: null, quater: "Q2" })} sx={[CustomButton, { bgcolor: filterDate?.quater == 'Q2' ? "#0096c7" : "#32cbff" }]} variant='contained' >Q2</Button></Grid>
          <Grid item xs={3} md={3} lg={3} ><Button onClick={() => setFilterDate({ ...filterDate, month: null, quater: "Q3" })} sx={[CustomButton, { bgcolor: filterDate?.quater == 'Q3' ? "#0096c7" : "#32cbff" }]} variant='contained' >Q3</Button></Grid>
          <Grid item xs={3} md={3} lg={3} ><Button onClick={() => setFilterDate({ ...filterDate, month: null, quater: "Q4" })} sx={[CustomButton, { bgcolor: filterDate?.quater == 'Q4' ? "#0096c7" : "#32cbff" }]} variant='contained' >Q4</Button></Grid>

        </Grid>

        <Grid sx={{ display: { xs: "none", md: "flex", justifyContent: 'center' } }} item xs={3} md={3} >
          <Div>
            <Typography sx={{ fontSize: "16px", fontWeight: 600, color: "darkgray", textAlign: "center" }}>
              <span style={{ color: "#ffbe0b" }}>{title?.split(" ")[0]} </span>{title?.split(" ").length == 3 && title?.split(" ")[1]}<span style={{ color: "#32cbff" }}> {title?.split(" ").length == 3 ? title?.split(" ")[2] : title?.split(" ")[1]}</span>
            </Typography>
          </Div>
        </Grid>

        <Grid container item xs={12} md={5.4} >
          {
            Months?.map((month, i) => {
              let indx = [(filterDate?.quater?.substring(1) * 3) - 1, (filterDate?.quater?.substring(1) * 3) - 2, (filterDate?.quater?.substring(1) * 3) - 3]
              return (
                <Grid key={i} item xs={3} md={2} ><Button onClick={() => setFilterDate({ ...filterDate, quater: null, month: i })} sx={[CustomButton, { bgcolor: (filterDate?.month == i) || indx?.some((che) => che == i) ? "#0096c7" : "#32cbff" }]} variant='contained' >{month}</Button></Grid>
              )
            })
          }
        </Grid>
      </Grid>
    </Div>
  )
}
export default HeaderFilter
