import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import Div from "@jumbo/shared/Div";
import {
    Box,
    Button,
    ButtonGroup,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { BASE_URL } from "app/services/auth-services";
import itemServices from "app/services/item-master-services";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { format } from "date-fns";
import { formatIndianNumber } from "app/shared/ReuseComponents/DateFormatter";
import HistoryOverview from "app/shared/ReuseComponents/HistoryOverview";


const ViewStoreSettings = ({
    scrollHeight,
    setListStore,
    setEditOverviewItem,
    currentData,
    setCurrentData
}) => {
    const token = localStorage.getItem("accesstoken");

    const header = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    };
    const Partner_Id = parseInt(localStorage.getItem("PartnerId"));


    const theme = useTheme();
    const isMdUp = useMediaQuery(theme.breakpoints.up('md'));



    const [itemGroups, setItemGroups] = useState([]);
    const [current, setCurrent] = useState(true);
    const [value, setValue] = useState("1");
    const [transactionHistory, setTransactionHistory] = useState([]);
    const [updateHistory, setUpdateHistory] = useState([]);
    const [dateFormat, setDateFormat] = useState("");

    // created by vijay

    const [itemList, setItemList] = useState([]);


    let userDetails = localStorage.getItem("UserDetails");
    userDetails = JSON.parse(userDetails);
    let companyId = userDetails && userDetails.Organization_Id;
    let id = userDetails && userDetails.id;

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleClickBack = () => {
        setListStore(true);
        setEditOverviewItem(false);
    };

    const getItemCategory = () => {
        var payload = {
            Search: "UOM",
        };
        itemServices
            .getUnits(payload, header)
            .then((res) => {
                console.log("res", res[0].value);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // item group
    const getActiveItemGroups = async () => {
        var payload = {
            page: 1,
            Is_Active: true,
            Is_Deleted: false,
        };
        // itemServices
        //   .activeItemGroups(payload, header)
        //   .then((res) => {
        //     console.log("res", res.results);
        //     setItemGroups(res.results);
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   });
        await axios.get(`${BASE_URL}/Erpapp/Itemgroupwithoutpagination/`, payload, header)
            .then((res) => {
                console.log("resssss", res?.data);
                setItemGroups(res?.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getItemCategory();
        getActiveItemGroups();
    }, []);

    const items = currentData?.Item?.map((opt) => opt);
    useEffect(() => {
        items?.forEach((item) => {
            axios
                .get(
                    `${BASE_URL}/Erpapp/Itemtransactionfilter/?Partner_Id=${Partner_Id}&Item_Name=${item?.Item_Name}`,
                    header
                )
                .then((res) => {
                    console.error("data", res?.data);
                    setTransactionHistory(res?.data);
                })
                .catch((error) => {
                    console.log("ds", error);
                });
        });

        // for history
        axios
            .get(
                `${BASE_URL}/Erpapp/Updaterecordsfilter/?Partner_Id=${Partner_Id}&Document_Id=${currentData?.Store_Id}`,
                header
            )
            .then((res) => {
                setUpdateHistory(res?.data);
            })
            .catch((error) => {
                console.log("ds", error);
            });
    }, [currentData]);


    let userId = parseInt(localStorage.getItem("UserId"));
    let partnerId = parseInt(localStorage.getItem("PartnerId"));


    useEffect(async () => {
        try {
            await axios
                .get(
                    `${BASE_URL}/Erpapp/Itemlistwithoutpagination/?Company_Id=${companyId}&Partner_Id=${partnerId}`, header
                )
                .then((res) => {
                    console.log("res", res);
                    setItemList(res?.data);
                })
                .catch((error) => {
                    console.log("Error in retrieving item master===>", error);
                });
        } catch (error) {
            console.log(error);
        }

    }, []);

    // useEffect(async () => {
    //   try {
    //     const findImage = await currentData?.Items?.map((img, index) => img?.Item_Name)
    //     console.log("findImage", findImage);
    //     // get a item image
    //     for (const item of findImage) {
    //       const matchingItem = itemList?.find((opt) => opt?.Item_Name === item);

    //       if (matchingItem) { // looping the array
    //         const itemsImage = matchingItem?.Upload_Image;
    //         console.log("itemImage", itemsImage);

    //         const image = await fetch(`${BASE_URL}${itemsImage}`)
    //           .then((response) => response.arrayBuffer())
    //           .then((buffer) => {
    //             const base64 = btoa(
    //               new Uint8Array(buffer).reduce(
    //                 (data, byte) => data + String.fromCharCode(byte),
    //                 ""
    //               )
    //             );
    //             return base64;
    //           })
    //           .catch((error) => {
    //             console.log("Error in retriving the item image", error);
    //           });
    //         setItemImage(image)
    //       }
    //     }
    //   }
    //   catch (err) {
    //     console.log(err);
    //   }
    // }, [currentData])


    // get date format from organization get api

    useEffect(() => {
        const fetchItemImages = async () => {
            try {
                if (!currentData || !currentData.Items || !itemList) {
                    return;
                }

                const itemImages = await Promise.all(
                    currentData?.Items?.map(async (item) => {
                        const matchingItem = itemList?.find((opt) => opt?.Item_Name === item?.Item_Name);
                        if (matchingItem) {
                            const itemsImage = matchingItem?.Upload_Image;
                            const response = await fetch(`${BASE_URL}${itemsImage}`);
                            const buffer = await response.arrayBuffer();
                            const base64 = btoa(
                                new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), "")
                            );
                            return base64;
                        }
                        return null;
                    })
                );

                const updatedData = {
                    ...currentData,
                    Items: currentData?.Items?.map((item, index) => ({
                        ...item,
                        Image: itemImages[index]
                    }))
                };

                // Set the updated data with item images
                // setCurrentData(updatedData);

            } catch (err) {
                console.log("Error in fetching item images:", err);
            }
        };

        fetchItemImages();
    }, []);



    useEffect(() => {
        axios
            .get(`${BASE_URL}/Erpapp/CompanyCRUD/?id=${companyId}`, header)
            .then((res) => {
                console.log("D", res?.data);
                setDateFormat(res?.data?.DateFormat);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


    return (
        <>
            <Div style={{ display: current ? "block" : "none" }}>
                <Typography variant="h3" sx={{ fontWeight: 600 }}>
                    Store Overview
                </Typography>

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

                        <TabPanel value="1" sx={{ p: 1.5, minHeight: "350px" }}>
                            <Div className="row mt-2">
                                <Div className="col col-sm-2 col-md-4 col-lg-3 col-xl-2">
                                    <Typography variant="h4" sx={{ fontSize: isMdUp ? "14px !important" : "12px !important" }}>Store Id</Typography>
                                    <Typography variant="h4" sx={{ fontSize: isMdUp ? "14px !important" : "12px !important" }}>Store Name</Typography>
                                    <Typography variant="h4" sx={{ fontSize: isMdUp ? "14px !important" : "12px !important" }}>Store Incharge</Typography>
                                    <Typography variant="h4" sx={{ fontSize: isMdUp ? "14px !important" : "12px !important" }}>Business Unit</Typography>
                                    <Typography variant="h4" sx={{ fontSize: isMdUp ? "14px !important" : "12px !important" }}>Created Date</Typography>
                                    <Typography variant="h4" sx={{ fontSize: isMdUp ? "14px !important" : "12px !important" }}>Longitude</Typography>
                                    <Typography variant="h4" sx={{ fontSize: isMdUp ? "14px !important" : "12px !important" }}>Latitude</Typography>
                                    <Typography variant="h4" sx={{ fontSize: isMdUp ? "14px !important" : "12px !important" }}>Store Address</Typography>
                                </Div>

                                <Div className="col col-sm-5 col-md-5 col-lg-5 col-xl-5">
                                    <Typography variant="h4" sx={{ fontSize: isMdUp ? "14px !important" : "12px !important" }}>
                                        : {currentData?.Store_Id || "-"}
                                    </Typography>
                                    <Typography variant="h4" sx={{ fontSize: isMdUp ? "14px !important" : "12px !important" }}>
                                        : {currentData?.Store_Name || "-"}
                                    </Typography>
                                    <Typography variant="h4" sx={{ fontSize: isMdUp ? "14px !important" : "12px !important" }}>
                                        : {currentData?.Store_Incharge || "-"}
                                    </Typography>
                                    <Typography variant="h4" sx={{ fontSize: isMdUp ? "14px !important" : "12px !important" }}>
                                        : {currentData?.Own_Partner || "-"}
                                    </Typography>
                                    <Typography variant="h4" sx={{ fontSize: isMdUp ? "14px !important" : "12px !important" }}>
                                        : {dateFormat &&
                                            currentData &&
                                            currentData?.Created_Date &&
                                            format(new Date(currentData?.Created_Date), dateFormat) || currentData?.Created_Date
                                        }
                                    </Typography>
                                    <Typography variant="h4" sx={{ fontSize: isMdUp ? "14px !important" : "12px !important" }}>
                                        : {currentData?.Longitude || "-"}
                                    </Typography>
                                    <Typography variant="h4" sx={{ fontSize: isMdUp ? "14px !important" : "12px !important" }}>
                                        : {currentData?.Lotitude || "-"}
                                    </Typography>
                                    <Typography variant="h4" sx={{ fontSize: isMdUp ? "14px !important" : "12px !important" }}>
                                        : {currentData?.StoreBuilding_Name},
                                        {currentData?.Store_Area},
                                        {currentData?.Store_City}, {currentData?.Store_State},
                                        {currentData?.Store_Country}
                                    </Typography>
                                </Div>
                            </Div>
                            <br />
                        </TabPanel>

                        <TabPanel value="2" sx={{ p: 1.5, minHeight: "350px" }}>
                            <Div>
                                <JumboScrollbar
                                    autoHeight={true}
                                    autoHideTimeout={4000}
                                    autoHeightMin={scrollHeight ? scrollHeight : 250}
                                    autoHide={true}
                                    hideTracksWhenNotNeeded
                                    id="no-more-tables"
                                >
                                    <Table className="table table-bordered">
                                        <TableHead className="table-head">
                                            <TableRow>
                                                <TableCell>Trn date</TableCell>
                                                <TableCell>Trn Type</TableCell>
                                                <TableCell>Store Id</TableCell>
                                                <TableCell>Store Name</TableCell>
                                                <TableCell

                                                    sx={{
                                                        minWidth: "100px !important",
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                    }}
                                                >
                                                    UOM
                                                </TableCell>
                                                <TableCell

                                                    sx={{
                                                        minWidth: "130px !important",
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                    }}
                                                >
                                                    Quantity
                                                </TableCell>
                                                <TableCell>Unit Price</TableCell>
                                                <TableCell>Value</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {transactionHistory?.GoodsRecipt != [] ? (
                                                <>
                                                    {transactionHistory?.GoodsRecipt?.map(
                                                        (receipt, index) => {
                                                            console.log("receipt", receipt);
                                                            const itemForReceipt = receipt?.Item?.find(
                                                                (item) =>
                                                                    items?.some(
                                                                        (opt) => opt?.Item_Name === item?.Item_Name
                                                                    )
                                                            );

                                                            return (
                                                                <TableRow key={index}>
                                                                    <TableCell>{receipt?.Created_Date}</TableCell>
                                                                    <TableCell>Material Receipt</TableCell>
                                                                    <TableCell>{receipt?.TrfIn_Id}</TableCell>
                                                                    <TableCell>
                                                                        {itemForReceipt
                                                                            ? itemForReceipt?.Item_Name
                                                                            : " "}
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {itemForReceipt ? itemForReceipt?.UOM : ""}
                                                                    </TableCell>
                                                                    <TableCell className="Amount_Fields">
                                                                        {itemForReceipt
                                                                            ? `${itemForReceipt?.Quantity}`
                                                                            : "0"}
                                                                    </TableCell>
                                                                    <TableCell className="Amount_Fields">
                                                                        {itemForReceipt
                                                                            ? `${formatIndianNumber(itemForReceipt?.Unit_Price)}`
                                                                            : "0.00"}
                                                                    </TableCell>
                                                                    <TableCell className="Amount_Fields">
                                                                        {itemForReceipt
                                                                            ? `${formatIndianNumber(itemForReceipt?.Amount)}`
                                                                            : "0.00"}
                                                                    </TableCell>
                                                                </TableRow>
                                                            );
                                                        }
                                                    )}

                                                    {transactionHistory?.Materialreturn?.map(
                                                        (receipt, index) => {
                                                            console.log("receipt", receipt);
                                                            const itemForReceipt = receipt?.Item?.find(
                                                                (item) =>
                                                                    items?.some(
                                                                        (opt) => opt?.Item_Name === item?.Item_Name
                                                                    )
                                                            );

                                                            return (
                                                                <TableRow key={index}>
                                                                    <TableCell>{receipt?.Created_Date}</TableCell>
                                                                    <TableCell>Material Return</TableCell>
                                                                    <TableCell>{receipt?.MatRet_Id}</TableCell>
                                                                    <TableCell>
                                                                        {itemForReceipt
                                                                            ? itemForReceipt?.Item_Name
                                                                            : " "}
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {itemForReceipt ? itemForReceipt?.UOM : ""}
                                                                    </TableCell>
                                                                    <TableCell className="Amount_Fields">
                                                                        {itemForReceipt
                                                                            ? `${itemForReceipt?.Quantity}`
                                                                            : "0"}
                                                                    </TableCell>
                                                                    <TableCell className="Amount_Fields">
                                                                        {itemForReceipt
                                                                            ? `${formatIndianNumber(itemForReceipt?.Unit_Price)}`
                                                                            : "0.00"}
                                                                    </TableCell>
                                                                    <TableCell className="Amount_Fields">
                                                                        {itemForReceipt
                                                                            ? `${formatIndianNumber(itemForReceipt?.Amount)}`
                                                                            : "0.00"}
                                                                    </TableCell>
                                                                </TableRow>
                                                            );
                                                        }
                                                    )}

                                                    {transactionHistory?.Materialtransfer?.map(
                                                        (receipt, index) => {
                                                            console.log("receipt", receipt);
                                                            const itemForReceipt = receipt?.Item?.find(
                                                                (item) =>
                                                                    items?.some(
                                                                        (opt) => opt?.Item_Name === item?.Item_Name
                                                                    )
                                                            );

                                                            return (
                                                                <TableRow key={index}>
                                                                    <TableCell>{receipt?.Created_Date}</TableCell>
                                                                    <TableCell>Material Transfer</TableCell>
                                                                    <TableCell>{receipt?.MatTransf_Id}</TableCell>
                                                                    <TableCell>
                                                                        {itemForReceipt
                                                                            ? itemForReceipt?.Item_Name
                                                                            : " "}
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {itemForReceipt ? itemForReceipt?.UOM : ""}
                                                                    </TableCell>
                                                                    <TableCell className="Amount_Fields">
                                                                        {itemForReceipt
                                                                            ? `${itemForReceipt?.Quantity}`
                                                                            : "0"}
                                                                    </TableCell>
                                                                    <TableCell className="Amount_Fields">
                                                                        {itemForReceipt
                                                                            ? `${formatIndianNumber(itemForReceipt?.Unit_Price)}`
                                                                            : "0.00"}
                                                                    </TableCell>
                                                                    <TableCell className="Amount_Fields">
                                                                        {itemForReceipt
                                                                            ? `${formatIndianNumber(itemForReceipt?.Amount)}`
                                                                            : "0.00"}
                                                                    </TableCell>
                                                                </TableRow>
                                                            );
                                                        }
                                                    )}
                                                    {transactionHistory?.MeterialRequest?.map(
                                                        (receipt, index) => {
                                                            console.log("receipt", receipt);
                                                            const itemForReceipt = receipt?.Item?.find(
                                                                (item) =>
                                                                    items?.some(
                                                                        (opt) => opt?.Item_Name === item?.Item_Name
                                                                    )
                                                            );

                                                            return (
                                                                <TableRow key={index}>
                                                                    <TableCell>{receipt?.Created_Date}</TableCell>
                                                                    <TableCell>Material Request</TableCell>
                                                                    <TableCell>{receipt?.MatReq_Id}</TableCell>
                                                                    <TableCell>
                                                                        {itemForReceipt
                                                                            ? itemForReceipt?.Item_Name
                                                                            : " "}
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {itemForReceipt ? itemForReceipt?.UOM : ""}
                                                                    </TableCell>
                                                                    <TableCell className="Amount_Fields">
                                                                        {itemForReceipt
                                                                            ? `${itemForReceipt?.Quantity}`
                                                                            : "0"}
                                                                    </TableCell>
                                                                    <TableCell className="Amount_Fields">
                                                                        {itemForReceipt
                                                                            ? `${formatIndianNumber(itemForReceipt?.Unit_Price)}`
                                                                            : "0.00"}
                                                                    </TableCell>
                                                                    <TableCell className="Amount_Fields">
                                                                        {itemForReceipt
                                                                            ? `${formatIndianNumber(itemForReceipt?.Amount)}`
                                                                            : "0.00"}
                                                                    </TableCell>
                                                                </TableRow>
                                                            );
                                                        }
                                                    )}
                                                </>
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
                            </Div>
                        </TabPanel>

                        <TabPanel value="3" sx={{ p: 1.5, minHeight: "350px" }}>
                            <HistoryOverview updatedHistory={updateHistory} itemId={"Store Id"} />
                        </TabPanel>
                    </TabContext>
                </Div>
            </Div>

            {/* code for save and back buttons */}
            <Div>
                <ButtonGroup aria-label="split button" onClick={handleClickBack}>
                    <Button className="plus-button">Close</Button>
                    <Button variant="contained" className="icon-button">
                        <MdClose size={18} />
                    </Button>
                </ButtonGroup>
            </Div>

            {/* <Div style={{ display: editItems ? "block" : "none" }}>
        <EditOverviewItem setCurrent={setCurrent} setEditItems={setEditItems} />
      </Div> */}
        </>
    );
};

export default ViewStoreSettings
