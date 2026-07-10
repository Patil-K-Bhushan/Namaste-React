import { createContext } from "react";
import { DEFAULT_COORDS } from "../utils/getLocation";

const LocationContext = createContext(DEFAULT_COORDS);

export default LocationContext;
