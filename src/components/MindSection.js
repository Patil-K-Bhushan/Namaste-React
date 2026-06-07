import { IoMdArrowRoundForward } from "react-icons/io";
import { IoMdArrowRoundBack } from "react-icons/io";
import "./styles/MindSection.css";
import { DISHES_URL } from "../utils/constants";
import { useRef } from "react";
import { Link } from "react-router-dom";

const MindSection = ({ dishes }) => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  if (!dishes || dishes.length === 0) return null;

  return (
    <div className="Mind">
      <div className="Title">
        <h3>What's on your mind?</h3>
        <div className="Arrows">
          <IoMdArrowRoundBack onClick={scrollLeft} aria-label="Scroll left" />
          <IoMdArrowRoundForward onClick={scrollRight} aria-label="Scroll right" />
        </div>
      </div>

      <div className="Dishes" ref={scrollRef}>
        {dishes.map(({ id, imageId, action }) => {
          let collectionID = null;
          let tag = null;

          try {
            const url = new URL(action?.link ?? "");
            collectionID = url.searchParams.get("collection_id");
            tag = url.searchParams.get("tags");
          } catch {
            // skip malformed or missing links
          }

          if (!collectionID) return null;

          return (
            <Link key={id} to={`/collection/${collectionID}/${tag}`}>
              <img
                src={DISHES_URL + imageId}
                alt={action?.text ?? "Dish category"}
                loading="lazy"
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MindSection;
