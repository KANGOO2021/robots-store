import { createContext, useContext, useEffect, useState } from 'react';

const ProductContext = createContext();
const API_URL = 'https://683908066561b8d882aedb2b.mockapi.io/robots-product';

/**
 * Limpia los datos crudos de productos: convierte `price` y `stock` a número.
 */
const cleanProducts = (products) =>
  products.map(product => ({
    ...product,
    price: parseFloat(String(product.price).replace(/[^0-9.-]+/g, '')) || 0,
    stock: Number(product.stock) || 0,
  }));

/**
 * Proveedor de contexto de productos: maneja estado y funciones globales.
 */
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  /**
   * Obtiene productos desde la API y los limpia.
   */
  const fetchProducts = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('No se pudo cargar los productos');
      const data = await response.json();
      setProducts(cleanProducts(data));
    } catch (error) {
      console.error('Error cargando productos:', error);
      // Se puede manejar con toast desde el componente
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /**
   * Devuelve un producto por su ID.
   * El ID se compara como string por compatibilidad con useParams().
   */
  const getProductById = (id) => products.find(p => p.id.toString() === id.toString());

  /**
   * Actualiza un producto en la API (PUT o PATCH).
   */
  const updateProduct = async (updatedProduct, method = 'PUT') => {
    try {
      const response = await fetch(`${API_URL}/${updatedProduct.id}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct),
      });
      if (!response.ok) throw new Error('Error al actualizar producto');
      const data = await response.json();
      const cleanData = {
        ...data,
        price: parseFloat(String(data.price).replace(/[^0-9.-]+/g, '')) || 0,
        stock: Number(data.stock) || 0,
      };
      setProducts(prev => prev.map(p => (p.id === cleanData.id ? cleanData : p)));
      return cleanData;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  /**
   * Disminuye el stock de un producto y actualiza en la API.
   */
  const decreaseStock = async (id, quantity = 1) => {
    const product = getProductById(id);
    if (!product) throw new Error('Producto no encontrado');
    const updatedStock = Math.max(product.stock - quantity, 0);
    return updateProduct({ ...product, stock: updatedStock }, 'PUT');
  };

  /**
   * Aumenta el stock de un producto y actualiza en la API.
   */
  const increaseStock = async (id, quantity = 1) => {
    const product = getProductById(id);
    if (!product) throw new Error('Producto no encontrado');
    const updatedStock = product.stock + quantity;
    return updateProduct({ ...product, stock: updatedStock }, 'PUT');
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        getProductById,
        updateProduct,
        decreaseStock,
        increaseStock,
        fetchProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

/**
 * Hook personalizado para acceder al contexto de productos.
 */
export const useProduct = () => useContext(ProductContext);
















