import "./RestaurantChain.css";
import RestaurantCard from "../RestaurantCard/RestaurantCard";
import { IoMdArrowRoundForward } from "react-icons/io";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRef } from "react";
import { Link } from "react-router-dom";

const RestaurantChain = ({ ChainHeader, Chains }) => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  if (!Chains || Chains.length === 0) return null;

  return (
    <div className="RestaurantChain">
      <div className="ChainTitle">
        <h3>{ChainHeader}</h3>
        <div className="Arrows">
          <IoMdArrowRoundBack onClick={scrollLeft} />
          <IoMdArrowRoundForward onClick={scrollRight} />
        </div>
      </div>

      <div className="ChainCards" ref={scrollRef}>
        {Chains.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={"/restaurant/" + restaurant.info.id}
          >
            <RestaurantCard data={restaurant.info} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RestaurantChain;
