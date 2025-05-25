
# Robots Store

## Descripción del Proyecto

Robots Store es un e-commerce moderno especializado en la venta de productos de robótica. Desarrollado con React JS y Vite, ofrece una experiencia fluida y atractiva.

Funcionalidades principales:

- Navegación entre páginas: Inicio, Galería, Contacto, Carrito, Login.
- Visualización detallada de productos con opción de agregar al carrito.
- Gestión completa del carrito: agregar, modificar cantidades, eliminar y finalizar compra.
- Sistema de autenticación simple para la sección de administración.
- Notificaciones tipo toast para informar acciones importantes.
- Diseño responsive con Bootstrap y CSS personalizado.

## Estructura del Proyecto

- `/pages`: páginas principales (Home, Gallery, Contact, Login, Admin).
- `/components`: componentes reutilizables (Header, Navbar, Footer, Cart, ProductDetail, ProductCard, PrivateRoute).
- Estado global (productos, carrito, autenticación) gestionado en `App.jsx`.
- Productos cargados desde `/data/products.json`.

## Tecnologías Utilizadas

- React.js con React Router DOM.
- Bootstrap y CSS personalizado.
- React Toastify para notificaciones.
- Vite para construcción y desarrollo.

## Funcionalidades Destacadas

- Añadir productos al carrito con validación y prevención de duplicados.
- Modificar cantidades y eliminar productos con confirmación visual.
- Vaciar carrito y finalizar compra con mensajes confirmatorios.
- Acceso protegido a administración mediante `PrivateRoute`.
- Persistencia del carrito en `localStorage`.

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
