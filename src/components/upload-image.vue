<style lang="scss">
</style>
<template>
	<div>
    <!--dialog-->
    <el-dialog
      :visible.sync="show"
      custom-class="pop-material"
    >

      <material v-if="visible" :chooseable="chooseable"  @getImgUrl="getImgUrl" ref="popMaterial" ></material>
      <span slot="footer" class="dialog-footer">

            <el-button @click="cancel">{{$t('newsweb_btn_cancel')}}</el-button>
            <el-button type="primary"
                       @click="confirm">{{$t('newsweb_btn_ok')}}</el-button>
          </span>
    </el-dialog>

    <!--图片裁切弹窗-->
    <el-dialog
      :visible.sync="showCrop"
      :title="$t('newsweb_txt_web_cut')"
      custom-class="cropPop"
    >
      <div class="tips">tips: {{$t('newsweb_txt_web_cuttips')}}</div>


      <imgCropper v-if="showCrop && !isRecommend" :url="cropUrl" ref="cropper" @getImgBlob="getImgBlob" @close="imgClose" ></imgCropper>
      <imgCropper v-if="showCrop && isRecommend"
                  :url="cropUrl"
                  :dragger-ratio="2"
                  :width="480"
                  :height="240"
                  ref="cropper"
                  @getImgBlob="getImgBlob"
                  @close="imgClose" >

      </imgCropper>


      <span slot="footer" class="dialog-footer">
        <el-button @click="showCrop = false">{{$t('newsweb_btn_cancel')}}</el-button>
        <el-button type="primary" @click="getCrop">{{$t('newsweb_btn_ok')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import Material from 'components/material.vue'
  import imgCropper from './imgCropper.vue'
  import {uploadMaterial} from 'api/Material'
  import {SUCCESS_NOTIFY_MSG,FAILED_NOTIFY_MSG,FAILED_CODE} from 'api/CustomConfigKeys'

  export default {
    props: {
      visible: {
        type: Boolean,
        default: false
      },
    },
    data(){
      return {
        isRecommend: false,
        dialogVisible: false,
        chooseable: true,
        chooseImg: '',
        isChooseImg: false,
        nowCoverIndex: 0, // 当前修改的图片url链接（三张图时使用）
        showCrop: false, //图片裁切弹窗
        cropUrl: '' // 需要裁切图片url
      }
    },
    computed: {
      show: {
        get(){
          return this.visible
        },
        set(v){
          this.$emit('update:visible', v)
        }
      }
    },
    methods: {
      getImgUrl(obj){
        this.chooseImg = obj
        this.isChooseImg = true
      },
      confirm(){
        if(this.$refs.popMaterial.onIndex != -1){
          this.cropUrl = this.chooseImg.big;
          this.dialogVisible = false
          this.isChooseImg = false
          this.showCrop = true
        } else {
          this.$notify.info({
            message: this.$t('article_upload_choose_img')
          });
        }
      },
      cancel() {
        this.$emit('update:visible', false)
      },
      getCrop(){
        this.$refs.cropper.getCrop()
      },
      triggerSuccess(smallUrl, bigUrl){
        this.$emit('on-success', {
          big: bigUrl,
          small: smallUrl
        })
      },
      getImgBlob(imgBlob){
        let myformData = new FormData();
        let filename = Date.now() + '.' + imgBlob.type.split('/')[1];
        let file = new File([imgBlob], filename, {type: imgBlob.type});
        myformData.append('upfile', file);
        myformData.append('issnap', 1);
        uploadMaterial(myformData, {
          [SUCCESS_NOTIFY_MSG]: this.$t('article_mod_copper_upload')
        }).then(res => {
          if (res.code === 0) {
            this.triggerSuccess(res.info.preview, res.info.origin)
          }
        })
      },
      imgClose(){
        this.showCrop = false
      }
    },
    components: {
      Material,
      imgCropper
    },
    mounted(){}
  }
</script>
