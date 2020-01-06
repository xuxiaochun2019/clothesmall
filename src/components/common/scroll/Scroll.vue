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
        this.scroll && this.scroll.scrollTo(x, y, time);
      },
      //完成上拉加载更多需要调用一次，否则无法继续加载更多
      finishPullUp(){
        this.scroll && this.scroll.finishPullUp();
      },
      //刷新重新计算高度
      refresh(){
        this.scroll && this.scroll.refresh();
      },
      //获取scroll的y坐标位置
      getY(){
        return this.scroll ? this.scroll.y : 0;
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
      if(this.probeType){
        this.scroll.on('scroll', (position) => {
          this.$emit('scrollPosition', position);
        })
      }
      // 3.监听scroll滚动到底部
      if(this.pullUpLoad){
        this.scroll.on('pullingUp', () => {
          this.$emit('upLoadMore');
        })
      }
    }
  }
</script>

<style scoped>

</style>
