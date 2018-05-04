<style lang="scss">

</style>

<template>
    <div class="add-article">
        <el-tabs v-model="defaultTab">
            <el-tab-pane name="article">
              <div slot="label" @click.stop="changeTab('article')">{{$t('newsweb_txt_web_imagetext')}}</div>
              <articleTmp ref="article" ></articleTmp>
            </el-tab-pane>
            <el-tab-pane name="video">
              <div slot="label" @click.stop="changeTab('video')">{{$t('newsweb_txt_web_video')}}</div>
              <videoTmp ref="video" ></videoTmp>
            </el-tab-pane>
            <el-tab-pane name="photos">
              <div slot="label" @click.stop="changeTab('photos')">{{$t('newsweb_txt_web_album')}}</div>
              <photosTmp ref="photos" ></photosTmp>
            </el-tab-pane>
            <el-tab-pane name="url">
              <div slot="label" @click.stop="changeTab('url')">{{$t('newsweb_txt_web_url')}}</div>
              <urlTmp ref="url" ></urlTmp>
            </el-tab-pane>
            <el-tab-pane name="app">
              <div slot="label" @click.stop="changeTab('app')">{{$t('newsweb_txt_web_apppage')}}</div>
              <appTmp ref="app" ></appTmp>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
  import articleTmp from 'components/article-article.vue'
  import videoTmp from 'components/article-video.vue'
  import photosTmp from 'components/article-photos.vue'
  import urlTmp from 'components/article-url.vue'
  import appTmp from 'components/article-app.vue'

  export default {
    data(){
      return {
        defaultTab: 'article',
        tabMap: ['article','photos','video','url','app']
      }
    },
    methods: {
      changeTab(name){
        this.defaultTab = name
        // if(this.$refs[this.defaultTab].$refs.mod.isSaved){
        //   this.defaultTab = name
        // }else{
        //   this.$confirm('离开当前页面可能丢失已编辑的内容，是否将当前内容保存至草稿？', '提示', {
        //     confirmButtonText: '保存',
        //     cancelButtonText: '仍要离开',
        //     type: 'warning'
        //   }).then(() => {
        //     this.$refs[this.defaultTab].$refs.mod.publish(2)
        //   }).catch((res) => {
        //     this.defaultTab = name
        //   });
        // }
      }
    },
    components: {
      articleTmp,
      videoTmp,
      photosTmp,
      urlTmp,
      appTmp
    },
    mounted(){
      this.tabMap.map((val,i)=>{
        this.$refs[val].$refs.mod.isRecommend = true
      })
    }
  }
</script>
