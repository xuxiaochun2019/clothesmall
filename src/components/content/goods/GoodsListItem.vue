<template>
  <div class="goods-list-item" @click="itemClick">
    <img :src="showImg" alt="" @load='imgLoad'>
    <div class="goods-item-text">
      <p class="title">{{goodsitem.title}}</p>
      <span class="orgprice">{{goodsitem.orgPrice}}</span>
      <span class="price">￥{{goodsitem.price}}</span>
      <span class="collect"><img src="~assets/imgs/common/collect.svg" alt="">{{goodsitem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsLisItem",
    props: {
      goodsitem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed:{
      showImg(){
        return this.goodsitem.image || this.goodsitem.show.img
      }
    },
    methods:{
      imgLoad(){
        this.$bus.$emit('itemImgUpLoad');
      },
      itemClick(){
        // 动态路由
        this.$router.push('/details/'+this.goodsitem.iid);
        // query方式
        /*this.$router.push({
          path: '/details',
          query: {
            lid: this.goodsitem.iid,
            type: '***'
          }
        })*/
      }
    }
  }
</script>

<style scoped>
  .goods-list-item {
    width: 49%;
    padding: 2px;
  }

  .goods-list-item img {
    width: 100%;
  }

  .goods-item-text {
    width: 100%;
    padding: 2px;
    text-align: left;
    margin-bottom: 3px;
    position: relative;
  }

  .goods-item-text .title {
    overflow-x: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .goods-item-text .orgprice {
    font-size: 13px;
    text-decoration: line-through;
    margin: 0 5px 0 5px;
  }

  .goods-item-text .price {
    color: red;
    font-size: 15px;
    font-weight: bold;
    margin: 0 1px 0 3px;
  }

  .goods-item-text img {
    vertical-align: middle;
    width: 18px;
  }

  .goods-item-text .collect {
    position: absolute;
    right: 2px;
    bottom: 2px;
  }
</style>
