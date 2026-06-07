import { useEffect, useState } from "react";

const useOnlineStatus = () => {
  // Use navigator.onLine for the real initial state instead of hardcoding true
  const [onlineStatus, setOnlineStatus] = useState(navigator.onLine);

  useEffect(() => {
    const goOnline  = () => setOnlineStatus(true);
    const goOffline = () => setOnlineStatus(false);

    window.addEventListener("online",  goOnline);
    window.addEventListener("offline", goOffline);

    // Cleanup — prevents memory leaks on unmount
    return () => {
      window.removeEventListener("online",  goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  return onlineStatus;
};

export default useOnlineStatus;
