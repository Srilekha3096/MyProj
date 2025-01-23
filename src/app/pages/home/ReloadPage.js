import React, { useEffect, useState } from "react";

const ReloadPage = () => {
  const [reload, setReload] = useState(false);
  const [timerId, setTimerId] = useState(null);

  useEffect(() => {
    console.log("Reload");
    const handleTick = () => {
      setReload(true);
      setTimeout(() => setReload(false), 0);
    };

    const newTimerId = setTimeout(handleTick, 800);
    setTimerId(newTimerId);

    // Cancel the timer when the component is unmounted
    return () => {
      clearTimeout(timerId);
    };
  }, []);

  if (reload) {
    return null;
  }
  return <div></div>;
};

export default ReloadPage;
