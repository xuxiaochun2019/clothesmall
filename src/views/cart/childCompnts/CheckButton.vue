<template>
  <div :class="{checked: isChecked}" class="circle"></div>
</template>

<script>
  export default {
    name: "CheckButton",
    props: {
      isChecked: {
        type: Boolean,
        default() {
          return false
        }
      }
    }
  }
</script>

<style scoped>
  .circle {
    width: 20px;
    height: 20px;
    display: inline-block;
    border: 1px solid #222222;
    border-radius: 50%;
  }

  .checked {
    background-repeat: no-repeat;
    background-image: url("~assets/imgs/cart/tick.svg");
    background-color: var(--color-high-text);
    border-color: var(--color-high-text);
    overflow: hidden;

  }
</style>
