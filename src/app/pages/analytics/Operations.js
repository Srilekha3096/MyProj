import React, { useState, useEffect } from 'react'
import { GoogleMap, MarkerF, useJsApiLoader, InfoWindowF } from '@react-google-maps/api';
import { Typography, Box, TextField, ButtonGroup, Button, Grid, FormControl, Autocomplete } from '@mui/material';
import axios from 'axios';
import { BASE_URL } from 'app/services/auth-services';
import JumboContentLayoutMain from '@jumbo/components/JumboContentLayout/JumboContentLayoutMain';
import Div from '@jumbo/shared/Div';
import { FaSave } from 'react-icons/fa';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { MdClear } from 'react-icons/md';
import { FaSearch } from "react-icons/fa";
import { Country, State, City } from "country-state-city";
import Select from "react-select";

const data = [
    { month: 'Jan', Rent: 4000, Travel: 2400, Entertainments: 2400, Gifts: 2800, OfficeSupplies: 2800, },
    { month: 'Feb', Rent: 3000, Travel: 1398, Entertainments: 2210, Gifts: 2300, OfficeSupplies: 2300, },
    { month: 'Mar', Rent: 2000, Travel: 9800, Entertainments: 2290, Gifts: 1400, OfficeSupplies: 1400, },
    { month: 'Apr', Rent: 2780, Travel: 3908, Entertainments: 2000, Gifts: 1400, OfficeSupplies: 1400, },
    { month: 'May', Rent: 1890, Travel: 4800, Entertainments: 2181, Gifts: 4400, OfficeSupplies: 4400, },
    { month: 'Jun', Rent: 2390, Travel: 3800, Entertainments: 2500, Gifts: 5400, OfficeSupplies: 5400, },
    { month: 'Jul', Rent: 3490, Travel: 4300, Entertainments: 2100, Gifts: 6400, OfficeSupplies: 6400, },
    { month: 'Aug', Rent: 4000, Travel: 2400, Entertainments: 2400, Gifts: 2800, OfficeSupplies: 2800, },
    { month: 'Sep', Rent: 3000, Travel: 1398, Entertainments: 2210, Gifts: 2300, OfficeSupplies: 2300, },
    { month: 'Oct', Rent: 2000, Travel: 9800, Entertainments: 2290, Gifts: 1400, OfficeSupplies: 1400, },
    { month: 'Nov', Rent: 2780, Travel: 3908, Entertainments: 2000, Gifts: 1400, OfficeSupplies: 1400, },
    { month: 'Dec', Rent: 1890, Travel: 4800, Entertainments: 2181, Gifts: 4400, OfficeSupplies: 4400, },
];

const Operations = () => {

    const [selectedMarker, setSelectedMarker] = useState(null)
    const [datas, setDatas] = useState()
    const [latitude, setLatitude] = useState()
    const [longitude, setLongitude] = useState()
    const [locationData, setLocationData] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [zoomLevel, setZoomLevel] = useState(3);
    
    const [searchedDatas, setSearchedDatas] = useState(null);
    const [getPartnerName, setgetPartnerName] = useState("");
    const [ownerNames, setOwnerNames] = useState([]);

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

    const handleClear = () => {
        setSelectedCountry(null)
        setSelectedState("")
        setSelectedCity("")
        setZoomLevel(3);
    };

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
            <Typography variant='h1'>Operations</Typography>
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
                        <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip labelStyle={{ color: 'black' }} itemStyle={{ color: 'black' }} cursor={false} />
                            <Legend />
                            <defs>
                                <linearGradient id="Rent" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#B819D2" stopOpacity={1} />
                                    <stop offset="95%" stopColor="#6200EE" stopOpacity={1} />
                                </linearGradient>
                            </defs>
                            <defs>
                                <linearGradient id="Travel" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#9AF5FC" stopOpacity={1} />
                                    <stop offset="95%" stopColor="#067F88" stopOpacity={1} />
                                </linearGradient>
                            </defs>
                            <defs>
                                <linearGradient id="Entertainments" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#FD7CBE" stopOpacity={1} />
                                    <stop offset="95%" stopColor="#BB0663" stopOpacity={1} />
                                </linearGradient>
                            </defs>
                            <defs>
                                <linearGradient id="Gifts" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="greenyellow" stopOpacity={1} />
                                    <stop offset="95%" stopColor="green" stopOpacity={1} />
                                </linearGradient>
                            </defs>
                            <defs>
                                <linearGradient id="OfficeSupplies" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#EAEAEA" stopOpacity={1} />
                                    <stop offset="95%" stopColor="#9A9D9D" stopOpacity={1} />
                                </linearGradient>
                            </defs>
                            <Bar dataKey="Rent" stackId="a" fill="url(#Rent)" />
                            <Bar dataKey="Travel" stackId="a" fill="url(#Travel)" />
                            <Bar dataKey="Entertainments" stackId="a" fill="url(#Entertainments)" />
                            <Bar dataKey="Gifts" stackId="a" fill="url(#Gifts)" />
                            <Bar dataKey="OfficeSupplies" stackId="a" fill="url(#OfficeSupplies)" />
                        </BarChart>
                    </ResponsiveContainer>
                </Grid>
            </Grid>

        </JumboContentLayoutMain>
    );
}

export default Operations;