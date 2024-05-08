import { useEffect, useState } from 'react';

import Footer from './components/Footer';
import Guitar from './components/Guitar';
import Header from './components/Header';

import { db } from './data/db.ts';
import { GuitarI } from './models/guitar.ts';

function App() {
  const initialCart = (): GuitarI[] => {
    const localStorageCart = localStorage.getItem('cart');

    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };

  const [guitars] = useState(db);
  const [cart, setCart] = useState(initialCart);

  const MIN_QUANTITY = 1;
  const MAX_QUANTITY = 5;

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

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        changeQuantity={changeQuantity}
        clearCart={clearCart}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Our collection</h2>

        <div className="row mt-5">
          {guitars.map((guitar) => (
            <Guitar key={guitar.id} data={guitar} addToCart={addToCart} />
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;
