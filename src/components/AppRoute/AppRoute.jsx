import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../../routes/Home';
import PracticeStats from '../../routes/PracticeStats';
import Tyres from '../../routes/Tyres';
import Stints from '../../routes/Stints';

const AppRoute = () => (
  <Routes>
    <Route exact path="/" element={<Home />} />

    <Route exact path="/practiceStats" element={<PracticeStats />} />

    <Route exact path="/tyres" element={<Tyres />} />

    <Route exact path="/stints" element={<Stints />} />

    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoute;
