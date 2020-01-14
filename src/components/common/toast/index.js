import Toast from 'components/common/toast/Toast'
const obj ={}
obj.install = function(Vue){
  //1 创建组件构造器
  const  toastConstructor = Vue.extend(Toast)
  //2 new方式 根据构造器 创建组件对象
  const toast = new toastConstructor();
  //3 将组件对象 手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))
  //4 toast.$el 对应的就是div
  document.body.appendChild(toast.$el)
  Vue.prototype.$toast = toast;
}
export default obj
