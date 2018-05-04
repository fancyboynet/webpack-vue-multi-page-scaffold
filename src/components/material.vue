<style lang="scss">
    .wg-material-container {
        .el-main {
            display: block;
        }
        .el-button--primary{
          background-color:#ffd40a;
          border-color:#ffd40a;
          color:#1b1b1b;
        }
        .material-list {
            padding: 19px 25px 0px 35px;
            text-align: justify;
            .handle-bar{
              .item{
                background:rgba(0,0,0,0.5);
                width:48px;
                height:30px;
                line-height: 30px;
                text-align: center;
                border-radius: 3px;
                display:inline-block;
                vertical-align:middle;
                font-size: 18px;
                color:#fff;
                margin-bottom:6px; 
                cursor:pointer;
                &.cancel{
                  font-size: 14px;
                }
                &:hover > *{
                  opacity: 0.5;
                }
              }
            }
            .material {
                float: left;
                display: block;
                text-align: center;
                width: 14%;
                margin-right: 3%;
                vertical-align: top;
                margin-bottom: 5px;
                &:nth-child(6n) {
                    margin-right: 0;
                }
                .img-box {
                    position: relative;
                    width: 100%;
                    padding-top: 100%;
                    background:#f4f5f9;
                    border:2px solid #fff;
                    .handle-bar{
                      visibility: hidden;
                      position:absolute;
                      right:10px;
                      top:10px;
                      .item{
                        display:block;
                      }
                    }
                    &:hover{
                      .handle-bar{
                          visibility:visible;
                      }
                    }
                    &.active{
                      border:2px solid #405b84;
                    }
                    .checkbox{
                      position:absolute;
                      left:0;
                      top:-3px;
                      .el-checkbox__inner{
                        width:18px;
                        height:18px;
                        border-radius: 0;
                      }
                      .el-checkbox__inner::after{
                        border: 2px solid #405b84;
                        border-left: 0;
                        border-top: 0;
                        width:4px;
                        height:8px;
                        left:5px;
                        top:2px;
                      }
                      .el-checkbox__input.is-checked .el-checkbox__inner{
                        background-color:#ffd40a;
                        border-color: #ffd40a;
                      }
                      .el-checkbox__label{
                        visibility:hidden;
                      }
                    }
                }
                img {
                    position: absolute;
                    left: 0;
                    top: 0;
                    max-width: 100%;
                    max-height: 100%;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                }
                .img-title{
                    margin-top:10px;
                    height:20px;
                    text-align: center;
                    .title{
                      height:20px;
                      line-height: 20px;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                      display: inline-block;
                      max-width: 90%;
                      color:#000;
                      font-size: 14px;
                      vertical-align: middle;
                    }
                    .status{
                      font-size: 16px;
                      display: inline-block;
                      vertical-align: middle;
                      margin-left:5px;
                      .el-icon-success{
                        color:#ffc109;
                      }
                      .el-icon-warning{
                        color:#ff5050;
                      }
                    }
                }
            }
            .subnav-bar{
              height:44px;
              .subnav{
                float:left;
                li{
                  float:left;
                  font-size: 14px;
                  margin-right: 10px;
                  cursor:pointer;
                  &.active{
                    color:#409eff;
                  }
                }
              }
              .all-handle{
                float:right;
              }
            }
        }
    }
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
    .player-bar{
      video{
        width:100%;
        height:100%;
      }
    }
</style>

