<template>
  <div class="bottom-bar">
    <div class="check-all" @click="checkAll">
      <check-button :is-checked="isCheckedAll" class="check-button"/>
      <span>全选</span>
    </div>
    <div class="add-all">
      <span>合计：{{totalPrice}}</span>
    </div>
    <div class="pay-btn" @click="payClick">
      <div>结算({{totalCount}})</div>
    </div>
  </div>
</template>

<script>
  import CheckButton from './CheckButton'
  import {mapGetters} from 'vuex'
  export default {
    name: "CartBottomBar",
    data(){
      return {
        checkedAll: false
      }
    },
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(['cartList']),
      totalPrice() {
        return '￥' + Number(this.cartList.filter(item => {
          return item.checked;
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0)).toFixed(2)
      },
      totalCount() {
        return this.cartList.filter(item => {
          return item.checked
        }).length;
      },
      isCheckedAll(){
        if(this.cartList == 0){
          return false
        }
       return !(this.cartList.find(item=>{
            return !item.checked
       }))
      }
    },
    methods: {
      checkAll() {
        if(this.checkedAll){
          this.cartList.forEach(item=>{
            item.checked = false
          })
        }else{
          this.cartList.forEach(item=>{

            item.checked = true
          })
        }
        this.checkedAll = !this.checkedAll;
      },
      //结算
      payClick(){
        if(!this.totalCount){
          this.$toast.show('请选择要结算的商品',2000);
          return false;
        }
        console.log('结算');
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    width: 100%;
    height: 35px;
    line-height: 35px;
    background: #ddddcc;
    position: fixed;
    bottom: 49px;
    display: flex;
    justify-content: space-between;
  }

  .check-all {
    width: 60px;
    height: 35px;
    position: relative;
    margin-left: 5px;
  }

  .check-all span {
    position: absolute;
    right: 0;
  }

  .check-button {
    width: 20px;
    height: 20px;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto auto auto 0;
  }
  .pay-btn{
    background-color: #eb4868;
  }
</style>
