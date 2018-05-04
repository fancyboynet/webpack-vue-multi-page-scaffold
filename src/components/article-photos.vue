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
    .photos-box{
      padding:15px;
      background: #f4f5f9;
      margin-bottom:10px;
      .img-box{
        width:112px;
        height:90px;
        float:left;
        text-align:center;
        border:1px solid #aaa;
        position:relative;
      }
      img{
        position:absolute;
        left:50%;
        top:50%;
        transform:translate(-50%,-50%);
        max-width:110px;
        max-height:88px;
      }
      .text-area{
        display: block;
        float: left;
        width: 640px;
        margin-left:8px;
        height:90px;
        font-size:14px;
        padding: 5px;
      }
      .btn-box{
        float:left;
        width:60px;
        text-align: center;
        line-height: 14px;
        color:#405b84;
        font-size:14px;
        p{
          cursor: pointer;
          margin:5px 0 8px 0;
          &:hover{
            color:#000;
          }
        }
      }

    }
    .pop-material{
       width:1000px;
      .el-main{
        min-height:auto;
      }
      .el-dialog__body{
        padding:0;
      }
    }
    .hide{
      display: none;
    }
    .list-move {
      transition: all .5s;
    }
    .list-enter-active, .list-leave-active {
      transition: all 1s;
    }
    .list-enter, .list-leave-to
    /* .list-leave-active for below version 2.1.8 */ {
      opacity: 0;
      transform: translateY(30px);
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
      <h3>{{$t('article_pic')}}</h3>
      <div>
        <div>
          <transition-group name="list" tag="div" >
              <div class="photos-box clearfix" v-for="(val,i) in imgList" :key="val.key"  >
                <div class="img-box">
                  <img :src="val.url" alt="">
                </div>

                <textarea v-model="val.desc" :placeholder="$t('article_placeholder_desc')" class="text-area"></textarea>
                <div class="btn-box">
                  <p @click="changeImg(i)">{{$t('newsweb_btn_web_change')}}</p>
                  <p @click="myDelete(i)">{{$t('newsweb_txt_web_delete')}}</p>
                  <p :class="[i==0?'hide':'']" @click="toUp(i)">{{$t('newsweb_btn_web_up')}}</p>
                  <p :class="[i==imgList.length-1?'hide':'']" @click="toDown(i)">{{$t('newsweb_btn_web_down')}}</p>
                </div>
              </div>
          </transition-group>
        </div>
        <el-button size="small" type="primary" @click="addImg" >{{$t('article_up_img')}}</el-button>
      </div>
    </div>

    <setMod ref="mod" :title="title" @getContent="getImgList" article-type="2" ></setMod>
    <!--dialog-->
    <el-dialog
      :visible.sync="showMaterial"
      custom-class="pop-material"
    >
      <material ref="popMaterial" v-if="showMaterial" :chooseable="chooseable" @getImgUrl="getImgUrl" :multiple="true" ></material>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showMaterial = false">{{$t('newsweb_btn_cancel')}}</el-button>
        <el-button type="primary" @click="confirm">{{$t('newsweb_btn_ok')}}</el-button>
      </span>
    </el-dialog>
    <!--dialog-->
    <el-dialog
      :visible.sync="changeMaterial"
      custom-class="pop-material"
    >
      <material v-if="changeMaterial" ref="popMaterial2" :chooseable="chooseable" @getImgUrl="getImgUrl2" ></material>
      <span slot="footer" class="dialog-footer">
        <el-button @click="changeMaterial = false">{{$t('newsweb_btn_cancel')}}</el-button>
        <el-button type="primary" @click="changeImgConfirm">{{$t('newsweb_btn_ok')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import setMod from './article-set-mod.vue'
  import material from 'components/material'
  export default {
    data(){
      return {
        title: '',
        imgList: [],
        showMaterial: false,
        chooseable: true,
        nowChooseImg: null,
        changeMaterial: false,
        changeIndex: null
      }
    },
    methods:{
      addImg(){
        this.showMaterial = true
        this.nowChooseImg = null
        //this.$refs.popMaterial.onIndex = -1
      },
      getImgUrl(obj){
        this.nowChooseImg = obj
      },
      getImgUrl2(obj){
        var key = Date.now()
        var params = {
          url: obj.big,
          desc: '',
          key: 'key'+key
        }
        this.nowChooseImg = params
      },
      confirm(){
        if(this.$refs.popMaterial.onIndex == -1){
          this.$message(this.$t('article_upload_choose_img'))
          return
        }
        this.showMaterial = false
        if(this.nowChooseImg.length + this.imgList.length > 30){
          this.$message(this.$t('newsweb_err_web_maximage'))
          return
        }
        this.nowChooseImg.map((val,i)=>{
          this.imgList.push(val)
        })
        this.$refs.mod.photosList = this.imgList;

      },
      changeImg(i){
        this.changeIndex = i
        this.changeMaterial = true
        this.nowChooseImg = null
        //this.$refs.popMaterial2.onIndex = -1
      },
      changeImgConfirm(){
        if(this.$refs.popMaterial2.onIndex == -1){
          this.$message(this.$t('article_upload_choose_img'))
          return
        }
        this.imgList[this.changeIndex].url = this.nowChooseImg.url
        this.changeMaterial = false
      },
      toUp(i){
        const tmp = this.imgList[i-1]
        this.$set(this.imgList,i-1,this.imgList[i])
        this.$set(this.imgList,i,tmp)
      },
      toDown(i){
        const tmp = this.imgList[i+1]
        this.$set(this.imgList,i+1,this.imgList[i])
        this.$set(this.imgList,i,tmp)
      },
      myDelete(i){
        this.imgList.splice(i,1)
      },
      getImgList(){
        this.$refs.mod.photosList = this.imgList;
      }
    },
    components:{
      setMod,
      material
    },
    mounted(){

    }
  }
</script>
