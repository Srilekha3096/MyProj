import React, { useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import ListItemButton from '@mui/material/ListItemButton';
import { ListItemIcon, ListItemText } from '@mui/material';
import useJumboLayoutSidebar from '@jumbo/hooks/useJumboLayoutSidebar';
import { SIDEBAR_VIEWS } from '@jumbo/utils/constants/layout';
import { useTranslation } from 'react-i18next';

const menuBefore = {
    left: 0,
    top: 0,
    content: `''`,
    position: 'absolute',
    display: 'inline-block',
    width: '4px',
    height: '100%',
    backgroundColor: 'transparent'
};

const JumboNavItem = ({ item, isNested, translate }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { sidebarOptions } = useJumboLayoutSidebar();
    const { t } = useTranslation();

    const [open, setOpen] = useState(false); // State to manage open/close state of menu item

    const isMiniAndClosed = sidebarOptions?.view === SIDEBAR_VIEWS.MINI && !sidebarOptions?.open;

    const label = translate ? t(item.label) : item.label;

    const listItemButtonStyles = {
        p: 0,
        overflow: 'hidden',
        borderRadius: isMiniAndClosed ? '50%' : '0 24px 24px 0',
        margin: isMiniAndClosed ? '0 auto' : '0',
        ...(isMiniAndClosed) ? { width: 40, height: 40, justifyContent: 'center' } : {},
        ...(!isMiniAndClosed) ? { '&::before': menuBefore } : {},
        '&:hover': {
            color: theme => theme.palette.nav.action.hover,
            backgroundColor: theme => theme.palette.nav.background.hover,
            ...(!isMiniAndClosed) ? {
                '&::before': {
                    ...menuBefore,
                    backgroundColor: theme => theme.palette.nav.tick.hover,
                }
            } : {}
        },
        ...(location.pathname === item.uri && open) ? { // Adjusted to check if item is open
            color: theme => theme.palette.nav.action.active,
            backgroundColor: theme => theme.palette.nav.background.active,
            ...(!isMiniAndClosed) ? {
                '&::before': {
                    ...menuBefore,
                    backgroundColor: theme => theme.palette.nav.tick.active,
                }
            } : {},
        } : {},
    };

    const listItemTextStyles = {
        m: 0,
        pl: isNested ? 2 : 0,
        '& .MuiTypography-root': {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        },
    };

    const handleClick = () => {
        if (item.uri === location.pathname) {
            setOpen(!open); // Toggle open state if clicking the same menu item
        } else {
            setOpen(true); // Open the menu if it's closed
            navigate(item.uri);
            localStorage.setItem('dialogClosed', 'true'); // Corrected to set string value 'true'
        }
    };

    return (
        <ListItemButton component="li" onClick={handleClick} sx={listItemButtonStyles}>
            <Link
                underline="none"
                component={RouterLink}
                to={item.uri}
                {...(item.target ? { target: item.target } : {})}
                sx={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    overflow: 'hidden',
                    color: 'inherit',
                    p: theme => !isMiniAndClosed ? theme.spacing(1, 3.75) : 0,
                    ...(isMiniAndClosed) ? { justifyContent: 'center' } : {},
                }}
            >
                <ListItemIcon sx={{ minWidth: isMiniAndClosed ? 20 : 32, color: 'inherit', paddingLeft: 2 }}>
                    {item.icon}
                </ListItemIcon>
                {!isMiniAndClosed && (
                    <ListItemText primary={label} sx={listItemTextStyles} />
                )}
            </Link>
        </ListItemButton>
    );
};

export default JumboNavItem;
