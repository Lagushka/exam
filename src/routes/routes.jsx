import React from 'react';
import { useRoutes } from 'react-router-dom';
import Form from './Form';

import MainPage from './MainPage/MainPage';

const routes = [
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/form/:id',
    element: <Form />,
  },
];

export default function AppRouter() {
  const router = useRoutes(routes);

  return router;
}
