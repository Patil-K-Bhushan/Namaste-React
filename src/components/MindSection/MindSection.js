import React, { useRef } from "react";
import { IoMdArrowRoundForward, IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { DISHES_URL } from "../../utils/constants";
import "./MindSection.css";

const parseActionLink = (link) => {
  try {
    const url = new URL(link ?? "");
    return {
      collectionID: url.searchParams.get("collection_id"),
      tag: url.searchParams.get("tags"),
    };
  } catch {
    return { collectionID: null, tag: null };
  }
};

const MindSection = ({ dishes }) => {
  const scrollRef = useRef(null);

  const scroll = (offset) => {
    scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  if (!dishes || dishes.length === 0) return null;

  return (
    <div className="Mind">
      <div className="Title">
        <h3>What's on your mind?</h3>
        <div className="Arrows">
          <IoMdArrowRoundBack onClick={() => scroll(-300)} aria-label="Scroll left" />
          <IoMdArrowRoundForward onClick={() => scroll(300)} aria-label="Scroll right" />
        </div>
      </div>
      <div className="Dishes" ref={scrollRef}>
        {dishes.map(({ id, imageId, action }) => {
          const { collectionID, tag } = parseActionLink(action?.link);
          if (!collectionID) return null;
          return (
            <Link key={id} to={`/collection/${collectionID}/${tag}`}>
              <img src={DISHES_URL + imageId} alt={action?.text ?? "Dish category"} loading="lazy" />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MindSection;
