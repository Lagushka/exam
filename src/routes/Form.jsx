/* eslint-disable jsx-a11y/label-has-associated-control */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Header from '../components/Header/Header';

export default function Form() {
  const selectedForm = useParams().id;
  const [formData, setFormData] = useState({});
  useEffect(() => {
    axios.get(`https://my-json-server.typicode.com/lagushka/termworkDB/forms/${selectedForm}`)
      .then((response) => {
        setFormData(response.data);
      });
  }, []);
  return (
    <div className="form">
      <Header />
      <main>
        <h1>{formData.name}</h1>
        <form className="form__questions">
          {
            formData.questions && formData.questions.map((question) => (
              <div key={question.id} className="question">
                <label>{question.text}</label>
                <input type="text" />
              </div>
            ))
          }
          <input type="submit" value="Отправить" />
        </form>
      </main>
    </div>
  );
}
