import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router';
import Home from '../../routes/Home';
import PracticeStats from '../../routes/PracticeStats';
import Tyres from '../../routes/Tyres';
import Stints from '../../routes/Stints';
import TeamRadio from '../../routes/TeamRadio';
import Race from '../../routes/Race';
import { locales, defaultLocale, getLocaleFromUrl } from '../../i18n';

const AppRoute = () => {
  const location = useLocation();
  const currentLocale = getLocaleFromUrl();

  useEffect(() => {
    const hash = window.location.hash;
    const path = hash.replace('#', '') || '/';
    const segments = path.split('/').filter(Boolean);
    const hasLocale = segments[0] && locales[segments[0]];

    if (!hasLocale) {
      const pathWithoutHash = path === '/' ? '' : path;
      window.location.hash = `#/${defaultLocale}${pathWithoutHash}`;
    }
  }, []);

  return (
    <Routes>
      {/* Routes without locale - redirect to default locale */}
      <Route
        exact
        path="/"
        element={<Navigate to={`/${defaultLocale}`} replace />}
      />
      <Route
        exact
        path="/practiceStats"
        element={<Navigate to={`/${defaultLocale}/practiceStats`} replace />}
      />
      <Route
        exact
        path="/tyres"
        element={<Navigate to={`/${defaultLocale}/tyres`} replace />}
      />
      <Route
        exact
        path="/stints"
        element={<Navigate to={`/${defaultLocale}/stints`} replace />}
      />
      <Route
        exact
        path="/teamRadio"
        element={<Navigate to={`/${defaultLocale}/teamRadio`} replace />}
      />
      <Route
        exact
        path="/race"
        element={<Navigate to={`/${defaultLocale}/race`} replace />}
      />

      {/* Localized routes */}
      <Route exact path="/:locale" element={<Home />} />
      <Route exact path="/:locale/practiceStats" element={<PracticeStats />} />
      <Route exact path="/:locale/tyres" element={<Tyres />} />
      <Route exact path="/:locale/stints" element={<Stints />} />
      <Route exact path="/:locale/teamRadio" element={<TeamRadio />} />
      <Route exact path="/:locale/race" element={<Race />} />

      <Route path="*" element={<Navigate to={`/${defaultLocale}`} replace />} />
    </Routes>
  );
};

export default AppRoute;
