import React from 'react';
import { Routes, Route, Navigate } from 'react-router';
import Home from '../../routes/Home';
import PracticeStats from '../../routes/PracticeStats';
import Tyres from '../../routes/Tyres';
import Stints from '../../routes/Stints';
import TeamRadio from '../../routes/TeamRadio';
import Race from '../../routes/Race';

const AppRoute = () => (
  <Routes>
    <Route exact path="/" element={<Home />} />

    <Route exact path="/practiceStats" element={<PracticeStats />} />

    <Route exact path="/tyres" element={<Tyres />} />

    <Route exact path="/stints" element={<Stints />} />

    <Route exact path="/teamRadio" element={<TeamRadio />} />

    <Route exact path="/race" element={<Race />} />

    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoute;
