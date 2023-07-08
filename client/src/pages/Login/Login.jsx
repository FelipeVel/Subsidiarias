import axios from 'axios';
import { useState } from 'react';
import './Login.scss';

const Login = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/login`, {
        usuario: e.target.username.value,
        contrasena: e.target.password.value,
      })
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        window.location.href = '/subsidiarias';
      })
      .catch((err) => {
        setErrorMessage(err.response.data.status);
      });
  };

  return (
    <div className="Login">
      <div className="Login-Container">
        <h1>Login</h1>
        <form className="Login-Form" onSubmit={(e) => submitHandler(e)}>
          <div className="Login-Form-group">
            <label htmlFor="username">Usuario</label>
            <input type="text" name="username" id="Username" placeholder="Nombre de usuario" />
          </div>
          <div className="Login-Form-group">
            <label htmlFor="password">Contraseña</label>
            <input type="password" name="password" id="password" placeholder="Contraseña" />
          </div>
          <div className="Login-Form-Message">{errorMessage}</div>
          <button className="Login-Form-btn" type="submit">
            Acceder
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
