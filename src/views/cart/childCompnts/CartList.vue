<template>
  <div class="cart-list">
    <scroll class="content"
            :probe-type="2"
            ref="scroll">
        <cart-list-item v-for="(item,index) in cartList" :key="index" :product="item"/>
    </scroll>
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'

  import CartListItem from './CartListItem'

  import {mapGetters} from 'vuex'

  export default {
    name: "CartList",
    components:{
      Scroll,
      CartListItem
    },
    computed: {
      ...mapGetters(['cartList'])
    },
    activated() {
     this.$refs.scroll.refresh();
      console.log('33333');
    }
  }
</script>

<style scoped>
  .cart-list {
    height: calc(100vh - 44px - 49px);
    overflow: hidden;
    background-color: #eeeeda;
  }

  .content {
    width: 100%;
    height: 100%;
  }
</style>
