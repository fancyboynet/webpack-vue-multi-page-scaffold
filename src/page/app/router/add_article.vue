<style lang="scss">
.add-article{

}
</style>

<template>
    <div class="add-article">
        <el-tabs v-model="defaultTab"
                 @tab-click="handleClick">
            <el-tab-pane v-if="showTab.article"
                         name="article">
              <div slot="label" @click.stop="changeTab('article')">{{$t('newsweb_txt_web_imagetext')}}</div>
              <articleTmp ref="article" ></articleTmp>
            </el-tab-pane>
            <el-tab-pane v-if="showTab.video"
                         name="video">
              <div slot="label" @click.stop="changeTab('video')">{{$t('newsweb_txt_web_video')}}</div>
              <videoTmp ref="video" ></videoTmp>
            </el-tab-pane>
            <el-tab-pane v-if="showTab.photos"
                         name="photos">
              <div slot="label" @click.stop="changeTab('photos')">{{$t('newsweb_txt_web_album')}}</div>
              <photosTmp ref="photos" ></photosTmp>
            </el-tab-pane>
            <el-tab-pane v-if="showTab.url"
                         name="url">
              <div slot="label" @click.stop="changeTab('url')">{{$t('newsweb_txt_web_url')}}</div>
              <urlTmp ref="url" ></urlTmp>
            </el-tab-pane>
            <el-tab-pane v-if="showTab.app"
                         name="app">
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
  import getCurrentUser from 'utils/getCurrentUser' // 用于权限控制

  export default {
    data(){
      return {
        defaultTab: 'article',
        tabMap: ['','article','photos','video','url','app'],
        showTab:{
          article: false,
          photos: false,
          video: false,
          url: false,
          app: false
        }
      }
    },
    methods: {
      handleClick(tab,event){

      },
      changeTab(name){
        if(this.$refs[this.defaultTab].$refs.mod.isSaved){
          this.defaultTab = name
        }else{
          this.$confirm(this.$t('newsweb_txt_web_leavewarning'), this.$t('hint'), {
            confirmButtonText: this.$t('still_leave'),
            cancelButtonText: this.$t('newsweb_btn_web_save'),
            type: 'warning'
          }).then(() => {
            this.defaultTab = name
          }).catch((res) => {
            var p = this.$refs[this.defaultTab].$refs.mod.publish(2)
            if(p && p.then){
              p.then((res)=>{
                if(res && res.code == 0){
                  //this.defaultTab = name
                }
              })
            }
          });
        }
      }
    },
    beforeRouteLeave(to, from, next){
      if(this.$refs[this.defaultTab].$refs.mod.isSaved){
        next()
      }else{
        this.$confirm(this.$t('newsweb_txt_web_leavewarning'), this.$t('hint'), {
          confirmButtonText: this.$t('still_leave'),
          cancelButtonText: this.$t('newsweb_btn_web_save'),
          type: 'warning'
        }).then(() => {
          next()
        }).catch(() => {

          var p = this.$refs[this.defaultTab].$refs.mod.publish(2)
          if(p && p.then){
            p.then((res)=>{
              if(res && res.code == 0){
                 next()
              }
            })
          }
        });
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
      const auth = getCurrentUser().auth
      var authMap = {
        1: 'article',
        2: 'photos',
        4: 'video',
        8: 'url',
        16: 'app',
      }
      auth.map((val)=>{
        this.showTab[authMap[val]] = true
      })
      this.defaultTab = authMap[auth[0]]
      //console.log(auth)
      //console.log(this.showTab)
    }
  }
</script>
