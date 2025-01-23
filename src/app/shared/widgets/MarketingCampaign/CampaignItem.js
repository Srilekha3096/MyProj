import React from 'react';
import {ListItemText, Typography} from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";

const CampaignItem = ({item}) => {
    return (
        <ListItemButton component={"li"} sx={{p: theme => theme.spacing(1, 3)}}>
            {/* <ListItemAvatar>
                <Avatar alt={item.name} sx={{color: 'common.white', bgcolor: `${item.bgcolor}`}}>
                    {item.icon}
                </Avatar>
            </ListItemAvatar> */}
            <ListItemText 
            sx={{
                flexBasis: '10%'
            }} 
            primary={<Typography variant='h5' mb={.5}>{item.date}</Typography>}
                        //   secondary={item.desc}
            />
            <ListItemText primary={<Typography variant="body1" sx={{fontSize: 13}}>{item.gr_number}</Typography>}
                        //   secondary={"Spent"}
            />
            <ListItemText primary={<Typography variant="body1" sx={{fontSize: 13}}>{item.po_number}</Typography>}
                        //   secondary={"Spent"}
            />
            <ListItemText primary={<Typography variant="body1" sx={{fontSize: 13}}>{item.po_date}</Typography>}
                        //   secondary={"Spent"}
            />
            <ListItemText primary={<Typography variant="body1" sx={{fontSize: 13}}>{item.vendor_name}</Typography>}
                        //   secondary={"Spent"}
            />
             <ListItemText primary={<Typography variant="body1" sx={{fontSize: 13}}>{item.challan_no}</Typography>}
                        //   secondary={"Spent"}
            />
             <ListItemText primary={<Typography variant="body1" sx={{fontSize: 13}}>{item.action}</Typography>}
                        //   secondary={"Spent"}
            />
            {/* <ListItemText sx={{alignSelf: 'self-start', flexGrow: 0}}>
                <Typography variant='body1' component={"span"}>{item.growth}%</Typography>
                {item.growth > 0 ?
                    <TrendingUpIcon color='success' sx={{ml: 1, verticalAlign: 'middle'}} fontSize={"small"}/> :
                    <TrendingDownIcon color='error' sx={{ml: 1, verticalAlign: 'middle'}} fontSize={"small"}/>
                }
            </ListItemText> */}
        </ListItemButton>
    );
};
/* Todo item prop define */

export default CampaignItem;
