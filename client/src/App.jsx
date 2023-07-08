import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';

import Login from './pages/Login/Login';
import Subsidiarias from './pages/Subsidiarias/Subsidiarias';
import Empleados from './pages/Empleados/Empleados';

import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="App-Background" />
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/subsidiarias" element={<Subsidiarias />} />
          <Route path="/empleados" element={<Empleados />} />
          <Route path="*" element={<Navigate to="/subsidiarias" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
