<style lang="scss" >
  .article-temp{
    width:950px;
    margin:5px auto auto auto;
    .el-input__inner{
      border-radius: 0;
    }
    .el-textarea__inner{
      border-radius: 0;
      margin-top:-1px;
    }
  }
</style>

<template>
  <div class="article-temp">
    <div class="video-mod clearfix">
      <h3>{{$t('newsweb_txt_data_title')}}</h3>
      <div>
        <el-input v-model="title" :placeholder="$t('newsweb_txt_web_titleplease')" ></el-input>
      </div>
    </div>
    <div class="video-mod clearfix">
      <h3>URL</h3>
      <div>
        <el-input v-model="url" :placeholder="$t('article_placeholder_url')" ></el-input>
      </div>
    </div>

    <setMod ref="mod" :title="title" :article-url="url" article-type="4" ></setMod>
  </div>
</template>

<script>
  import setMod from './article-set-mod.vue'
  export default {
    data(){
      return {
        title: '',
        url: ''
      }
    },
    methods:{

    },
    components:{
      setMod
    },
    mounted(){
      // window.onbeforeunload = function (event){
      //   return true
      // }
    }
  }
</script>
