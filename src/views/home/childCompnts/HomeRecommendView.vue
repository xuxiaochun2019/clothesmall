<template>
  <div class="recommend">
    <div class="recommend-item" v-for="(item,index) in recommends" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RecommendView",
    props: {
      recommends: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .recommend {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 10px 0 20px;
    border-bottom: 5px solid #eee;
  }

  .recommend-item {
    flex: 1;
    text-align: center;
  }

  .recommend-item img {
    width: 70px;
    margin-bottom: 5px;
  }
</style>
