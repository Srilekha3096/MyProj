import React, { useMemo, useState, useEffect } from 'react';
import ListSubheader from "@mui/material/ListSubheader";
import JumboNavIdentifier from "@jumbo/components/JumboVerticalNavbar/JumboNavIdentifier";
import useJumboLayoutSidebar from "@jumbo/hooks/useJumboLayoutSidebar";
import { SIDEBAR_VIEWS } from "@jumbo/utils/constants/layout";
import { useTranslation } from "react-i18next";

const JumboNavSection = ({ item, translate }) => {
    const { sidebarOptions } = useJumboLayoutSidebar();
    const { t } = useTranslation();

    // Memoized variables
    const isMiniAndClosed = useMemo(() => {
        return sidebarOptions?.view === SIDEBAR_VIEWS.MINI && !sidebarOptions?.open;
    }, [sidebarOptions?.view, sidebarOptions?.open]);

    const label = useMemo(() => {
        return translate ? t(item.label) : item.label;
    }, [item, translate, t]);

    const subMenus = useMemo(() => {
        return item?.children?.length > 0 ? item.children : null;
    }, [item]);

    // State to track active menu
    const [activeMenu, setActiveMenu] = useState(null);

    // Handle menu click to toggle active state
    const handleMenuClick = (menuId) => {
        setActiveMenu((prevMenu) => (prevMenu === menuId ? null : menuId));
    };

    // Reset active menu when sidebar switches to MINI mode
    useEffect(() => {
        if (isMiniAndClosed && activeMenu) {
            setActiveMenu(null);
        }
    }, [isMiniAndClosed, activeMenu]);

    if (!item || !item.label) return null;

    return (
        <>
            {!isMiniAndClosed && (
                <ListSubheader
                    component="li"
                    disableSticky
                    sx={{
                        fontSize: '80%',
                        fontWeight: '400',
                        lineHeight: 'normal',
                        textTransform: 'uppercase',
                        bgcolor: 'transparent',
                        padding: (theme) => theme.spacing(3.75, 3.75, 1.875),
                    }}
                >
                    {label}
                </ListSubheader>
            )}
            {subMenus &&
                subMenus.map((child, index) => (
                    <JumboNavIdentifier
                        key={index}
                        item={child}
                        isActive={activeMenu === child.id}
                        onClick={() => handleMenuClick(child.id)}
                    />
                ))}
        </>
    );
};

// Memoize the component to optimize re-rendering
export default React.memo(JumboNavSection);
