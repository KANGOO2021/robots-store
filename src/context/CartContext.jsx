import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from './AuthContext';
import { useProduct } from './ProductContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const { decreaseStock, getProductById, products } = useProduct();

  // Clave para almacenar el carrito en localStorage según el usuario actual
  const storageKey = user?.id ? `cart_${user.id}` : 'cart_guest';

  // Estado del carrito, inicializado desde localStorage si existe
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem(storageKey);
    return stored ? JSON.parse(stored) : [];
  });

  const [showCartEmptyToast, setShowCartEmptyToast] = useState(false);

  /**
   * Al cambiar el usuario, carga el carrito almacenado correspondiente.
   */
  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    setCart(stored ? JSON.parse(stored) : []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  /**
   * Guarda el carrito en localStorage cada vez que cambia.
   */
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(cart));
  }, [cart, storageKey]);

  /**
   * Ajusta las cantidades del carrito para que no superen el stock actual.
   * Se ejecuta cuando cambian los productos o su stock.
   */
  useEffect(() => {
    setCart(prevCart =>
      prevCart.map(item => {
        const product = getProductById(item.id);
        if (!product) return item;
        const quantity = Math.min(item.quantity, product.stock);
        return { ...item, quantity };
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  /**
   * Agrega un producto al carrito.
   * Verifica que el usuario esté logueado, que el producto tenga stock y que no esté repetido.
   */
  const addToCart = (product) => {
    if (!user) {
      toast.error('Debés iniciar sesión para agregar productos al carrito.');
      return;
    }

    if (!product || !product.id) {
      toast.error('Producto no encontrado.');
      return;
    }

    if (cart.some(item => item.id === product.id)) {
      toast.info('Este producto ya está en el carrito.');
      return;
    }

    if (typeof product.price !== 'number' || isNaN(product.price)) {
      toast.error('Este producto no tiene un precio válido.');
      return;
    }

    if (product.stock <= 0) {
      toast.error('No hay stock disponible.');
      return;
    }

    setCart(prev => [...prev, { ...product, quantity: 1 }]);
    toast.success(`${product.title} agregado al carrito.`);
  };

  /**
   * Actualiza la cantidad de un producto en el carrito.
   * La cantidad no puede ser menor a 1 ni mayor al stock disponible.
   * @param {number} id - ID del producto
   * @param {number} delta - Incremento o decremento de la cantidad
   */
  const updateQuantity = (id, delta) => {
    setCart(prev =>
      prev.map(item => {
        if (item.id !== id) return item;
        const product = getProductById(id);
        if (!product) return item;

        const newQuantity = Math.min(Math.max(1, item.quantity + delta), product.stock);

        if (newQuantity !== item.quantity) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  /**
   * Elimina un producto del carrito.
   * Muestra toast con nombre del producto eliminado.
   * @param {number} id - ID del producto a eliminar
   */
  const removeFromCart = (id) => {
    const item = cart.find(i => i.id === id);
    if (item) toast.warn(`${item.title} eliminado del carrito.`);
    setCart(prev => prev.filter(i => i.id !== id));
  };

  /**
   * Vacía completamente el carrito sin notificación.
   */
  const clearCart = () => {
    setCart([]);
  };

  /**
   * Vacía el carrito y muestra toast notificando el vaciado.
   */
  const emptyCartWithToast = () => {
    setShowCartEmptyToast(true);
    clearCart();
  };

  /**
   * Efecto para mostrar toast cuando el carrito se vacía con notificación.
   */
  useEffect(() => {
    if (showCartEmptyToast) {
      toast.info('El carrito fue vaciado.');
      setShowCartEmptyToast(false);
    }
  }, [showCartEmptyToast]);

  /**
   * Calcula el total del carrito sumando precio * cantidad de cada producto.
   * Se memoiza para optimizar rendimiento.
   * @returns {number} Total del carrito
   */
  const calculateTotal = useCallback(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);

  /**
   * Finaliza la compra:
   * - Verifica stock disponible para cada producto
   * - Descuenta stock en ProductContext
   * - Limpia el carrito y muestra mensajes de éxito o error
   */
  const finishPurchase = async () => {
    if (cart.length === 0) {
      toast.warn('El carrito está vacío');
      return;
    }

    try {
      for (const item of cart) {
        const product = getProductById(item.id);
        if (!product) {
          toast.error(`El producto ${item.title} no existe.`);
          return;
        }
        if (item.quantity > product.stock) {
          toast.error(`No hay suficiente stock para ${item.title}.`);
          return;
        }
      }

      for (const item of cart) {
        await decreaseStock(item.id, item.quantity);
      }

      clearCart();
    } catch (error) {
      toast.error('Error al finalizar la compra.');
      console.error(error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        emptyCartWithToast,
        calculateTotal,
        finishPurchase,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

































