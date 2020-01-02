<template>
  <div id="xxc-swiper">
    <!--      图片展示区-->
    <div class="swiper" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
      <slot></slot>
    </div>
    <div class="indicator">
      <slot name="indicator" v-if="showIndicator && slideCount > 1">
        <div v-for="(item,index) in slideCount" class="indi-item" :class="{active: index === currentIndex-1}"
             :key="index"></div>
      </slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Swiper",
    props: {
      interval: { //轮播时间
        type: Number,
        default: 3000
      },
      animDuration: { //动画持续时间
        type: Number,
        default: 300
      },
      moveRatio: { //移动比例
        type: Number,
        default: 0.25
      },
      showIndicator: { //是否展示圆点点
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        slideCount: 0, //元素的个数
        touchWidth: 0, //swiper的宽度
        swiperStyle: {},//swiper样式
        currentIndex: 1, // 当前index
        scrolling: false //是否正在滚动
      }
    },
    methods: {
      startTimer(){
        this.playTimer = window.setInterval(() => {
          this.currentIndex++;
          this.scrollContent(-this.currentIndex * this.touchWidth);
        },this.interval)
      },
      stopTimer(){
        
      }
    },
    mounted() {
      //1.操作DOM,前后添加Slide
      setTimeout(() => {
        this.handleDom();
        //开启定时器
        this.startTimer();
      },100)
    }
  }
</script>

<style scoped>

</style>
