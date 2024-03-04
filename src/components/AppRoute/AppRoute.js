import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PracticeStats from '../../routes/PracticeStats';
import Drivers from '../../routes/Drivers';
import Teams from '../../routes/Teams';

const AppRoute = () => (
  <Routes>
    <Route exact path="/practiceStats" element={<PracticeStats />} />

    <Route exact path="/drivers" element={<Drivers />} />

    <Route exact path="/teams" element={<Teams />} />

    <Route path="*" element={<Navigate to="/practiceStats" replace />} />
  </Routes>
);

export default AppRoute;
