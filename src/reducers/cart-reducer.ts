import { db } from '../data/db';
import { CartItem } from '../models/cart';
import { GuitarI } from '../models/guitar';

const MIN_QUANTITY = 1;
const MAX_QUANTITY = 5;

export type CartActions =
  | { type: 'add-to-cart'; payload: { item: GuitarI } }
  | { type: 'remove-from-cart'; payload: { id: number } }
  | { type: 'increase-quantity'; payload: { id: number } }
  | { type: 'decrease-quantity'; payload: { id: number } }
  | { type: 'clear-cart' };

export type CartState = {
  data: GuitarI[];
  cart: CartItem[];
};

const initialCart = (): CartItem[] => {
  const localStorageCart = localStorage.getItem('cart');

  return localStorageCart ? JSON.parse(localStorageCart) : [];
};

export const initialState: CartState = {
  data: db,
  cart: initialCart(),
};

export const cartReducer = (
  state: CartState = initialState,
  action: CartActions
) => {
  if (action.type === 'add-to-cart') {
    const itemExists = state.cart.find(
      (itemInCart) => itemInCart.id === action.payload.item.id
    );

    let cart = [];

    if (itemExists) {
      cart = state.cart.map((item) => {
        if (item.id === action.payload.item.id) {
          if (item.quantity < MAX_QUANTITY) {
            return { ...item, quantity: item.quantity++ };
          }
        }

        return item;
      });
    } else {
      const cartItem = { ...action.payload.item, quantity: 1 };
      cart = [...state.cart, cartItem];
    }
    return {
      ...state,
      cart,
    };
  }

  if (action.type === 'remove-from-cart') {
    const cart = state.cart.filter(
      (itemInCart) => itemInCart.id !== action.payload.id
    );

    return {
      ...state,
      cart,
    };
  }

  if (action.type === 'increase-quantity') {
    const cart = state.cart.map((item) => {
      if (item.id === action.payload.id && item.quantity < MAX_QUANTITY) {
        return { ...item, quantity: item.quantity++ };
      }

      return item;
    });

    return {
      ...state,
      cart,
    };
  }

  if (action.type === 'decrease-quantity') {
    const cart = state.cart.map((item) => {
      if (item.id === action.payload.id && item.quantity > MIN_QUANTITY) {
        return { ...item, quantity: item.quantity-- };
      }

      return item;
    });

    return {
      ...state,
      cart,
    };
  }

  if (action.type === 'clear-cart') {
    return {
      ...state,
      cart: [],
    };
  }

  return state;
};
