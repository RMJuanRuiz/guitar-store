import { Dispatch } from 'react';
import { GuitarI } from '../models/guitar';
import { CartActions } from '../reducers/cart-reducer';

export default function Guitar({
  data,
  dispatch,
}: {
  data: GuitarI;
  dispatch: Dispatch<CartActions>;
}) {
  const { name, description, image, price } = data;

  return (
    <div className="col-md-6 col-lg-4 my-4 row align-items-center">
      <div className="col-4">
        <img className="img-fluid" src={`./img/${image}.jpg`} alt="Guitar" />
      </div>
      <div className="col-8">
        <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
        <p>{description}</p>
        <p className="fw-black text-primary fs-3">{price}</p>
        <button
          type="button"
          className="btn btn-dark w-100"
          onClick={() =>
            dispatch({ type: 'add-to-cart', payload: { item: data } })
          }
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
