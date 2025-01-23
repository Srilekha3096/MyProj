import React, { useEffect, useCallback, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { isUrlInChildren } from '@jumbo/utils/urlHelpers';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import { ArrowWrapper } from '@jumbo/components/JumboVerticalNavbar/style';
import JumboNavIdentifier from '@jumbo/components/JumboVerticalNavbar/JumboNavIdentifier';
import { Popover } from '@mui/material';
import useJumboLayoutSidebar from '@jumbo/hooks/useJumboLayoutSidebar';
import { SIDEBAR_VIEWS } from '@jumbo/utils/constants/layout';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useTranslation } from 'react-i18next';


const menuBefore = {
    left: 0,
    top: 0,
    content: `''`,
    position: 'absolute',
    display: 'inline-block',
    width: '4px',
    height: '100%',
    backgroundColor: 'transparent',
};

const JumboNavCollapsible = ({ item, translate }) => {
    const [openMenu, setOpenMenu] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const openPopover = Boolean(anchorEl);
    const { t } = useTranslation();
    const location = useLocation();
    const { sidebarOptions } = useJumboLayoutSidebar();

    const isMiniAndClosed = useMemo(() => {
        return sidebarOptions?.view === SIDEBAR_VIEWS.MINI && !sidebarOptions?.open;
    }, [sidebarOptions]);


    const handlePopoverClose = useCallback(() => {
        setAnchorEl(null);
    }, []);

    useEffect(() => {
        if (isUrlInChildren(item, location.pathname)) {
            setOpenMenu(item.id);
        }
    }, [item, location.pathname, setOpenMenu]);

    const label = useMemo(() => {
        return translate ? t(item.label) : item.label;
    }, [item.label, translate, t]);

    const handleItemClick = useCallback((event) => {
        event.preventDefault();
        event.stopPropagation();
        setOpenMenu((prevOpenMenu) => (prevOpenMenu === item.id ? null : item.id));
    }, [item.id, setOpenMenu]);

    if (!item) return null;

    const subMenus = item.children ?? null;

    return (
        <>
            <ListItemButton
                component="li"
                onClick={handleItemClick}
                sx={{
                    padding: !isMiniAndClosed ? theme => theme.spacing(1, 3.75) : 0,
                    borderRadius: isMiniAndClosed ? '50%' : '0 24px 24px 0',
                    margin: isMiniAndClosed ? '0 auto' : '0',
                    width: isMiniAndClosed ? 40 : 'auto',
                    height: isMiniAndClosed ? 40 : 'auto',
                    justifyContent: isMiniAndClosed ? 'center' : 'flex-start',
                    '&:hover': {
                        color: theme => theme.palette.nav.action.hover,
                        backgroundColor: theme => theme.palette.nav.background.hover,
                        ...(!isMiniAndClosed ? {
                            '&::before': {
                                ...menuBefore,
                                backgroundColor: theme => theme.palette.nav.tick.hover,
                            }
                        } : {}),
                    },
                    ...(!isMiniAndClosed ? { '&::before': menuBefore } : {}),
                }}
            >
                {item.icon && (
                    <ListItemIcon sx={{ minWidth: isMiniAndClosed ? 20 : 32, color: 'inherit' }}>
                        {item.icon}
                    </ListItemIcon>
                )}
                {!isMiniAndClosed && (
                    <ListItemText
                        primary={label}
                        sx={{
                            margin: 0,
                            '& .MuiTypography-root': {
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            },
                        }}
                    />
                )}
                {!isMiniAndClosed && (
                    <ArrowWrapper>
                        {openMenu === item.id ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
                    </ArrowWrapper>
                )}
            </ListItemButton>
            {subMenus && !isMiniAndClosed && (
                <Collapse component="li" in={openMenu === item.id} timeout="auto" unmountOnExit>
                    <List disablePadding>
                        {subMenus.map((child, index) => (
                            <JumboNavIdentifier item={child} key={index} isNested />
                        ))}
                    </List>
                </Collapse>
            )}
            {subMenus && isMiniAndClosed && (
                <Popover
                    id="mouse-over-popover"
                    sx={{ pointerEvents: 'none' }}
                    open={openPopover}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                >
                    <List disablePadding>
                        {subMenus.map((child, index) => (
                            <JumboNavIdentifier item={child} key={index} isNested />
                        ))}
                    </List>
                </Popover>
            )}
        </>
    );
};

export default JumboNavCollapsible;
