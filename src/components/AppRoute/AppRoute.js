import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PracticeStats from '../../routes/PracticeStats';
import Tyres from '../../routes/Tyres';

const AppRoute = () => (
  <Routes>
    <Route exact path="/practiceStats" element={<PracticeStats />} />

    <Route exact path="/tyres" element={<Tyres />} />

    <Route path="*" element={<Navigate to="/practiceStats" replace />} />
  </Routes>
);

export default AppRoute;
