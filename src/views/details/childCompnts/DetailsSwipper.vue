<template>
    <swiper class="details-swiper">
      <swiper-item v-for="(item,index) in topImgs" :key="index">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper/'

  export default {
    name: "DetailsSwipper",
    components: {
      Swiper,
      SwiperItem
    },
    props: {
      topImgs: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .details-swiper {
    height: 300px;
    overflow: hidden;
  }
</style>