<template>
    <el-container class="wg-material-container">
        <el-main class="no-side">
            <main-header :name="$t('newsweb_txt_web_media')">
                <el-upload
                        action=""
                        name="upfile"
                        accept="image/gif, image/jpeg, image/png"
                        :multiple="true"
                        :show-file-list="false"
                        :http-request="upload"
                        :before-upload="beforeUpload"
                        slot="tools">
                    <el-button type="primary"
                               size="medium">{{$t('newsweb_btn_web_addimage')}}
                    </el-button>
                </el-upload>
                <div slot="uploadVideo" v-if="!chooseable">
                  <el-button type="primary" size="medium" @click="isShowUploadDialog = true">{{$t('newsweb_btn_web_upload')}}</el-button>
                </div>
            </main-header>
            <div class="material-list clearfix">
                <div class="subnav-bar">
                  <ul class="subnav">
                    <li :class="{active:tabIndex==0}" @click="tab(0)">{{$t('newsweb_txt_web_all')}}</li>
                    <li :class="{active:tabIndex==1}" @click="tab(1)">{{$t('newsweb_btn_star')}}</li>
                    <li :class="{active:tabIndex==2}" @click="tab(2)">{{$t('newsweb_txt_web_video')}}</li>
                  </ul>
                  <div class="all-handle" v-if="!chooseable">
                    <el-button v-if="!isShowCheck" type="primary" size="mini" @click="isShowCheck=true">{{$t('newsweb_txt_batch')}}</el-button>
                    <div class="handle-bar" v-else>
                      <span class="item" v-if="!isStar" @click="markStar(checkedList)"><i class="el-icon-star-off"></i></span>
                      <span class="item" v-else @click="cancelStar(checkedList)"><i class="el-icon-star-on"></i></span>
                      <span class="item" @click="deleteMaterial(checkedList)"><i class="el-icon-delete"></i></span>
                      <span class="item cancel" @click="isShowCheck=false">{{$t('newsweb_btn_cancel')}}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <gallery :images="images" :index="imageIndex" :options="{videoContentClass: 'video-content', videoLoadingClass: 'video-loading',videoPlayingClass: 'video-playing',videoPosterProperty: 'poster',videoSourcesProperty: 'sources'}" @close="imageIndex = null"></gallery>
                  <el-checkbox-group v-model="checkedList" @change="handleChecked">                    
                    <div class="material" v-for="(item, index) in materials" >
                        <div v-if="!chooseable" class="img-box">
                            <img v-if="item.MaterialType == 1" :src="item.SmallImgUrl" :key="index" :alt="item.MaterialName" @click="playVideo(item.DataUrl)"/>
                            <img v-else :src="item.SmallImgUrl" :key="index" :alt="item.MaterialName" @click="imageIndex=index"/>
                            <div class="checkbox" v-show="isShowCheck"><el-checkbox :label="item.MateriaId" :key="item.MateriaId"></el-checkbox></div>
                            <div class="handle-bar">
                              <span class="item" v-if="!item.IsStars" @click="markStar(item.MateriaId)"><i class="el-icon-star-off"></i></span>
                              <span class="item" v-else @click="cancelStar(item.MateriaId)"><i class="el-icon-star-on"></i></span>
                              <span class="item" @click="deleteMaterial(item.MateriaId, index)"><i class="el-icon-delete"></i></span>
                            </div>     
                        </div>
                        <div v-else :class="['img-box',active[item.DataUrl]?'active':'']" @click="getImgUrl(index,item.SmallImgUrl,item.DataUrl)">
                            <img :src="item.SmallImgUrl" :key="index" :alt="item.MaterialName"/>
                            <div class="checkbox" v-show="isShowCheck"><el-checkbox :label="item.MateriaId" :key="item.MateriaId"></el-checkbox></div>
                            <div class="handle-bar">
                              <span class="item" v-if="!item.IsStars" @click="markStar(item.MateriaId)"><i class="el-icon-star-off"></i></span>
                              <span class="item" v-else @click="cancelStar(item.MateriaId)"><i class="el-icon-star-on"></i></span>
                              <span class="item" @click="deleteMaterial(item.MateriaId, index)"><i class="el-icon-delete"></i></span>
                            </div>     
                        </div>
                        <div class="img-title">
                            <p class="title">{{item.MaterialName || $t('newsweb_txt_data_title')}}</p><span class="status" v-if="item.MaterialType"><i v-if="!item.TranscoderStatus" class="el-icon-warning"></i><i v-else class="el-icon-success"></i></span>
                        </div>
                    </div>
                  </el-checkbox-group>
                </div>
            </div>
            <el-pagination
                :current-page="currentPage"
                :page-size="pageSize"
                layout="total, prev, pager, next, jumper"
                v-on:current-change="pageChange"
                :total="total">
            </el-pagination>
        </el-main>
        <!--上传视频-->
        <UploadVideo :isShow.sync="isShowUploadDialog" v-on:uploadData="saveMaterial"></UploadVideo>
        <!--end 上传视频-->
        <!--视频播放-->
        <el-dialog
          title=""
          :visible.sync="isShowVideo"
          width="80%">
          <div class="player-bar">
              <video :src="videoURL" controls="controls"></video>
          </div>
        </el-dialog>
        <!--end 视频播放-->
    </el-container>
