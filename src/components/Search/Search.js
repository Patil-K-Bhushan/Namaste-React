import React, { useContext } from "react";
import { CiSearch } from "react-icons/ci";
import { IMG_CDN } from "../../utils/constants";
import "./Search.css";
import "./SearchResult.css";
import SearchResult from "./SearchResult";
import LocationContext from "../../contexts/LocationContext";
import usePreSearch from "../../hooks/usePreSearch";

const Search = () => {
  const coords = useContext(LocationContext);
  const { heading, item, error, searchText, setSearchText, query } = usePreSearch(coords);

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
      {error && <p className="error-message">{error}</p>}
      {query ? (
        <SearchResult query={query} coords={coords} />
      ) : (
        <>
          {heading && <div className="heading">{heading}</div>}
          {item.length > 0 && (
            <div className="cuisine-carousel">
              {item.map((cuisine) => (
                <img
                  key={cuisine.id}
                  src={IMG_CDN + cuisine.imageId}
                  alt={cuisine.action?.text ?? "Cuisine"}
                  loading="lazy"
                  onClick={() => setSearchText(decodeURIComponent(cuisine.action.link.split("query=")[1]))}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Search;
