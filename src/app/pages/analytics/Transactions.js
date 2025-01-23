import React, { useState, useEffect } from 'react'
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import { Typography, Box, TextField, ButtonGroup, Button, Grid, FormControl, Autocomplete } from '@mui/material';
import axios from 'axios';
import { BASE_URL } from 'app/services/auth-services';
import JumboContentLayoutMain from '@jumbo/components/JumboContentLayout/JumboContentLayoutMain';
import Div from '@jumbo/shared/Div';
import { Bar, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { FaSearch } from "react-icons/fa";
import { State, City } from "country-state-city";

const data = [
    { month: 'Jan', Target: 4000, Transactions: 2400, amt: 2400 },
    { month: 'Feb', Target: 3000, Transactions: 1398, amt: 2210 },
    { month: 'Mar', Target: 2000, Transactions: 9800, amt: 2290 },
    { month: 'Apr', Target: 2780, Transactions: 3908, amt: 2000 },
    { month: 'May', Target: 1890, Transactions: 4800, amt: 2181 },
    { month: 'Jun', Target: 2390, Transactions: 3800, amt: 2500 },
    { month: 'Jul', Target: 3490, Transactions: 4300, amt: 2100 },
];

const Transactions = () => {
    const [locationData, setLocationData] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [zoomLevel, setZoomLevel] = useState(3);
    const [getPartnerName, setgetPartnerName] = useState("");
    const [ownerNames, setOwnerNames] = useState([]);
    const [searchedDatas, setSearchedDatas] = useState(null);

    const [stateOptions, setStateOptions] = useState([]);
    const [cityOptions, setCityOptions] = useState([]);

    const APIKKey = "AIzaSyDl22ksIKq0yqXNjnrmy_PYRKcZVbLwAns";
    const token = localStorage.getItem("accesstoken");

    const header = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    }


    const mapStyles = {
        height: '500px',
        width: '100%',
    };

    const handleMarkerClick = (data) => {
        console.log("info")
    }

    const defaultCenter = {  //delhi
        lat: 28.6139,
        lng: 77.2090,
    };

    const { isLoaded } = useJsApiLoader({ googleMapsApiKey: APIKKey });

    const getCoordinates = async (country, state, city) => {
        try {
            // if (getPartnerName.BusinessUnit_City !== "" && state !== "" && city !== "") {
            const address = `${searchedDatas.BusinessUnit_City}, ${searchedDatas.BusinessUnit_State}, ${searchedDatas.BusinessUnit_Country}`;
            const response = await axios.get(
                `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
                    address
                )}&key=6c3e49178d1f4cca84a003096c7e1911`
            );
            setLocationData(response?.data?.results[0]?.geometry);
            console.log("GeoLocation", response?.data?.results[0]?.geometry);
            // }
            // else {
            //     console.log("Please Select selectedCountry selectedState selectedCity");
            // }
        } catch (error) {
            console.error('Error fetching coordinates:', error);
            console.error(error.response.data);
        }
    };

    console.log(selectedCountry, selectedState, selectedCity);

    const centerPosition = { lat: locationData?.lat || defaultCenter.lat, lng: locationData?.lng || defaultCenter.lng };

    const determineZoomLevel = (country, state, city) => {
        console.log("countryyyyy", country, state, city);
        if (city !== null && state !== null && country !== null && city !== "" && state !== "" && country !== "") {
            setZoomLevel(11);
        } else if (state !== null && country !== null && state !== "" && country !== "") {
            setZoomLevel(7);
        } else if (country !== null && country !== "") {
            setZoomLevel(4);
        } else {
            setZoomLevel(3);
        }
    };


    useEffect(() => {
        const statesOfCountry = State.getStatesOfCountry(selectedCountry?.isoCode);
        setStateOptions(statesOfCountry);
    }, [selectedCountry]);

    useEffect(() => {
        if (selectedCountry && selectedState) {
            const citiesOfState = City.getCitiesOfState(
                selectedCountry.isoCode,
                selectedState.isoCode
            );
            setCityOptions(citiesOfState);
        } else {
            setCityOptions([]);
        }
    }, [selectedCountry, selectedState]);

    // PartnerList
    const getPartnerData = () => {
        axios.get(`${BASE_URL}/Erpapp/Partnerlist/`, header)
            .then((response) => {
                console.log("sevity", response.data.results);
                setOwnerNames(response.data.results);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    useEffect(() => {
        getPartnerData();
    }, []);

    console.log("ZoomLevel", zoomLevel);
    console.log("ownerNames", ownerNames);

    return (
        <JumboContentLayoutMain>
            <Typography variant='h1'>Transactions</Typography>
            <Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
                <Grid item className='row' xs={4}>
                    <Typography className="col-md-4 input-label">
                        Choose a BU
                    </Typography>
                    <FormControl className="col-6">
                        <Autocomplete
                            options={ownerNames}
                            getOptionLabel={(option) => option?.Partner_Name || ""}
                            value={ownerNames.find((option) => option?.Partner_Name === getPartnerName) || null}
                            onChange={(e, newValue) => {
                                setgetPartnerName(newValue?.Partner_Name)
                                setSearchedDatas(newValue)
                            }}
                            renderInput={(params) => <TextField {...params} placeholder="Choose a BU" />}
                            className="search-select"
                        />
                    </FormControl>
                </Grid>
                <Grid item className='row' xs={3}>
                    <ButtonGroup
                        aria-label="split button"
                        className="col-12"
                        onClick={() => {
                            getCoordinates(selectedCountry, selectedState, selectedCity);
                            determineZoomLevel(selectedCountry, selectedState, selectedCity)
                        }
                        }
                        sx={{
                            mt: { xs: 0.5, lg: 0 },
                            mr: { xs: 0, md: 1 }
                        }}
                    >
                        <Button className="plus-button">
                            Search
                        </Button>
                        <Button variant="contained" className="icon-button">
                            <FaSearch size={18} />
                        </Button>
                    </ButtonGroup>
                </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mb: 3, alignItems: 'center' }}>
                <Grid item xs={6}>
                    {isLoaded ?
                        <Div>
                            <GoogleMap mapContainerStyle={mapStyles} zoom={11} center={centerPosition}>
                                {/* {
                                        (selectedCity !== "" && selectedState !== "" && selectedCountry !== "") ? */}
                                (<MarkerF
                                    position={{ lat: locationData?.lat, lng: locationData?.lng }}
                                    title={"ERP"}
                                    // icon={<FaMapMarkerAlt />}
                                    onClick={() => { handleMarkerClick() }}
                                >
                                </MarkerF>)
                                {/* :
                                            ""
                                    } */}
                            </GoogleMap>
                        </Div>
                        :
                        <Div>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <div class="spinner-grow text-info" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </Box>
                        </Div>
                    }
                </Grid>
                <Grid item xs={6}>
                    <ResponsiveContainer width="100%" height={200}>
                        <ComposedChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip labelStyle={{ color: 'black' }} itemStyle={{ color: 'black' }} cursor={false} />
                            <Legend />
                            <CartesianGrid stroke="#f5f5f5" />
                            <Bar dataKey="Target" barSize={20} fill={"#1ABBDE"} />
                            <Line type="monotone" dataKey="Transactions" stroke="#59AA2B" />
                            {/* <Line type="monotone" dataKey="amt" stroke="#59AA2B" /> */}
                        </ComposedChart>
                    </ResponsiveContainer>
                </Grid>
            </Grid>

        </JumboContentLayoutMain>
    );
}

export default Transactions;