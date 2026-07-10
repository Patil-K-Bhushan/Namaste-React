import { useState, useEffect } from "react";
import { PRE_SEARCH } from "../utils/constants";

const usePreSearch = (coords) => {
  const [heading, setHeading] = useState("");
  const [item, setItem] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError("");
        const res = await fetch(PRE_SEARCH(coords));
        if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
        const json = await res.json();
        setHeading(json?.data?.cards?.[1]?.card?.card?.header?.title || "");
        setItem(json?.data?.cards?.[1]?.card?.card?.imageGridCards?.info || []);
      } catch (err) {
        setError("Unable to load cuisines");
      }
    };
    fetchData();
  }, [coords]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(searchText.trim());
    }, 300);
    return () => clearTimeout(timer);
  }, [searchText]);

  return { heading, item, error, searchText, setSearchText, query };
};

export default usePreSearch;
