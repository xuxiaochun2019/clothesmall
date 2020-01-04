<template>
  <div class="backtop">
    <img src="~assets/imgs/common/top.png">
  </div>
</template>

<script>
  export default {
    name: "BackTop"
  }
</script>

<style scoped>
  .backtop {
    position: fixed;
    right: 10px;
    bottom: 50px;
  }
  .backtop img{
    width:43px;
    height: 43px;
  }
</style>
