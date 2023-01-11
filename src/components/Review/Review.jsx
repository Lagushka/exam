import React from 'react';

export default function Review({ review }) {
  return (
    <div className="review">
      <span>{review.name}</span>
      <p>{review.text}</p>
    </div>
  );
}
