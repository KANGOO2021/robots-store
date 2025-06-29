import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { useProduct } from '../context/ProductContext';
import Swal from 'sweetalert2';
import ProductFormModal from '../components/ProductFormModal';
import { Helmet } from 'react-helmet';

function AdminProducts() {
  const { user } = useAuth(); // Obtener datos del usuario actual desde el contexto Auth
  const { products, updateProduct, fetchProducts } = useProduct(); // Obtener productos y funciones para actualizar y obtener productos

  // Estado para el producto que se está editando; null si es nuevo
  const [editingProduct, setEditingProduct] = useState(null);
  // Estado para controlar la visibilidad del modal de formulario
  const [modalVisible, setModalVisible] = useState(false);

  /** 
   * Abre el modal para agregar un nuevo producto 
   */
  const openAddModal = () => {
    setEditingProduct(null);
    setModalVisible(true);
  };

  /** 
   * Abre el modal para editar un producto existente 
   * @param {object} product Producto seleccionado para editar
   */
  const openEditModal = (product) => {
    setEditingProduct(product);
    setModalVisible(true);
  };

  /** 
   * Cierra el modal y limpia el producto que se estaba editando 
   */
  const closeModal = () => {
    setModalVisible(false);
    setEditingProduct(null);
  };

  /**
   * Maneja la acción de guardar un producto (nuevo o editado)
   * @param {object} productData Datos del producto a guardar
   */
  const handleSave = async (productData) => {
    try {
      if (editingProduct) {
        // Actualiza producto existente
        await updateProduct({ id: editingProduct.id, ...productData });
        Swal.fire('¡Producto actualizado!', 'El producto ha sido modificado correctamente.', 'success');
      } else {
        // Crea un producto nuevo vía POST
        const res = await fetch('https://683908066561b8d882aedb2b.mockapi.io/robots-product', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData)
        });
        if (!res.ok) throw new Error('Error al crear producto');
        await fetchProducts(); // Refresca lista de productos
        Swal.fire('¡Producto agregado!', 'El producto ha sido agregado correctamente.', 'success');
      }
      closeModal();
      await fetchProducts(); // Actualiza la lista tras guardar
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Error al guardar el producto.', 'error');
    }
  };

  /**
   * Maneja la eliminación de un producto con confirmación
   * @param {string} id ID del producto a eliminar
   */
  const handleDelete = async (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el producto permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await fetch(`https://683908066561b8d882aedb2b.mockapi.io/robots-product/${id}`, {
            method: 'DELETE'
          });
          await fetchProducts();
          Swal.fire('¡Eliminado!', 'El producto ha sido eliminado.', 'success');
        } catch (error) {
          console.error('Error al eliminar producto:', error);
          Swal.fire('Error', 'No se pudo eliminar el producto. Revisa la consola.', 'error');
        }
      }
    });
  };

  // Si no hay usuario logueado, muestra mensaje de acceso denegado
  if (!user) {
    return (
      <main className="container mt-5" role="main" aria-label="Acceso denegado administración de productos">
        <Helmet>
          <title>Acceso Denegado - Administración de Productos</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <h2 className="text-center mb-4">Panel de Administración de Productos</h2>
        <div className="alert alert-danger text-center" role="alert">
          Acceso denegado. Debes iniciar sesión como administrador.
        </div>
      </main>
    );
  }

  // Render principal para usuario autenticado (administrador)
  return (
    <main className="container mt-5" role="main" aria-label="Panel de administración de productos">
      <Helmet>
        <title>Admin | Gestión de Productos</title>
        <meta name="description" content="Administra los productos disponibles en la tienda Robots Store. Agrega, edita o elimina productos fácilmente desde este panel." />
      </Helmet>

      <header className="d-flex justify-content-between align-items-center mb-4">
        <h2>Panel de Administración de Productos</h2>
        <button
          className="btn btn-primary"
          onClick={openAddModal}
          aria-label="Agregar nuevo producto"
          type="button"
        >
          Nuevo Producto
        </button>
      </header>

      <p className="text-success text-center" aria-live="polite">
        Bienvenido, {user.name}
      </p>

      <div className="table-responsive" role="region" aria-label="Lista de productos">
        <table className="table table-striped" role="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Título</th>
              <th scope="col">Precio</th>
              <th scope="col">Stock</th>
              <th scope="col">Imagen</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center" role="cell">No hay productos</td>
              </tr>
            ) : products.map(prod => (
              <tr key={prod.id}>
                <td role="cell">{prod.id}</td>
                <td role="cell">{prod.title}</td>
                <td role="cell">${prod.price.toFixed(2)}</td>
                <td role="cell">{prod.stock}</td>
                <td role="cell">
                  {prod.image ? (
                    <img
                      src={prod.image}
                      alt={`Imagen de ${prod.title}`}
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                    />
                  ) : 'Sin imagen'}
                </td>
                <td role="cell">
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => openEditModal(prod)}
                    aria-label={`Editar producto ${prod.title}`}
                    type="button"
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(prod.id)}
                    aria-label={`Eliminar producto ${prod.title}`}
                    type="button"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para formulario de creación y edición de productos */}
      <ProductFormModal
        show={modalVisible}
        onClose={closeModal}
        onSave={handleSave}
        initialData={editingProduct}
      />
    </main>
  );
}

export default AdminProducts;


















