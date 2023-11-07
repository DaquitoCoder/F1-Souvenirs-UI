import { createContext, useContext, useState } from 'react';

const CartContext = createContext({});

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useAuth must be used within a AuthProvider');
  return context;
};

export function CartProvider({ children }) {
  const initialCart = () => {
    const cart = window.localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  };
  const [cart, setCart] = useState(initialCart);

  const updateLocalStorage = (cart) => {
    window.localStorage.setItem('cart', JSON.stringify(cart));
  };

  const cartQuantity = cart.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  const cartTotal = cart.reduce((acc, item) => {
    return acc + item.quantity * item.price;
  }, 0);

  const addToCart = (product) => {
    const productInCartIndex = cart.findIndex(
      (item) => item._id === product._id
    );
    if (productInCartIndex !== -1) {
      const newCart = [
        ...cart.slice(0, productInCartIndex),
        {
          ...cart[productInCartIndex],
          quantity: cart[productInCartIndex].quantity + 1,
        },
        ...cart.slice(productInCartIndex + 1),
      ];
      updateLocalStorage(newCart);

      return setCart(newCart);
    }

    const newCart = [
      ...cart,
      {
        ...product,
        quantity: 1,
      },
    ];
    updateLocalStorage(newCart);

    setCart((prevState) => [
      ...prevState,
      {
        ...product,
        quantity: 1,
      },
    ]);
  };

  const removeFromCart = (product) => {
    const productInCartIndex = cart.findIndex(
      (item) => item._id === product._id
    );
    if (productInCartIndex !== -1) {
      const newCart = structuredClone(cart);
      newCart[productInCartIndex].quantity -= 1;
      if (newCart[productInCartIndex].quantity < 1) {
        newCart.splice(productInCartIndex, 1);
      }
      updateLocalStorage(newCart);
      return setCart(newCart);
    }
  };

  const clearCart = () => {
    setCart([]);
    updateLocalStorage([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartQuantity,
        cartTotal,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
