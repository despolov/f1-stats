import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Stats from '../../routes/Stats';

const AppRoute = () => (
  <Routes>
    <Route exact path="/" element={<Stats />} />
  </Routes>
);

export default AppRoute;
