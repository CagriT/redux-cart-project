import {
   DECREASE,
   INCREASE,
   CLEAR_CART,
   REMOVE,
   GET_TOTALS,
   TOGGLE_AMOUNT,
} from './actions';
import cartItems from './cart-items';

const initialState = {
   cart: cartItems,
   total: 0,
   amount: 0,
};

const reducer = (state = initialState, action) => {
   if (action.type === DECREASE) {
      let tempCart = [];

      tempCart = state.cart.map((cartItem) => {
         if (cartItem.id === action.payload.id) {
            cartItem = { ...cartItem, amount: cartItem.amount - 1 };
         }
         return cartItem;
      });
      return { ...state, cart: tempCart };
   }
   if (action.type === INCREASE) {
      let tempCart = state.cart.map((cartItem) => {
         if (cartItem.id === action.payload.id) {
            cartItem = { ...cartItem, amount: cartItem.amount + 1 };
         }
         return cartItem;
      });
      return { ...state, cart: tempCart };
   }
   if (action.type === REMOVE) {
      return {
         ...state,
         cart: state.cart.filter(
            (cartItem) => cartItem.id !== action.payload.id
         ),
      };
   }
   if (action.type === CLEAR_CART) {
      return { ...state, cart: [] };
   }
   if (action.type === GET_TOTALS) {
      let { total, amount } = state.cart.reduce(
         (cartTotal, cartItem) => {
            const { price, amount } = cartItem;
            cartTotal.amount += amount;
            cartTotal.total += amount * price;
            return cartTotal;
         },
         { total: 0, amount: 0 }
      );
      total = parseFloat(total.toFixed(2));
      return { ...state, total, amount };
   }
   if (action.type === TOGGLE_AMOUNT) {
      return {
         ...state,
         cart: state.cart.map((cartItem) => {
            if (cartItem.id === action.payload.id) {
               if (action.payload.toggle === 'inc') {
                  return { ...cartItem, amount: cartItem.amount + 1 };
               }
               if (action.payload.toggle === 'dec') {
                  return { ...cartItem, amount: cartItem.amount - 1 };
               }
            }
            return cartItem;
         }),
      };
   }

   return state;
};

export default reducer;
