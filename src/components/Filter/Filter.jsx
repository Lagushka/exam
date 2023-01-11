import React, { useState } from 'react';

import closeIcon from './static/closeIcon.svg';
import classes from './Filter.module.css';

export default function Filter({ setFilterOpened, setQuestionsNum }) {
  const [inputValue, setInputValue] = useState(0);
  return (
    <div className={classes.filter}>
      <button className={classes.closeButton} type="button" onClick={() => setFilterOpened(false)}>
        <img src={closeIcon} alt="" width="30px" />
      </button>
      <div className={classes.filter}>
        <div className="questionsNum">
          <label>Количество вопросов</label>
          <input type="number" value={inputValue} inputMode="numeric" onChange={(event) => setInputValue(event.target.value)} />
        </div>
        <button type="button" onClick={() => setQuestionsNum(inputValue)}>Применить</button>
      </div>
    </div>
  );
}
