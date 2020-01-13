<template>
  <div class="list-item">
    <div class="check-item">
      <check-button :is-checked="product.checked" @click.native="itemClick"/>
    </div>
    <div class="content">
      <div class="img p3">
        <img width="93" height="93" :src="product.img" alt="">
      </div>
      <div class="info p3 ml5">
        <div class="title">{{product.title}}</div>
        <div class="desc ft13">商品描述：{{product.desc}}</div>
        <div class="price-count">
          <span class="ft18 red">￥ {{product.price}}</span>
          <span class="mr5">× {{product.count}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from './CheckButton'
  export default {
    name: "CartListItem",
    props: {
      product: {}
    },
    data(){
      return {
        isChecked: false
      }
    },
    components:{
      CheckButton
    },
    methods:{
      itemClick(){
        this.product.checked = !this.product.checked;
      }
    }
  }
</script>

<style scoped>
  .list-item {
    width: 100%;
    height: 100px;
    display: flex;
    background: #eeeeee;
    padding: 3px 3px 0 3px;
    margin-top: 5px;
  }

  .check-item {
    flex: 1;
    line-height: 97px;
    display: table-cell;
    text-align: center;
    vertical-align: middle;
  }

  .content {
    flex: 15;
    display: flex;
  }

  .title, .desc {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .price-count {
    display: flex;
    justify-content: space-between;
  }

  .ft13 {
    font-size: 13px;
  }

  .ft18 {
    font-size: 18px;
  }

  .red {
    color: red;
  }

  .p3 {
    padding: 3px;
  }

  .mr5 {
    margin-right: 5px;
  }

  .ml5 {
    margin-left: 5px;
  }
</style>
