import {debounce} from "./utils"
import BackTop from 'components/content/backtop/BackTop'

//图片加载监听
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
//回到顶部
export const backTopMixin = {
  data(){
    return {
      isShowBackTop: false
    }
  },
  components:{
    BackTop
  },
  methods:{
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    }
  }

}
