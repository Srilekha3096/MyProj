import React from 'react';
import NewSubscribersChart from "./NewSubscribersChart";
import StarIcon from '@mui/icons-material/Star';
import {Grid, Typography} from "@mui/material";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import {useTranslation} from "react-i18next";
import Div from '@jumbo/shared/Div';

const NewSubscribers = () => {
    const {t} = useTranslation();
    return (
        <Div
            title={<Typography variant='h4' sx={{color: 'black'}}>Total Budget</Typography>}
            // bgColor={"#E44A77"}
            // sx={{color: "common.black"}}
            wrapperSx={{pt: .5}}
        >
            <Grid container >
                <Grid item xs={12}>
                    <Typography variant={"h2"} color={"common.black"}>Total Budget</Typography>
                    <Typography variant={"h6"} color={"common.black"}
                                mb={0}>{t('widgets.subheader.newSubscribers')}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <NewSubscribersChart/>
                </Grid>
                
            </Grid>
        </Div>
    );
};

export default NewSubscribers;
