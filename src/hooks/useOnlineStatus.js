import { useEffect, useState } from "react";

const useOnlineStatus = () => {
  const [onlineStatus, setOnlineStatus] = useState(navigator.onLine);

  useEffect(() => {
    const goOnline  = () => setOnlineStatus(true);
    const goOffline = () => setOnlineStatus(false);

    window.addEventListener("online",  goOnline);
    window.addEventListener("offline", goOffline);

    return () => {
      window.removeEventListener("online",  goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  return onlineStatus;
};

export default useOnlineStatus;
