import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

import Header from '../components/Header/Header';
import Filter from '../components/Filter/Filter';

export default function MainPage() {
  const [forms, setForms] = useState([]);
  const [filterOpened, setFilterOpened] = useState(false);
  const [questionsNum, setQuestionsNum] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get('https://my-json-server.typicode.com/lagushka/termworkDB/forms/')
      .then((response) => {
        setForms(response.data);
      });
  }, []);

  return (
    <div className="App">
      <Header />
      <main>
        <h1>Анкеты</h1>
        <button type="button" className="filter" onClick={() => setFilterOpened(true)}>Фильтры</button>
        {
          filterOpened
            && (
            <Filter setFilterOpened={setFilterOpened} setQuestionsNum={setQuestionsNum} />
            )
        }
        <span>Первый в мире сайт, где вы можете проходить анкеты. Это весело и интересно!</span>
        <div className="forms">
          {
            forms.filter((form) => (+questionsNum === 0 || form.questions.length === +questionsNum))
              .map((form) => (
                <button type="button" key={form.id} className="form" onClick={() => navigate(`/form/${form.id}`)}>
                  {form.name}
                </button>
              ))
          }
        </div>
      </main>
    </div>
  );
}
