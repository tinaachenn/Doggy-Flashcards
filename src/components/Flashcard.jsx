import React, { useState, useEffect } from "react";
import "../App.css";

const Flashcard = (props) => {

    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
      // Reset flip state when props change
      setIsFlipped(false);
    }, [props]);

    const handleClick = () => {
      setIsFlipped(!isFlipped);
    };

  return (
    <div className="flashcard" onClick={handleClick}>
      {isFlipped ? (
        <div className="flashcard-front">
          <h4>{props.answer}</h4>
        </div>
      ) : (
        <div className="flashcard-back">
          <h4>{props.question}</h4>
          <img src={props.imgSrc}/>
        </div>
      )}
    </div>
  );
}
export default Flashcard;