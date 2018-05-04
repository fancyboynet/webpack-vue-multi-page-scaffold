<style scoped>
  .item {
    margin: 45px 0;
  }
</style>

<template>
  <div>
    <upload-video :isShow.sync="isShowUploadVideoDialog" v-on:uploadData="onSaveVideo"></upload-video>
    <upload-image :visible.sync="isShowUploadImageDialog" @on-success="onUploadImageSuccess"></upload-image>
    <div v-for="(game, index) in list" class="item">
      <strong style="margin: 0 1em 0 0;font-size: 24px;">{{ index + 1}}</strong>
      <el-button v-if="index > 0" style="width: 150px;" @click="onUp(index)">{{$t('newsweb_btn_web_up')}}
      </el-button>
      <el-button v-if="index < (list.length - 1)" style="width: 150px;" @click="onDown(index)">
        {{$t('newsweb_btn_web_down')}}
      </el-button>
      <el-button style="width: 150px;" @click="onDelete(index)">{{$t('newsweb_txt_web_delete')}}</el-button>
      <el-row style="margin: 20px 0;">
        <el-col :span="8">
          <game-select v-model="game._activeSearchGame" @change="onChangeSearchGame($event, index)"></game-select>
        </el-col>
        <el-col :span="8">
          <lang-select v-model="game._activeLangCode" @change="onChangeLang($event, index)"></lang-select>
        </el-col>
      </el-row>
      <div v-for="lang in game.langList" :key="lang.lang" v-show="lang.lang === game._activeLangCode">
        <el-row>
          <el-col :span="12">
            <el-input :placeholder="$t('newsweb_txt_subject_google')"
                      v-model="lang.androidDownloadUrl"></el-input>
          </el-col>
          <el-col :span="12">
            <el-input :placeholder="$t('newsweb_txt_subject_appstore')"
                      v-model="lang.iosDownloadUrl"></el-input>
          </el-col>
        </el-row>
        <el-input :placeholder="$t('newsweb_txt_subject_gametitle')"
                  v-model="lang.gameName"></el-input>
        <el-input
          style="margin: 0 0 10px;"
          type="textarea"
          :rows="5"
          :placeholder="$t('newsweb_txt_subject_gameinfo')" v-model="lang.gameDesc">
        </el-input>
      </div>
      <upload-trigger @on-add="uploadImage(game, IMAGE_TYPE.ICON)" @on-del="deleteImage(game, IMAGE_TYPE.ICON)" :label="$t('newsweb_txt_subject_icon')" :imageUrl="game.smallIconUrl"></upload-trigger>
      <upload-trigger @on-add="uploadImage(game, IMAGE_TYPE.COVER)" @on-del="deleteImage(game, IMAGE_TYPE.ICON)" :label="$t('newsweb_txt_subject_cover')" :imageUrl="game.smallCoverUrl" style="margin: 0 20px;"></upload-trigger>
      <upload-trigger @on-add="uploadVideo(game)" @on-del="deleteVideo(game)" :label="$t('newsweb_txt_subject_video')" :imageUrl="game.videoThumb"></upload-trigger>
    </div>
  </div>
</template>

<script>
  import { LANG } from 'config/lang'
  import UploadTrigger from 'components/upload-trigger'
  import UploadImage from 'components/upload-image'
  import { moveArrayIndex } from 'utils/util'
  import LangSelect from 'components/lang-select'
  import GameSelect from 'components/game-select'
  import UploadVideo from 'components/upload-video'

  const IMAGE_TYPE = {
    ICON: 1,
    COVER: 2
  }

  export default {
    props: {
      value: {
        type: Array,
        default () {
          return []
        }
      },
      lang: {
        type: String,
        default: LANG.EN.CODE
      }
    },
    data () {
      return {
        LANG,
        IMAGE_TYPE,
        isShowUploadImageDialog: false,
        isShowUploadVideoDialog: false,
        list: {},
        uploadGame: null,
        uploadType: null
      }
    },
    watch: {
      value: {
        handler(){
          this.parseList()
        },
        immediate: true
      },
      lang: {
        handler(v){
          this.parseList(v)
        }
      }
    },
    components: {
      UploadTrigger,
      UploadImage,
      UploadVideo,
      LangSelect,
      GameSelect
    },
    methods: {
      parseList(lang){
        this.list = this.value.map((i) => {
          i._activeLangCode = lang || i._activeLangCode || this.lang
          i._activeSearchGame = i._activeSearchGame || ''
          return i
        })
      },
      onSaveVideo(res){
        this.uploadGame.videoUrl = res.url
        this.uploadGame.videoThumb = res.thumb
      },
      onUploadImageSuccess(image){
        if(this.uploadType === IMAGE_TYPE.ICON){
          this.uploadGame.setIcon(image.small, image.big)
          return
        }
        this.uploadGame.setCover(image.small, image.big)
      },
      onChangeLang(lang, index){
        this.list[index]._activeLangCode = lang
        this.onListChange()
      },
      onChangeSearchGame(game, index){
        let subGame = this.list[index]
        subGame.setIcon(game.smallIconUrl, game.bigIconUrl)
        subGame.setCover(game.banner, game.banner)
        subGame.setVideo(game.videoUrl, game.videoThumb)
        game.langList.forEach((lang) => {
          subGame.langList.some((i) => {
            let isMatch = i.lang === lang.lang
            if(isMatch){
              i.setName(lang.gameName)
              i.setDesc(lang.gameDesc)
            }
            return isMatch
          })
        })
        this.onListChange()
      },
      onListChange() {
        this.$emit('input', this.list)
      },
      handleSelect (item) {
        console.log(item)
      },
      querySearch (queryString, cb) {
        console.log(222, queryString)
      },
      uploadImage (item, type) {
        this.isShowUploadImageDialog = true
        this.uploadGame = item
        this.uploadType = type
      },
      deleteImage(item, type){
        if(type === IMAGE_TYPE.ICON){
          item.deleteIcon()
          return
        }
        item.deleteCover()
      },
      deleteVideo(item){
        item.deleteVideo()
      },
      uploadVideo (item) {
        this.isShowUploadVideoDialog = true
        this.uploadGame = item
      },
      onUp (index) {
        this.list = moveArrayIndex(this.list, index, index - 1)
        this.onListChange()
      },
      onDown (index) {
        this.list = moveArrayIndex(this.list, index, index + 1)
        this.onListChange()
      },
      onDelete (index) {
        this.$confirm(this.$t('newsweb_txt_subject_deldata'), this.$t('hint'), {
          confirmButtonText: this.$t('newsweb_btn_ok'),
          cancelButtonText: this.$t('newsweb_btn_cancel'),
          type: 'warning'
        }).then(() => {
          this.list.splice(index, 1)
          this.onListChange()
        })
      }
    }
  }
</script>
