import React, { useState, useEffect } from 'react';
import { FaArrowCircleUp } from 'react-icons/fa';
import useResponsive from './useResponsive';

const ScrollToTop = ({ Scrollheight }) => {
  const [isVisible, setIsVisible] = useState(false);
  const isAboveXl = useResponsive("up", "xl");

  const handleScroll = () => {
    if (window.scrollY > Scrollheight) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTopHandler = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      style={{
        display: isVisible ? 'flex' : 'none',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        bottom: isAboveXl ? "10%" : "10.5%",
        right: '10px',
        zIndex: 99999,
        borderRadius: '50%',
        boxShadow: '0px 2px 9px lightgray',
        padding: 0.5,
        width: '35px',
        height: '35px',
        backgroundColor: 'white',
        color: '#00bfff',
        transition: 'linear 1.5s ease-in-out',
        cursor: 'pointer',
      }}
      onClick={scrollToTopHandler}
      className="topToBottomAnimation"
    >
      <FaArrowCircleUp size={22} />
    </div>
  );
};

export default ScrollToTop;
