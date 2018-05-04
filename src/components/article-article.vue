<style lang="scss" >
  .article-temp{
    width:950px;
    margin:5px auto auto auto;
  }
</style>

<template>
  <div class="article-temp">
    <el-input v-model="title" :placeholder="$t('newsweb_txt_web_titleplease')"></el-input>
    <ueditor @ready="editorReady" ></ueditor>
    <!-- <el-button @click="showContent">showContent</el-button> -->
    <setMod ref="mod" :title="title" :html="content" @getContent="getContent" article-type="1" ></setMod>
  </div>
</template>

<script>
  import ueditor from './ueditor.vue'
  import setMod from './article-set-mod.vue'
  export default {
    data(){
      return {
        title: '',
        content: '',
        ue: null,
        preContent: ''
        
      }
    },
    methods:{
      editorReady(ue){
        this.ue = ue
        //this.ue.options.lang = i18n.locale
        window.ue = ue
        //ue.setHeight(100);
        if(this.preContent != ''){
          ue.setContent(this.preContent);
        }
        var drafts = this.ue.execCommand("getlocaldata")
        var self = this;
        ue.addListener( 'contentChange', function(val) {
            self.getContent()
        })
        setTimeout(()=>{
           if(drafts != '' && this.preContent == ''){
            this.$confirm(this.$t('newsweb_txt_web_autosave'), this.$t('hint'), {
              confirmButtonText: this.$t('newsweb_btn_ok'),
              cancelButtonText: this.$t('newsweb_btn_cancel'),
              type: 'warning'
            }).then(() => {
              this.ue.setContent(drafts);
            }).catch(() => {
              ue.execCommand( "clearlocaldata" )
            });
          }
        },600)


        //ue.setContent('<p>请输入内容！</p>')
        //console.log(ue.execCommand("getlocaldata"))
        //ue.execCommand('drafts')
        //ue.execCommand('clearlocaldata')
        //this.content = ue.getContent();
      },
      getHtml(){
        var content = this.ue.getContent();
        console.log(content)
      },
      getContent(){
        this.content = this.ue.getContent();
        this.$refs.mod.html = this.content;
      },
      setContent(txt){
        this.preContent = txt
      },
      showContent(){
        var con = this.ue.getContent();
        console.log(con)
      }

    },
    components:{
      ueditor,
      setMod
    },
    watch:{
      preContent(txt){
        this.ue.setContent(this.preContent);
      }
    },
    mounted(){
      // window.onbeforeunload = function (event){
      //   return true
      // }
    },
    beforeDestroy(){
      //this.ue.destroy()
    }
  }
</script>
