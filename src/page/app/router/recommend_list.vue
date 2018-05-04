<style lang="scss" scoped="">
    .article-filter{
        padding-top: 35px;
        margin-bottom: -8px;
        .el-form-item{
            margin-bottom: 0;
            margin-right: 25px;
        }
        .el-select, .el-input{
            width: 120px;
        }
        .el-button{
            float: right;
            margin-right: 33px;
            margin-top: 6px;
        }
    }
    .nodata{
      text-align:center;
      line-height:80px;
    }
</style>

<template>
    <div class="article-list-wrap">
        <ul class="article-list">
            <li class="nodata" v-if="noData" >{{$t('no_data')}}</li>
            <li class="article-item"
                v-for="item in list">
                <h6 class="title">{{item.Title}}</h6>
                <p class="descriptor">
                    <span >{{item.Lang}}</span>
                    <span class="prop">{{$t('recommend_index',{index: item.Seat})}}</span>
                </p>
                <div class="actions">

                    <el-button type="info"
                               plain
                               size="mini"
                               @click="editArticle(item)"
                               >{{$t('newsweb_txt_web_edit')}}
                    </el-button>
                    <el-button type="info"
                               v-if="flag != 2"
                               plain
                               size="mini"
                               @click="checkArticle(item.Id,item.Seat,item.Lang)"
                               >{{$t('newsweb_btn_web_revoke')}}
                    </el-button>
                    <el-button type="info"
                               v-if="flag == 2"
                               plain
                               size="mini"
                               @click="deleteArticle(item.Id,item.Seat,item.Lang)"
                               >{{$t('newsweb_txt_web_delete')}}
                    </el-button>
                    <el-button type="info"
                               plain
                               size="mini"
                               @click="toComment(item)"
                               >{{$t('newsweb_txt_web_comment')}}
                    </el-button>
                </div>
            </li>
        </ul>

    </div>
</template>

<script>
  import {getList,cancelRecommend,deleteRecommend} from 'api/Recommend'
  import {SUCCESS_NOTIFY_MSG} from 'api/CustomConfigKeys'
  

  export default {
    data(){
      return {
        pageSize: 10,
        currentPage: 1,
        total: 0,
        list: [],
        
        wgid: '',
        game: 0,
        lang: '',
        plate: 0,
        selectorDisabled: false,
        noData: false
      }
    },
    computed: {
      flag(){
        return this.$route.query.flag;
      }
    },
    methods: {
      getList(){
        let params = {
          pagenum: 100,
          page: 1,
          flag: this.flag || 1
        };
        getList(params).then(res => {
          if (res.code === 0) {
            if(res.datalist == 0){
              this.noData = true
            }else{
              this.noData = false
            }
            this.list = res.datalist;
            this.total = res.total;
          }
        })
      },

      deleteArticle(id,seat,lang){
        this.$confirm(this.$t('recommend_is_delete'), '', {
          confirmButton: this.$t('newsweb_btn_ok'),
          cancelButton: this.$t('newsweb_btn_cancel')
        }).then(_ => {
          deleteRecommend({
            id,
            seat,
            lang
          }, {
            [SUCCESS_NOTIFY_MSG]: this.$t('article_has_deleted')
          }).then(res => {
            if (res.code === 0) {
              this.getList();
            }
          })
        }).catch(_ => _);
      },

      checkArticle(id, seat,lang){
        this.$confirm(this.$t('newsweb_txt_web_revoke_hint'), '', {
          confirmButton: this.$t('newsweb_btn_ok'),
          cancelButton: this.$t('newsweb_btn_cancel')
        }).then(_ => {
          cancelRecommend({
            id,
            seat,
            lang
          }, {
            [SUCCESS_NOTIFY_MSG]: this.$t('article_has_revoked')
          }).then(res => {
            if (res.code === 0){
              this.getList();
            }
          })
        }).catch(_ => _)
      },
      editArticle(info){
        this.$router.push('/recommend/edit?id='+info.Id)
      },
      toComment(info){
        this.$router.push('/article/comment?id='+info.Id)
      }
    },
    mounted(){
      this.getList();
    },
    watch: {
      flag(){
        //由于不同的flag可能会有不同的操作按钮，为防止getList请求失败造成误操作，这里先清空当前列表
        this.list = [];
        this.total = 0;
        //若当前不在第一页，则直接设置为第一页，通过pageChange自动请求
        this.currentPage === 1 ? this.getList() : this.currentPage = 1;
      }
    }
  }
</script>
