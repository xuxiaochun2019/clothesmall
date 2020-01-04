<template>
  <div class="wrapper" ref="aaa">
    <ul class="content">
      <li>better-scroll1</li>
      <li>better-scroll2</li>
      <li>better-scroll3</li>
      <li>better-scroll4</li>
      <li>better-scroll5</li>
      <li>better-scroll6</li>
      <li>better-scroll7</li>
      <li>better-scroll8</li>
      <li>better-scroll9</li>
      <li>better-scroll10</li>
      <li>better-scroll11</li>
      <li>better-scroll12</li>
      <li>better-scroll13</li>
      <li>better-scroll14</li>
      <li>better-scroll15</li>
      <li>better-scroll16</li>
      <li>better-scroll17</li>
      <li>better-scroll18</li>
      <li>better-scroll19</li>
      <li>better-scroll20</li>
      <li>better-scroll21</li>
      <li>better-scroll22</li>
      <li>better-scroll23</li>
      <li>better-scroll24</li>
      <li>better-scroll25</li>
      <li>better-scroll26</li>
      <li>better-scroll27</li>
      <li>better-scroll28</li>
      <li>better-scroll29</li>
      <li>better-scroll30</li>
      <li>better-scroll31</li>
      <li>better-scroll32</li>
      <li>better-scroll33</li>
      <li>better-scroll34</li>
      <li>better-scroll35</li>
      <li>better-scroll36</li>
      <li>better-scroll37</li>
      <li>better-scroll38</li>
      <li>better-scroll39</li>
      <li>better-scroll40</li>
      <li>better-scroll41</li>
      <li>better-scroll42</li>
      <li>better-scroll43</li>
      <li>better-scroll44</li>
      <li>better-scroll45</li>
      <li>better-scroll46</li>
      <li>better-scroll47</li>
      <li>better-scroll48</li>
      <li>better-scroll49</li>
      <li>better-scroll50</li>
      <li>better-scroll51</li>
      <li>better-scroll52</li>
      <li>better-scroll53</li>
      <li>better-scroll54</li>
      <li>better-scroll55</li>
      <li>better-scroll56</li>
      <li>better-scroll57</li>
      <li>better-scroll58</li>
      <li>better-scroll59</li>
      <li>better-scroll60</li>
      <li>better-scroll61</li>
      <li>better-scroll62</li>
      <li>better-scroll63</li>
      <li>better-scroll64</li>
      <li>better-scroll65</li>
      <li>better-scroll66</li>
      <li>better-scroll67</li>
      <li>better-scroll68</li>
      <li>better-scroll69</li>
      <li>better-scroll70</li>
      <li>better-scroll71</li>
      <li>better-scroll72</li>
      <li>better-scroll73</li>
      <li>better-scroll74</li>
      <li>better-scroll75</li>
      <li>better-scroll76</li>
      <li>better-scroll77</li>
      <li>better-scroll78</li>
      <li>better-scroll79</li>
      <li>better-scroll80</li>
      <li>better-scroll81</li>
      <li>better-scroll82</li>
      <li>better-scroll83</li>
      <li>better-scroll84</li>
      <li>better-scroll85</li>
      <li>better-scroll86</li>
      <li>better-scroll87</li>
      <li>better-scroll88</li>
      <li>better-scroll89</li>
      <li>better-scroll90</li>
      <li>better-scroll91</li>
      <li>better-scroll92</li>
      <li>better-scroll93</li>
      <li>better-scroll94</li>
      <li>better-scroll95</li>
      <li>better-scroll96</li>
      <li>better-scroll97</li>
      <li>better-scroll98</li>
      <li>better-scroll99</li>
      <li>better-scroll100</li>
    </ul>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Category",
    data(){
      return {
        BS: null
      }
    },
    mounted() {
      //参数： 侦听位置01 《2 《3   不阻止原生事件（默认阻止div等点击事件）
      this.BS = new BScroll('.wrapper',{
        probeType: 3,
        pullUpLoad:true,
        click: true
      })
    }
  }
</script>

<style scoped>
.wrapper{
  height: 200px;
  background-color: red;
  overflow-y: hidden;
}
</style>
