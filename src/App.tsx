import './App.css'
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ProjectPage } from './pages/projects'
import { HomePage } from './pages/home'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useLayoutEffect } from 'react';

function AnimatedRoutes() {
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  // Home uses query params for in-page section navigation; don't remount on those.
  // Projects uses query params to choose which project is shown; do remount on those.
  const routeKey = location.pathname === '/projects'
    ? `${location.pathname}${location.search}`
    : location.pathname;

  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.28, ease: [0.16, 1, 0.3, 1] as const };

  // Single, predictable rule:
  // - Entering /projects always starts at top.
  // - Entering / with no explicit section target starts at top.
  // Any in-page section scroll is handled by HomePage.
  useLayoutEffect(() => {
    const root = document.documentElement;
    const prev = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';

    if (location.pathname === '/projects') {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }

    if (location.pathname === '/') {
      const params = new URLSearchParams(location.search);
      const section = params.get('section');
      if (!section) {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      }
    }

    root.style.scrollBehavior = prev;
  }, [location.pathname, location.search]);

  return (
    <AnimatePresence mode="sync" initial={false}>
      <Routes location={location} key={routeKey}>
        <Route
          path="/"
          element={
            <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={transition}>
              <HomePage />
            </motion.main>
          }
        />
        <Route
          path="/projects"
          element={
            <motion.main
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={transition}
            >
              <ProjectPage />
            </motion.main>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {

  return (
    <>
      <Router>
        <AnimatedRoutes />
      </Router>
    </>
  )
}

export default App
