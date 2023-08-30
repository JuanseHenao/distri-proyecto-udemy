import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const Rating = () => {
  const [rating, setRating] = useState(null);

  const handleRating = (value) => {
    if (rating === value) {
      // Si se hace clic en la misma estrella, reiniciar la calificación
      setRating(null);
    } else {
      // Establecer la nueva calificación
      setRating(value);
    }
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((value) => (
        <FaStar
          key={value}
          size={24}
          className={value <= rating ? "star active" : "star"}
          onClick={() => handleRating(value)}
        />
      ))}
      <p>Tu calificación: {rating}</p>
    </div>
  );
};

export default Rating;
