<template>
  <div class="details-nav-bar">
    <NavBar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/imgs/common/back.svg" alt="">
      </div>
      <div slot="center" class="titles">
        <div v-for="(item,index) in titles"
             :key="index" class="item-titles"
             @click="itemClick(index)" :class="{active: currentIndex === index}">{{item}}</div>
      </div>
    </NavBar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  export default {
    name: "DetailsNavBar",
    data(){
      return {
        titles: ['商品','参数','评论','推荐'],
        currentIndex: 0
      }
    },
    components:{
      NavBar
    },
    methods:{
      backClick(){
        this.$router.back();
      },
      itemClick(index){
        this.currentIndex = index;
        this.$emit('titleClick',index)
      }
    }
  }
</script>

<style scoped>
  .titles{
    display: flex;
  }
  .item-titles{
    flex: 1;
  }
  .back{
    margin-top: 6px;
  }
  .active {
    color: var(--color-high-text);
  }
</style>
