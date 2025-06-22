import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from './AuthContext';
import { useProduct } from './ProductContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const { decreaseStock, getProductById, products } = useProduct();

  const [cart, setCart] = useState([]);

  // Estado para controlar si se debe mostrar el toast "carrito vaciado"
  const [showCartEmptyToast, setShowCartEmptyToast] = useState(false);

  // Reinicia carrito cuando cambia usuario (sin toast)
  useEffect(() => {
    setCart([]);
  }, [user?.id]);

  // Sincroniza cantidades en carrito con stock actualizado (sin toast)
  useEffect(() => {
    setCart((prevCart) =>
      prevCart.map(item => {
        const product = getProductById(item.id);
        if (!product) return item;
        const quantity = Math.min(item.quantity, product.stock);
        return { ...item, quantity };
      })
    );
  }, [products]);

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

  const removeFromCart = (id) => {
    const item = cart.find(i => i.id === id);
    if (item) toast.warn(`${item.title} eliminado del carrito.`);
    setCart(prev => prev.filter(i => i.id !== id));
  };

  // Vacía carrito sin mostrar ningún toast
  const clearCart = () => {
    setCart([]);
  };

  // Vacía carrito y muestra toast "carrito vaciado"
  const emptyCartWithToast = () => {
    setShowCartEmptyToast(true);
    clearCart();
  };

  // Efecto para mostrar el toast solo cuando showCartEmptyToast cambie a true
  useEffect(() => {
    if (showCartEmptyToast) {
      toast.info('El carrito fue vaciado.');
      setShowCartEmptyToast(false);
    }
  }, [showCartEmptyToast]);

  const calculateTotal = useCallback(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);

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

      clearCart(); // sin toast, solo limpia carrito
      toast.success('¡Gracias por tu compra!');
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
        clearCart,            // para limpiar sin toast (uso interno y compra)
        emptyCartWithToast,   // para botón o vaciado manual con toast
        calculateTotal,
        finishPurchase,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);































