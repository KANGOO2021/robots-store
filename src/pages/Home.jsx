import { Helmet } from 'react-helmet';

const Home = () => {
  return (
    <div className="container mt-5" aria-label="Página de inicio de Robots Store">
      <Helmet>
        <title>Inicio | Robots Store</title>
        <meta
          name="description"
          content="Robots Store: tu tienda número uno en tecnología robótica para el hogar, educación y seguridad. Innovación y diseño al alcance de todos."
        />
      </Helmet>

      <h1 className="display-4 text-center mb-4" role="heading" aria-level="1">
        Bienvenidos a Robots Store
      </h1>

      <p className="lead text-center" aria-label="Descripción principal del sitio">
        La tienda número uno en tecnología robótica para el hogar, la educación y la seguridad. Innovación, funcionalidad y diseño al servicio de tu vida cotidiana.
      </p>

      <hr className="my-4" />

      <div className="row">
        <div className="col-md-6">
          <h2 role="heading" aria-level="2">🤖 ¿Qué es Robots Store?</h2>
          <p>
            Somos una tienda especializada en la venta de robots inteligentes diseñados para facilitarte tareas diarias, promover el aprendizaje tecnológico y mejorar la seguridad de tu hogar.
            Desde aspiradoras automáticas y brazos robóticos DIY hasta robots educativos e interactivos, ofrecemos lo último en automatización personal al alcance de todos.
          </p>
          <p>
            Nuestra misión es acercar la robótica a las personas comunes, brindando productos accesibles, confiables y con garantía de calidad. Creemos que el futuro está en la automatización, y queremos que vos seas parte de él.
          </p>
        </div>
        <div className="col-md-6">
          <h2 role="heading" aria-level="2">🚀 ¿Por qué elegirnos?</h2>
          <ul>
            <li>12 productos únicos cuidadosamente seleccionados</li>
            <li>Robots para el hogar, la educación, el entretenimiento y la seguridad</li>
            <li>Diseño moderno, intuitivo y con soporte técnico incluido</li>
            <li>Compra 100% online con envío rápido y seguro</li>
            <li>Precios competitivos y productos con inteligencia artificial real</li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-5">
        <a
          href="/gallery"
          className="btn btn-dark btn-lg explore-btn"
          role="button"
          aria-label="Explorar catálogo de productos"
        >
          <span className="hover-text">¡Descubrí nuestros modelos!</span>
        </a>
      </div>
    </div>
  );
};

export default Home;




