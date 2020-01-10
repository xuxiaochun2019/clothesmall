<template>
  <div id="details">
    <details-nav-bar class="details-nav" @titleClick="titleClick" ref="navbar"/>
    <scroll class="content"
            :probe-type="3"
            :pull-up-load="true"
            ref="scroll"
            @scrollPosition="contentPosition">
      <details-swiper :top-imgs="topImgs"/>
      <details-info :goods="goods"/>
      <details-shop :shop="shop"/>
      <details-info-down :details-info="detailsInfo" @detailsImgLoad="detailsImgLoad"/>
      <details-params :params-info="paramsInfo" ref="params"/>
      <details-comment :comment-info="commentInfo" ref="comment"/>
      <goods-list :goods="recommends" ref="recommends"/>
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop"/>
    <details-bottom-bar @addToCart="addToCart"/>
  </div>
</template>

<script>
  import DetailsNavBar from './childCompnts/DetailsNavBar'
  import DetailsSwiper from './childCompnts/DetailsSwipper'
  import DetailsInfo from './childCompnts/DetailsInfo'
  import DetailsShop from './childCompnts/DetailsShop'
  import DetailsInfoDown from './childCompnts/DetailsInfoDown'
  import DetailsParams from './childCompnts/DetailsParams'
  import DetailsComment from './childCompnts/DetailsComment'
  import DetailsBottomBar from './childCompnts/DetailsBottomBar'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'

  import {getDetails, Goods, Shop, GoodsParam, getRecommend} from 'network/details'
  import {itemListenerMixin, backTopMixin} from "common/mixin"
  import {debounce} from "common/utils"

  export default {
    name: "Details",
    data() {
      return {
        iid: null,
        topImgs: [],
        goods: {},
        shop: {},
        detailsInfo: {},
        paramsInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopY: [],
        getThemeTopY: null,
        currentIndex: 0 //记录当前主题区域值 0 1 2 3
      }
    },
    mixins: [itemListenerMixin, backTopMixin],
    components: {
      DetailsNavBar,
      DetailsSwiper,
      DetailsInfo,
      DetailsShop,
      Scroll,
      DetailsInfoDown,
      DetailsParams,
      DetailsComment,
      DetailsBottomBar,
      GoodsList
    },
    created() {
      this.iid = this.$route.params.id;
      //请求详情数据
      getDetails(this.iid).then(res => {
        const data = res.result;
        this.topImgs = data.itemInfo.topImages;
        /*console.log(data);*/
        /*console.log(this.topImgs);*/
        //获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
        // console.log(this.goods);
        //获取商家信息
        this.shop = new Shop(data.shopInfo);
        // console.log(this.shop);
        //保存商品详情数据
        this.detailsInfo = data.detailInfo;
        /*console.log(this.detailsInfo);*/
        //保存商品参数
        this.paramsInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
        //保存评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0];
        }
        /*this.$nextTick(()=>{
          //根据最新数据，对应dom已经渲染，但是不包含图片（获取的值不对）

        })*/
      })
      //请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list
      })
    },
    mounted(){
      //給getThemeTopY赋值
      this.getThemeTopY = debounce(() => {
        this.themeTopY = [];
        this.themeTopY.push(0);
        this.themeTopY.push(this.$refs.params.$el.offsetTop);
        this.themeTopY.push(this.$refs.comment.$el.offsetTop);
        this.themeTopY.push(this.$refs.recommends.$el.offsetTop);
      }, 5000)
    },
    destroyed() {
      this.$bus.$off('itemImgUpLoad', this.itemImgListener)
    },
    methods: {
      detailsImgLoad() {
        this.refresh();
        this.getThemeTopY();
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopY[index], 400)
      },
      contentPosition(position) {
        //保存滚动内容区域y值
        let positionY = -position.y;
        //position和坐标值对比
        // position的区间决定主题高亮
        const len = this.themeTopY.length;
        for (let i = 0; i < len; i++) {
          if (this.currentIndex !== i && (i < len - 1 && positionY >= this.themeTopY[i] && positionY < this.themeTopY[i + 1]) || (i === len - 1 && positionY >= this.themeTopY[i])) {
            this.currentIndex = i;
            setTimeout(() => {
              this.$refs.navbar.currentIndex = this.currentIndex;
            }, 200);
          }
        }
        //判断是否显示backTop
        //1判断BackTop是否显示
        this.isShowBackTop = -position.y > 600;
      },
      //添加购物车
      addToCart() {
        //选择购物车需要展示的信息  标题  价格
        const product = {};
        product.img = this.topImgs[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.nowPrice;
        product.iid = this.iid;
        //将商品添加到购物车
        this.$store.dispatch('addCart', product)
      }
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
    height: calc(100% - 44px - 58px);
    position: absolute;
    top: 44px;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
  }
</style>
