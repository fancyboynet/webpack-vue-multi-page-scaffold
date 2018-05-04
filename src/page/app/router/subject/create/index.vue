<style scoped>
  .content {
    margin: 30px 20px 60px;
  }

  .submit {
    margin: 45px 0 0;
  }

  .cover {
    margin: 60px 0 20px;
  }
</style>

<template>
  <div>
    <upload-image :visible.sync="isShowUploadCoverDialog" @on-success="onUploadCoverSuccess"></upload-image>
    <main-header :name="name"></main-header>
    <div class="content">
      <lang-select v-model="subjectLang"></lang-select>
      <lang-list v-model="langListData" :lang="subjectLang"></lang-list>
      <game-list v-model="gameListData" :lang="subjectLang"></game-list>
      <div style="margin: 20px 0;">
        <el-button type="primary" style="width: 150px;" @click="addGame">{{$t('me_txt_tiedgame_add')}}</el-button>
      </div>
      <div class="cover">
        <upload-trigger @on-add="uploadCover()" @on-del="deleteCover()" :label="$t('newsweb_txt_subject_cover')" :imageUrl="subject.smallCoverUrl"></upload-trigger>
      </div>
      <div>
        <label>
          {{$t('newsweb_txt_subject_usersort')}}
          <el-radio-group v-model="subject.privacyType">
            <el-radio :label="SUBJECT_PRIVACY_TYPE.ALL.CODE">{{$t('newsweb_txt_subject_userall')}}</el-radio>
            <el-radio :label="SUBJECT_PRIVACY_TYPE.NOT_INTERWORK.CODE">{{$t('newsweb_txt_subject_user')}}</el-radio>
          </el-radio-group>
        </label>
      </div>
      <div class="submit">
        <el-button type="primary" style="width: 150px;" @click="toSubmit(false, $event)">{{$t('newsweb_btn_web_publish')}}</el-button>
        <el-button style="width: 150px;" @click="toSubmit(true, $event)">{{$t('newsweb_btn_web_savedrafts')}}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import Subject, { createSubject, readSubject, SUBJECT_PRIVACY_TYPE, SubjectGame, SubjectLang, SubjectGameLang } from 'model/subject'
  import Tabs from 'components/tabs'
  import { LANG, getCodeList } from 'config/lang'
  import UploadTrigger from 'components/upload-trigger'
  import LangList from './lang-list'
  import GameList from './game-list'
  import LangSelect from 'components/lang-select'
  import MainHeader from 'components/main-header.vue'
  import UploadImage from 'components/upload-image'

  export default {
    data () {
      return {
        subject: new Subject(),
        LANG,
        SUBJECT_PRIVACY_TYPE,
        subjectLang: LANG.EN.CODE,
        isShowUploadCoverDialog: false,
        langListData:this.initLangListData(),
        gameListData:[]
      }
    },
    computed: {
      name(){
        return this.$route.params.id ? this.$t('newsweb_txt_subject_edit') : this.$t('newsweb_txt_subjectnew')
      }
    },
    components: {
      MainHeader,
      Tabs,
      GameList,
      LangList,
      UploadTrigger,
      LangSelect,
      UploadImage
    },
    methods: {
      initLangListData(){
        return getCodeList().map((i) => {
          let lang = new SubjectLang()
          lang.setLang(i)
          return lang
        })
      },
      addGame() {
        this.gameListData.push(this.createNewGame())
      },
      createNewGame(){
        let game = new SubjectGame()
        this.fillOneGameLang(game)
        return game
      },
      fillOneGameLang(game){
        getCodeList().forEach((i) => {
          if(!game.hasGameLang(i)){
            let gameLang = new SubjectGameLang()
            gameLang.setLang(i)
            game.addGameLang(gameLang)
          }
        })
      },
      onUploadCoverSuccess(image){
        this.subject.setCover(image.small, image.big)
      },
      uploadCover(){
        this.isShowUploadCoverDialog = true
      },
      deleteCover(){
        this.subject.deleteCover()
      },
      getCleanLangList(){
        return this.langListData.filter((i) => {
          return i.hasTitle()
        })
      },
      getCleanGameList(){
        return this.gameListData.filter((i) => {
          return i.hasIcon() && (i.hasCover() || i.hasVideo())
        })
      },
      checkLangList(){
        let hasEn = this.langListData.some((i) => {
          return (i.lang === LANG.EN.CODE) && i.hasTitle()
        })
        if(!hasEn){
          this.$notify.error({
            message: this.$t('newsweb_txt_subject_nameerr'),
            duration: 2000
          })
          return false
        }
        return true
      },
      check(){
        if(!this.checkLangList()){
          return false
        }
        return true
      },
      setSubjectDefault(){
        let en = this.langListData.find((i) => {
          return i.lang === LANG.EN.CODE
        })
        if(!en){
          return this
        }
        this.subject.setTitle(en.title)
        this.subject.setBrief(en.brief)
      },
      toSubmit (isDraft) {
        if(!this.check()){
          return
        }
        if(this._isSubmitting){
          return
        }
        this.setSubjectDefault()
        if(isDraft){
          this.subject.setDraftStatus()
        }
        else{
          this.subject.setReleaseStatus()
        }
        this.subject.langList = this.getCleanLangList()
        this.subject.gameList = this.getCleanGameList()
        this._isSubmitting = true
        createSubject(this.subject).then(() => {
          this._isSubmitting = false
          this.$notify.success({
            message: this.$t('sucess_util'),
            duration: 2000,
            onClose: () => {
              this.$router.replace('/subject/list')
            }
          })
        }).catch(() => {
          this._isSubmitting = false
        })
      },
      getDetail(){
        readSubject(this.$route.params.id).then((v) => {
          this.initData(v)
        })
      },
      initLangListDataFromSubject(subject){
        subject.langList.map((i) => {
          let index = this.langListData.findIndex((j) => {
            return j.lang === i.lang
          })
          if(index !== -1){
            this.langListData.splice(index, 1, i)
          }
        })
      },
      initGameListDataFromSubject(subject){
        if(!subject.gameList.length){
          this.addGame()
          return
        }
        this.gameListData = subject.gameList
        this.gameListData.map((i) => {
          this.fillOneGameLang(i)
        })
      },
      initData(subject){
        this.subject = subject
        this.initLangListDataFromSubject(subject)
        this.initGameListDataFromSubject(subject)
      }
    },
    mounted () {
      if(!this.$route.params.id){
        this.addGame()
        return
      }
      this.getDetail()
    }
  }
</script>
