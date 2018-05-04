<style lang="scss">
    .wg-article-comment {

      .comment-con{
        .noData{
          text-align:center;
          line-height:60px;
        }
        .rows{
          padding:20px 20px 20px 40px;
          border-bottom:1px solid #cfd2d5;
          position:relative;
          .comment-box{
            float:left;
            width:850px;
            .comment-main{
              margin-top:5px;
              h3,p{
                display:inline-block;
                font-size:18px;
              }
              a{
                margin-left:10px;
                font-size:14px;
                color:#405b84;
                &:hover{
                  text-decoration: underline;
                }
              }
              h3{
                color:#1b1b1b;
                font-weight:bold;
              }
              p{
                color:#8f969e;
              }
              .reward{
                margin-left:10px;
                color:red;
                font-size: 14px;
                a{
                  color:red;
                  &:hover{
                    text-decoration: underline;
                  }
                }
              }

            }
          }
          .reply-box{
            padding-left:10px;
            margin-top:10px;
          }
          .btn-box{
            float:left;
            width:120px;
            dl{
              float:right;
              margin-left:15px;
              dd{
                float:left;
                width:15px;
                height:20px;
              }
              dt{
                float:left;
                font-size:14px;
                line-height:20px;
                color:#8f969e;
                margin-left:5px;
              }
            }
            .zan{
              cursor: pointer;
              background:url(~assert/images/icon-zan.png) 0 0px no-repeat;
            }
            .reply{
              background:url(~assert/images/icon-comment.png) 0 3px no-repeat;
            }
            .showAll{
              position:absolute;
              right:20px;
              bottom:20px;
              color:#405b84;
              font-size:14px;
            }

          }
        }
      }
    }
</style>

<template>
    <el-container class="wg-article-comment">
        <el-main class="no-side">
            <main-header :name="$t('newsweb_txt_web_comment')">
            </main-header>
            <div class="comment-con">
              <h3 v-if="noData" class="noData">{{$t('no_comment')}}</h3>
              <div v-else>
                <div class="rows clearfix" v-for="(val,i) in dataList" :key="val.CommentId">
                  <div class="comment-box">
                    <div class="comment-main">
                      <h3>{{val.NickName}}：</h3>
                      <p>{{val.Content}}</p>
                      <a href="javascript:;" @click="deleteComment(val.CommentId,0)">{{$t('newsweb_txt_web_delete')}}</a>
                      <span v-if="val.RewardPoints" class="reward">{{$t('newsweb_btn_reward2',{msg1:val.RewardPoints})}}<a href="javascript:;" @click="ConfirmRevoke(val.CommentId)">{{$t('newsweb_btn_revoke')}}</a></span>
                       <a v-else href="javascript:;" @click="ConfirmReward(val.CommentId)">{{$t('newsweb_btn_reward')}}</a>
                    </div>
                    <div class="reply-box">
                      <div class="comment-main" v-for="item in val.ReplyList">
                        <h3>{{item.NickName}}@{{item.WithNickname}}：</h3>
                        <p>{{item.Content}}</p>
                        <a href="javascript:;" @click="deleteComment(val.CommentId,item.ReplyCommentId)">{{$t('newsweb_txt_web_delete')}}</a>
                      </div>
                    </div>

                    <el-pagination
                      v-if="val.isExpend"
                      small
                      :current-page="val.page"
                      :page-size="replyParams.pagenum"
                      @current-change="subPageChange($event,val)"
                      layout="prev, pager, next"
                      :total="val.subTotal">
                    </el-pagination>

                  </div>
                  <div class="btn-box">
                    <dl>
                      <dd class="reply"></dd>
                      <dt>{{val.TotalReplyCount}}</dt>
                    </dl>
                    <dl>
                      <dd class="zan" @click="editZan(val)" ></dd>
                      <dt>{{val.TotalLikeCount}}</dt>
                    </dl>
                    <a class="showAll" v-if="val.TotalReplyCount>reply && !val.isExpend" href="javascript:;" @click="getAllReply(val,1)">{{$t('show_all')}}<i class="el-icon-arrow-down"></i></a>
                  </div>
                </div>
              </div>
              <el-pagination
                  :current-page="page"
                  :page-size="pagenum"
                  layout="total, prev, pager, next, jumper"
                  v-on:current-change="pageChange"
                  :total="total">
              </el-pagination>
            </div>
        </el-main>
        <el-dialog
          :visible.sync="isShowRewardDialog"
          width="360px">
          <div>
              <p>{{$t('newsweb_txt_rewardtips')}}</p>
              <p><input :placeholder="$t('newsweb_txt_rewardrange',{msg1:50,msg2:1000})" type="text" v-model.number="rewardCoin"/></p>
              <p> {{$t('newsweb_txt_remain',{msg1:balance})}}</p>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="isShowRewardDialog = false">{{$t('newsweb_btn_cancel')}}</el-button>
            <el-button type="primary" @click="reward">{{$t('newsweb_btn_ok')}}</el-button>
          </span>
        </el-dialog>
    </el-container>
