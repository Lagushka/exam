import React from 'react';

import classes from './Header.module.css';

export default function Header({ name, modalOpened, setModalOpened }) {
  return (
    <header className={classes.header}>
      <a href="/">Главная</a>
      {
        name ? <span>{name}</span> : <button type="button" onClick={() => { setModalOpened(!modalOpened); }}>Логин</button>
      }
    </header>
  );
}
