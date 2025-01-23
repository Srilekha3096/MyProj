import React, {useState, useEffect, useRef } from "react";

const ClickOutsideWrapper = ({ children, onClickOutside }) => {
    const wrapperRef = useRef(null);
    const [isSelectFocused, setIsSelectFocused] = useState(false);
  
    const handleClickOutside = (event) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target) &&
        !isSelectFocused
      ) {
        onClickOutside();
      }
    };
  
    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [onClickOutside, isSelectFocused]);
  
    return (
      <div ref={wrapperRef}>
        {React.Children.map(children, (child) =>
          React.cloneElement(child, {
            onFocus: () => setIsSelectFocused(true),
            onBlur: () => setIsSelectFocused(false),
          })
        )}
      </div>
    );
  };

export default ClickOutsideWrapper