<template>
  <div class="page">
    <router-link to="/b">
      跳到B页
    </router-link>
    <div>scss test</div>
    <i class="iconfont">&#xe600;</i>
    <img
      src="~assets/bg.png"
      alt=""
    >
    <div
      class="svg"
      style="width: 50px;"
      v-html="svgPlay"
    />
  </div>
</template>

<script>
import svgPlay from 'assets/play.svg'

export default {
  data () {
    return {
      svgPlay
    }
  }
}
</script>

<style lang="scss" scoped>
  .page {
    div {
      color: red;
    }
  }
</style>
