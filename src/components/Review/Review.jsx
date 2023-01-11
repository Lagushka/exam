import React from 'react';

import classes from './Review.module.css';

export default function Review({ review }) {
  return (
    <div className={classes.review}>
      <span>{review.name}</span>
      <p>{`"${review.text}"`}</p>
    </div>
  );
}
