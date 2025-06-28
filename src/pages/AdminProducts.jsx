import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { useProduct } from '../context/ProductContext';
import Swal from 'sweetalert2';
import ProductFormModal from '../components/ProductFormModal';
import { Helmet } from 'react-helmet';

function AdminProducts() {
  const { user } = useAuth();
  const { products, updateProduct, fetchProducts } = useProduct();

  // Estado para producto que se está editando, o null para agregar nuevo producto
  const [editingProduct, setEditingProduct] = useState(null);
  // Estado para controlar visibilidad del modal de formulario
  const [modalVisible, setModalVisible] = useState(false);

  // Abre modal para agregar nuevo producto (sin datos pre-cargados)
  const openAddModal = () => {
    setEditingProduct(null);
    setModalVisible(true);
  };

  // Abre modal para editar un producto, pasando datos actuales
  const openEditModal = (product) => {
    setEditingProduct(product);
    setModalVisible(true);
  };

  // Cierra modal y limpia el producto en edición
  const closeModal = () => {
    setModalVisible(false);
    setEditingProduct(null);
  };

  /**
   * Maneja la acción de guardar producto (agregar o actualizar).
   * - Si se está editando, actualiza producto con updateProduct.
   * - Si es nuevo, realiza POST al endpoint mockapi y recarga productos.
   * Muestra alertas con SweetAlert para éxito o error.
   * @param {object} productData - Datos del producto desde el formulario
   */
  const handleSave = async (productData) => {
    try {
      if (editingProduct) {
        await updateProduct({ id: editingProduct.id, ...productData });
        Swal.fire('¡Producto actualizado!', 'El producto ha sido modificado correctamente.', 'success');
      } else {
        const res = await fetch('https://683908066561b8d882aedb2b.mockapi.io/robots-product', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData)
        });
        if (!res.ok) throw new Error('Error al crear producto');
        await fetchProducts();
        Swal.fire('¡Producto agregado!', 'El producto ha sido agregado correctamente.', 'success');
      }
      closeModal();
      await fetchProducts();
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Error al guardar el producto.', 'error');
    }
  };

  /**
   * Maneja la eliminación de un producto con confirmación modal.
   * - Si confirma, realiza DELETE y recarga productos.
   * - Muestra alertas para éxito o error.
   * @param {string|number} id - ID del producto a eliminar
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

  // Si no hay usuario logueado, o no es admin, se muestra mensaje de acceso denegado
  if (!user) {
    return (
      <div className="container mt-5">
        <h2 className="text-center mb-4">Panel de Administración de Productos</h2>
        <div className="alert alert-danger text-center">
          Acceso denegado. Debes iniciar sesión como administrador.
        </div>
      </div>
    );
  }

  // Vista principal del panel con listado de productos y botones para CRUD
  return (
    <div className="container mt-5">
      <Helmet>
        <title>Admin | Gestión de Productos</title>
        <meta name="description" content="Administra los productos disponibles en la tienda Robots Store. Agrega, edita o elimina productos fácilmente desde este panel." />
      </Helmet>

      <h2 className="text-center mb-4 d-flex justify-content-between align-items-center">
        Panel de Administración de Productos
        <button
          className="btn btn-primary"
          onClick={openAddModal}
          aria-label="Agregar nuevo producto"
        >
          Nuevo Producto
        </button>
      </h2>

      <p className="text-success text-center">Bienvenido, {user.name}</p>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th><th>Título</th><th>Precio</th><th>Stock</th><th>Imagen</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr><td colSpan="6" className="text-center">No hay productos</td></tr>
          ) : products.map(prod => (
            <tr key={prod.id}>
              <td>{prod.id}</td>
              <td>{prod.title}</td>
              <td>${prod.price.toFixed(2)}</td>
              <td>{prod.stock}</td>
              <td>
                {prod.image ? (
                  <img
                    src={prod.image}
                    alt={`Imagen de ${prod.title}`}
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                  />
                ) : 'Sin imagen'}
              </td>
              <td>
                <button
                  className="btn btn-sm btn-primary me-2"
                  onClick={() => openEditModal(prod)}
                  aria-label={`Editar producto ${prod.title}`}
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(prod.id)}
                  aria-label={`Eliminar producto ${prod.title}`}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ProductFormModal
        show={modalVisible}
        onClose={closeModal}
        onSave={handleSave}
        initialData={editingProduct}
      />
    </div>
  );
}

export default AdminProducts;














