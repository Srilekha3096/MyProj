import Div from '@jumbo/shared/Div'
import { Autocomplete, Button, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { BarColor, CustomButton } from '../CustomStyle'
import { BASE_URL } from 'app/services/auth-services'
import axios from 'axios'

function HeaderFilterSalesTrends({ filterFunc }) {
    const [Months, setMonth] = useState(['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar',])

    const [filterSelections, setFilterSelections] = useState({
        region: "All",
        state: "All",
        city: "All",
        businessUnit: "All",
        year: "All",
        quarter: "All",
        month: "All",
    })
    const [compareFilter,setCompareFilter] = useState({
        measure: "All",
        year: "All",
        quarter: "All",
        month: "All",
    })


    return (
        <Div>
            <Grid container alignItems={'center'} justifyContent={'space-between'} spacing={2}>
                <Grid item xs={6} md={2} sx={{ bgcolor: "" }}>
                    <Typography sx={{ fontSize: "12px", fontWeight: 400 }}>Select Region</Typography>
                    <Autocomplete
                        sx={{ bgcolor: BarColor.SpendColor.color ,borderRadius:"5px"}}
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
                        sx={{ bgcolor: BarColor.SpendColor.color ,borderRadius:"5px"}}
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
                        sx={{ bgcolor: BarColor.SpendColor.color ,borderRadius:"5px"}}
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
                        sx={{ bgcolor: BarColor.SpendColor.color ,borderRadius:"5px"}}
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

                <Grid item xs={6} md={2} sx={{ bgcolor: "" }}>
                    <Typography sx={{ fontSize: "12px", fontWeight: 400 }}>Select Year</Typography>
                    <Autocomplete
                        sx={{ bgcolor: BarColor.SpendColor.color ,borderRadius:"5px"}}
                        options={["All"]}
                        getOptionLabel={(option) => option || ""}
                        value={filterSelections?.year}
                        onChange={(e, newValue) => {
                            setFilterSelections({ ...filterSelections, year: newValue })

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
                    <Typography sx={{ fontSize: "12px", fontWeight: 400 }}>Select Quarter</Typography>
                    <Autocomplete
                        sx={{ bgcolor: BarColor.SpendColor.color ,borderRadius:"5px"}}
                        options={["All"]}
                        getOptionLabel={(option) => option || ""}
                        value={filterSelections?.quarter}
                        onChange={(e, newValue) => {
                            setFilterSelections({ ...filterSelections, quarter: newValue })

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
                    <Typography sx={{ fontSize: "12px", fontWeight: 400 }}>Select Month</Typography>
                    <Autocomplete
                        sx={{ bgcolor: BarColor.SpendColor.color ,borderRadius:"5px"}}
                        options={["All"]}
                        getOptionLabel={(option) => option || ""}
                        value={filterSelections?.month}
                        onChange={(e, newValue) => {
                            setFilterSelections({ ...filterSelections, month: newValue })

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
                    <Typography sx={{ fontSize: "12px", fontWeight: 400 }}>Select Month</Typography>
                    <Autocomplete
                        sx={{ bgcolor: BarColor.SpendColor.color ,borderRadius:"5px"}}
                        options={["All"]}
                        getOptionLabel={(option) => option || ""}
                        value={filterSelections?.month}
                        onChange={(e, newValue) => {
                            setFilterSelections({ ...filterSelections, month: newValue })

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
                    <Typography sx={{ fontSize: "12px", fontWeight: 400 }}>Comparison Measure</Typography>
                    <Autocomplete
                        sx={{ bgcolor: BarColor.BudgetColor.color ,borderRadius:"5px"}}
                        options={["All"]}
                        getOptionLabel={(option) => option || ""}
                        value={compareFilter?.month}
                        onChange={(e, newValue) => {
                            setCompareFilter({ ...compareFilter, measure: newValue })

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
                    <Typography sx={{ fontSize: "12px", fontWeight: 400 }}>Comparison Year</Typography>
                    <Autocomplete
                        sx={{ bgcolor: BarColor.BudgetColor.color ,borderRadius:"5px"}}
                        options={["All"]}
                        getOptionLabel={(option) => option || ""}
                        value={compareFilter?.year}
                        onChange={(e, newValue) => {
                            setCompareFilter({ ...compareFilter, year: newValue })

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
                    <Typography sx={{ fontSize: "12px", fontWeight: 400 }}>Comparison Quarter</Typography>
                    <Autocomplete
                        sx={{ bgcolor: BarColor.BudgetColor.color ,borderRadius:"5px"}}
                        options={["All"]}
                        getOptionLabel={(option) => option || ""}
                        value={compareFilter?.quarter}
                        onChange={(e, newValue) => {
                            setCompareFilter({ ...filterSelections, quarter: newValue })

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
                    <Typography sx={{ fontSize: "12px", fontWeight: 400 }}>Comparison Month</Typography>
                    <Autocomplete
                        sx={{ bgcolor: BarColor.BudgetColor.color ,borderRadius:"5px"}}
                        options={["All"]}
                        getOptionLabel={(option) => option || ""}
                        value={compareFilter?.month}
                        onChange={(e, newValue) => {
                            setCompareFilter({ ...filterSelections, month: newValue })

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
    )
}
export default HeaderFilterSalesTrends
