import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutations.types'

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find((item) => {
        return item.iid === payload.iid
      })
      if (oldProduct) {
        /*oldProduct.count += 1;*/
        context.commit(ADD_COUNTER, oldProduct)
        resolve('数量+1')
        reject('添加失败，请稍后重试')
      } else {
        payload.count = 1;
        context.commit(ADD_TO_CART, payload)
        resolve('添加到购物车成功')
        reject('添加失败，请稍后重试')
      }
    })
  }
}
