import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutations.types'

export default {
  addCart(context, payload) {
    let oldProduct = context.state.cartList.find((item)=>{
      return item.iid === payload.iid
    })
    if (oldProduct) {
      /*oldProduct.count += 1;*/
      context.commit(ADD_COUNTER,oldProduct)
    } else {
      payload.count = 1;
      context.commit(ADD_TO_CART,payload)
    }
  }
}
