import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutations.types'
export default {
  [ADD_COUNTER](state,payload){
    payload.count+=1;
    console.log(payload.count);
  },
  [ADD_TO_CART](state,payload){
    state.cartList.push(payload)
  }
}
