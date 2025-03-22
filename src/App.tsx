import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './global.css';
import './colors.css'
import { AuthProvider } from './contexts/auth/AuthContext';
import RequireAuthAdmin from './contexts/auth/RequireAuthAdmin';
import LoginComponent from './pages/Login/Login';
import ForgetPasswordComponent from './pages/ForgetPassword/ForgetPassword';
import LandingPage from './pages/LandingPage/LandingPage';
import CreateTypeParameter from './pages/TypeParamter/CreateTypeParameter/CreateTypeParameter';
import UpdateTypeParameter from './pages/TypeParamter/UpdateTypeParameter/UpdateTypeParameter';
import Page404 from './pages/Page404/Page404';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginComponent />} />
            <Route path='/esqueci-senha' element={<ForgetPasswordComponent />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;