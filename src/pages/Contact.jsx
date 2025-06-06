function Contact() {
  return (
    <div className="container mt-4 d-flex justify-content-center">
      <div className="col-12 col-md-6">
        <h2>Contacto</h2>
        <form
          action="https://formspree.io/f/myzwqkad"
          method="POST"
        >
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              name="nombre"
              className="form-control"
              placeholder="Tu nombre"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="nombre@ejemplo.com"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Mensaje</label>
            <textarea
              name="mensaje"
              className="form-control"
              rows="4"
              placeholder="Escribí tu mensaje..."
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;




