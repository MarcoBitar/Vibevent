import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CoverPage from './pages/CoverPage/CoverPage.jsx';
import AuthPanel from './components/AuthPanel/AuthPanel.jsx';
import UserTabPage from './pages/UserTabPage/UserTabPage.jsx';
import ClubTabPage from './pages/ClubTabPage/ClubTabPage.jsx';
import NotificationHandler from './components/NotificationHandler.jsx';

function App() {
  return (
    <>
      {/* === Global Notification Listener === */}
      <NotificationHandler />

      {/* === App Routing === */}
      <Router>
        <Routes>
          {/* === Public Landing Page === */}
          <Route path="/" element={<CoverPage />} />

          {/* === Auth Panel (Login/Signup) === */}
          <Route path="/auth" element={<AuthPanel />} />

          {/* === User Dashboard Route === */}
          <Route path="/user">
            <Route path="dashboard" element={<UserTabPage />} />
          </Route>

          {/* === Club Dashboard Route === */}
          <Route path="/club">
            <Route path="dashboard" element={<ClubTabPage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;