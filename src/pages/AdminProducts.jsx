import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { useProduct } from '../context/ProductContext';

function AdminProducts() {
  const { user } = useAuth();
  const { products, updateProduct, fetchProducts } = useProduct(); 
  // Nota: agregué fetchProducts en contexto para recargar productos luego de POST.

  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    details: '',
    price: '',
    stock: '',
    image: ''
  });

  useEffect(() => {
    if (editingProduct) {
      setForm({
        title: editingProduct.title || '',
        description: editingProduct.description || '',
        details: editingProduct.details || '',
        price: editingProduct.price !== undefined ? String(editingProduct.price) : '',
        stock: editingProduct.stock !== undefined ? String(editingProduct.stock) : '',
        image: editingProduct.image || ''
      });
    } else {
      setForm({
        title: '',
        description: '',
        details: '',
        price: '',
        stock: '',
        image: ''
      });
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Función para crear producto (POST)
  const createProduct = async (productData) => {
    try {
      const res = await fetch('https://683908066561b8d882aedb2b.mockapi.io/robots-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });
      if (!res.ok) throw new Error('Error al crear producto');
      await fetchProducts();  // Actualiza productos desde el contexto
    } catch (error) {
      console.error(error);
      alert('Error al crear el producto.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.price || !form.stock) {
      alert('Título, precio y stock son obligatorios');
      return;
    }

    const productData = {
      title: form.title,
      description: form.description,
      details: form.details,
      price: parseFloat(form.price),
      stock: parseInt(form.stock, 10),
      image: form.image
    };

    try {
      if (editingProduct?.id) {
        await updateProduct({ id: editingProduct.id, ...productData });
        setEditingProduct(null);
      } else {
        await createProduct(productData);
      }

      setForm({
        title: '',
        description: '',
        details: '',
        price: '',
        stock: '',
        image: ''
      });
    } catch (error) {
      console.error('Error al guardar el producto:', error);
      alert('Error al guardar el producto.');
    }
  };

  const handleEdit = (product) => {
    const exists = products.find(p => p.id === product.id);
    if (exists) {
      setEditingProduct(product);
    } else {
      alert('El producto ya no existe');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este producto?')) {
      try {
        await fetch(`https://683908066561b8d882aedb2b.mockapi.io/robots-product/${id}`, { method: 'DELETE' });
        await fetchProducts();
        if (editingProduct?.id === id) {
          setEditingProduct(null);
        }
      } catch (error) {
        console.error('Error al eliminar producto:', error);
        alert('Error al eliminar producto. Revisa la consola.');
      }
    }
  };

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

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Panel de Administración de Productos</h2>
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
              <td>{prod.image ? (
                <img src={prod.image} alt={prod.title} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
              ) : 'Sin imagen'}</td>
              <td>
                <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(prod)}>Editar</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(prod.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <form onSubmit={handleSubmit} className="mt-4">
        <h4>{editingProduct ? 'Editar producto' : 'Agregar nuevo producto'}</h4>
        <div className="mb-3">
          <label className="form-label">Título*</label>
          <input type="text" className="form-control" name="title" value={form.title} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Descripción corta</label>
          <textarea className="form-control" name="description" value={form.description} onChange={handleChange} rows={2} />
        </div>
        <div className="mb-3">
          <label className="form-label">Detalles</label>
          <textarea className="form-control" name="details" value={form.details} onChange={handleChange} rows={4} />
        </div>
        <div className="mb-3">
          <label className="form-label">Precio*</label>
          <input type="number" step="0.01" className="form-control" name="price" value={form.price} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Stock*</label>
          <input type="number" className="form-control" name="stock" value={form.stock} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">URL Imagen</label>
          <input type="text" className="form-control" name="image" value={form.image} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-success me-2">{editingProduct ? 'Actualizar' : 'Agregar'}</button>
        {editingProduct && (
          <button type="button" className="btn btn-secondary" onClick={() => setEditingProduct(null)}>Cancelar</button>
        )}
      </form>
    </div>
  );
}

export default AdminProducts;










