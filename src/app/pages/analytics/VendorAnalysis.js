import JumboContentLayoutMain from '@jumbo/components/JumboContentLayout/JumboContentLayoutMain'
import { Autocomplete, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Div from '@jumbo/shared/Div';
import moment from 'moment';
import { BASE_URL } from 'app/services/auth-services';
import axios from 'axios';
import { BarColor, DisplayFlex } from './CustomStyle';
import { ErpDateField } from 'app/shared/ReuseComponents/ButtonComponent';

const palette = [
    '#f48c06',
    '#1f6924',
    '#721cb8',
    '#ffb703',
    '#1b263b',
    '#9d0208',
    '#d90429',
    '#0081a7',
];

function VendorAnalysis() {

    const dataSource = [
        {
            Vendor1: 18,
            Vendor2: 9.8,
            Vendor3: 40.1,
            Vendor4: 30,
            Vendor5: 34.1,
            Vendor6: 13.1,
            Vendor7: 23.1,
            Vendor8: 4.1,
            perc1: 25.4,
            perc2: 5.3,
            perc3: 31.6,
            perc4: 8.6,
            perc5: 10.6,
            perc6: 23.6,
            perc7: 16.6,
            perc8: 19.6,
            label1: 'Vendor1',
            label2: 'Vendor2',
            label3: 'Vendor3',
            label4: 'Vendor4',
            label5: 'Vendor5',
            label6: 'Vendor6',
            label7: 'Vendor7',
            label8: 'Vendor8',
        },
    ];

    const token = localStorage.getItem('accesstoken')
    const companyId = localStorage.getItem('OrganizationId');

    const header = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    }

    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let TodayDate = `${year}-${month < 10 ? "0" + month : month}-${day}`;


    let startDate = moment().startOf('year');
    let endDate = moment().endOf('year');

    let ThisYearStart = startDate?.format('YYYY-MM-DD');
    let ThisYearEnd = endDate?.format('YYYY-MM-DD');

    const [customDate, setCustomDate] = useState(false);
    const [selectedDate, setSelectedDate] = useState(ThisYearStart);
    const [fromDate, setfromDate] = useState("");
    const [toDate, settoDate] = useState("");
    const [getPartnerName, setgetPartnerName] = useState("");
    const [userId, setuserId] = useState(0);

    const [getRegion, setgetRegion] = useState("All");
    const [selectedPeriod, setSelectedPeriod] = useState('This Year');
    const [currentDate, setCurrentDate] = useState(ThisYearEnd);
    const [OwnerNames, setOwnerNames] = useState([]);
    const [purchaseVendorLists, setPurchaseVendorLists] = useState([]);

    const [stateLists, setStateLists] = useState([]);
    const [cityLists, setCityLists] = useState([]);
    const [state, setState] = useState("");
    const [city, setCity] = useState("");

    const periodOptions = [
        'Previous Week',
        'Previous Month',
        'Previous Quarter',
        'Previous Year',
        'This Week',
        'This Month',
        'This Quarter',
        'This Year',
        'Last One Year',
        'Last Six Month',
        'Last Three Month',
        'Custom Date',
    ];

    const handlePeriodChange = (event, newValue) => {
        setSelectedPeriod(newValue);
        setSelectedDate(null);
        setfromDate("");
        settoDate("");

        let date;

        let startDate; // for previous
        let endDate;

        switch (newValue) {

            case 'This Week':

                startDate = moment().startOf('week');
                endDate = moment().endOf('week');

                let ThisWeekStart = startDate?.format('YYYY-MM-DD');
                let ThisWeekEnd = endDate?.format('YYYY-MM-DD');

                setSelectedDate(ThisWeekStart);
                setCurrentDate(ThisWeekEnd);

                setCustomDate(false);
                return;

            case 'This Month':

                startDate = moment().startOf('month');
                endDate = moment().endOf('month');

                let ThisMonthStart = startDate?.format('YYYY-MM-DD');
                let ThisMonthEnd = endDate?.format('YYYY-MM-DD');

                setSelectedDate(ThisMonthStart);
                setCurrentDate(ThisMonthEnd);

                setCustomDate(false);
                return;

            case 'This Quarter':
                startDate = moment().startOf('quarter');
                endDate = moment().endOf('quarter');

                let ThisQuarterStart = startDate?.format('YYYY-MM-DD');
                let ThisQuarterEnd = endDate?.format('YYYY-MM-DD');

                setSelectedDate(ThisQuarterStart);
                setCurrentDate(ThisQuarterEnd);

                setCustomDate(false);
                return;

            case 'This Year':
                startDate = moment().startOf('year');
                endDate = moment().endOf('year');

                let ThisYearStart = startDate?.format('YYYY-MM-DD');
                let ThisYearEnd = endDate?.format('YYYY-MM-DD');

                setSelectedDate(ThisYearStart);
                setCurrentDate(ThisYearEnd);

                setCustomDate(false);
                return;

            case 'Previous Week':
                startDate = moment().subtract(1, 'week').startOf('week');
                endDate = moment().subtract(1, 'week').endOf('week');

                let PrevWeekStart = startDate?.format('YYYY-MM-DD');
                let PrevWeekEnd = endDate?.format('YYYY-MM-DD');

                setSelectedDate(PrevWeekStart);
                setCurrentDate(PrevWeekEnd);

                setCustomDate(false);
                return;

            case 'Previous Month':
                startDate = moment().subtract(1, 'month').startOf('month');
                endDate = moment().subtract(1, 'month').endOf('month');

                let PrevMonthStart = startDate?.format('YYYY-MM-DD');
                let PrevMonthEnd = endDate?.format('YYYY-MM-DD');

                setSelectedDate(PrevMonthStart);
                setCurrentDate(PrevMonthEnd);

                setCustomDate(false);
                return;

            case 'Previous Quarter':
                startDate = moment().subtract(1, 'quarter').startOf('quarter');
                endDate = moment().subtract(1, 'quarter').endOf('quarter');

                let PrevQuarterStart = startDate?.format('YYYY-MM-DD');
                let PrevQuarterEnd = endDate?.format('YYYY-MM-DD');

                setSelectedDate(PrevQuarterStart);
                setCurrentDate(PrevQuarterEnd);

                setCustomDate(false);
                return;

            case 'Previous Year':
                startDate = moment().subtract(1, 'year').startOf('year');
                endDate = moment().subtract(1, 'year').endOf('year');

                let MomentDateStart = startDate?.format('YYYY-MM-DD');
                let MomentDateEnd = endDate?.format('YYYY-MM-DD');

                setSelectedDate(MomentDateStart);
                setCurrentDate(MomentDateEnd);

                setCustomDate(false);
                return;

            case 'Last One Year':
                date = moment().subtract(1, 'year');
                setCustomDate(false);
                break;

            case 'Last Six Month':
                date = moment().subtract(6, 'months');
                setCustomDate(false);
                break;

            case 'Last Three Month':
                date = moment().subtract(3, 'months');
                setCustomDate(false);
                break;

            case 'Custom Date':
                setCustomDate(true);
                setSelectedDate("");
                break;
            default:
                date = null;
        }
        let MomentDate = date?.format('YYYY-MM-DD');
        setSelectedDate(MomentDate);
        setCurrentDate(TodayDate)
    };

    const HandleChooseRegion = (e, newValue) => {
        // Dates
        setfromDate(""); // for validation
        settoDate("");
        setSelectedPeriod("");
        setSelectedDate("");
        setCity("");
        setState("");
        setgetPartnerName("");
        setuserId(0);
        setSelectedDate("");
        setCustomDate(false);
        setgetRegion(newValue);
    }

    const HandleChooseBu = (e, newValue) => {
        // Dates
        setfromDate(""); // for validation
        settoDate("");
        setSelectedPeriod("");
        setCustomDate(false);
        setuserId(newValue?.id)
        setgetPartnerName(newValue?.Partner_Name)
    }
    const getDefaultStartDate = () => {
        return moment().startOf('year').format('YYYY-MM-DD');
    };

    const getDefaultEndDate = () => {
        return moment().endOf('year').format('YYYY-MM-DD');
    };
    // getuser
    const getUser = async () => {

        try {
            await axios.get(`${BASE_URL}/Erpapp/Partnerlist/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }
            })
                .then((response) => {
                    const names = response?.data?.results
                    setOwnerNames(names);
                })
        } catch (error) {
            console.log("failed to fecth", error);
        }

    }

    const getData = async () => {

        if (getRegion === "All" || getRegion === "") {
            // if region is  ALL111
            // if (Boolean(selectedDate?.trim()) && Boolean(currentDate?.trim())) {
            try {

                let payload = {
                    "Company_Id": companyId,
                    "Date": [selectedDate || fromDate || getDefaultStartDate(), toDate || currentDate || getDefaultEndDate()]
                }
                console.log("payload", payload);

                // 1.vendor All lists

                await axios.post(`${BASE_URL}/Erpapp/Vendoranalysis/`, payload, header)
                    .then(res => {

                        console.log("All --- > vendorressss choose period", res.data);

                        let newArr = [];

                        res?.data?.map(item => {
                            let key = Object.keys(item)[0];
                            let val = item[key];
                            newArr.push({
                                label: key,
                                value: val || 0
                            })
                        })

                        // console.log("vendor response", newArr);
                        setPurchaseVendorLists(newArr);
                    }).catch(err => {
                        console.log("failed to fetch data", err)
                    })

            } catch (error) {
                console.log("failed to fetch data", error)
            }
            // }

            // if (Boolean(fromDate?.trim()) && Boolean(toDate?.trim())) {
            // try {

            //     let payload = {
            //         "Company_Id": companyId,
            //         Date: [fromDate || getDefaultStartDate(), toDate || getDefaultEndDate()]
            //     }
            //     console.log("payload", payload);

            //     // 1.vendor All lists

            //     await axios.post(`${BASE_URL}/Erpapp/Vendoranalysis/`, payload, header)
            //         .then(res => {

            //             console.log("All --- > vendorressss from and to date", res.data);

            //             let newArr = [];

            //             res?.data?.map(item => {
            //                 let key = Object.keys(item)[0];
            //                 let val = item[key];
            //                 newArr.push({
            //                     label: key,
            //                     value: val || 0
            //                 })
            //             })

            //             // console.log("vendor response", newArr);
            //             setPurchaseVendorLists(newArr);

            //         }).catch(err => {
            //             console.log("failed to fetch data", err)
            //         })

            // } catch (error) {
            //     console.log("failed to fetch data", error)
            // }
            // }
        }

        else {
            // if (
            //     Boolean(selectedDate?.trim()) && Boolean(currentDate?.trim()) &&
            //     Boolean(getRegion?.trim()) && Boolean(city?.trim()) && Boolean(getPartnerName?.trim()) && Boolean(state?.trim())
            // ) {
            try {
                let payload = {
                    "Region": getRegion,
                    "Partner_Name": getPartnerName,
                    "City": city,
                    "State": state,
                    "Date": [selectedDate || fromDate || getDefaultStartDate(), toDate || currentDate || getDefaultEndDate()]
                }
                console.log("payload", payload);

                //  1. vendor my lists

                await axios.post(`${BASE_URL}/Erpapp/BUVendoranalysis/`, payload, header)
                    .then(res => {

                        console.log("particullar --- > vendorressss choose period", res.data);

                        let newArr = [];

                        res?.data?.map(item => {
                            let key = Object.keys(item)[0];
                            let val = item[key];
                            newArr.push({
                                label: key,
                                value: val || 0
                            })
                        })

                        // console.log("vendor response", newArr);
                        setPurchaseVendorLists(newArr);

                    }).catch(err => {
                        console.log("failed to fetch data", err)
                    })


            } catch (error) {
                console.log("failed to fetch data", error)
                // }
            }

            // if (Boolean(fromDate?.trim()) && Boolean(toDate?.trim()) &&
            //     Boolean(getRegion?.trim()) && Boolean(city?.trim()) &&
            //     Boolean(state?.trim()) && Boolean(getPartnerName?.trim())
            // ) {
            // try {
            //     let payload = {
            //         "Region": getRegion,
            //         "Partner_Id": userId,
            //         "City": city,
            //         "State": state,
            //         Date: [fromDate, toDate]
            //     }
            //     console.log("payload", payload);

            //     //  1. vendor my lists
            //     await axios.post(`${BASE_URL}/Erpapp/BUVendoranalysis/`, payload, header)
            //         .then(res => {

            //             console.log("vendoparticuler ---- > rressssfrom and to dated", res.data);

            //             let newArr = [];

            //             res?.data?.map(item => {
            //                 let key = Object.keys(item)[0];
            //                 let val = item[key];
            //                 newArr.push({
            //                     label: key,
            //                     value: val || 0
            //                 })
            //             })

            //             // console.log("vendor response", newArr);
            //             setPurchaseVendorLists(newArr);

            //         }).catch(err => {
            //             console.log("failed to fetch data", err)
            //         })

            // } catch (error) {
            //     console.log("failed to fetch data", error)
            // }
            // }
        }


    }

    const getStateLists = async () => {
        try {
            await axios.post(`https://countriesnow.space/api/v0.1/countries/states`, { country: "india" },
                {
                    headers: {
                        //   Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                }
            )
                .then((res) => {
                    console.log(res.data.data);
                    var state = res.data.data;
                    setStateLists(state.states);
                })
                .catch((error) => {
                    console.log("ds", error);
                });
        } catch (error) {
            console.log("failed to fetch state names", error);
        }
    };

    const getCityLists = async (state) => {
        try {
            let payload = {
                country: "India",
                state: state,
            };
            console.log("payloadcitis", payload, state);
            await axios.post(`https://countriesnow.space/api/v0.1/countries/state/cities`, payload,
                {
                    headers: {
                        //   Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                }
            )
                .then((res) => {
                    console.log("res.data", res.data);
                    var city = res.data.data;
                    var citynames = city?.map((cityname) => {
                        const normalizedCity = cityname.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                        if (normalizedCity === "Naini Tal") {
                            return normalizedCity.replace(" ", "");
                        }
                        return normalizedCity;
                    });
                    setCityLists(citynames);
                })
                .catch((error) => {
                    console.log("ds", error);
                });
        } catch (error) {
            console.log("failed to fetch city names", error);
        }
    };

    useEffect(() => {
        getData()
    }, [selectedDate, currentDate, fromDate, toDate, getRegion, state, city, getPartnerName])

    useEffect(() => {
        getUser();
    }, [])


    let conditions = (actualData) => {
        console.log("condition 1", getRegion, !Boolean(selectedPeriod));
        if (Boolean(getRegion)) {

            if (Boolean(getRegion == "All") && Boolean(selectedPeriod)) {
                return actualData;
            } else if (Boolean(getRegion != "All") && Boolean(selectedPeriod) && Boolean(getPartnerName) && Boolean(state) && Boolean(city)) {
                return actualData;
            } else {
                return []
            }

        } else {
            return []
        }
    }

    console.log("conditions", conditions(purchaseVendorLists));

    return (
        <JumboContentLayoutMain>
            <Typography variant='h1' sx={{ fontWeight: 800, mt: -2, mb: 0.5 }}>
                Analytics
            </Typography>
            <Typography sx={{ fontSize: "15px", color: BarColor.SpendColor.color, fontWeight: 500, mt: 1 }}>
                Vendor Analysis
            </Typography>
            <Grid container columnSpacing={2} xs={12} sx={{ mt: 2 }}>
                <Grid item xs={12} md={3.5} lg={3}>
                    <Typography className="col-12 input-label">
                        Select Region <span className="required">*</span>
                    </Typography>
                    <Autocomplete
                        className="search-select col-12"
                        options={["All", "North", "South", "East", "West"]}
                        getOptionLabel={(option) => option || ""}
                        value={getRegion}
                        color='#FFFF'
                        onChange={(e, newValue) => HandleChooseRegion(e, newValue)}
                        renderInput={(params) => <TextField {...params} placeholder=" Select " />}
                    />
                </Grid>

                {getRegion !== "All" && (
                    <Grid item xs={12} md={3.5} lg={3}>
                        <Typography className="col-12 input-label">
                            State <span className="required">*</span>
                        </Typography>
                        <Autocomplete
                            className="search-select col-12"
                            onFocus={getStateLists}
                            name="state"
                            getOptionLabel={(option) => {
                                if (typeof option === "string") {
                                    return option;
                                }
                                if (option && option?.name) {
                                    return option?.name;
                                }
                                return "";
                            }}
                            options={stateLists}
                            value={state}
                            onChange={(e, newValue) => {
                                setState(newValue?.name);
                                getCityLists(newValue?.name)
                            }}
                            isOptionEqualToValue={(option, value) =>
                                option?.name === value || value === ""
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    placeholder="State Name"
                                />
                            )}
                        />
                    </Grid>
                )}
                {getRegion !== "All" && (
                    <Grid item xs={12} md={3.5} lg={3}>
                        <Typography className="col-12 input-label">
                            City<span className="required">*</span>
                        </Typography>
                        <Autocomplete
                            className="search-select col-12"
                            name="city"
                            getOptionLabel={(option) => {
                                if (typeof option === "string") {
                                    return option;
                                }
                                if (option && option) {
                                    return option
                                }
                                return "";
                            }}
                            options={cityLists}
                            value={city}
                            onChange={(e, newValue) => {
                                setCity(newValue);
                            }}
                            isOptionEqualToValue={(option, value) =>
                                option === value || value === ""
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    placeholder="City Name"
                                />
                            )}
                            disabled={!state ? true : false}
                        />
                    </Grid>
                )}
                {getRegion !== "All" && (
                    <Grid item xs={12} md={3.5} lg={3}>
                        <Typography className="col-12 input-label">
                            Choose a BU <span className="required">*</span>
                        </Typography>
                        <Autocomplete
                            className="col-12 search-select"
                            options={OwnerNames}
                            getOptionLabel={(option) => option?.Partner_Name || ""}
                            value={OwnerNames?.find((option) => option?.Partner_Name === getPartnerName) || null}
                            onChange={(e, newValue) => HandleChooseBu(e, newValue)}
                            renderInput={(params) => <TextField {...params} placeholder="Choose a BU" />}
                        />
                    </Grid>
                )}
                {/* {getRegion !== "All" && ( */}
                <Grid item xs={12} md={3.5} lg={3}>
                    <Typography className="col-12 input-label">
                        Choose a Period<span className="required">*</span>
                    </Typography>
                    <Autocomplete
                        className="col-12 search-select"
                        value={selectedPeriod}
                        options={periodOptions}
                        onChange={handlePeriodChange}
                        renderInput={(params) => <TextField {...params} placeholder="Choose a Period" />}
                    />
                </Grid>
                {/* )} */}

                <Grid container columnSpacing={2} item md={5} lg={6} style={{ display: customDate ? "flex" : "none" }}>
                    <Grid item className="col-6">
                        <Typography className="col-12 input-label">
                            From<span className="required">*</span>
                        </Typography>
                        <ErpDateField
                            id="fromDate"
                            name="fromDate"
                            inputValue={fromDate}
                            handleInputChange={(e) => setfromDate(e.target.value)}
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item className="col-6">
                        <Typography className="col-12 input-label">
                            To <span className="required">*</span>
                        </Typography>
                        <ErpDateField
                            id="toDate"
                            name="toDate"
                            inputValue={toDate}
                            handleInputChange={(e) => settoDate(e.target.value)}
                            variant="outlined"
                            InputProps={{
                                inputProps: {
                                    min: fromDate,
                                },
                            }}
                        />
                    </Grid>
                </Grid>
            </Grid>

            <Div sx={{ mt: 3 }}>
                <Div sx={[{ p: 1, }]} className='card'>
                    <Typography variant='h5' sx={{ bgcolor: "#ECECEC", padding: "8px", borderRadius: "5px" }}>Vendor Analysis</Typography>
                    {Boolean(purchaseVendorLists) ?
                        <>
                          
                        </>
                        :
                        <Div sx={[DisplayFlex, { justifyContent: 'center', height: 350 }]}>
                            <Typography sx={{ fontSize: '14px' }} >No record </Typography>
                        </Div>
                    }
                </Div>
            </Div>

        </JumboContentLayoutMain >
    )
}

export default VendorAnalysis
