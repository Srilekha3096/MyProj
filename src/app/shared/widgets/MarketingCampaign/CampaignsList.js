import React from 'react';
import {List} from "@mui/material";
import {marketingCampaigns, menus} from "./data";
import CampaignItem from "./CampaignItem";

const CampaignsList = () => {
    return (
        
        <List disablePadding>
            {
                menus.map((item, index) => (
                    <CampaignItem item={item} key={index}/>
                ))
            }
            {
                marketingCampaigns.map((item, index) => (
                    <CampaignItem item={item} key={index}/>
                ))
            }
        </List>
    );
};

export default CampaignsList;
