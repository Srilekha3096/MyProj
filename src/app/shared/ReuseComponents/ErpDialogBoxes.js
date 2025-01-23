import Div from '@jumbo/shared/Div'
import { Box, Button, ButtonGroup, Dialog, DialogActions, DialogContent, IconButton, Typography, styled, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import { MdCheck, MdClear, MdClose, MdDelete } from 'react-icons/md'
import { TiCancel } from 'react-icons/ti'


const DialogBox = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        borderRadius: 5,
        backgroundColor: theme.palette.background.default,
        border: `1px solid ${theme.palette.divider}`,
    },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    color: theme.palette.error.main,
    '&:hover': {
        backgroundColor: theme.palette.error.light,
        color: theme.palette.background.default,
    },
}));

const CustomTypography = styled(Typography)(({ theme }) => ({
    padding: theme.spacing(0.5),
    textAlign: 'left',
    // backgroundColor: theme.palette.error.light,
    // color: theme.palette.error.contrastText,
    borderRadius: theme.shape.borderRadius,
}));


export const ErpDeleteDialogBox = ({ flag, setFlag, handleClick, content, id, isMobile }) => {
    const theme = useTheme();
    const isMdUp = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <DialogBox open={flag}
            maxWidth={window.innerWidth <= 600 ? 'xs' : window.innerWidth <= 768 ? 'sm' : window.innerWidth <= 992 ? 'sm' : 'sm'}
            fullWidth
            onClose={() => setFlag(false)}
        >
            <DialogContent>
                <Typography variant="h3">
                    {content}
                    <span>&nbsp;</span>
                    <span style={{ fontWeight: 700 }}>
                        {" "}
                        "{id}" ?
                    </span>
                </Typography>
            </DialogContent>
            <DialogActions>
                {isMobile ? isMobile : isMdUp ? (
                    <>
                        <Button variant="contained" color={"error"} endIcon={<MdDelete />} onClick={handleClick}>
                            Delete
                        </Button>
                        <Button variant="contained" endIcon={<TiCancel />} onClick={() => setFlag(false)}>
                            Cancel
                        </Button>
                    </>
                ) :
                    <Div className="buttons">
                        <ButtonGroup
                            aria-label="split button"
                            onClick={handleClick}
                            sx={{
                                mt: { xs: 0.5, lg: 0 },
                                mr: { xs: 0, md: 1 }
                            }}
                        >
                            <Button className="plus-button">
                                Delete
                            </Button>
                            <Button variant="contained" className="icon-button">
                                <MdDelete size={18} />
                            </Button>
                        </ButtonGroup>

                        <ButtonGroup
                            aria-label="split button"
                            onClick={() => setFlag(false)}
                            sx={{
                                mt: { xs: 0.5, lg: 0 },
                                mr: { xs: 0, md: 1 }
                            }}
                        >
                            <Button className="plus-button">Cancel</Button>
                            <Button variant="contained" className="icon-button">
                                <TiCancel size={22} />
                            </Button>
                        </ButtonGroup>
                    </Div>
                }
            </DialogActions>
        </DialogBox>
    )
}


export const ErpConfirmDialogBox = ({ flag, setFlag, handleClick, content, isMobile }) => {
    return (
        <Dialog
            open={flag}
            maxWidth="sm"
            fullWidth
        >
            <DialogContent>
                <Typography variant='h4'>
                    {content}
                </Typography>
                <br />
                <Typography variant='h4'>
                    Do you want still to continue...
                </Typography>
            </DialogContent>
            <DialogActions>
                {isMobile ? (
                    <>
                        <Button variant="contained" color={"error"} endIcon={<MdCheck />} onClick={() => setFlag(false)} >
                            Yes
                        </Button>
                        <Button variant="contained" endIcon={<MdClear />} onClick={handleClick}>
                            No
                        </Button>
                    </>
                ) :
                    <Div className="buttons">
                        <ButtonGroup
                            aria-label="split button"
                            onClick={() => setFlag(false)}
                            sx={{
                                mt: { xs: 0.5, lg: 0 },
                                mr: { xs: 0, md: 1 }
                            }}
                        >
                            <Button className="plus-button">
                                Yes
                            </Button>
                            <Button variant="contained" className="icon-button">
                                <MdCheck size={16} />
                            </Button>
                        </ButtonGroup>
                        <ButtonGroup
                            aria-label="split button"
                            onClick={handleClick}
                            sx={{
                                mt: { xs: 0.5, lg: 0 },
                                mr: { xs: 0, md: 1 }
                            }}
                        >
                            <Button className="plus-button">
                                No
                            </Button>
                            <Button variant="contained" className="icon-button">
                                <MdClear size={16} />
                            </Button>
                        </ButtonGroup>
                    </Div>
                }
            </DialogActions>
        </Dialog>
    )
}


export const ErpStatusConfirmDialogBox = ({ flag, setFlag, handleClick, content, isMobile }) => {
    return (
        <Dialog
            open={flag}
            maxWidth="sm"
            fullWidth
        >
            <DialogContent>
                <Typography variant='h4'>
                    {content}
                </Typography>
            </DialogContent>
            <DialogActions>
                {isMobile ? (
                    <>
                        <Button variant="contained" color={"error"} endIcon={<MdCheck />} onClick={handleClick} >
                            Yes
                        </Button>
                        <Button variant="contained" endIcon={<MdClear />} onClick={() => setFlag(false)} >
                            No
                        </Button>
                    </>
                ) :
                    <Div className="buttons">
                        <ButtonGroup
                            aria-label="split button"
                            onClick={handleClick}
                            sx={{
                                mt: { xs: 0.5, lg: 0 },
                                mr: { xs: 0, md: 1 }
                            }}
                        >
                            <Button className="plus-button">
                                Yes
                            </Button>
                            <Button variant="contained" className="icon-button">
                                <MdCheck size={16} />
                            </Button>
                        </ButtonGroup>
                        <ButtonGroup
                            aria-label="split button"
                            onClick={() => setFlag(false)}
                            sx={{
                                mt: { xs: 0.5, lg: 0 },
                                mr: { xs: 0, md: 1 }
                            }}
                        >
                            <Button className="plus-button">
                                No
                            </Button>
                            <Button variant="contained" className="icon-button">
                                <MdClear size={16} />
                            </Button>
                        </ButtonGroup>
                    </Div>
                }
            </DialogActions>
        </Dialog>
    )
}


export const ErpAlertViewDialogBox = ({ flag, setFlag, isMobile }) => {
    return (
        <DialogBox
            open={flag}
            maxWidth="xs"
        // onClose={() => setFlag(false)} // Optional: You can enable this if you want the dialog to close on backdrop click.
        >
            <DialogContent>
                <Div sx={{ p: 0, m: 0, mb: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <CustomTypography variant='h3'>
                        Alert
                    </CustomTypography>

                    <StyledIconButton onClick={() => setFlag(false)} sx={{ p: 0.3 }}>
                        <MdClose size={22} />
                    </StyledIconButton>
                </Div>
                <Typography variant='h4' sx={{ color: 'text.secondary' }}>
                    You don't have the permission to view this page.
                </Typography>
            </DialogContent>
        </DialogBox>
    )
}


