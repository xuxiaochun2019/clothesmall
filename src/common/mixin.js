import {debounce} from "./utils"

export const itemListenerMixin ={
  data(){
    return {
      itemImgListener: null,
      refresh: null
    }
  },
  mounted(){
    this.refresh = debounce(this.$refs.scroll.refresh,500)
    this.itemImgListener = ()=>{
      this.refresh();
    }
    this.$bus.$on('itemImgUpLoad',this.itemImgListener)
  }
}
