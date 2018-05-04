<style lang='scss'>
    .wg-article {
        .el-aside {
            & > ul {
                padding: 10px 5px 0;
                &>.no-bg{
                  background:none !important;
                  padding:15px 0;
                  text-indent:25px;
                  &.on{
                    color:#1b1b1b !important;
                  }
                }
                & > li {
                    font-size: 18px;
                    color: #1b1b1b;
                    line-height: 20px;
                    padding: 15px 25px;
                    border-bottom:1px solid #ecedee;
                    .icon{
                      display:inline-block;
                      width:20px;
                      height:20px;
                      background:url('~assert/images/slide-icon1.png') center no-repeat;
                      vertical-align:-3px;
                    }
                    .icon2{
                      background-image:url('~assert/images/slide-icon2.png');
                    }
                    .icon3{
                      background-image:url('~assert/images/slide-icon3.png');
                    }
                    span {
                        cursor: pointer;
                        &:hover{
                          color:#405b84;
                        }
                    }

                    ul {
                        display: none;
                        padding-top:10px;
                        li {
                            font-size: 14px;
                            color: #8f969e;
                            line-height: 20px;
                            padding:8px 0 8px 50px;
                            margin: 5px 0;
                            text-indent:0;
                        }
                        .on {
                            color: #405b84;
                            background:#ecedee;
                        }
                    }
                    &.on{
                        color: #405b84;
                        background:#ecedee;
                        ul{
                            display: list-item;

                        }
                        .icon1{
                          background-image:url('~assert/images/slide-icon1-a.png');
                        }
                        .icon2{
                          background-image:url('~assert/images/slide-icon2-a.png');
                        }
                        .icon3{
                          background-image:url('~assert/images/slide-icon3-a.png');
                        }
                    }
                }
            }
            .btn-new {
                display: block;
                margin: 50px auto auto auto;
                width: 150px;
                line-height: 42px;
                text-align: center;
                font-size: 18px;
                color: #1b1b1b;
                background: #ffd40a;
                &:hover {
                    opacity: .8;
                }
            }
        }
        .el-button--primary {
            background-color: #405b84;
            border-color: #405b84;
            color: #fff;
        }
        .video-mod {
            margin-top: 15px;
            h3 {
                float: left;
                width: 100px;
                line-height: 30px;
                font-size: 18px;
            }
            & > div {
                float: left;
                width: 850px;
                .el-input__inner {
                    height: 30px;
                }
                .el-button {
                    height: 30px;
                    border-radius: 0;
                }
            }
            .el-upload__tip {
                margin-left: 15px;
            }
        }
        .article-list-wrap {
            padding:0 40px;
        }
        .article-item {
            padding: 20px 0 24px;
            border-bottom: 1px solid #e2e4e6;
            &:last-child {
                border-bottom: none;
            }
            .title {
                font-size: 18px;
                line-height: 24px;
                /*white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;*/
                .success{ font-size: 14px;color:#405b84;}
                .warning{font-size: 14px; color:red;}
                a{
                  color:#405b84;
                  &:hover{
                    /*text-decoration: underline;*/
                  }
                }
            }
            .descriptor {
                font-size: 14px;
                color: #8f969e;
                line-height: 26px;
                .prop {
                    margin-left: 6px;
                    padding-left: 21px;
                    background: url("~assert/images/article-prop-spliter.png") no-repeat 0 50%;
                }
                &.reject-reason {
                    color: #ff5050;
                }
            }
            .actions {
                margin-top: 8px;
                .el-button + .el-button {
                    margin-left: 6px;
                }
            }
        }
        .help{
          margin-top:30px;
          padding:0 30px;
          h5{
            font-size: 12px;
            line-height: 18px;
            margin-bottom: 10px;
            color:#8f969e;
          }
          p{
              font-size: 14px;
              a{
                color:#405b84;
                &:hover{
                    /*text-decoration: underline;*/
                  }
              }
          }
        }
    }
</style>

<template>
    <el-container class="wg-article">
        <el-aside width="210px">
            <ul v-if="!$store.getters.isManager">
                <li :class="{on: isList && type === POST_STATUS.PUBLISHED.value}" class="no-bg">
                    <span class="icon icon1"></span>
                    <router-link :to="`/article/list?type=${POST_STATUS.PUBLISHED.value}`"
                                 tag="span">{{$t('newsweb_txt_web_published')}}
                    </router-link>
                    <ul>
                        <li :class="{on: !flag}">
                            <router-link to="/article/list"
                                         tag="span">{{$t('newsweb_txt_web_all')}}
                            </router-link>
                        </li>
                        <li :class="{on: flag == CHECK_STATUS.PASS.value}">
                            <router-link :to="`/article/list?flag=${CHECK_STATUS.PASS.value}`"
                                         tag="span">{{$t('newsweb_txt_web_recommended')}}
                            </router-link>
                        </li>
                        <li :class="{on: flag == CHECK_STATUS.CHECKING.value}">
                            <router-link :to="`/article/list?flag=${CHECK_STATUS.CHECKING.value}`"
                                         tag="span">{{$t('newsweb_txt_web_verifying')}}
                            </router-link>
                        </li>
                        <li :class="{on: flag == CHECK_STATUS.REJECT.value}">
                            <router-link :to="`/article/list?flag=${CHECK_STATUS.REJECT.value}`"
                                         tag="span">{{$t('newsweb_txt_web_norecommended')}}
                            </router-link>
                        </li>
                    </ul>
                </li>
                <li :class="{on: isList && type === POST_STATUS.DRAFT.value}">
                    <span class="icon icon2"></span>
                    <router-link :to="`/article/list?type=${POST_STATUS.DRAFT.value}`"
                                 tag="span">{{$t('newsweb_txt_web_drafts')}}
                    </router-link>
                </li>
                <li :class="{on: isList && type === POST_STATUS.RECYCLE.value}">
                    <span class="icon icon3"></span>
                    <router-link :to="`/article/list?type=${POST_STATUS.RECYCLE.value}`"
                                 tag="span">{{$t('newsweb_txt_web_recycle')}}
                    </router-link>
                </li>
            </ul>
            <ul v-else>
                <li :class="{on: isList && (!flag || flag == CHECK_STATUS.PASS.value)}">
                    <router-link :to="`/article/list?flag=${CHECK_STATUS.PASS.value}`"
                                 tag="span">{{$t('newsweb_txt_web_recommended')}}
                    </router-link>
                </li>
                <li :class="{on: isList && flag == CHECK_STATUS.CHECKING.value}">
                    <router-link :to="`/article/list?flag=${CHECK_STATUS.CHECKING.value}`"
                                 tag="span">{{$t('newsweb_txt_web_verifying')}}
                    </router-link>
                </li>
                <li :class="{on: isList && flag == CHECK_STATUS.REJECT.value}">
                    <router-link :to="`/article/list?flag=${CHECK_STATUS.REJECT.value}`"
                                 tag="span">{{$t('newsweb_txt_web_norecommended')}}
                    </router-link>
                </li>
                <li :class="{on: isList && flag == CHECK_STATUS.APPLY_DELETE.value}">
                    <router-link :to="`/article/list?flag=${CHECK_STATUS.APPLY_DELETE.value}`"
                                 tag="span">{{$t('newsweb_txt_web_delete2')}}
                    </router-link>
                </li>
            </ul>
            <router-link class="btn-new"
                         to="/article/add"
                         v-if="!$store.getters.isManager">{{$t('newsweb_txt_web_newarticle')}}
            </router-link>
            <div class="help" v-if="!$store.getters.isManager">
              <h5>{{$t('newsweb_txt_help')}}</h5>
              <p><a href="http://news.wegamers.com/views/gamenews.html?lang=en&cflag=1#/12779341404799238146" target="_blank">{{$t('newsweb_txt_help_1')}}</a></p>
            </div>
        </el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
</template>

<script>
  import {CHECK_STATUS, POST_STATUS} from 'config/config'
  import {getGameList,getPlateList} from 'api/Article'

  export default {
    data(){
      return {
        CHECK_STATUS:{
           CHECKING: {
              value: 1,
              label: this.$t('newsweb_txt_web_verifying')
            },
            PASS:  {
              value: 2,
              label: this.$t('newsweb_txt_web_recommended')
            },
            REJECT:  {
              value: 3,
              label: this.$t('newsweb_txt_web_norecommended')
            },
            APPLY_DELETE:  {
              value: 4,
              label: this.$t('newsweb_txt_web_delete2')
            },
        },
        POST_STATUS:{
          PUBLISHED: {
            value: 1,
            label: this.$t('newsweb_txt_web_published')
          },
          DRAFT:  {
            value: 2,
            label: this.$t('newsweb_txt_web_drafts')
          },
          RECYCLE:  {
            value: 3,
            label: this.$t('newsweb_txt_web_recycle')
          },
        },
      }
    },
    computed: {
      flag(){
        return this.$route.query.flag
      },
      type(){
        return parseInt(this.$route.query.type || '1', 10)
      },
      isList(){
        return this.$route.path === '/article/list'
      },
      isAdd(){
        return this.$route.path === '/article/add'
      }
    },
    components: {},
    mounted(){
      getGameList().then((resp)=>{
        if(resp.code == 0){
          this.$store.dispatch('getGameList',resp.datalist);
        }
      })

      getPlateList().then((resp)=>{
        if(resp.code == 0){
          this.$store.dispatch('getPlateList',resp.datalist);
        }
      })
    }
  }
</script>



