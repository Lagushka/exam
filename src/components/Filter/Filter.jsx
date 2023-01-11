import React, { useState } from 'react';

import closeIcon from './static/closeIcon.svg';

export default function Filter({ setFilterOpened, setQuestionsNum }) {
  const [inputValue, setInputValue] = useState(0);
  return (
    <div className="filter">
      <div className="head">
        <span>Filter</span>
        <button type="button" onClick={() => setFilterOpened(false)}>
          <img src={closeIcon} alt="" />
        </button>
      </div>
      <div className="filters">
        <div className="questionsNum">
          <label>Количество вопросов</label>
          <input type="number" value={inputValue} onChange={(event) => setInputValue(event.target.value)} />
        </div>
        <button type="button" onClick={() => setQuestionsNum(inputValue)}>Применить</button>
      </div>
    </div>
  );
}
