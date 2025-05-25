import { Navigate } from "react-router-dom";

const PrivateRoute = ({ isAuth, children }) => {
  if (!isAuth) {
    // Si no está autenticado, redirige a login
    return <Navigate to="/login" replace />;
  }
  // Si está autenticado, renderiza el contenido
  return children;
};

export default PrivateRoute;

