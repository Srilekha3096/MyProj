import React, { useState, useEffect } from 'react'
import { GoogleMap, MarkerF, useJsApiLoader, InfoWindowF } from '@react-google-maps/api';
import { Typography, Box, TextField, ButtonGroup, Button, Grid, Autocomplete, FormControl } from '@mui/material';
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
    { month: 'Jan', Target: 4000, Achieved: 2400, amt: 2400 },
    { month: 'Feb', Target: 3000, Achieved: 1398, amt: 2210 },
    { month: 'Mar', Target: 2000, Achieved: 9800, amt: 2290 },
    { month: 'Apr', Target: 2780, Achieved: 3908, amt: 2000 },
    { month: 'May', Target: 1890, Achieved: 4800, amt: 2181 },
    { month: 'Jun', Target: 2390, Achieved: 3800, amt: 2500 },
    { month: 'Jul', Target: 3490, Achieved: 4300, amt: 2100 },
];


const countryOptions = Country.getAllCountries();


const UsersTargetAndAchieved = () => {

    const [selectedMarker, setSelectedMarker] = useState(null)
    const [datas, setDatas] = useState()
    const [latitude, setLatitude] = useState()
    const [longitude, setLongitude] = useState()
    const [searchedCity, setSearchedCity] = useState()
    const [isSearchClicked, setIsSearchClicked] = useState(false)
    const [searchedDatas, setSearchedDatas] = useState(null);
    const [locationData, setLocationData] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [zoomLevel, setZoomLevel] = useState(3);
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
            <Typography variant='h1'>User Target vs Achieved</Typography>

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
                        <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip labelStyle={{ color: 'black' }} itemStyle={{ color: 'black' }} cursor={false} />
                            <Legend />
                            {/* Define linear gradients */}
                            <defs>
                                <linearGradient id="targetGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6200EE" stopOpacity={1} />
                                    <stop offset="95%" stopColor="#B819D2" stopOpacity={1} />
                                </linearGradient>
                                <linearGradient id="achievedGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#1ABBDE" stopOpacity={1} />
                                    <stop offset="95%" stopColor="#09BCA7" stopOpacity={1} />
                                </linearGradient>
                            </defs>

                            <Bar dataKey="Target" fill="url(#targetGradient)" />
                            <Bar dataKey="Achieved" fill="url(#achievedGradient)" />
                        </BarChart>
                    </ResponsiveContainer>
                </Grid>
            </Grid>

        </JumboContentLayoutMain>
    );
}

export default UsersTargetAndAchieved