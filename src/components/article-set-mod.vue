<style lang="scss">
    .set-mod {
        font-size: 18px;
        margin-top: 35px;

        h3 {
            float: left;
            width: 100px;
            line-height: 30px;
        }
        .set-con {
            float: left;
            label {
                color: #8f969e;
                margin-right: 35px;
            }
            .panel {
                margin-bottom: 20px;
                .el-button {
                    width: 150px;
                    height: 42px;
                    border-radius: 0;
                }
            }
        }
        .panel .img-box {
            width: 236px;
            height: 133px;
            display: inline-block;
            margin-right: 10px;
            background: #f4f5f9;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            position: relative;
            i {
                color: #8c939d;
                width: 236px;
                height: 150px;
                line-height: 150px;
                text-align: center;
            }
            .img {
                position: absolute;
                max-width:100%;
                max-height:100%;
                left: 50%;
                top: 50%;
                transform:translate(-50%,-50%);
            }
        }
        .pop-material {
            width: 1000px;
            .el-main {
                min-height: auto;
            }
            .el-dialog__body {
                padding: 0;
            }
        }
        .cropPop {
            width: 630px;
        }
        .reasonPop{
          width:600px;
          .el-dialog__body{
            padding:0 20px;
          }
          .selector{
            margin-bottom:15px;
          }
          .fr{
            float:right;
            margin-left:15px;
          }
        }
        .el-radio-group{
          margin-left:6px;
          .is-checked{
            .el-radio__inner{
              background-color:#ffbe0a;
              border-color:#ffbe0a;
              &::after{
                border-radius:0;
                top:2px;
                left:4px;
                width:4px;
                height:7px;
                background:none;
                border: 1px solid #405b84;
                border-top:0;
                border-left:0;
                transform: rotate(45deg) ;
              }
            }
          }
          .el-radio__inner{

            border-radius:2px;
            &::after{

            }
          }

        }
        .tips{
          color:red;
          margin-top:-40px;
          margin-bottom: 20px;
        }
    }
