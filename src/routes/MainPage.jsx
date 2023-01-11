import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';

export default function MainPage() {
  const [forms, setForms] = useState([]);
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
        <span>Первый в мире сайт, где вы можете проходить анкеты. Это весело и интересно!</span>
        <div className="forms">
          {
            forms.map((form) => (
              <button type="button" key={form.id} className="form" onClick={() => navigate(`/form/${form.id}`)}>
                <span>{form.name}</span>
              </button>
            ))
          }
        </div>
      </main>
    </div>
  );
}
