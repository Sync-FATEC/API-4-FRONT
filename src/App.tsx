import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './pages/auth/login';
import './global.css';
import './colors.css'
import { AuthProvider } from './contexts/auth/AuthContext';
import LoginComponent from './pages/auth/login';
import RegisterComponent from './pages/auth/register';
import RequireAuthAdmin from './contexts/auth/RequireAuthAdmin';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/register" element={<RegisterComponent />} />
            <Route path="*" element={<RequireAuthAdmin><div>padwawd</div></RequireAuthAdmin>} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;