</template>

<script>
  import MainHeader from 'components/main-header.vue'
  import getParams from 'utils/urlParams'
  import getXmlParams from 'utils/getXmlParams'
  import {getComment,getAllReply,setPraise,deleteComment,getUserpoints,setUserpoints} from 'api/Article'

  export default {
    data(){
      return {
        id:'',
        pagenum: 10,
        page: 1,
        total: 0,
        reply: 3,
        noData: true,
        dataList: [],
        replyParams:{
          pagenum: 10
        },
        isShowRewardDialog:false,
        rewardCoin:'',
        balance:0,
        rewardId:'',
        revokeId:''
      }
    },
    computed:{
      role(){
        return this.$store.getters.userInfo.role
      }
    },
    methods:{
      getCommentList(){
        var params = {
          id: this.id,
          pagenum: this.pagenum,
          page: this.page,
          reply: this.reply
        }
        getComment(params).then((res)=>{
          if(res.code == 0){
            if(res.list.length == 0){
              this.noData = true
            }else{
              this.noData = false
              this.total = res.total
              this.dataList = res.list
            }
          }
        })
      },
      getAllReply(info,page){
        info.isExpend = true
        info.subPage = page
        var params = {
          id: this.id,
          pagenum: this.replyParams.pagenum,
          page: page,
          commentId: info.CommentId
        }
        getAllReply(params).then((res)=>{
          if(res.code == 0){
            info.ReplyList = res.list
            info.subTotal = res.total
          }

        })
      },
      pageChange(page){
        this.page = page
        this.getCommentList()
      },
      subPageChange(page,info){
        this.getAllReply(info,page)
      },
      editZan(info){
        if(this.role == 1){
          this.$prompt(this.$t('newsweb_txt_setlikenum'), '', {
            confirmButtonText: this.$t('newsweb_btn_ok'),
            cancelButtonText: this.$t('newsweb_btn_cancel'),
            inputPattern: /^(\-|\+)?\d+?$/,
            inputErrorMessage:  this.$t('comment_only_num'),
            inputPlaceholder: this.$t('msg_number_input')
          }).then(({ value }) => {
            var params = {
              id: this.id,
              likecount: value,
              commentId: info.CommentId
            }
            setPraise(params).then((res)=>{
              if(res.code == 0){
                this.$notify.success({message:this.$t('edit_success')})
                this.getCommentList()
              }
            })
          }).catch(() => {});
        }
      },
      deleteComment(commenId,replyId){
        var params = {
          id: this.id,
          commentId: commenId,
          replyCommentId: replyId
        }
        var title = replyId == 0 ? this.$t('confirm_delete_comment') : this.$t('comment_delete_reply')
        this.$confirm(title, this.$t('hint'), {
          confirmButtonText: this.$t('newsweb_btn_ok'),
          cancelButtonText: this.$t('newsweb_btn_cancel'),
          type: 'warning'
        }).then(() => {
          deleteComment(params).then((res)=>{
            if(res.code == 0){
              this.getCommentList()
            }
          })
        }).catch(() => {})

      },
      ConfirmReward:function(id){
        this.isShowRewardDialog = true;
        this.rewardId = id;
      },
      reward:function(){
         this.rewardCoin = parseInt(this.rewardCoin);
         if(this.rewardCoin>=50 && this.rewardCoin<=1000){
             this.isShowRewardDialog = false;
             let params = {
                 infoId:this.id,
                 commentId:this.rewardId,
                 opType:1,
                 rewardPoints:this.rewardCoin
             }
             setUserpoints(params).then((res)=>{
              if(res.code == 0){
                this.getUserpoints();
                this.getCommentList();
              }
            })
         }else{
              this.rewardCoin = "";
         }
         
      },
      ConfirmRevoke:function(id){
          this.revokeId = id;
          this.$confirm(this.$t('newsweb_txt_revoketips'), '', {
            confirmButtonText: this.$t('newsweb_btn_revoke'),
            cancelButtonText: this.$t('newsweb_btn_cancel'),
            dangerouslyUseHTMLString: true
          }).then(() => {
            this.revoke()
          }).catch(() => {});
      },
      revoke:function(){
          let params = {
             infoId:this.id,
             commentId:this.revokeId,
             opType:2,
             rewardPoints:''
         }
         setUserpoints(params).then((res)=>{
          if(res.code == 0){
            this.getCommentList();
          }
        })
      },
      getUserpoints:function(){
        getUserpoints({}).then((res)=>{
          if(res.code == 0){
            this.balance = res.info.AvailablePoints;
          }
        })
      }
    },
    components: {
      MainHeader
    },
    mounted(){
      this.id = getParams('id')
      this.getCommentList();
      this.getUserpoints();
    }

  }
</script>