</style>
<template>
    <div class="set-mod clearfix">
        <h3>{{$t('newsweb_txt_web_setting')}}</h3>
        <div class="set-con">
            <div class="panel">
                <label v-if="!isRecommend">
                    {{$t('newsweb_txt_web_game')}}
                    <div class="selector">
                        <el-select v-model="game"
                                   :placeholder="$t('article_placeholder_select')" >
                            <el-option v-for="v in gameList"
                                       :value="v.id"
                                       :key="v.id"
                                       :label="v.name"></el-option>
                        </el-select>
                    </div>
                </label>
                <label>
                    {{$t('newsweb_txt_web_language')}}
                    <div class="selector">
                        <el-select v-model="lang"
                                   :placeholder="$t('article_placeholder_select')">
                          <!-- <el-option value="" label="全部" ></el-option> -->
                          <el-option v-for="(val,key) in $store.state.app.langListNew"
                                     :value="key"
                                     :key="key"
                                     :label="val"></el-option>
                        </el-select>
                    </div>
                </label>
                <label v-if="!isRecommend">
                    {{$t('newsweb_txt_web_layout')}}
                    <div class="selector">
                        <el-select v-model="plate"
                                   :placeholder="$t('article_placeholder_select')">
                            <el-option v-for="v in plateList"
                                       :value="v.id"
                                       :key="v.id"
                                       :label="v.name"></el-option>
                        </el-select>
                    </div>
                </label>
            </div>
            <div class="panel">
                <label>
                    {{$t('newsweb_txt_web_cover')}}
                    <el-radio-group v-model="coverType"
                                    @change="changeCoverType">
                        <el-radio label="1">{{$t('newsweb_txt_web_coverone')}}</el-radio>
                        <el-radio v-if="articleType != 3 && !isRecommend"
                                  label="2">{{$t('newsweb_txt_web_coverthree')}}
                        </el-radio>
                    </el-radio-group>
                </label>
            </div>
            <div class="panel">
                <div v-if="coverType == 1"
                     class="img-box"
                     @click="showMaterial">
                    <i class="el-icon-plus"></i>
                    <img class="img"
                         v-if="singleImg.origin"
                         :src="singleImg.origin"
                         alt="">
                </div>
                <div v-if="coverType == 2">
                    <div v-for="(value,index) in imgList"
                         class="img-box"
                         @click="showMaterial(index)"
                         :key="index">
                        <i class="el-icon-plus"></i>
                        <img class="img"
                             v-if="value.origin"
                             :src="value.origin"
                             alt="">
                    </div>
                </div>
            </div>
            <div class="panel" v-if="isRecommend">
                <label>
                    {{$t('newsweb_txt_recommend_num')}}
                    <div class="selector">
                      <el-input v-model="defaultIndex" ></el-input>
                    </div>
                </label>
            </div>
            <div class="panel" v-if="!isExamine&&!isRecommend">
                <el-button type="primary"
                           @click="publish(1)">{{$t('newsweb_btn_web_publish')}}
                </el-button>
                <el-button @click="publish(2)" v-if="!isEdit">{{$t('newsweb_btn_web_savedrafts')}}</el-button>
                <el-button @click="preview" v-if="articleType != 5">{{$t('newsweb_btn_web_preview')}}</el-button>
            </div>
            <div class="panel" v-if="isExamine">
                <el-button type="primary"
                           @click="publish(1)">{{$t('newsweb_btn_web_save')}}
                </el-button>
                <el-button @click="toPass" :disabled="disabled" >{{$t('newsweb_btn_web_pass')}}</el-button>
                <el-button @click="unPass" >{{$t('newsweb_btn_web_nopass')}}</el-button>
                <el-button @click="setting" >{{$t('newsweb_txt_web_setting')}}</el-button>
            </div>
            <div class="panel" v-if="isRecommend">
                <el-button type="primary"
                           @click="publish(1)">{{$t('newsweb_btn_web_publish')}}
                </el-button>
            </div>
        </div>
        <!--dialog-->
        <el-dialog
                :visible.sync="dialogVisible"
                custom-class="pop-material"
        >

          <material v-if="dialogVisible" :chooseable="chooseable"  @getImgUrl="getImgUrl" ref="popMaterial" ></material>
          <span slot="footer" class="dialog-footer">

            <el-button @click="dialogVisible = false">{{$t('newsweb_btn_cancel')}}</el-button>
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


    <el-dialog
      :visible.sync="showReasonBox"
      custom-class="reasonPop"
    >
      <div class="selector">
        <el-select v-model="commonReason"
          :placeholder="$t('article_util_reason')"
          @change="fillReason">
          <el-option v-for="(val,i) in reasons" :key="i" :value="val" :label="val">
            <span style="float: left">{{ val }}</span>
            <span class="el-icon-close" style="float:right;margin-left:15px;" @click.stop="deleteReason(val)"></span>
          </el-option>
        </el-select>
      </div>
      <el-input type="textarea" v-model="reason"
        :placeholder="$t('newsweb_txt_web_nopasshint')"
        :rows="6">
      </el-input>
      <a href="javascript:;" @click="addToReason">{{$t('add_to_util_reason')}}</a>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showReasonBox = false">{{$t('newsweb_btn_cancel')}}</el-button>
        <el-button type="primary"
                   @click="passArticle(1)">{{$t('newsweb_btn_ok')}}</el-button>
      </span>
    </el-dialog>
    <!--设置-->
    <el-dialog  width="360px" :visible.sync="isShowSetting">
      <el-form :model="setProperties">
          <div>
          <el-checkbox v-model="setProperties.BannerStatus">{{$t("newsweb_btn_web_pinhint")}}</el-checkbox>
          </div>
          <el-checkbox v-model="setProperties.isgiveList">{{$t("newsweb_txt_web_rank")}}</el-checkbox>
          <el-input style="margin-top:10px;" :placeholder="$t('newsweb_txt_web_weight')" v-if="setProperties.isgiveList==true" v-model="setProperties.SortWeight" clearable></el-input>
          <div style="margin-top:10px;">
            <div>
              <el-radio v-model="setProperties.SyncFlag" label="0">{{$t("newsweb_txt_web_way1")}}</el-radio>
            </div>
            <div>
              <el-radio v-model="setProperties.SyncFlag" label="1">{{$t("newsweb_txt_web_way2")}}</el-radio>
            </div>
            <el-radio v-model="setProperties.SyncFlag" label="2">{{$t("newsweb_txt_web_way3")}}</el-radio>
          </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowSetting = false">{{$t("newsweb_btn_cancel")}}</el-button>
        <el-button type="primary" @click="DialogSet">{{$t("newsweb_btn_ok")}}</el-button>
      </div>
    </el-dialog>
    <!--end 设置-->
    </div>
