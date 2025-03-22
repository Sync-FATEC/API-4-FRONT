import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './global.css';
import './colors.css'
import { AuthProvider } from './contexts/auth/AuthContext';
import RequireAuthAdmin from './contexts/auth/RequireAuthAdmin';
import LoginComponent from './pages/Login/Login';
import ForgetPasswordComponent from './pages/ForgetPassword/ForgetPassword';
import LandingPage from './pages/LandingPage/LandingPage';
import ModalAdmin from './components/modalAdmin/ModalAdmin';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginComponent />} />
            <Route path='/esqueci-senha' element={<ForgetPasswordComponent />} />
            <Route path="/" element={<ModalAdmin />} />
            <Route path="*" element={<RequireAuthAdmin><div>Pagina não encontrada</div></RequireAuthAdmin>} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;