import { useEffect, useMemo, useState } from 'react';

import { db } from '../data/db.ts';
import { GuitarI } from '../models/guitar.ts';

const MIN_QUANTITY = 1;
const MAX_QUANTITY = 5;

const useCart = () => {
  const initialCart = (): GuitarI[] => {
    const localStorageCart = localStorage.getItem('cart');

    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };

  const [guitars] = useState(db);
  const [cart, setCart] = useState(initialCart);

  useEffect(() => {
    saveCartToLocalStorage();
  }, [cart, saveCartToLocalStorage]);

  function addToCart(guitar: GuitarI) {
    const guitarExists = cart.findIndex(
      (guitarInCart) => guitarInCart.id === guitar.id
    );

    if (guitarExists >= 0) {
      if (cart[guitarExists].quantity === MAX_QUANTITY) return;

      const updatedCart = [...cart];
      updatedCart[guitarExists].quantity++;

      setCart(updatedCart);
    } else {
      guitar.quantity = 1;
      setCart([...cart, guitar]);
    }
  }

  function removeFromCart(id: number) {
    setCart(cart.filter((guitar) => guitar.id !== id));
  }

  function changeQuantity(
    id: number,
    action: 'increase' | 'decrease' = 'increase'
  ) {
    const guitarExists = cart.findIndex(
      (guitarInCart) => guitarInCart.id === id
    );

    if (guitarExists >= 0) {
      const updatedCart = [...cart];

      if (
        action === 'increase' &&
        updatedCart[guitarExists].quantity < MAX_QUANTITY
      ) {
        updatedCart[guitarExists].quantity++;
      }

      if (
        action === 'decrease' &&
        updatedCart[guitarExists].quantity > MIN_QUANTITY
      ) {
        updatedCart[guitarExists].quantity--;
      }

      setCart(updatedCart);
    }
  }

  function clearCart() {
    setCart([]);
  }

  function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  const isCartEmpty = useMemo(() => cart.length === 0, [cart]);
  const cartTotal = useMemo(
    () =>
      cart.reduce(
        (total, guitar) => total + (guitar.quantity || 1) * guitar.price,
        0
      ),
    [cart]
  );
  return {
    guitars,
    cart,
    addToCart,
    removeFromCart,
    changeQuantity,
    clearCart,
    isCartEmpty,
    cartTotal,
  };
};

export default useCart;
