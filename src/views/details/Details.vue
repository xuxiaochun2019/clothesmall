<template>
  <div id="details">
    <details-nav-bar class="details-nav"/>
    <scroll class="content" :probe-type="2" :pull-up-load="true">
      <details-swiper :top-imgs="topImgs"/>
      <details-info :goods="goods"/>
      <details-shop :shop="shop"/>
      <details-info-down :details-info="detailsInfo"/>
    </scroll>
  </div>
</template>

<script>
  import DetailsNavBar from './childCompnts/DetailsNavBar'
  import DetailsSwiper from './childCompnts/DetailsSwipper'
  import DetailsInfo from './childCompnts/DetailsInfo'
  import DetailsShop from './childCompnts/DetailsShop'
  import DetailsInfoDown from './childCompnts/DetailsInfoDown'

  import Scroll from 'components/common/scroll/Scroll'

  import {getDetails, Goods, Shop} from 'network/details'

  export default {
    name: "Details",
    data() {
      return {
        iid: null,
        topImgs: [],
        goods: {},
        shop: {},
        detailsInfo: {}

      }
    },
    components: {
      DetailsNavBar,
      DetailsSwiper,
      DetailsInfo,
      DetailsShop,
      Scroll,
      DetailsInfoDown
    },
    created() {
      this.iid = this.$route.params.id;
      getDetails(this.iid).then(res => {
        const data = res.result;
        this.topImgs = data.itemInfo.topImages;
        // console.log(data);
        /*console.log(this.topImgs);*/
        //获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
        // console.log(this.goods);
        //获取商家信息
        this.shop = new Shop(data.shopInfo);
        // console.log(this.shop);
        //保存商品详情数据
        this.detailsInfo = data.detailInfo;
        console.log(this.detailsInfo);
      })
    }
  }
</script>

<style scoped>
  #details {
    height: 100vh;
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .details-nav {
    background-color: #fff;
    position: relative;
    z-index: 99;
  }

  .content {
    height: calc(100% - 44px);
    position: absolute;
    top: 44px;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
  }
</style>
