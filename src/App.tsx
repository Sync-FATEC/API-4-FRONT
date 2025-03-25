import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './global.css';
import './colors.css'
import { AuthProvider } from './contexts/auth/AuthContext';
import RequireAuthAdmin from './contexts/auth/RequireAuthAdmin';
import LoginComponent from './pages/Login/Login';
import ForgetPasswordComponent from './pages/ForgetPassword/ForgetPassword';
import CreateTypeAlert from './pages/TypeAlert/Create/CreateTypeAlert';
import ListTypeAlert from './pages/TypeAlert/List/ListTypeAlert';
import Page404 from './pages/Page404/Page404';
import LandingPage from './pages/LandingPage/LandingPage';
import ListStation from './pages/Station/ListStation/ListStation';
import UpdateStation from './pages/Station/UpdateStation/UpdateStation';
import CreateStation from './pages/Station/CreateStation/CreateStation';
import ListTypeParameter from './pages/TypeParamter/ListTypeParameter/ListTypeParameter';
import RegisterClient from './pages/Client/RegisterClient/RegisterClient';
import EditClient from './pages/Client/EditClient/EditClient';
import ListClient from './pages/Client/ListClient/ListClient';
import CreatePassword from './pages/Client/CreatePassword/CreatePassword';
import UpdateTypeParameter from './pages/TypeParamter/UpdateTypeParameter/UpdateTypeParameter';
import CreateTypeParameter from './pages/TypeParamter/CreateTypeParameter/CreateTypeParameter';
import UpdateTypeAlert from './pages/TypeAlert/Update/UpdateTypeAlert';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginComponent />} />
            <Route path='/esqueci-senha' element={<ForgetPasswordComponent />} />
            <Route path="/" element={<LandingPage />} />

            {/* Usuário */}
            <Route path='/usuario' element={<RequireAuthAdmin><ListClient /></RequireAuthAdmin>} />
            <Route path='/usuario/criar' element={<RequireAuthAdmin><RegisterClient /></RequireAuthAdmin>} />
            <Route path='/usuario/atualizar/:id' element={<RequireAuthAdmin><EditClient /></RequireAuthAdmin>} />
            <Route path='/usuario/criar-senha/:email' element={<CreatePassword />} />

            {/* Tipo de Alerta */}
            <Route path='/tipo-alerta/criar' element={<RequireAuthAdmin><CreateTypeAlert /></RequireAuthAdmin>}/>
            <Route path='/tipo-alerta/editar/:id' element={<RequireAuthAdmin><UpdateTypeAlert /></RequireAuthAdmin>}/>
            <Route path='/tipo-alerta' element={<RequireAuthAdmin><ListTypeAlert /></RequireAuthAdmin>} />

            {/* Estacao */}
            <Route path='/estacao' element={<RequireAuthAdmin><ListStation /></RequireAuthAdmin>} />
            <Route path='/estacao/atualizar/:id' element={<RequireAuthAdmin><UpdateStation /></RequireAuthAdmin>} />
            <Route path='/estacao/criar' element={<RequireAuthAdmin><CreateStation /></RequireAuthAdmin>} />

            {/* Tipo de Parâmetro */}
            <Route path='/tipo-parametro' element={<RequireAuthAdmin><ListTypeParameter /></RequireAuthAdmin>} />
            <Route path='/tipo-parametro/criar' element={<RequireAuthAdmin><CreateTypeParameter /></RequireAuthAdmin>} />
            <Route path='/tipo-parametro/atualizar/:id' element={<RequireAuthAdmin><UpdateTypeParameter /></RequireAuthAdmin>} />


            <Route path="*" element={<Page404 />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;