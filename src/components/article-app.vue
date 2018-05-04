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
      <h3>{{$t('newsweb_txt_web_apppage')}}</h3>
      <div>
        <el-input v-model="id" :placeholder="$t('article_placeholder_id')" ></el-input>
      </div>
    </div>
    <div class="video-mod clearfix">
      <h3>&nbsp;</h3>
      <div>
        <el-select v-model="appMod">
          <el-option :value="'1012'" :label="$t('newsweb_txt_web_apppage_answer')"></el-option>
          <el-option :value="'1013'" :label="$t('newsweb_txt_web_apppage_news')"></el-option>
        </el-select>
      </div>
    </div>

    <setMod ref="mod" :title="title" :app-mod="appMod" :app-id="id" article-type="5" ></setMod>
  </div>
</template>

<script>
  import setMod from './article-set-mod.vue'
  export default {
    data(){
      return {
        title: '',
        id: '',
        appMod: "1012"
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
