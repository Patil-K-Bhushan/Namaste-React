import { createContext } from "react";
import { DEFAULT_COORDS } from "./getLocation";

/**
 * Provides the user's { lat, lng } to any component via useContext.
 * Defaults to Badlapur until the real location resolves.
 */
const LocationContext = createContext(DEFAULT_COORDS);

export default LocationContext;
