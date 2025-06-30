# Robots Store

## Descripción del Proyecto

Robots Store es un e-commerce moderno especializado en la venta de productos de robótica. Desarrollado con React JS y Vite, ofrece una experiencia fluida y atractiva con funcionalidades avanzadas para usuarios y administradores.

### Funcionalidades principales:

- Navegación entre páginas: Inicio, Galería, Contacto, Detalle de Producto, Carrito, Login, Registro y Administración.
- Visualización detallada de productos con opción de agregar al carrito.
- Gestión completa del carrito: agregar, modificar cantidades, eliminar productos, vaciar carrito y finalizar compra, con validación de stock. 
- Sistema de autenticación simple sin backend, basado en `localStorage`, con roles `admin` y `user`.
- Panel administrativo para agregar, editar y eliminar productos mediante formularios modales.
- Subida de imágenes a **Cloudinary** directamente desde el frontend.
- Formulario de **checkout validado** con control de datos, simulación de pago y actualización automática del stock.
- Notificaciones tipo toast (React Toastify) y confirmaciones con SweetAlert2 para acciones importantes.
- Diseño responsive y accesible, usando Bootstrap 5 y CSS personalizado con variables y soporte para modo claro/oscuro.
- Estado global manejado con React Context API: autenticación, productos y carrito, con persistencia local.
- Rutas protegidas para acceso restringido a usuarios autenticados y administradores.
- SEO dinámico con React Helmet para cada página.

---

## Estructura del Proyecto

- `/components`: componentes reutilizables y funcionales
  - AdminRoute.jsx
  - Cart.jsx
  - CheckoutForm.jsx
  - Footer.jsx
  - Header.jsx
  - ImageUploader.jsx
  - Navbar.jsx
  - Paginator.jsx
  - PrivateRoute.jsx
  - ProductCard.jsx
  - ProductDetail.jsx
  - ProductFormModel.jsx
  - ProductFormModal.jsx
  - SearchBar.jsx

- `/context`: contextos para estado global
  - AuthContext.jsx (autenticación y usuarios)
  - CartContext.jsx (carrito y lógica de compra)
  - ProductContext.jsx (productos y stock)

- `/pages`: páginas principales del sitio
  - AdminProducts.jsx
  - Contact.jsx
  - Gallery.jsx
  - Home.jsx
  - Login.jsx
  - Register.jsx

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
- **Cloudinary** para almacenamiento de imágenes de productos

---

## Funcionalidades Destacadas

- **Carrito inteligente:** controla stock, previene duplicados, permite cambiar cantidades y elimina productos.  
- **Persistencia local:** usuarios, sesión y carrito almacenados en `localStorage` para mantener estado entre sesiones.  
- **Roles y permisos:** acceso restringido para administración y funcionalidades exclusivas para usuarios autenticados.  
- **Administración completa:** panel CRUD para productos con modales, validaciones y actualización instantánea.  
- **Subida de imágenes:** integración con Cloudinary para subir imágenes desde el frontend sin necesidad de backend.  
- **Formulario de compra validado:** el checkout simula una compra real, con validaciones avanzadas (nombres, email, número de tarjeta, CVV, vencimiento, etc.) y vacía el carrito al actualizar el stock exitosamente.  
- **Notificaciones y accesibilidad:** mensajes claros con toasts y alertas, además de buenas prácticas ARIA en formularios.  
- **Búsqueda de productos:** el componente SearchBar permite filtrar productos de forma dinámica, ignorando mayúsculas, tildes y espacios. Mejora la experiencia de usuario ayudando a encontrar artículos de forma rápida e intuitiva.  
- **SEO:** cada página con títulos y descripciones dinámicas para mejor posicionamiento.

---

## Actualizaciones: 

### Paginación en la Galería de Productos

Se implementó un sistema de paginación para la galería de productos que mejora la experiencia de navegación, especialmente en dispositivos de escritorio y tabletas. Ahora, los productos se muestran en páginas con un número limitado de ítems por vista, ajustándose dinámicamente según el tamaño de pantalla.

- En modo escritorio/tablet, la paginación muestra un conjunto fijo de productos con botones para navegar entre páginas.
- En modo móvil, se utiliza un slider táctil para deslizar entre productos de forma natural con el dedo, facilitando la interacción en pantallas pequeñas.
- La paginación ayuda a optimizar el rendimiento, evitando la carga y renderizado masivo de todos los productos a la vez.
- Mejora la usabilidad y accesibilidad al indicar claramente la existencia de más productos para explorar.

Este sistema hace que el catálogo sea más ágil, ordenado y cómodo para el usuario, manteniendo una experiencia visual limpia y profesional.

---

### Integración con Cloudinary

El sistema permite que los administradores suban imágenes de productos directamente desde el formulario de alta/modificación. Las imágenes se almacenan en **Cloudinary**, un servicio de hosting de imágenes en la nube, sin requerir backend.

- Se valida el tipo y tamaño de la imagen antes de subirla.
- Se muestra una vista previa antes de confirmar la carga.
- La URL generada se usa automáticamente en el producto.

---

### Simulación de Compra y Validación en el Checkout

Se agregó un **formulario de checkout validado**, que simula el proceso de compra y garantiza la consistencia de datos ingresados por el usuario. Incluye:

- Validaciones avanzadas en nombre, email, número de tarjeta, CVV, fecha, etc.
- Control de stock: antes de finalizar la compra, se verifica si hay stock disponible para todos los productos del carrito.
- Al confirmar la compra, se descuenta el stock, se vacía el carrito y se muestra una notificación de compra exitosa.


---

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/KANGOO2021/robots-store.git
```

2. Acceder al directorio:

```bash
cd robots-store
```

3. Instalar dependencias:

```bash
npm install
```

4. Iniciar servidor de desarrollo:

```bash
npm run dev
```

5. Abrir en navegador:

```
http://localhost:5173
```

---

## Despliegue Online

Disponible en:

[https://robots-store-web.vercel.app/](https://robots-store-web.vercel.app/)

---

## Enlaces

- Repositorio GitHub: [https://github.com/KANGOO2021/robots-store](https://github.com/KANGOO2021/robots-store)
- Despliegue Vercel: [https://robots-store-web.vercel.app/](https://robots-store-web.vercel.app/)

---

¡Gracias por visitar Robots Store!  
Para consultas o sugerencias, no dudes en contactarme.
