import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PracticeStats from '../../routes/PracticeStats';

const AppRoute = () => (
  <Routes>
    <Route exact path="/practiceStats" element={<PracticeStats />} />

    <Route path="*" element={<Navigate to="/practiceStats" replace />} />
  </Routes>
);

export default AppRoute;
