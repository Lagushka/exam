import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

import Header from '../../components/Header/Header';
import Filter from '../../components/Filter/Filter';
import upArrow from './static/up.svg';
import downArrow from './static/down.svg';

export default function MainPage() {
  const [forms, setForms] = useState([]);
  const [filterOpened, setFilterOpened] = useState(false);
  const [questionsNum, setQuestionsNum] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [sortDown, setSortDown] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get('https://my-json-server.typicode.com/lagushka/termworkDB/forms/')
      .then((response) => {
        const buffer = [...response.data];
        buffer.sort((a, b) => a.name.localeCompare(b.name));
        setForms(buffer);
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
    <div className="App">
      <Header />
      <main>
        <h1>Анкеты</h1>
        <div className="utils">
          <button type="button" className="filter" onClick={() => setFilterOpened(true)}>Фильтры</button>
          <input type="text" placeholder="Найти анкету" value={inputValue} onChange={(event) => setInputValue(event.target.value)} />
          <button type="button" className="sort" onClick={() => sort()}>
            <span>Сортировка</span>
            <img src={sortDown ? upArrow : downArrow} alt="" />
          </button>
        </div>
        {
          filterOpened
            && (
            <Filter setFilterOpened={setFilterOpened} setQuestionsNum={setQuestionsNum} />
            )
        }
        <span>Первый в мире сайт, где вы можете проходить анкеты. Это весело и интересно!</span>
        <div className="forms">
          {
            forms.filter((form) => (
              (+questionsNum === 0 || form.questions.length === +questionsNum))
              && (!inputValue || form.name.toLowerCase().includes(inputValue.toLowerCase())))
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
