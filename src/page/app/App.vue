<style lang='scss'>
  @import 'common/css/reset.scss';
html, body, #app{
  //height: 100%;
}
body{
  background:#f4f5f9;
  color: #1b1b1b;
}

.app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return {

    }
  },
  methods:{

  },
  mounted(){

  }

}
</script>


