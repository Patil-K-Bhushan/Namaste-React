import { useEffect, useState, useContext } from "react";
import { CiSearch } from "react-icons/ci";
import { PRE_SEARCH, IMG_CDN } from "../utils/constants";
import "./styles/Search.css";
import "./styles/SearchResult.css";
import SearchResult from "./SearchResult";
import LocationContext from "../utils/LocationContext";

const Search = () => {
  const [heading, setHeading] = useState("");
  const [item, setItem] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const coords = useContext(LocationContext);

  const fetchData = async () => {
    try {
      const res = await fetch(PRE_SEARCH(coords));

      if (!res.ok) {
        throw new Error(`HTTP Error ${res.status}`);
      }

      const json = await res.json();

      setHeading(
        json?.data?.cards?.[1]?.card?.card?.header?.title || ""
      );

      setItem(
        json?.data?.cards?.[1]?.card?.card?.imageGridCards?.info || []
      );
    } catch (err) {
      setError("Unable to load cuisines");
    }
  };

  useEffect(() => {
    fetchData();
  }, [coords]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(searchText.trim());
    }, 300);

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
                  onClick={() => {
                    const q = decodeURIComponent(
                      cuisine.action.link.split("query=")[1]
                    );
                    setSearchText(q);
                  }}
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
