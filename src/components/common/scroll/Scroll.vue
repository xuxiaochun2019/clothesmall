<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    methods: {
      //返回滚动的坐标
      scrollTo(x, y, time = 300) {
        this.scroll.scrollTo(x, y, time);
      },
      //完成上拉加载更多需要调用一次，否则无法继续加载更多
      finishPullUp(){
        this.scroll.finishPullUp();
      }
    },
    mounted() {
      //1创建BScroll
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      });
      //2监听滚动位置
      this.scroll.on('scroll', (position) => {
        this.$emit('scrollPosition', position);
      });
      // 3.监听上拉加载更多
      this.scroll.on('pullingUp', () => {
        this.$emit('upLoadMore');
      })
    }
  }
</script>

<style scoped>

</style>
