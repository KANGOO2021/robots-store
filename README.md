# Robots Store

## Descripción del Proyecto

Robots Store es un e-commerce moderno especializado en la venta de productos de robótica. Desarrollado con React JS y Vite, ofrece una experiencia fluida y atractiva con funcionalidades avanzadas para usuarios y administradores.

### Funcionalidades principales:

- Navegación entre páginas: Inicio, Galería, Contacto, Detalle de Producto, Carrito, Login, Registro y Administración.
- Visualización detallada de productos con opción de agregar al carrito.
- Gestión completa del carrito: agregar, modificar cantidades, eliminar productos, vaciar carrito y finalizar compra, 
  con validación de stock. 
- Sistema de autenticación simple sin backend, basado en `localStorage`, con roles `admin` y `user`.
- Panel administrativo para agregar, editar y eliminar productos mediante formularios modales.
- Notificaciones tipo toast (React Toastify) y confirmaciones con SweetAlert2 para acciones importantes.
- Diseño responsive y accesible, usando Bootstrap 5 y CSS personalizado con variables y soporte para modo claro/oscuro.
- Estado global manejado con React Context API: autenticación, productos y carrito, con persistencia local.
- Rutas protegidas para acceso restringido a usuarios autenticados y administradores.
- SEO dinámico con React Helmet para cada página.

---

## Estructura del Proyecto

- `/pages`: páginas principales  
  - Home.jsx  
  - Gallery.jsx  
  - Contact.jsx  
  - ProductDetail.jsx  
  - Cart.jsx  
  - Login.jsx  
  - Register.jsx  
  - AdminProducts.jsx  

- `/components`: componentes reutilizables  
  - Header.jsx, Footer.jsx, ProductCard.jsx, ProductFormModal.jsx  
  - PrivateRoute.jsx, AdminRoute.jsx  
  - Cart.jsx, ProductDetail.jsx  

- `/context`: contextos para estado global  
  - AuthContext.jsx (autenticación y usuarios)  
  - ProductContext.jsx (productos y stock)  
  - CartContext.jsx (carrito y lógica de compra)  

- `/public`: recursos estáticos (favicon, imágenes)

- `/App.jsx`: componente principal que configura rutas y layout

- `/main.jsx`: punto de entrada que renderiza la app

- `/App.css`: estilos globales con Bootstrap y CSS personalizado

---

## Tecnologías Utilizadas

- React 18 con React Router DOM v6  
- Bootstrap 5 para diseño responsivo  
- React Toastify para notificaciones toast  
- SweetAlert2 para modales y confirmaciones  
- React Helmet para SEO y metadatos dinámicos  
- Vite para construcción, desarrollo rápido y hot reload  
- Context API para manejo de estado global sin Redux  
- LocalStorage para persistencia local de usuarios y carrito

---

## Funcionalidades Destacadas

- **Carrito inteligente:** controla stock, previene duplicados, permite cambiar cantidades y elimina productos.  
- **Persistencia local:** usuarios, sesión y carrito almacenados en `localStorage` para mantener estado entre sesiones.  
- **Roles y permisos:** acceso restringido para administración y funcionalidades exclusivas para usuarios autenticados.  
- **Administración completa:** panel CRUD para productos con modales, validaciones y actualización instantánea.  
- **Notificaciones y accesibilidad:** mensajes claros con toasts y alertas, además de buenas prácticas ARIA en formularios.  
- **Búsqueda con normalización:** búsqueda en galería que ignora mayúsculas, tildes y espacios para mejor experiencia.  
- **SEO:** cada página con títulos y descripciones dinámicas para mejor posicionamiento.

---

## Actualización: Paginación en la Galería de Productos

Se implementó un sistema de paginación para la galería de productos que mejora la experiencia de navegación, especialmente en dispositivos de escritorio y tabletas. Ahora, los productos se muestran en páginas con un número limitado de ítems por vista, ajustándose dinámicamente según el tamaño de pantalla.

- En modo escritorio/tablet, la paginación muestra un conjunto fijo de productos con botones para navegar entre páginas.
- En modo móvil, se utiliza un slider táctil para deslizar entre productos de forma natural con el dedo, facilitando la interacción en pantallas pequeñas.
- La paginación ayuda a optimizar el rendimiento, evitando la carga y renderizado masivo de todos los productos a la vez.
- Mejora la usabilidad y accesibilidad al indicar claramente la existencia de más productos para explorar.

Este sistema hace que el catálogo sea más ágil, ordenado y cómodo para el usuario, manteniendo una experiencia visual limpia y profesional.

---

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/KANGOO2021/robots-store.git

