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
    .el-textarea__inner:focus{
      position:relative;
      z-index:2;
    }
    .hide{
      display:none;
    }
    .progress{
      display:inline-block;
      width:200px;
      height:27px;
      border:1px solid #405b84;
      vertical-align: middle;
      .bar{
        width:0px;
        background: #405b84;
        height:100%;
        transition: all .2s;
        line-height: 27px;
        text-align: right;
        font-size:12px;
        color:#fff;
      }
    }
    .btn{
      color:#fff;
      background: #405b84;
      border:none;
      font-size:12px;
      line-height:28px;
      padding:0 10px;
      min-width: 100px;
      &.disabled{
           background:#8c939d;
           color:#ecedee;
           opacity: 0.75;
      }
    }
    .response{
      display: inline-block;
      font-size:12px;
      line-height:30px;
    }
    .video{
      background:#000;
      margin-top:10px;
      width:320px;
    }
    .filename-bar{
      font-size: 14px;
      color:#8f969e;
      display:inline-block;
      margin-right: 10px;
      i{
        margin-left:10px;
        font-size: 16px;
        cursor:pointer;
        opacity: 0.5;
        &:hover{
          opacity:1;
        }
      }
    }
    .success-status{
      color:#67c23a;
      font-size: 18px;
      margin-left: 10px;
    }
  }
</style>

<template>
  <div class="article-temp">
    <el-input v-model="title" :placeholder="$t('newsweb_txt_web_titleplease')"></el-input>
    <el-input
  	  type="textarea"
  	  :rows="5"
  	  :placeholder="$t('article_placeholder_content')"
  	  v-model="content">
  	</el-input>

    <div class="video-mod clearfix">
      <h3>{{$t('newsweb_txt_web_video')}}</h3>
      <el-button type="primary" size="medium" @click="isShowUploadDialog = true">{{$t('newsweb_btn_web_upload')}}</el-button>
      <span slot="tip" class="el-upload__tip">{{$t('article_support_video_type')}}</span>
       <div v-if="responseMsg">
        <video :src="responseMsg.url" controls class="video" ></video><span class="success-status" v-if="responseMsg.TransState==1"><i class="el-icon-success"></i></span>
      </div>
    </div>
    <!--上传视频-->
    <UploadVideo :isShow.sync="isShowUploadDialog" v-on:uploadData="saveMaterial"></UploadVideo>
    <!--end 上传视频-->
    <setMod ref="mod" article-type="3" :title="title" :content="content" @getContent="pushMsg" ></setMod>
  </div>
</template>
<script>
  import setMod from './article-set-mod.vue'
  import UploadVideo from './upload-video.vue'
  export default {
    data(){
      return {
        title: '',
        content: '',
        isShowUploadDialog:false,
        responseMsg:null
      }
    },
    methods:{
      pushMsg(){
        this.$refs.mod.videoMsg = this.responseMsg
      },
      saveMaterial:function(res){
          this.responseMsg = res;
      },
      closeDialog:function(){
        this.isShowUploadDialog=false;
      }
    },
    components:{
      setMod,
      UploadVideo
    },
    mounted(){
    }
  }
</script>
