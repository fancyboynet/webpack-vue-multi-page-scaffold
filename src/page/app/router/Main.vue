<style lang='scss'>
  .wg-content {
    width: 1260px;
    margin: 0 auto auto auto;
    position: relative;
  }

  header {
    position: fixed;
    left: 0;
    top: 0;
    display: block;
    width: 100%;
    height: 64px;
    background: #405b84;
    min-width: 1300px;
    z-index: 1000;
    .content {
      height: 64px;
      background: #405b84;
    }
    .logo {
      position: absolute;
      top: 11px;
      left: 0;
      width: 42px;
      height: 42px;
      background: url(~assert/images/logo.png) no-repeat;
    }
    .title {
      position: absolute;
      left: 50px;
      top: 20px;
      width: 151px;
      height: 24px;
      overflow: hidden;
      text-indent: -99999px;
      background: url(~assert/images/title.png) no-repeat;
    }
    .nav {
      float: right;
      background: none;
      & > li {
        float: right;
        margin: 0 30px;
        line-height: 64px;
        height: 64px;
        text-align: center;
        position: relative;
        & > a {
          display: block;
          height: 64px;
          overflow: hidden;
          font-size: 18px;
          color: #fff;
          &:hover {
            transform: scale(1.2);
          }
        }
        .sub-menu {
          position: absolute;
          top: 64px;
          left: 50%;
          border: 1px solid #cfd2d5;
          width: 124px;
          max-height: 0px;
          z-index: 99999;
          background: #fff;
          overflow: hidden;
          opacity: 0;
          transition: all .5s;
          transform: translateX(-50%);
          & > li {
            a {
              display: block;
              line-height: 20px;
              padding: 10px 0;
              color: #8f969e;
              font-size: 14px;
              text-align: center;
              &:hover {
                background: #f3f3f6;
                color: #51688d;
              }
            }
          }
        }
        &:hover {
          .sub-menu {
            opacity: 1;
            display: block;
            max-height: 260px;
          }
        }
      }
    }
    .logout {
      color: #fff;
      font-size: 14px;
      float: right;
      margin-left: 15px;
      line-height: 64px;
      span {
        margin-left: 10px;
        cursor: pointer;
        text-decoration: underline;
      }
    }

  }

  .wg-main-scroll {
    margin-top: 64px;
    padding-top: 36px;
    padding-bottom: 36px;
    //height: calc(100vh - 100px);
    //max-height: 700px;
    min-width: 1300px;
    //overflow: auto;
    position: relative;
  }

  .wg-main {
    .el-aside {
      background: #fff;
      padding-bottom: 48px;
    }
    .el-main {
      margin-left: 20px;
      background: #fff;
      padding: 0;
      //min-height: calc(100vh - 136px);
      &.no-side {
        margin-left: 0;
      }
    }
    .selector {
      display: inline-block;
      width: 120px;
      height: 30px;
      margin-left: 6px;
      .el-input__inner {
        height: 30px;
        color: #405b84;
        font-size: 14px;
        border-radius: 0;
      }
    }
    .page-box {
      text-align: center;
      padding: 30px 0;
    }
  }

  .add-article {
    .el-tabs {
      padding-top: 10px;
    }
    .el-tabs__nav-wrap {
      padding: 0 40px;
    }
    .el-tabs__item {
      font-size: 18px;
      color: #8f969e;
      height: 60px;
      line-height: 60px;
    }
    .is-active {
      color: #405b84;
    }
    .el-tabs__active-bar {
      background: #405b84;
    }
  }

  .el-tabs__active-bar {
    height: 3px;
  }

  .el-tabs__nav-wrap::after {
    height: 1px;
  }

  .el-button--small {
    border-radius: 0;
  }

  .el-button--mini {
    border-radius: 0;
  }

  .el-input {
    font-size: 16px;
  }

  .el-input__inner {
    color: #000;
  }

  .el-main .edui-default .edui-editor-toolbarbox {
    box-shadow: none;
  }

  .el-select-dropdown__item.hover, .el-select-dropdown__item:hover {
    background-color: #405b84;
    color: #fff;
  }

  .el-table thead {
    color: #5a5e66;
    font-weight: bold;
  }

  .el-table {
    color: #878d99;
    th {
      font-weight: bold;
    }
  }

  .el-pagination {
    color: #777;
  }

  .language {
    width: 112px;
    input {
      background: none;
      color: #fff;
      border: none;
      text-align: right;
    }
    .el-icon-arrow-up {
      &:before {
        content: "\E60C";
        color: #fff;
      }
    }
  }

  .top-lang {
    .popper__arrow {
      display: none;
    }
    &.el-select-dropdown {
      border-radius: 0px;
      margin-top: 0px;
      box-shadow: none;
      .el-select-dropdown__list {
        padding: 0;
      }
      .el-select-dropdown__item {
        height: 40px;
        line-height: 40px;
      }
      .el-select-dropdown__item.selected {
        font-weight: normal;
      }
    }
    .el-select-dropdown__item.hover, .el-select-dropdown__item:hover {
      background-color: #f3f3f6;
      color: #51688d;
    }
    .el-scrollbar__bar .is-horizontal {
      height: 0;
    }
  }

