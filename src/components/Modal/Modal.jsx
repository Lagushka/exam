import React, { useState } from 'react';

import classes from './Modal.module.css';

export default function Modal({ setName, setModalOpened }) {
  const [input, setInput] = useState('');
  return (
    <div className={classes.modal}>
      <div className={classes.modalWindow}>
        <h2>Логин</h2>
        <input className={classes.nameInput} type="text" inputMode="text" value={input} onChange={(event) => { setInput(event.target.value); }} />
        <button type="button" className={classes.button} onClick={() => { setName(input); setModalOpened(false); }}>Отправить</button>
      </div>
    </div>
  );
}
