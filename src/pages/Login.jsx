import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Helmet } from 'react-helmet';

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = login({ email, password });

    if (!success) {
      setError(
        <>
          Usuario o contraseña incorrectos. Por favor, <Link to="/register">regístrese aquí</Link> si no tiene cuenta.
        </>
      );
      return;
    }

    setError('');

    const currentUser = JSON.parse(localStorage.getItem('user'));

    if (currentUser.role === 'admin') {
      navigate('/admin', { replace: true });
    } else if (currentUser.role === 'user') {
      navigate('/', { replace: true });
    }
  };

  return (
    <div className="container mt-5 col-md-6" aria-label="Formulario de inicio de sesión">
      <Helmet>
        <title>Iniciar Sesión | Robots Store</title>
        <meta
          name="description"
          content="Accedé a tu cuenta en Robots Store para gestionar tus compras o administrar productos si sos administrador."
        />
      </Helmet>

      <h2 className="mb-4 text-center" role="heading" aria-level="1">Iniciar Sesión</h2>

      <form onSubmit={handleSubmit} role="form" aria-describedby="form-instrucciones">
        <p id="form-instrucciones" className="visually-hidden">
          Ingresá tu correo electrónico y contraseña para acceder a tu cuenta.
        </p>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            id="email"
            type="email"
            className="form-control"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            aria-required="true"
            aria-label="Correo electrónico"
            autoFocus
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            id="password"
            type="password"
            className="form-control"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            aria-required="true"
            aria-label="Contraseña"
          />
        </div>

        {error && (
          <div className="alert alert-danger" role="alert" aria-live="assertive">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="btn btn-primary w-100"
          aria-label="Ingresar al sistema"
        >
          Ingresar
        </button>
      </form>

      <p className="text-center mt-3 small text-muted">
        ¿No tenés usuario? <Link to="/register">Registrate aquí</Link>.
      </p>
    </div>
  );
}

export default Login;











