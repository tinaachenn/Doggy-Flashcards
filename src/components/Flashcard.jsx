import React, { useState, useEffect } from "react";
import "../App.css";

const Flashcard = (props) => {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    setIsFlipped(false);
  }, [props]);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className={`flashcard ${isFlipped ? "flipped" : ""}`} onClick={handleClick}>
      <div className="flashcard-inner">
        <div className="flashcard-front">
          <h4>{props.question}</h4>
          <img src={props.imgSrc} alt="Breed" />
        </div>
        <div className="flashcard-back">
          <h4>{props.answer}</h4>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
