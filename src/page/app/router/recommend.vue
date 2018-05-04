<style lang='scss'>
    .wg-article {
        .el-aside {
            & > ul {
                padding: 10px 5px 0;
                & > li {
                    font-size: 18px;
                    color: #1b1b1b;
                    line-height: 20px;
                    padding: 15px 25px;
                    border-bottom:1px solid #ecedee;
                    span {
                        cursor: pointer;
                        &:hover{
                          color:#405b84;
                        }
                    }

                    ul {
                        display: none;
                        margin: 18px 0;
                        li {
                            font-size: 14px;
                            color: #8f969e;
                            line-height: 20px;
                            margin: 5px 0;
                        }
                        .on {
                            color: #405b84;
                        }
                    }
                    &.on{
                        color: #405b84;
                        background:#ecedee;
                        ul{
                            display: list-item;
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
            margin-left: 40px;
        }
        .article-item {
            padding: 20px 0 24px;
            border-bottom: 1px solid #e2e4e6;
            &:last-child {
                border-bottom: none;
            }
            .title {
                font-size: 18px;
                line-height: 36px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
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
    }
</style>

<template>
    <el-container class="wg-article">
        <el-aside width="210px">
            <ul>
                <li :class="[flag != '2' ? 'on' : '' ]">
                    <router-link :to="`/recommend/list?flag=1`"
                                 tag="span">
                                 {{$t('newsweb_txt_recommend')}}
                    </router-link>
                </li>
                <li :class="[flag == '2' ? 'on' : '']">
                    <router-link :to="`/recommend/list?flag=2`"
                                 tag="span">
                                 {{$t('newsweb_txt_web_recycle')}}
                    </router-link>
                </li>
            </ul>
            <router-link class="btn-new"
               to="/recommend/add"
               >
               {{$t('newsweb_txt_web_newarticle')}}
            </router-link>
        </el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
</template>

<script>

  import {getGameList,getPlateList} from 'api/Article'

  export default {
    data(){
      return {

      }
    },
    computed: {
      flag(){
        return this.$route.query.flag
      }
    },
    components: {},
    mounted(){
    }
  }
</script>



