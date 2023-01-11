import axios from 'axios';
import React, { useState } from 'react';

import classes from './ReviewForm.module.css';

export default function ReviewForm({ reviews, setReviews }) {
  const [inputName, setInputName] = useState('');
  const [inputText, setInputText] = useState('');
  function sendReview() {
    const newReview = {
      id: reviews.length,
      name: inputName,
      text: inputText,
    };
    axios.post('https://my-json-server.typicode.com/lagushka/termworkDB/reviews', newReview)
      .then((response) => console.log(response));
    setReviews([...reviews, newReview]);
    setInputName('');
    setInputText('');
  }
  return (
    <form action="" className={classes.makeReview}>
      <label htmlFor="">Имя</label>
      <input type="text" inputMode="text" value={inputName} onChange={(event) => { setInputName(event.target.value); }} />
      <label htmlFor="">Ваш отзыв</label>
      <textarea cols="30" rows="10" value={inputText} onChange={(event) => { setInputText(event.target.value); }}>Вводите сюда</textarea>
      <button type="button" onClick={() => { sendReview(); }}>Отправить</button>
    </form>
  );
}