</style>
<template>
  <div id="app">
    <header id="head">
      <div class="wg-content">
        <a href="javascript:;"
           class="logo"></a>
        <h2 class="title">wegamers</h2>
        <div class="logout">
          {{$t('welcome')}} {{userName}}
          <span @click="logout">{{$t('logout')}}</span>
        </div>
        <ul class="nav clearfix">
          <li>
            <el-select v-model="lang" @change="change" class="language" popper-class="top-lang">
              <el-option :value="$LANG.ZH_CN.CODE" label="简体中文"></el-option>
              <el-option :value="$LANG.EN.CODE" label="ENGLISH"></el-option>
            </el-select>
          </li>
          <li v-if="isAdmin(role)">
            <router-link to="/subject">{{$t('newsweb_txt_subject')}}</router-link>
          </li>
          <li v-if="isAdmin(role)"><!--管理员才显示作者管理入口-->
            <router-link to="/author_manager">{{$t('newsweb_txt_authormanage')}}</router-link>
          </li>
          <li>
            <a href="javascript:;">{{$t('newsweb_txt_web_data')}}</a>
            <ul class="sub-menu">
              <li>
                <router-link to='/data/guide'>{{$t('newsweb_txt_data_overview')}}</router-link>
              </li>
              <li v-if="!isAdmin(role)">
                <router-link to="/data/article">{{$t('newsweb_txt_data_detaildata')}}</router-link>
              </li>
              <li v-if="isAdmin(role)">
                <router-link to="/data/adminArticle">{{$t('newsweb_txt_data_detaildata')}}</router-link>
              </li>
              <li v-if="isAdmin(role)"> <!--管理员才显示板块入口-->
                <router-link to="/data/recommend">{{$t('data_tj_guide')}}</router-link>
              </li>
              <li v-if="isAdmin(role)"> <!--管理员才显示板块入口-->
                <router-link to="/data/subject">{{$t('newsweb_txt_subject_data')}}</router-link>
              </li>
            </ul>
          </li>
          <li>
            <a href="javascript:;">{{$t('newsweb_txt_web_manage')}}</a>
            <ul class="sub-menu">
              <li>
                <router-link to='/article/list'>{{$t('newsweb_txt_web_manage')}}</router-link>
              </li>
              <li>
                <router-link to="/material">{{$t('newsweb_txt_web_media')}}</router-link>
              </li>
              <li v-if="isAdmin(role)"> <!--管理员才显示板块入口-->
                <router-link to="/recommend/list">
                  {{$t('newsweb_txt_recommend')}}
                </router-link>
              </li>
              <li v-if="isAdmin(role)"> <!--管理员才显示板块入口-->
                <router-link to="/plate">{{$t('newsweb_txt_web_layout')}}</router-link>
              </li>
            </ul>
          </li>
          <li>
            <router-link to='/'>{{$t('nav_index')}}</router-link>
          </li>
        </ul>

      </div>
    </header>

    <div class="wg-main-scroll">
      <router-view class="wg-main wg-content"></router-view>
    </div>
  </div>
</template>

<script>

  import getCurrentUser from 'utils/getCurrentUser'
  import { logout } from 'api/User'
  import urlParams from 'utils/urlParams'
  import locale from 'element-ui/lib/locale'
  import enLocale from 'element-ui/lib/locale/lang/en'
  import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
  import Cookie from 'js-cookie'
  import User from 'model/user'
  import {LANG} from 'model/base'

  export default {
    name: 'mymain',
    data () {
      return {
        lang: LANG.ZH_CN.CODE
      }
    },
    computed: {
      role () {
        return this.$store.getters.userInfo.role
      },
      userName () {
        return this.$store.getters.userInfo.nickname
      }
    },
    methods: {
      isAdmin: User.isAdmin,
      logout () {
        logout().then((res) => {
          if (res.code == 0) {
            this.$router.push('/login')
          }
        })
      },
      change (val) {
        i18n.locale = val
        if (localStorage) {
          localStorage.lang = val
        }

        //var path = this.$route.path
        if (location.href.indexOf('id=') > -1) {
          const id = urlParams('id')
          this.$router.push({path: this.$route.path, query: {lang: val, id: id}})
        } else if (location.href.indexOf('flag=') > -1) {
          const flag = urlParams('flag')
          this.$router.push({path: this.$route.path, query: {lang: val, flag: flag}})
        } else if (location.href.indexOf('type=') > -1) {
          const type = urlParams('type')
          this.$router.push({path: this.$route.path, query: {lang: val, type: type}})
        } else {
          this.$router.push({path: this.$route.path, query: {lang: val}})
        }
        this.$router.go(0)
      }
    },
    watch: {
      lang: function (val) {
        if (val === LANG.ZH_CN.CODE) {
          locale.use(zhLocale)
        } else {
          locale.use(enLocale)
        }
        //window.location.reload()
      }
    },
    beforeRouteEnter (to, from, next) {
      let user = getCurrentUser()
      if (user) {
        next()
      } else {
        next({
          path: '/login',
          query: {
            redirect: to.fullPath
          }
        })
      }
    },
    mounted () {
      const urlLang = urlParams('lang')
      if (!urlLang) {
        if (localStorage && localStorage.lang) {
          i18n.locale = localStorage.lang
          this.lang = i18n.locale
        }
      } else {
        this.lang = urlLang
      }
      //console.log(this.lang)
      i18n.locale = this.lang
      Cookie.set('l10n', this.lang)

      window.addEventListener('scroll', function () {
        //let toolbox = document.querySelector(".edui-editor-toolbarbox");
        let left = pageXOffset
        let top = pageYOffset
        let aside = document.querySelector('.wg-content>.el-aside')
        let head = document.querySelector('#head')

        if (left > 0 && head) {
          head.style.left = -left + 'px'
        }
        // if(toolbox != null){
        //   let l = toolbox.getBoundingClientRect().left;
        //   console.log(l,left)
        //   let nl;
        //   left < l ? nl = 'auto' : nl = 0;
        //   toolbox.style.left = nl;
        //   toolbox.style.position = 'fixed';
        // }
        if (aside) {
          if (top > 36) {
            aside.style.marginTop = top - 34 + 'px'
          } else {
            aside.style.marginTop = 0
          }
        }
      })
    }
  }
</script>


