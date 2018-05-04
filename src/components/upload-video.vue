<style lang="scss">
.uploadvideo-bar{
      min-height: 150px;
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
    <el-dialog :title="$t('newsweb_btn_web_upload')" :visible.sync="visible" width="360px">
      <div class="uploadvideo-bar">
        <div v-show="!filename">
          <el-button size="small" type="primary" @click="chooseFile" :disabled="disabled" >{{$t('article_up_video')}}</el-button>
          <span slot="tip" class="el-upload__tip">{{$t('article_support_video_type')}}</span>
          <input type="file" ref="file" class="hide" id="bigUploadFile" name="bigUploadFile" @change="getFileName" />
        </div>
        <div v-if="filename">
            <div class="filename-bar" v-show="isShowFileName">{{filename}}<span @click="delUpload"><i class="el-icon-delete"></i></span></div>
            <div v-show="isShowloading" class="progress" id="bigUploadProgressBarContainer">
              <div class="bar" id="bigUploadProgressBarFilled">
              </div>
            </div>
            <input v-if="isTooLarge" type="button" class="up btn disabled" :value="$t('upload')" disabled/>
            <input v-else type="button" class="up btn" :value="$t('upload')" id="bigUploadSubmit" @click="uploadvideo()" />
            <input type="button" style="display:none" class="stop btn" :value="$t('newsweb_btn_cancel')" @click="abort()" />
            <div id="bigUploadTimeRemaining" class="hide"></div>
            <div id="bigUploadResponse" class="response" ></div>
        </div>
        <!--<div v-if="responseMsg">
          <video :src="responseMsg.url" controls class="video" ></video><span class="success-status" v-if="isSuccess"></span>
        </div>-->
      </div>
    </el-dialog>
</template>

<script>
    import {bigUpload} from 'utils/bigUpload'
    import {videoUrl} from 'api/Article'
	export default {
		props:{
			isShow:{
				type:Boolean,
				default: false
			}
		},
		data(){
			return {
				bigUpload: '',
		        file: '',
		        filename:'',
		        allowType: ['MP4','OGG','WEBM','AVI'],
		        responseMsg: null,
		        disabled: false,
				isShowloading:false,
		        isShowFileName:true,
		        isTooLarge:false,
		        isSuccess:true
			}
		},
    computed: {
      visible: {
        get(){
          return this.isShow
        },
        set(v){
          this.$emit('update:isShow', v)
        }
      }
    },
		methods:{
            uploadvideo(){
		        this.isShowloading=true;
		        this.isShowFileName = false;
		        this.responseMsg = null
		        if(this.file == ''){
		          this.$message(this.$t('article_upload_choose'))
		          return
		        }
		        let type = false;
		        this.allowType.map((val)=>{
		          if(this.file == val){
		            type = true
		          }
		        })
		        if(!type){
		          this.$message(this.$t('article_upload_type_error'))
		          return
		        }
		        //var bar = document.getElementById('bigUploadProgressBarFilled')
		        //bar.style.width = 0;
		        setTimeout(()=>{
		          this.bigUpload.fire();
		          this.disabled = true
		        },200)
		     },
		     abort(){
		        this.isShowloading=false;
		        this.responseMsg = null
		        this.bigUpload.abortFileUpload();
		      },
		      chooseFile(){
		        this.$refs.file.click()
		      },
		      getFileName(e){
		        this.disabled = false
		        var f = document.getElementById("bigUploadFile").files;
		        this.file = e.target.value.split('.').pop().toUpperCase();
		        this.filename = f[0].name;
		        let size = f[0].size;
		        if(size>200*1024*1024){
		          this.isTooLarge = true;
		          this.$message(this.$t('newsweb_err_web_large'));
		        }
		        this.bigUpload.resetKey()
		        //var bar = document.getElementById('bigUploadProgressBarFilled')
		        //bar.style.width = 0
		        //var btn = document.getElementById('bigUploadSubmit')
		       //btn.value = this.$t('msg_upload')
		        //document.getElementById('bigUploadResponse').textContent = ''
		      },
		      success(res){
		        this.responseMsg = res;
		        this.filename = '';
		        this.visible = false;
		        this.isTooLarge = false;
		        this.isShowloading = false;
		        this.isShowFileName = true;
		      },
		      pushMsg(){
		        this.$refs.mod.videoMsg = this.responseMsg
		      },
		      delUpload:function(){
		      	this.filename='';
		      	this.isTooLarge = false;
		      }
		},
		mounted(){
			var url = videoUrl()
			var self = this
			this.bigUpload = new bigUpload({
			url: url,
			flag:1,
			msg_upload: self.$t('msg_upload'),
			msg_reupload: this.$t('newsweb_btn_web_upload2'),
			msg_pause: this.$t('msg_pause'),
			msg_abort: this.$t('msg_abort'),
			msg_resume: this.$t('msg_resume'),
			msg_uploading: this.$t('msg_uploading'),
			msg_too_large: this.$t('msg_too_large'),
			msg_succsee: this.$t('msg_succsee'),
			msg_cancel: this.$t('msg_cancel'),
			success: function(res){
			  self.success(res)
			  self.disabled = false;
			  self.$emit('uploadData',res);
			},
			end: function(e){
			  self.disabled = false;
			}
          });
		}
	}
</script>
