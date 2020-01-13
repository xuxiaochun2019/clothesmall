<template>
  <div id="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <cart-list class="list"/>
    <cart-bottom-bar/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  import CartList from './childCompnts/CartList'
  import CartBottomBar from './childCompnts/CartBottomBar'

  import {mapGetters} from 'vuex'

  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      ...mapGetters({
        length: 'cartLength'
      })
    }
  }
</script>

<style scoped>
  #cart {
    position: relative;
  }

  .nav-bar {
    position: relative;
    z-index: 999;
    background: var(--color-tint);
  }

  .list {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0
  }
</style>
