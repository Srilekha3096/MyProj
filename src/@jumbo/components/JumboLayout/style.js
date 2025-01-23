import styled from "@mui/material/styles/styled";

export const DrawerHeader = styled('div')(({theme}) => {
    
    return ({
        display: 'flex',
        alignItems: 'center',
        padding: "8px 10px",
        // padding: theme.spacing(1, !isMiniAndClosed ? 3 : 2.5),   //change spacing 3 to 1.5
        justifyContent: 'space-between',
        height: '65px',    //change 80px to 70px
        lineHeight: "25px",
    })
});