</template>
<script>
  import moment from 'moment'
  import material from 'components/material'
  import imgCropper from './imgCropper.vue'
  import {uploadMaterial, saveMaterial} from 'api/Material'
  import {SUCCESS_NOTIFY_MSG,FAILED_NOTIFY_MSG,FAILED_CODE} from 'api/CustomConfigKeys'
  import {publishArticle,checkArticle,setAttrComment} from 'api/Article'
  import {seveRecommend} from 'api/Recommend'

  export default {
    props: {
      articleType: {
        type: String,
        default: '1'
      },
      title: {
        type: String
      },
      content: {
        type: String
      },
      articleUrl: {
        type: String
      },
      appId: {
        type: String
      },
      appMod: {
        type: String
      },
    },
    data(){
      return {
        isSaved: true, // 判断是否已经保存草稿，用于保存提示弹窗
        isEdit: false,
        isExamine: false,
        isRecommend: false,
        defaultIndex: '',
        articleId: '',
        game: '',
        pregame: null,
        lang: 'en',
        plate: '',
        preplate: null,
        coverType: "1",
        imageUrl: '',
        dialogVisible: false,
        chooseable: true,
        videoMsg: null, // 视频信息
        photosList: [],
        imgList: [ // 三图
          {
            preview: '',
            origin: ''
          },
          {
            preview: '',
            origin: ''
          },
          {
            preview: '',
            origin: ''
          }
        ],
        singleImg: { // 单图
          preview: '',
          origin: ''
        },
        chooseImg: '',
        isChooseImg: false,
        nowCoverIndex: 0, // 当前修改的图片url链接（三张图时使用）
        showCrop: false, //图片裁切弹窗
        cropUrl: '', // 需要裁切图片url
        disabled: true,
        reason: '',
        commonReason:'',
        reasons: [],
        showReasonBox: false,
        html: '',
        isShowSetting:false,
        setProperties:{}
      }
    },
    computed: {
      gameList(){
        this.game = this.pregame == null ? this.$store.getters.gameList[0].id : this.pregame
        return this.$store.getters.gameList
      },
      plateList(){
        this.plate = this.preplate == null ? this.$store.getters.plateList[0].id : this.preplate
        return this.$store.getters.plateList
      },
      userName(){
        return this.$store.getters.userInfo.nickname
      }
    },
    methods: {
      showMaterial(index){
        this.dialogVisible = true
        //this.showCrop = true
        //this.$refs.popMaterial.onIndex = -1
        this.nowCoverIndex = this.coverType == 2 ? index : 0
      },
      getImgUrl(obj){
        this.chooseImg = obj
        this.isChooseImg = true
      },
      changeCoverType(type){
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
      getCrop(){
        this.$refs.cropper.getCrop()
      },
      getImgBlob(imgBlob){
        var myformData = new FormData();
        var filename = Date.now() + '.' + imgBlob.type.split('/')[1];
        var file = new File([imgBlob], filename, {type: imgBlob.type});
        myformData.append('upfile', file);
        myformData.append('issnap', 1);
        uploadMaterial(myformData, {
          [SUCCESS_NOTIFY_MSG]: this.$t('article_mod_copper_upload')
        }).then(res => {
          if (res.code == 0) {
            if (this.coverType == 1) {
              this.singleImg = res.info;
            } else {
              this.imgList[this.nowCoverIndex] = res.info;
            }
            this.showCrop = false;
            // saveMaterial(res.info).then((resp)=>{
            //   if(resp.code == 0){

            //   }
            // })
          }
        })
      },
      publish(status){
        this.$emit('getContent')
        if(this.title == ''){
          this.$notify.info({
            message: this.$t('newsweb_txt_web_titleplease')
          });
          return false
        }
        if(this.title.length > 80){
          this.$notify.info({
            message: this.$t('article_title_max',{max:80})
          });
          return false
        }

        var params = {}
        params = {
          type: this.articleType,
          lang: this.lang,
          title: this.title,
          status: status,
          gameid: this.game,
          catalog: this.plate,
        }


        switch (this.articleType){
          case '1' :
		        if(this.html == "" && status ==1){
              this.$notify.info({
                message: this.$t('article_placeholder_content')
              });
		        	return false
		        }

            params.content = this.html

            break;
          case '2' :
		        if(this.photosList.length == 0 && status ==1){
              this.$notify.info({
                message: this.$t('article_upload_choose_img')
              });
		        	return false
		        }
		        var arr = []
            var emptyFlag = false
            var maxFlag = false
		        this.photosList.map((val,i)=>{
		        	val.index = i+1;
		        	arr.push(val)
              if(val.desc == ''){
                emptyFlag = true
              }
              // if(val.desc.length > 200){
              //   maxFlag = true
              // }
		        })

            if(emptyFlag && status == 1){
              this.$notify.info({
                message: this.$t('article_placeholder_desc')
              });
              return false
            }
            // if(maxFlag){
            //   this.$notify.info({
            //     message: this.$t('article_desc_max',{max:200})
            //   });
            //   return false
            // }
            // arr.map((val)=>{
            //   delete val.key
            // })
            params.imgs = JSON.stringify(arr)
            break;
          case '3' :
		        if(this.content == "" && status ==1){
              this.$notify.info({
                message: this.$t('article_placeholder_desc')
              });
		        	return false
		        }
            //去除视频描述字数限时
            // if(this.content.length > 2000){
            //   this.$notify.info({
            //     message: this.$t('article_desc_max',{max:2000})
            //   });
            //   return
            // }
            if(status == 2 && this.videoMsg == null){
              this.videoMsg = {
                url: '',
                thumb: '',
                timelen: ''
              }
            }
          	if(this.videoMsg == null && status ==1){
              this.$notify.info({
                message: this.$t('article_upload_wait')
              });
          		return
          	}
            params.desc = this.content
            params.url = this.videoMsg.url
            params.thumb = this.videoMsg.thumb
            params.timelen = this.videoMsg.timelen
            break;
          case '4' :
		        if(this.articleUrl == "" && status ==1){
              this.$notify.info({
                message: this.$t('article_placeholder_url')
              });
		        	return false
		        }
            var reg=/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
            if(!reg.test(this.articleUrl) && status == 1){
              this.$notify.info({
                message: this.$t('article_msg_url')
              });
              return false
            }

            params.url = this.articleUrl
            break;
          case '5' :
		        if(this.appId == "" && status ==1){
              this.$notify.info({
                message: this.$t('article_placeholder_id')
              });
		        	return false
		        }

            params.pageid = this.appMod
            params.params = this.appId
            break;
        }
        // 封图
        var covers = []
        if(this.coverType == 1){
          covers  = [{
            SmallImgUrl: this.singleImg.preview,
            BigImgUrl: this.singleImg.origin
          }]
          if(covers[0].BigImgUrl == "" && status == 1){
            this.$notify.info({
              message: this.$t('article_msg_single_pic')
            });

            return
          }
        }else{
          var arr = []
          this.imgList.map((val,i)=>{
            arr.push({
              SmallImgUrl: val.preview,
              BigImgUrl: val.origin
            })
          })
          covers = arr;
          var flag = true;
          covers.map((val,index)=>{
            if(val.BigImgUrl == ""){
              flag = false
            }
          })
          if(!flag && status == 1){
            this.$notify.info({
              message: this.$t('article_msg_three_pic')
            });
            return
          }
        }

        params.covers = JSON.stringify(covers)

        if(this.isEdit){
          params.id = this.articleId
        }

        if(this.isRecommend){ // 判断是否是官方推荐文章
          delete params.status
          delete params.gameid
          delete params.catalog

          if(this.defaultIndex == '') {
            this.$notify({message:this.$t('input_default_index')})
            return
          }else if(isNaN(this.defaultIndex)){
            this.$notify({message:this.$t('index_must_num')})
            return
          }

          params.seat = parseInt(this.defaultIndex)

          seveRecommend(params).then((res)=>{
            if(res.code == 0){
              this.isSaved = true
              this.$notify({message: this.$t('article_publish_success')})
              if(!this.isEdit){
                this.$router.push('/recommend/list')
              }else{
                this.$router.go(-1)
              }
              // 发布成功清空ueditor草稿箱
              try{
                ue.execCommand( "clearlocaldata" )
              }catch(err){
                console.log(err)
              }
            }
          })
        }else{
          if(this.$store.state.app.userInfo.role == 1){ // 区分管理员
            params.admin = 1
          }
          return publishArticle(params,{
            [FAILED_NOTIFY_MSG]: this.$t('no_this_id'),
            [FAILED_CODE]: '-19'
          }).then((res) => {
            if(res.code == 0){
              this.isSaved = true
              var msg = status == 1 ? this.isEdit? this.$t('article_edit_success') : this.$t('article_publish_success'):this.$t('article_save_success')
              this.$notify({
                message: msg,
                type: 'success'
              })
              // 发布成功清空ueditor草稿箱
              try{
                ue.execCommand( "clearlocaldata" )
              }catch(err){
                console.log(err)
              }

              this.disabled = false
              if(status == 2){
                return Promise.resolve(res)
              }
              if(this.isExamine&&this.isEdit){
                return
              }
              if(this.isEdit && status == 1){
                this.$router.go(-1)
              }
              if(!this.isEdit && !this.isExamine && status == 1){
                this.$router.push('/article/list')
              }


            }else{
              if(status == 2){
                return Promise.resolve(res)
              }
            }
          })
        }



      },
      passArticle(status){
        checkArticle({
          id: this.articleId,
          flag: status,
          reason: this.reason
        }).then((res)=>{
          if(res.code == 0){
            this.$router.go(-1)
          }
        })
      },
      toPass(){
        this.$confirm(this.$t('newsweb_txt_web_passhint'), this.$t('hint'), {
          confirmButtonText: this.$t('newsweb_btn_ok'),
          cancelButtonText: this.$t('newsweb_btn_cancel'),
          type: 'warning'
        }).then(() => {
          this.passArticle(0)
        }).catch(() => {});
      },
      unPass(){
        this.showReasonBox = true
        if(localStorage.reasons){
          this.reasons = JSON.parse(localStorage.reasons)
        }
      },
      addToReason(){ // 添加到常用理由
        if(this.reason == ''){
          this.$notify({message: this.$t('article_input_reason')})
          return
        }
        var flag = false
        this.reasons.map((val,i)=>{
          if(val == this.reason){
            flag = true
          }
        })
        if(flag){
          this.$notify({message: this.$t('reason_exist')})
          return
        }
        this.reasons.push(this.reason)
        localStorage.reasons = JSON.stringify(this.reasons)
        this.$notify({message: this.$t('add_success')})
      },
      deleteReason(reason){
        this.reasons.map((val,i)=>{
          if(val == reason){
            this.reasons.splice(i,1)
          }
        })
        localStorage.reasons = JSON.stringify(this.reasons)
      },
      fillReason(val){
        this.reason = val
      },
      imgClose(){
        this.showCrop = false
      },
      getGameName(v){
        let obj = this.gameList.find((item)=>{
          if(item.id == v){
            return item
          }
        })
        this.GameName = obj.name
      },
      preview(){
        this.getGameName(this.game)
        this.$emit('getContent')
        if(this.title == ''){
          this.$notify.info({
            message: this.$t('newsweb_txt_web_titleplease')
          });
          return false
        }
        if(this.title.length > 80){
          this.$notify.info({
            message: this.$t('article_title_max',{max:80})
          });
          return false
        }

        var params = {}
        params = {
          ObjectType: this.articleType,
          Lang: this.lang,
          Title: this.title,
          CheckStatus: status,
          GameId: this.game,
          GameName: this.GameName,
          catalog: this.plate,
          NickName: this.userName
        }

        switch (this.articleType){
          case '1' :
            if(this.html == "" && status ==1){
              this.$notify.info({
                message: this.$t('article_placeholder_content')
              });
              return false
            }

            params.content = this.html

            break;
          case '2' :
            if(this.photosList.length == 0 && status ==1){
              this.$notify.info({
                message: this.$t('article_upload_choose_img')
              });
              return false
            }
            var arr = []
            var emptyFlag = false
            var maxFlag = false
            this.photosList.map((val,i)=>{
              val.index = i+1;
              arr.push(val)
              if(val.desc == ''){
                emptyFlag = true
              }
              if(val.desc.length > 200){
                maxFlag = true
              }
            })

            if(emptyFlag && status == 1){
              this.$notify.info({
                message: this.$t('article_placeholder_desc')
              });
              return false
            }
            if(maxFlag){
              this.$notify.info({
                message: this.$t('article_desc_max',{max:200})
              });
              return false
            }
            // arr.map((val)=>{
            //   delete val.key
            // })
            params.imgs = arr
            break;
          case '3' :
            if(this.content == "" && status ==1){
              this.$notify.info({
                message: this.$t('article_placeholder_desc')
              });
              return false
            }
            if(this.content.length > 200){
              this.$notify.info({
                message: this.$t('article_desc_max',{max:200})
              });
              return
            }
            if(status == 2 && this.videoMsg == null){
              this.videoMsg = {
                url: '',
                thumb: '',
                timelen: ''
              }
            }
            if(this.videoMsg == null && status ==1){
              this.$notify.info({
                message: this.$t('article_upload_wait')
              });
              return
            }
            params.desc = this.content
            params.url = this.videoMsg.url
            params.thumb = this.videoMsg.thumb
            params.timelen = this.videoMsg.timelen
            break;
          case '4' :
            if(this.articleUrl == "" && status ==1){
              this.$notify.info({
                message: this.$t('article_placeholder_url')
              });
              return false
            }
            var reg=/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
            if(!reg.test(this.articleUrl) && status == 1){
              this.$notify.info({
                message: this.$t('article_msg_url')
              });
              return false
            }
            window.open(this.articleUrl,'_blank')
            return
            //params.url = this.articleUrl

            break;
          case '5' :

            break;
        }
        // 封图
        var covers = []
        if(this.coverType == 1){
          covers  = [{
            SmallImgUrl: this.singleImg.preview,
            BigImgUrl: this.singleImg.origin
          }]
          if(covers[0].BigImgUrl == "" && status == 1){
            this.$notify.info({
              message: this.$t('article_msg_single_pic')
            });

            return
          }
        }else{
          var arr = []
          this.imgList.map((val,i)=>{
            arr.push({
              SmallImgUrl: val.preview,
              BigImgUrl: val.origin
            })
          })
          covers = arr;
          var flag = true;
          covers.map((val,index)=>{
            if(val.BigImgUrl == ""){
              flag = false
            }
          })
          if(!flag && status == 1){
            this.$notify.info({
              message: this.$t('article_msg_three_pic')
            });
            return
          }
        }
        params.CoverList = covers
        var win = window.open(previewURL+'/views/gamenews.html#/preview','_blank')
        window.addEventListener('message',function(event){
          if(win){
            win.postMessage(params, previewURL)
          }
          win = null
        })

      },
      setting:function(){
          this.isShowSetting = true;
      },
      DialogSet () {
        if(this.setProperties.BannerStatus == true){
          this.setProperties.BannerStatus = 0
        }else {
          this.setProperties.BannerStatus = 1
        }
        if(!this.setProperties.isgiveList){
          this.setProperties.SortWeight = 0
        }
        var date = moment(this.setProperties.CreateTime).unix();

        setAttrComment({
          id: this.articleId,
          flag: this.setProperties.BannerStatus,
          weight: this.setProperties.SortWeight,
          syncflag: this.setProperties.SyncFlag,
          createtime:date,
          scannedcount:this.setProperties.ScannedCount
        }).then((res)=>{
          if(res.code == 0){
            this.isShowSetting = false;
          }
        })
      }
    },
    watch:{ // 监控页面是否修改
      game(){
        this.disabled = true
        //this.isSaved = false
      },
      plate(){
        this.disabled = true
        //this.isSaved = false
      },
      lang(){
        this.disabled = true
        //this.isSaved = false
      },
      title(val){
        this.disabled = true
        this.isSaved = val == '' ? true : false
      },
      content(val){
        this.disabled = true
        this.isSaved = val == '' ? true : false
      },
      html(val){
        this.disabled = true
        this.isSaved = val == '' ? true : false
      },
      articleUrl(val){
        this.disabled = true
        this.isSaved = val == '' ? true : false
      },
      appId(val){
        this.disabled = true
        this.isSaved = val == '' ? true : false
      },
      appMod(){
        this.disabled = true
        this.isSaved = false
      },
      coverType(){
        this.disabled = true
        this.isSaved = false
      },
      imgList:{
        handler: function(val){
          this.disabled = true
          this.isSaved = false
        },
        deep: true
      },
      singleImg:{
        handler: function(val){
          this.disabled = true
          this.isSaved = false
        },
        deep: true
      },
      photosList:{
        handler: function(val){
          this.disabled = true
          this.isSaved = val.length == 0 ? true : false
        },
        deep: true
      },
      videoMsg:{
        handler: function(val){
          this.disabled = true
          this.isSaved = false
        },
        deep: true
      }
    },
    components: {
      material,
      imgCropper
    },
    mounted(){
      // /this.lang = this.$store.state.app.langList[0]
      //this.game = this.gameList[0].id;
      //this.plate = this.plateList[0].id;


    }
  }
</script>
