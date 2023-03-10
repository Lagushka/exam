import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

import Header from '../../components/Header/Header';
import Filter from '../../components/Filter/Filter';
import upArrow from './static/up.svg';
import downArrow from './static/down.svg';
import Review from '../../components/Review/Review';
import ReviewForm from '../../components/ReviewForm/ReviewForm';
import Modal from '../../components/Modal/Modal';
import classes from './MainPage.module.css';

export default function MainPage() {
  const [forms, setForms] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [filterOpened, setFilterOpened] = useState(false);
  const [questionsNum, setQuestionsNum] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [sortDown, setSortDown] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [modalOpened, setModalOpened] = useState(false);
  useEffect(() => {
    axios.get('https://my-json-server.typicode.com/lagushka/termworkDB/forms/')
      .then((response) => {
        const buffer = [...response.data];
        buffer.sort((a, b) => a.name.localeCompare(b.name));
        setForms(buffer);
      });
    axios.get('https://my-json-server.typicode.com/lagushka/termworkDB/reviews/')
      .then((response) => {
        setReviews(response.data);
      });
  }, []);

  function sort() {
    const tempForms = [...forms];
    for (let i = 0; i < Math.floor(tempForms.length / 2); i += 1) {
      const tempBuf = { ...tempForms[i] };
      tempForms[i] = tempForms[tempForms.length - 1 - i];
      tempForms[tempForms.length - 1 - i] = tempBuf;
    }
    setSortDown(!sortDown);
    setForms(tempForms);
  }

  return (
    <div className="Page">
      <Header
        name={name}
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
      />
      <main className={classes.main}>
        <h1>Анкеты</h1>
        <div className={classes.utils}>
          <button type="button" className="filter" onClick={() => setFilterOpened(true)}>Фильтры</button>
          <input type="text" placeholder="Найти анкету" value={inputValue} onChange={(event) => setInputValue(event.target.value)} />
          <button type="button" className={classes.sort} onClick={() => sort()}>
            <span>Сортировка</span>
            <img src={sortDown ? downArrow : upArrow} alt="" height="20" />
          </button>
        </div>
        {
          filterOpened
            && (
            <Filter setFilterOpened={setFilterOpened} setQuestionsNum={setQuestionsNum} />
            )
        }
        <p className={classes.desc}>
          Первый в мире сайт, где вы можете проходить анкеты. Это весело и интересно!
        </p>
        <div className={classes.forms}>
          {
            forms.filter((form) => (
              (+questionsNum === 0 || form.questions.length === +questionsNum))
              && (!inputValue || form.name.toLowerCase().includes(inputValue.toLowerCase())))
              .map((form) => (
                <button type="button" key={form.id} className={classes.form} onClick={() => navigate(`/form/${form.id}`)}>
                  {form.name}
                </button>
              ))
          }
        </div>
        <div className={classes.reviews}>
          {
            reviews.map((review) => (
              <Review key={review.id} review={review} />
            ))
          }
        </div>
        <ReviewForm reviews={reviews} setReviews={setReviews} />
      </main>
      {
        modalOpened && <Modal setName={setName} setModalOpened={setModalOpened} />
      }
    </div>
  );
}
