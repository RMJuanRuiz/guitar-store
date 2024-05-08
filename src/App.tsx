import { Header, Footer, Guitar } from './components';

import { useCart } from './hooks';

function App() {
  const {
    guitars,
    cart,
    addToCart,
    removeFromCart,
    changeQuantity,
    clearCart,
    isCartEmpty,
    cartTotal,
  } = useCart();

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        changeQuantity={changeQuantity}
        clearCart={clearCart}
        isCartEmpty={isCartEmpty}
        cartTotal={cartTotal}
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
