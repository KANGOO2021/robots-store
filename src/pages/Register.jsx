import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Helmet } from 'react-helmet';

function Register() {
  const { register } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = register({ ...formData, role: 'user' });

    if (success) {
      setFormData({ name: '', email: '', password: '' });
      navigate('/');
    }
  };

  return (
    <div className="container mt-5 col-md-6" aria-label="Formulario de registro de usuario">
      <Helmet>
        <title>Crear cuenta | Robots Store</title>
        <meta
          name="description"
          content="Registrate en Robots Store para comprar robots inteligentes para el hogar, la educación o la seguridad."
        />
      </Helmet>

      <h2 className="mb-4 text-center" role="heading" aria-level="1">Registrarse</h2>
      <form onSubmit={handleSubmit} role="form" aria-describedby="form-descripcion">
        <p id="form-descripcion" className="visually-hidden">
          Completá los campos requeridos para crear una cuenta.
        </p>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nombre</label>
          <input
            id="name"
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
            aria-required="true"
            aria-label="Nombre completo"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
            aria-required="true"
            aria-label="Correo electrónico"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            id="password"
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
            aria-required="true"
            aria-label="Contraseña"
          />
        </div>

        <button
          type="submit"
          className="btn btn-success w-100"
          aria-label="Crear cuenta en Robots Store"
        >
          Crear cuenta
        </button>
      </form>
    </div>
  );
}

export default Register;






