import React from 'react';
import JumboNavSection from "@jumbo/components/JumboVerticalNavbar/JumboNavSection";
import JumboNavCollapsible from "@jumbo/components/JumboVerticalNavbar/JumboNavCollapsible";
import JumboNavItem from "@jumbo/components/JumboVerticalNavbar/JumboNavItem";

const NAV_VARIANTS = {
    'section': JumboNavSection,
    'collapsible': JumboNavCollapsible,
    'nav-item': JumboNavItem
};

const JumboNavIdentifier = ({ item, isNested, translate }) => {
    if (!item || !item.type || !NAV_VARIANTS[item.type]) return null;

    const NavComponent = NAV_VARIANTS[item.type];

    return <NavComponent translate={translate} item={item} isNested={isNested} />;
};

JumboNavIdentifier.defaultProps = {
    isNested: false,
    translate: false // Default translate to false if not provided
};

export default JumboNavIdentifier;
