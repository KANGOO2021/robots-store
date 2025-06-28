import { Helmet } from 'react-helmet';

/**
 * Página de contacto con formulario para enviar mensajes mediante Formspree.
 */
function Contact() {
  return (
    <div className="container mt-4 d-flex justify-content-center">
      <Helmet>
        <title>Contacto | Robots Store</title>
        <meta name="description" content="¿Tenés preguntas o comentarios? Envíanos un mensaje a través del formulario de contacto de Robots Store." />
      </Helmet>

      <div className="col-12 col-md-6">
        <h2>Contacto</h2>
        <form
          action="https://formspree.io/f/myzwqkad"
          method="POST"
          aria-label="Formulario de contacto"
        >
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              className="form-control"
              placeholder="Tu nombre"
              required
              aria-required="true"
              aria-label="Nombre"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="nombre@ejemplo.com"
              required
              aria-required="true"
              aria-label="Correo electrónico"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="mensaje" className="form-label">Mensaje</label>
            <textarea
              id="mensaje"
              name="mensaje"
              className="form-control"
              rows="4"
              placeholder="Escribí tu mensaje..."
              required
              aria-required="true"
              aria-label="Mensaje"
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            aria-label="Enviar formulario de contacto"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;




