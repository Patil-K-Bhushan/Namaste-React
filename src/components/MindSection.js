import { IoMdArrowRoundForward } from "react-icons/io";
import { IoMdArrowRoundBack } from "react-icons/io";
import "./styles/MindSection.css";
import { DISHES_URL } from "../utils/constants";
import { useRef } from "react";
import { Link } from "react-router-dom";

const MindSection = ({ dishes }) => {

  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  return (
    <div className="Mind">

      <div className="Title">

        <h3>What's on your mind?</h3>

        <div className="Arrows">
          <IoMdArrowRoundBack onClick={scrollLeft} />
          <IoMdArrowRoundForward onClick={scrollRight} />
        </div>

      </div>

      <div className="Dishes" ref={scrollRef}>

        {dishes?.map(({ id, imageId, action }) => {

          const url = new URL(action?.link);

          const collectionID =
            url.searchParams.get("collection_id");

          const tag =
            url.searchParams.get("tags");

          return (
            <Link
              key={id}
              to={`/collection/${collectionID}/${tag}`}
            >
              <img
                src={DISHES_URL + imageId}
                alt={action?.text}
              />
            </Link>
          );
        })}

      </div>
    </div>
  );
};

export default MindSection;