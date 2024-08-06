import React, { useState } from 'react';
import './styles.module.scss';

interface RatingProps {
  totalStars?: number;
}

const Rating: React.FC<RatingProps> = ({ totalStars = 10 }) => {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);

  const handleClick = (index: number) => {
    setRating(index);
  };

  const handleMouseOver = (index: number) => {
    setHoverRating(index);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <div className="rating">
      {Array.from({ length: totalStars }, (_, index) => index).map((star) => (
        <span
          key={star}
          className={`star ${star <= (hoverRating || rating) ? 'filled' : ''}`}
          onClick={() => handleClick(star)}
          onMouseOver={() => handleMouseOver(star)}
          onMouseLeave={handleMouseLeave}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default Rating;
