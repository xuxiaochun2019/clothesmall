<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            :pull-up-load="true"
            @scrollPosition="scrollPosition"
            @upLoadMore="upLoadMore">
      <home-swiper :banners="banners"/>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <home-feature-view></home-feature-view>
      <tab-control class="tab-control"
                   :title="title"
                   @tabClick="tabClick"></tab-control>
      <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/common/tabcontrol/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backtop/BackTop'


  import HomeSwiper from './childCompnts/HomeSwiper'
  import HomeRecommendView from './childCompnts/HomeRecommendView'
  import HomeFeatureView from './childCompnts/HomeFeatureView'

  import {getHomeMultidata, getHomeGoods} from "network/home"

  export default {
    name: "Home",
    components: {
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop,
      HomeSwiper,
      HomeRecommendView,
      HomeFeatureView
    },
    data() {
      return {
        banners: [],
        recommends: [],
        title: ["流行", "精选"],
        goods: {
          'pop': {page: 0, list: []},
          'news': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        isShowBackTop: false
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list;
      }
    },
    created() {
      //1.请求首页多个数据
      this.getHomeMultidata();
      // 请求首页商品数据
      this.getHomeGoods('pop');
      /*this.getHomeGoods('news');*/
      this.getHomeGoods('sell');

    },
    methods: {
      /*
      事件监听相关方法
      */
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break;
          case 1:
            this.currentType = 'sell'
            break;
        }
      },
      backTop() {
        this.$refs.scroll.scrollTo(0, 0, 500);
      },
      scrollPosition(position) {
        this.isShowBackTop = -position.y > 600;
      },
      upLoadMore() {
        this.getHomeGoods(this.currentType);
        this.$refs.scroll.finishPullUp();
      },
      /*
         网络请求相关方法
       */
      //请求首页多个数据
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      // 请求首页商品数据
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    /*position: relative;*/
  }

  .home-nav {
    background-color: var(--color-tint);
    color: white;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99;
  }

  .tab-control {
    background-color: white;
    /* better-scroll中失效*/
    /*position: sticky;*/
    top: 44px;
    z-index: 99;
  }

  /*.content{
   position: absolute;
    top: 44px;
    bottom: 49px;
  }*/
  .content {
    height: calc(100% - 93px);
    margin-top: 44px;
  }
</style>
