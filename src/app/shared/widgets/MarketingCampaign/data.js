import RefreshIcon from "@mui/icons-material/Refresh";
import ArticleIcon from "@mui/icons-material/Article";
import React from "react";
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import GoogleIcon from '@mui/icons-material/Google';


export const marketingCampaigns = [

    {
        id: 1,
        date: '25-11-2022',
        desc: '43 Likes, 545 Shares',
        icon: <TwitterIcon/>,
        bgcolor: '#17A9FC',
        gr_number: "GR001",
        po_number: "PO001",
        po_date: "22-12-2022",
        vendor_name: "Ponkumar",
        challan_no: "CH001",
        action: "Action",
    },

    {
        id: 2,
        date: '26-11-2022',
        desc: '83 Follows, 79 Likes',
        icon: <InstagramIcon/>,
        bgcolor: '#CC4BB7',
        gr_number: "GR002",
        po_number: "PO002",
        po_date: "22-12-2022",
        vendor_name: "Ponkumar",
        challan_no: "CH002",
        action: "Action",
    },

    {
        id: 3,
        date: '27-11-2022',
        desc: '63 Likes, 387 Shares',
        icon: <GoogleIcon />,
        bgcolor: '#4181ED',
        gr_number: "GR003",
        po_number: "PO003",
        po_date: "22-12-2022",
        vendor_name: "Ponkumar",
        challan_no: "CH003",
        action: "Action",
    },
 
];

export const menuItems = [
    {
        icon: <RefreshIcon size={20}/>,
        title: "Refresh",
        slug: "refresh"
    },
    {
        icon: <ArticleIcon size={20}/>,
        title: "All campaigns",
        slug: "articles",
    }
];

export const menus = [
    {
        date: 'Date',
        color: "#000000",
        gr_number: "GR No",
        po_number: "PO No",
        po_date: "PO Date",
        vendor_name: "Vendor Name",
        challan_no: "Challan No",
        action: "Action",
    }
]