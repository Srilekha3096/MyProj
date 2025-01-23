import Div from '@jumbo/shared/Div'
import { Autocomplete, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { BarColor, CustomButton } from '../CustomStyle'
import moment from 'moment'
import { BASE_URL } from 'app/services/auth-services'
import axios from 'axios'


const ServicesMonitorHeaderFilterAnalysis = ({ filterFunc }) => {


    const token = localStorage.getItem('accesstoken');
    const header = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    };

    const [moniterData, setMoniterData] = useState([])
    const [filterSelections, setFilterSelections] = useState({

        region: "All",
        state: "All",
        city: "All",
        businessUnit: "All",
        category: "All",
        startDate: moment(new Date()).format('YYYY-MM-DD'),
        endDate: moment(new Date()).format('YYYY-MM-DD'),

    })

    return (
        <>
            <Div sx={{ marginBottom: '100px' }}>
                <Grid container alignItems={'center'} spacing={2}>
                    <Grid item xs={6} md={2} sx={{ bgcolor: "" }}>
                        <Typography sx={{ fontSize: "12px", fontWeight: 400 }}>Select Region</Typography>
                        <Autocomplete
                            sx={{ bgcolor: BarColor.SpendColor.color, borderRadius: "5px" }}
                            options={["All", "North", "South", "Central", "East", "West"]}
                            getOptionLabel={(option) => option || ""}
                            value={filterSelections?.region}
                            onChange={(e, newValue) => {
                                setFilterSelections({ ...filterSelections, region: newValue })
                            }}
                            renderInput={(params) => <TextField
                                sx={{
                                    '& input': {
                                        color: '#FFFF', // Change the text color of the selected value
                                    },
                                    '& fieldset': {
                                        borderColor: '#FFFF', // Change the border color of the input field
                                    },
                                }}
                                {...params} placeholder=" Select " />}
                            className="search-select"
                        />
                    </Grid>

                    <Grid item xs={6} md={2} sx={{ bgcolor: "" }}>
                        <Typography sx={{ fontSize: "12px", fontWeight: 400 }}>Select State</Typography>
                        <Autocomplete
                            sx={{ bgcolor: BarColor.SpendColor.color, borderRadius: "5px" }}
                            options={["All"]}
                            getOptionLabel={(option) => option || ""}
                            value={filterSelections?.state}
                            onChange={(e, newValue) => {
                                setFilterSelections({ ...filterSelections, state: newValue })
                            }}
                            renderInput={(params) => <TextField
                                sx={{
                                    '& input': {
                                        color: '#FFFF', // Change the text color of the selected value
                                    },
                                    '& fieldset': {
                                        borderColor: '#FFFF', // Change the border color of the input field
                                    },
                                }}
                                {...params} placeholder=" Select " />}
                            className="search-select"
                        />
                    </Grid>

                    <Grid item xs={6} md={2} sx={{ bgcolor: "" }}>
                        <Typography sx={{ fontSize: "12px", fontWeight: 400 }}>Select City</Typography>
                        <Autocomplete
                            sx={{ bgcolor: BarColor.SpendColor.color, borderRadius: "5px" }}
                            options={['All']}
                            getOptionLabel={(option) => option || ""}
                            value={filterSelections?.city}
                            onChange={(e, newValue) => {
                                setFilterSelections({ ...filterSelections, city: newValue })

                            }}
                            renderInput={(params) => <TextField
                                sx={{
                                    '& input': {
                                        color: '#FFFF', // Change the text color of the selected value
                                    },
                                    '& fieldset': {
                                        borderColor: '#FFFF', // Change the border color of the input field
                                    },
                                }}
                                {...params} placeholder=" Select " />}
                            className="search-select"
                        />
                    </Grid>

                    <Grid item xs={6} md={2} sx={{ bgcolor: "" }}>
                        <Typography sx={{ fontSize: "12px", fontWeight: 400 }}>Select Business Unit</Typography>
                        <Autocomplete
                            sx={{ bgcolor: BarColor.SpendColor.color, borderRadius: "5px" }}
                            options={['All']}
                            getOptionLabel={(option) => option || ""}
                            value={filterSelections?.businessUnit}
                            onChange={(e, newValue) => {
                                setFilterSelections({ ...filterSelections, businessUnit: newValue })

                            }}
                            renderInput={(params) => <TextField
                                sx={{
                                    '& input': {
                                        color: '#FFFF', // Change the text color of the selected value
                                    },
                                    '& fieldset': {
                                        borderColor: '#FFFF', // Change the border color of the input field
                                    },
                                }}
                                {...params} placeholder=" Select " />}
                            className="search-select"
                        />
                    </Grid>
                </Grid>
            </Div>

           
        </>
    )
}

export default ServicesMonitorHeaderFilterAnalysis