</template>

<script>
  import MainHeader from 'components/main-header.vue'
  import VueGallery from 'vue-gallery';
  import {getList, deleteMaterial, uploadMaterial, saveMaterial,setStar} from 'api/Material'
  import {SUCCESS_NOTIFY_MSG} from 'api/CustomConfigKeys'
  import getImageFileMetas from 'utils/getImageFileMetas'
  import UploadVideo from 'components/upload-video.vue'
  export default {
    props: {
      chooseable: {
        type: Boolean,
        default: false
      },
      multiple: {
        type: Boolean,
        default: false
      }
    },
    components: {
      MainHeader,
      'gallery':VueGallery,
      UploadVideo
    },
    data(){
      return {
        pageSize: 12,
        currentPage: 1,
        total: 1,
        materials: [],
        onIndex: '-1',
        imgList: [],
        active:{},
        fileList: [],
        isShowCheck:false,
        isStar:false,
        checkedList:[],
        tabIndex:0,
        isShowUploadDialog:false,
        responseMsg: null,
        disabled: false,
        imageIndex:null,
        images:[],
        type:0,
        isstar:0,
        isShowVideo:false,
        videoURL:''
      }
    },
    methods: {
      getList(){
        getList({
          pagenum: this.pageSize,
          page: this.currentPage,
          materialtype:this.type,
          isstart:this.isstar
        }).then(res => {
          if (res.code === 0) {
            this.materials = res.datalist;
            this.total = res.total;
            for(let i=0; i<this.materials.length; i++){              
                this.images.push(this.materials[i].DataUrl);
            }
            //video
            /*images: [
              {
                  title: 'Fruits',
                  href: 'https://example.org/videos/fruits.mp4',
                  type: 'video/mp4',
                  poster: 'https://example.org/images/fruits.jpg'
              },
              {
                  title: 'Banana',
                  href: 'https://example.org/images/banana.jpg',
                  type: 'image/jpeg',
                  thumbnail: 'https://example.org/thumbnails/banana.jpg'
              }
            ]*/
          }
        })
      },
      pageChange(page){
        this.currentPage = page;
        this.getList();
      },
      deleteMaterial(id, index){
        this.$confirm(this.$t('delete_material'), '', {
          confirmButton: this.$t('newsweb_btn_ok'),
          cancelButton: this.$t('newsweb_btn_cancel')
        }).then(_ => {
          let ids = [];
          if(id instanceof Array){
            ids = id.concat();
          }else{
            ids.push(id);
          }
          deleteMaterial({
            'ids':ids
          }, {
            [SUCCESS_NOTIFY_MSG]: this.$t('sucess_util')
          }).then(res => {
            if (res.code === 0) {
              //this.materials.splice(index, 1);
              this.isShowCheck = false;
              this.checkedList = [];
              this.getList();
            }
          })
        }).catch(_ => _);
      },
      async beforeUpload(file){
        let metas = await getImageFileMetas(file);
        if(metas){
          // if(metas.width < 330 || metas < 210){
          //   this.$notify({
          //     message: '图片尺寸不得小于 330px * 210px',
          //     duration: 3000,
          //     type: 'error'
          //   });
          //   return Promise.reject();
          // }else
          if(metas.size > 3*1024*1024){
            this.$notify({
              message: this.$t('newsweb_txt_resources_tips'),
              duration: 3000,
              type: 'error'
            });
            return Promise.reject();
          }
        }else{
          return Promise.reject();
        }
      },
      upload(data){
        let formData = new FormData();
        formData.append('upfile', data.file);
        formData.append('issnap', 1);
        uploadMaterial(formData, {
          [SUCCESS_NOTIFY_MSG]: this.$t('upload_success')
        }).then(res => {
          if (res.code === 0) {
            saveMaterial({
              datalist: JSON.stringify([{"Materiald":0,"DataUrl":res.info.origin,"SmallImgUrl":res.info.preview,"DataMd5":res.info.md5,"MaterialType":0,"IsStars":0,"MaterialName":res.info.filename,"TranscoderStatus":0}])
            }).then((resp) => {
              if (resp.code == 0) {
                this.getList();
              }
            })
          }
        })
      },
      saveMaterial:function(res){
          let self = this;
          saveMaterial({
            datalist: JSON.stringify([{"Materiald":0,"DataUrl":res.url,"SmallImgUrl":res.thumb,"DataMd5":res.md5file,"MaterialType":1,"IsStars":0,"MaterialName":res.filename,"TranscoderStatus":0}])
          }).then((resp) => {
            if (resp.code == 0) {
              self.getList();
            }
        })
      },
      getImgUrl(index, small, origin){
        var flag = true
        if(this.multiple){
          this.imgList.map((val,i)=>{
            if(val.url == origin){
              this.imgList.splice(i,1)
              flag = false
              //this.$set(this.active,origin,false)
              this.active[origin] = false
            }
          })
          if(flag){
            var key = Date.now()
            this.imgList.push({
              desc: '',
              url: origin,
              key: key
            })
            this.$set(this.active,origin,true)
          }
          this.$emit('getImgUrl',this.imgList)

        }else{
          this.imgList = [{
            small: small,
            big: origin
          }]
          this.$emit('getImgUrl', {
            small: small,
            big: origin
          })
          this.active = {[origin] : true}
        }

        if (this.chooseable) {
          this.onIndex = index
        }
      },
      markStar:function(id){
        let ids = [];
        if(id instanceof Array){
          ids = id.concat();          
          this.isStar = true;
        }else{
          ids.push(id);
        }
        let self = this;
        setStar({ids:ids,starflag:1}).then((resp) => {
            if (resp.code == 0) {
              self.isShowCheck = false;
              self.checkedList = [];
              self.getList();
            }
        })
      },
      cancelStar:function(id){
        let ids = [];
        if(id instanceof Array){
           ids = id.concat();
            this.isStar = false;
        }else{
            ids.push(id);
        }
        let self = this;
        setStar({ids:ids,starflag:0}).then((resp) => {
            if (resp.code == 0) {
              self.isShowCheck = false;
              self.checkedList = [];
              self.getList();
            }
        })
      },
      handleChecked:function(){
          for(let i=0;i<this.checkedList.length;i++){
            for(let j=0;j<this.materials.length;j++){
              if(this.materials[j].IsStars == 0){
                  this.isStar = false;
              }else{
                  this.isStar = true;
              }
            }
          }
      },
      tab:function(i){
          this.tabIndex = i;
          this.currentPage = 1;
          //全部
          if(i==0){
            this.type = 0;
            this.isstar = 0;
            this.getList();
          }else if(i==1){//星标
            this.type = 0;
            this.isstar = 1;
            this.getList();
          }else if(i==2){//视频
            this.type = 1;
            this.isstar = 0;
            this.getList();
          }
      },
      playVideo:function(url){
          this.isShowVideo = true;
          this.videoURL = url;
      }
    },
    mounted(){
      this.getList();
    }
  }
</script>
