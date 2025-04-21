import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './global.css';
import './colors.css'
import { AuthProvider } from './contexts/auth/AuthContext';
import RequireAuthAdmin from './contexts/auth/RequireAuthAdmin';
import LoginComponent from './pages/Login/Login';
import ForgetPasswordComponent from './pages/ForgetPassword/ForgetPassword';
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
import DetailsStation from './pages/Station/DetailsStation/DetailsStation';
import ListAlert from './pages/Alert/ListAlert/ListAlert';
import MapsStation from './pages/Station/MapsStation/MapsStation';
import CreateMeasure from './pages/Measure/CreateMeasure/CreateMeasure';
import { useEffect } from 'react';
import { useWebSocket } from './hooks/useWebSocket';
import ToastContainer from './components/toast/ToastContainer';

function App() {
  useWebSocket("ws://localhost:5555");

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

            {/* Estacao */}
            <Route path='/estacao' element={<ListStation />} />
            <Route path='/estacao/mapa' element={<MapsStation />} />
            <Route path='/estacao/:id' element={<DetailsStation />} />
            <Route path='/estacao/atualizar/:id' element={<RequireAuthAdmin><UpdateStation /></RequireAuthAdmin>} />
            <Route path='/estacao/criar' element={<RequireAuthAdmin><CreateStation /></RequireAuthAdmin>} />

            {/* Tipo de Parâmetro */}
            <Route path='/tipo-parametro' element={<ListTypeParameter />} />
            <Route path='/tipo-parametro/criar' element={<RequireAuthAdmin><CreateTypeParameter /></RequireAuthAdmin>} />
            <Route path='/tipo-parametro/atualizar/:id' element={<RequireAuthAdmin><UpdateTypeParameter /></RequireAuthAdmin>} />

            {/* ALerta */}
            <Route path='/alertas' element={<ListAlert />} />

            {/* Medida */}
            <Route path='/medidas/criar' element={<RequireAuthAdmin><CreateMeasure /></RequireAuthAdmin>} />

            <Route path="*" element={<Page404 />} />
          </Routes>
          <ToastContainer />
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;