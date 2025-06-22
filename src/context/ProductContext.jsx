import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const ProductContext = createContext();

const API_URL = 'https://683908066561b8d882aedb2b.mockapi.io/robots-product';

const cleanProducts = (products) =>
  products.map(product => ({
    ...product,
    price: parseFloat(String(product.price).replace(/[^0-9.-]+/g, '')) || 0,
    stock: Number(product.stock) || 0,
  }));

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  // Extraemos fetchProducts para poder llamarlo desde fuera
  const fetchProducts = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('No se pudo cargar los productos');
      const data = await response.json();
      setProducts(cleanProducts(data));
    } catch (error) {
      console.error('Error cargando productos:', error);
      toast.error('Error al cargar productos');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const getProductById = (id) => products.find(p => p.id === id);

  const updateProduct = async (updatedProduct, showToast = true, method = 'PUT') => {
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
      if (showToast) toast.success('Producto actualizado');
      return cleanData;
    } catch (error) {
      console.error('Error:', error);
      if (showToast) toast.error('Error al actualizar producto');
      throw error;
    }
  };

  const decreaseStock = async (id, quantity = 1) => {
    const product = getProductById(id);
    if (!product) throw new Error('Producto no encontrado');
    const updatedStock = Math.max(product.stock - quantity, 0);
    return updateProduct({ ...product, stock: updatedStock }, false, 'PUT');
  };

  const increaseStock = async (id, quantity = 1) => {
    const product = getProductById(id);
    if (!product) throw new Error('Producto no encontrado');
    const updatedStock = product.stock + quantity;
    return updateProduct({ ...product, stock: updatedStock }, false, 'PUT');
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        getProductById,
        updateProduct,
        decreaseStock,
        increaseStock,
        fetchProducts,  // <-- Exponemos fetchProducts aquí
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);














