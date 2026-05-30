import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { PRE_SEARCH, IMG_CDN } from "../utils/constants";
import "./styles/Search.css";
import "./styles/SearchResult.css";
import SearchResult from "./SearchResult";

const Search = () => {
  const [heading, setHeading] = useState("");
  const [item, setItem] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [query, setQuery] = useState("");

  const fetchData = async () => {
    const res = await fetch(PRE_SEARCH);
    const json = await res.json();
    setHeading(json?.data?.cards?.[1]?.card?.card?.header?.title);
    setItem(json?.data?.cards?.[1]?.card?.card?.imageGridCards?.info);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setQuery(searchText.trim()), 300);
    return () => clearTimeout(timer);
  }, [searchText]);

  return (
    <div className="search-page">
      <div className="search-container">
        <CiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search for restaurants and food"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {query ? (
        <SearchResult query={query} />
      ) : (
        <>
          <div className="heading">{heading}</div>
          <div className="cuisine-crousel">
            {item?.map((cuisine) => (
              <img
                key={cuisine.id}
                src={IMG_CDN + cuisine.imageId}
                alt="cuisine"
                onClick={() => {
                  const q = decodeURIComponent(
                    cuisine.action.link.split("query=")[1]
                  );
                  setSearchText(q);
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Search;
