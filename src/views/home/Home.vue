<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control class="tab-control" :title="title" @tabClick="tabClick" ref="tabControl1"
                 v-show="isTabFixed"></tab-control>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            :pull-up-load="true"
            @scrollPosition="scrollPosition"
            @upLoadMore="upLoadMore">
      <home-swiper :banners="banners" @bannerImgLoad="bannerImgLoad"/>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <home-feature-view></home-feature-view>
      <tab-control :title="title" @tabClick="tabClick" ref="tabControl2"></tab-control>
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

  import HomeSwiper from './childCompnts/HomeSwiper'
  import HomeRecommendView from './childCompnts/HomeRecommendView'
  import HomeFeatureView from './childCompnts/HomeFeatureView'

  import {getHomeMultidata, getHomeGoods} from "network/home"
  import {itemListenerMixin,backTopMixin} from "common/mixin"

  export default {
    name: "Home",
    components: {
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      HomeSwiper,
      HomeRecommendView,
      HomeFeatureView
    },
    mixins: [itemListenerMixin,backTopMixin],
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
        isShowBackTop: false,
        isTabFixed: false,
        saveY: {
          type: Number,
          default: 0
        }
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
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 1);
      this.$refs.scroll.refresh();
    },
    deactivated() {
      this.saveY = Number(this.$refs.scroll.getY())
      //取消全局事件得监听
      this.$bus.$off('itemImgUpLoad', this.itemImgListener)
    },
    methods: {
      /*
      事件监听相关方法
      */
      bannerImgLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break;
          case 1:
            this.currentType = 'sell'
            break;
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      //判断scroll距离
      scrollPosition(position) {
        //1判断BackTop是否显示
        this.isShowBackTop = -position.y > 600;
        //决定tabControl是否吸顶（position: fixed）
        this.isTabFixed = -position.y > this.$refs.tabControl2.$el.offsetTop

      },
      //上拉加载更多
      upLoadMore() {
        this.getHomeGoods(this.currentType);
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
          //完成上拉加载更多
          this.$refs.scroll.finishPullUp();
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    height: 100vh;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: white;
    position: relative;
    z-index: 99;
  }

  .content {
    height: calc(100% - 93px);
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .tab-control {
    position: relative;
    z-index: 99;
    background-color: white;
  }

</style>
