import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './pages/Login/Login';
import './global.css';
import './colors.css'
import { AuthProvider } from './contexts/auth/AuthContext';
import LoginComponent from './pages/Login/Login';
import RegisterComponent from './pages/Register/Register';
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