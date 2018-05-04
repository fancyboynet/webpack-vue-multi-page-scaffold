<style lang="scss" scoped>
    .scannedcount{
      margin-left: 10px;
      font-size: 14px;
      color: #467cd4;
    }
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
            margin-right: 33px;
            margin-top: 6px;
        }

    }
    .title-filter{
      margin-top:15px; 
    }
    .nodata{
        text-align:center;
        line-height:80px;
      }
    .el-checkbox{
      margin-top: 20px;
    }
</style>

<template>
    <div class="article-list-wrap">
       <el-form :inline="true" class="title-filter" v-if="!$store.getters.isManager">
             <el-form-item>
                <el-input size="mini" v-model="keyword" :placeholder="$t('newsweb_txt_searchtitle')"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="small" @click="getList(1)">{{$t('newsweb_txt_search')}}</el-button>
              </el-form-item>
        </el-form>
        <ul class="article-list" v-if="!$store.getters.isManager">
            <li v-if="isNoData" class="nodata">{{$t('no_data')}}</li>
            <li v-else class="article-item"
                v-for="item in list">
                <h6 class="title">
                    <a target="_blank" :href="baseURL+'/views/gamenews?lang=&cflag=1#/'+item.InfoId">{{item.Title}}</a>
                    <span v-if="item.CheckStatus == 2" class="success">[{{$t('newsweb_txt_web_recommended')}}]</span>
                    <span v-if="item.CheckStatus == 1" class="warning">[{{$t('newsweb_txt_web_verifying')}}]</span>
                    <span v-if="item.CheckStatus == 3" class="warning">[{{$t('newsweb_txt_web_norecommended')}}]</span>
                </h6>
                <p class="descriptor">
                    <span>{{item.CheckStatus | checkStatusLabel}}</span>
                    <span class="prop">ID：{{item.InfoId}}</span>
                    <span class="prop">{{item.CreateTime | moment('YYYY-MM-DD HH:mm')}}</span> 
                    <span class="prop" v-if="item.GameName">{{item.GameName}}</span>
                    <span class="prop" v-if="item.ModuleName">{{item.ModuleName}}</span>
                    <!--<span class="prop">{{item.NickName}}</span>
                    <span class="prop" v-if="item.WeGamerId">WGID:{{item.WeGamerId}}</span>-->
                </p>
                <p class="descriptor reject-reason" v-if="item.CheckReason && item.CheckStatus == 3">&lt; {{article_reason_for_norecommend}}:{{item.CheckReason}} &gt;</p>
                <div class="actions">
                    <!-- <el-button type="info"
                               plain
                               size="mini"
                               @click="toComment(item)"
                               v-if="item.CheckStatus === CHECK_STATUS.PASS.value">评论管理
                    </el-button> -->
                    <el-button type="info"
                               plain
                               size="mini"
                               @click="toComment(item)"
                               v-if="type != 2">{{$t('newsweb_txt_web_comment')}}
                    </el-button>
                    <el-button type="info"
                               plain
                               size="mini"
                               @click="editArticle(item)"
                               v-if="item.PostStatus === POST_STATUS.DRAFT.value">{{$t('newsweb_txt_web_edit')}}
                    </el-button>
                    <el-button type="info"
                               plain
                               size="mini"
                               @click="editArticle(item)"
                               v-else>{{$t('fixed')}}
                    </el-button>
                    <el-button type="info"
                               plain
                               size="mini"
                               @click="applyDeleteArticle(item.InfoId)"
                               v-if="item.PostStatus === POST_STATUS.PUBLISHED.value && item.CheckStatus === CHECK_STATUS.PASS.value">{{$t('newsweb_txt_web_delete2')}}
                    </el-button>
                    <el-button type="info"
                               plain
                               size="mini"
                               @click="deleteArticle(item.InfoId)"
                               v-else>{{$t('newsweb_txt_web_delete')}}
                    </el-button>
                </div>
            </li>
        </ul>
        <template v-else>
            <el-form :inline="true" class="article-filter">
                <el-form-item :label="$t('newsweb_txt_web_game')">
                    <el-select size="mini" v-model="game" :placeholder="$t('article_placeholder_select')" :disabled="selectorDisabled">
                        <el-option :value="0" :label="$t('newsweb_txt_web_all')" ></el-option>
                        <el-option v-for="item in $store.getters.gameList" :value="item.id" :key="item.id" :label="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('newsweb_txt_web_language')">
                    <el-select size="mini" v-model="lang" :placeholder="$t('article_placeholder_select')" :disabled="selectorDisabled">
                        <el-option value="" :label="$t('newsweb_txt_web_all')" ></el-option>
                        <el-option v-for="(item,key) in $store.getters.langListNew" :value="key" :key="key" :label="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('newsweb_txt_web_layout')">
                    <el-select size="mini" v-model="plate" :placeholder="$t('article_placeholder_select')" :disabled="selectorDisabled">
                        <el-option :value="0" :label="$t('newsweb_txt_web_all')" ></el-option>
                        <el-option v-for="item in $store.getters.plateList" :value="item.id" :key="item.id" :label="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="WGID">
                    <el-input size="mini" v-model="wgid" clearable></el-input>
                </el-form-item>
                <el-form-item :label="$t('newsweb_txt_searchtitle')">
                    <el-input size="mini" v-model="keyword" :placeholder="$t('newsweb_txt_searchtitle')"></el-input>
                </el-form-item>
                <el-button type="warning" size="small" @click="getList(1)">{{$t('article_find')}}</el-button>
            </el-form>
            <ul class="article-list">
                <li v-if="isNoData" class="nodata">{{$t('no_data')}}</li>
                <li v-else class="article-item"
                    v-for="item in list">
                    <h6 class="title">
                      <a target="_blank" :href="baseURL+'/views/gamenews?lang=&cflag=1#/'+item.InfoId">{{item.Title}}</a>
                      <el-tag v-if="item.BannerStatus == 1" type="success" size="mini">Banner</el-tag>
                      <i class="el-icon-view scannedcount">{{item.ScannedCount}}</i>
                      <span v-if="item.CheckStatus == 2" class="success">[{{$t('newsweb_txt_web_recommended')}}]</span>
                      <span v-if="item.CheckStatus == 1" class="warning">[{{$t('newsweb_txt_web_verifying')}}]</span>
                      <span v-if="item.CheckStatus == 3" class="warning">[{{$t('newsweb_txt_web_norecommended')}}]</span>
                    </h6>
                    <p class="descriptor">
                        <span>{{item.CheckStatus | checkStatusLabel}}</span>
                        <span class="prop">ID：{{item.InfoId}}</span>
                        <span class="prop">{{item.CreateTime | moment('YYYY-MM-DD HH:mm')}}</span>
                        <span class="prop" v-if="item.GameName">{{item.GameName}}</span>
                        <span class="prop" v-if="item.ModuleName">{{item.ModuleName}}</span>
                        <span class="prop">{{item.NickName}}</span>
                        <span class="prop" v-if="item.WeGamerId">WGID:{{item.WeGamerId}}</span>
                    </p>
                    <p class="descriptor reject-reason" v-if="item.CheckReason">&lt; {{$t('article_reason_for_norecommend')}}:{{item.CheckReason}} &gt;</p>
                    <div class="actions">
                        <el-button type="info"
                                   plain
                                   size="mini"
                                   @click="toComment(item)"
                                   v-if="!flag || flag == CHECK_STATUS.PASS.value || flag == CHECK_STATUS.REJECT.value">{{$t('newsweb_txt_web_comment')}}
                        </el-button>
                        <el-button type="info"
                                   plain
                                   size="mini"
                                   @click="checkArticle(item.InfoId, -1)"
                                   v-if="!flag || flag == CHECK_STATUS.PASS.value">{{$t("newsweb_btn_web_revoke")}}
                        </el-button>
                        <el-button type="info"
                                   plain
                                   size="mini"
                                   @click="editArticle(item)"
                                   v-if="!flag || flag == CHECK_STATUS.PASS.value">{{$t('fixed')}}
                        </el-button>
                        <!-- <el-button type="info"
                                   plain
                                   size="mini"
                                   @click="toTop(item.InfoId,0)"
                                   v-if="(!flag || flag == CHECK_STATUS.PASS.value) && !item.BannerStatus">{{$t('newsweb_btn_web_pin')}}
                        </el-button>
                        <el-button type="info"
                                   plain
                                   size="mini"
                                   @click="toTop(item.InfoId,1)"
                                   v-if="(!flag || flag == CHECK_STATUS.PASS.value) && item.BannerStatus">{{$t('newsweb_btn_web_unpin')}}
                        </el-button> -->
                        <el-button type="info"
                                   plain
                                   size="mini"
                                   @click="examineArticle(item)"
                                   v-if="flag == CHECK_STATUS.CHECKING.value">{{$t('newsweb_btn_web_verify')}}
                        </el-button>
                        <el-button type="info"
                                   plain
                                   size="mini"
                                   @click="deleteArticleAdmin(item.InfoId)"
                                   v-if="flag == CHECK_STATUS.REJECT.value">{{$t('newsweb_txt_web_delete')}}
                        </el-button>
                        <el-button type="info"
                                   plain
                                   size="mini"
                                   @click="deleteApply(item.InfoId)"
                                   v-if="flag == CHECK_STATUS.APPLY_DELETE.value">{{$t("newsweb_btn_web_confirmdelete")}}
                        </el-button>
                        <el-button type="info"
                                   plain
                                   size="mini"
                                   @click="setAttribute(item)"
                                   v-if="!flag || flag == CHECK_STATUS.PASS.value">{{$t("newsweb_txt_web_setting")}}
                        </el-button>
                    </div>
                </li>
            </ul>
        </template>

        <el-pagination
                :current-page="currentPage"
                :page-size="pageSize"
                layout="total, prev, pager, next, jumper"
                v-on:current-change="pageChange"
                :total="total" v-if="total>pageSize">
        </el-pagination>

         <el-dialog :title="$t('newsweb_txt_web_setting')" :visible.sync="dialogProjectVisible">
          <el-form :model="setProperties">
              <div>
              <el-checkbox v-model="setProperties.BannerStatus">{{$t("newsweb_btn_web_pinhint")}}</el-checkbox>
              </div>
              <el-checkbox v-model="setProperties.isgiveList">{{$t("newsweb_txt_web_rank")}}</el-checkbox>
              <el-input :placeholder="$t('newsweb_txt_web_weight')" v-if="setProperties.isgiveList==true" v-model="setProperties.SortWeight" clearable></el-input>
              <div style="margin-top:20px;">
                <div> 
                  <el-radio v-model="setProperties.SyncFlag" label="0">{{$t("newsweb_txt_web_way1")}}</el-radio>
                </div>
                <div>
                  <el-radio v-model="setProperties.SyncFlag" label="1">{{$t("newsweb_txt_web_way2")}}</el-radio>
                </div>
                <el-radio v-model="setProperties.SyncFlag" label="2">{{$t("newsweb_txt_web_way3")}}</el-radio>
              </div>
              <el-input  style="margin-top:20px;" v-model="setProperties.CreateTime" size="small" :placeholder="$t('article_placeholder_select')"></el-input>
              <el-input  style="margin-top:20px;" v-model="setProperties.ScannedCount" size="small" :placeholder="$t('newsweb_txt_date_viewer')"></el-input>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogProjectVisible = false">{{$t("newsweb_btn_cancel")}}</el-button>
            <el-button type="primary" @click="BtndialogSet">{{$t("newsweb_btn_ok")}}</el-button>
          </div>
        </el-dialog>
    </div>
</template>

<script>
  import moment from 'moment'
  import {
    getList,
    deleteArticle,
    applyDeleteArticle,
    deleteArticleAdmin,
    getListForManager,
    checkArticle,
    setTop,
    adminDeleteArticle,
    setAttrComment
  } from 'api/Article'
  import {SUCCESS_NOTIFY_MSG,FAILED_ALWAYS_ACTION} from 'api/CustomConfigKeys'
  import {formatDate} from 'utils/util'
  import {previewURL} from "config/config"
  import {Notification} from "element-ui"
  export default {
    data(){
      return {
        pageSize: 10,
        currentPage: 1,
        total: 0,
        list: [],
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
        wgid: '',
        game: 0,
        lang: '',
        plate: 0,
        selectorDisabled: false,
        isNoData: false,
        dialogProjectVisible:false,
        formLabelWidth:'120px',
        setProperties:{},
        dataTime:'',
        keyword:'',
        baseURL:previewURL
      }
    },
    computed: {
      flag(){
        return this.$route.query.flag;
      },
      type(){
        return parseInt(this.$route.query.type || 1, 10);
      }
    },
    methods: {
      getList(p){
        if(arguments.length>0){
          this.currentPage = 1;
        }
        let managerQueryParams = {
          pagenum: this.pageSize,
          page:this.currentPage,
          flag: this.flag || 2,
          keyword:this.keyword
        };
        if(this.wgid.length){
          managerQueryParams.wgid = this.wgid;
        }else{
          managerQueryParams.qlang = this.lang;
          managerQueryParams.gameid = this.game;
          managerQueryParams.catalog = this.plate;
        }

        let request = this.$store.getters.isManager ? getListForManager(managerQueryParams) : getList({
          pagenum: this.pageSize,
          page: this.currentPage,
          status: this.type,
          flag: this.flag,
          keyword:this.keyword
        });
        request.then(res => {
          this.total = 0;
          if (res.code === 0) {
            if(res.datalist.length == 0){
              this.isNoData = true;
            }else{
              this.isNoData = false;
            }
            this.list = res.datalist;
            this.total = res.total;
          }else if(res.code==-9){
            this.isNoData = true;
            //Notification.error({message: this.$t('news_txt_err_nouser'), duration: 2000})
          }else if(res.code==-1){
            this.isNoData = true;
          }else{
             this.isNoData = true;
          }
        })
      },
      pageChange(page){
        this.currentPage = page;
        this.getList();
      },
      deleteArticle(id){
        var title = this.$t('newsweb_txt_web_delete_hint')
        if(this.type == 2 ){
          title = this.$t('newsweb_txt_web_deletedrafts')
        }
        this.$confirm(title, '', {
          confirmButton: this.$t('newsweb_btn_ok'),
          cancelButton: this.$t('newsweb_btn_cancel')
        }).then(_ => {
          deleteArticle({
            id
          }, {
            [SUCCESS_NOTIFY_MSG]: this.$t('article_has_deleted'),
            [FAILED_ALWAYS_ACTION]: this.getList()
          }).then(res => {
            if (res.code === 0) {
              this.getList();
            }
          })
        }).catch(_ => _);
      },
      deleteArticleAdmin(id){
        var title = this.$t('newsweb_txt_web_delete_hint')
        if(this.type == 2 ){
          title = this.$t('newsweb_txt_web_deletedrafts')
        }
        this.$confirm(title, '', {
          confirmButton: this.$t('newsweb_btn_ok'),
          cancelButton: this.$t('newsweb_btn_cancel')
        }).then(_ => {
          deleteArticleAdmin({
            id
          }, {
            [SUCCESS_NOTIFY_MSG]: this.$t('article_has_deleted'),
            [FAILED_ALWAYS_ACTION]: this.getList()
          }).then(res => {
            if (res.code === 0) {
              this.getList();
            }
          })
        }).catch(_ => _);
      },
      applyDeleteArticle(id){
        const vm = this;
        const h = this.$createElement;
        var self = this
        this.$msgbox({
          title: '',
          message: this.$t('newsweb_txt_web_delete_hint2'),
          showInput: true,
          inputType: 'textarea',
          showCancelButton: true,
          showClose: false,
          confirmButton: this.$t('newsweb_btn_ok'),
          cancelButton: this.$t('newsweb_btn_cancel'),
          inputValidator(value){
            if(!value){
              return self.$t('article_input_reason');
            }else if(value.length > 200){
              return self.$t('article_reason_less_200');
            }else{
              return true;
            }
          },
          beforeClose(action, instance, done){
            let errElement = instance.$el.querySelector('.el-message-box__errormsg');
            if(action === 'confirm'){
              let validate = instance.inputValidator(instance.inputValue);
              if(typeof validate === 'string'){
                errElement.innerText = validate;
                errElement.style.visibility = 'visible';
              }else{
                errElement.innerText = '';
                errElement.style.visibility = 'hidden';
                applyDeleteArticle({
                  id,
                  reason: instance.inputValue
                }, {
                  [SUCCESS_NOTIFY_MSG]: self.$t('article_submit_apply')
                }).then(res => {
                  if (res.code === 0) {
                    vm.getList();
                    done();
                  }
                }).catch(_ => _);
              }
            }else{
              errElement.innerText = '';
              errElement.style.visibility = 'hidden';
              done();
            }
          }
        }).catch(_ => _);
      },
      checkArticle(id, flag){
        this.$confirm(this.$t('newsweb_txt_web_revoke_hint'), '', {
          confirmButton: this.$t('newsweb_btn_ok'),
          cancelButton: this.$t('newsweb_btn_cancel')
        }).then(_ => {
          checkArticle({
            id,
            flag
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
        this.$router.push('/article/edit?id='+info.InfoId)
      },
      examineArticle(info){
        this.$router.push('/article/examine?id='+info.InfoId)
      },
      toTop(id,status){ // 置顶
        var title = status == 0 ? this.$t('newsweb_btn_web_pinhint') : this.$t('newsweb_btn_web_unpinhint')
        this.$confirm(title, '', {
          confirmButton: this.$t('newsweb_btn_ok'),
          cancelButton: this.$t('newsweb_btn_cancel')
        }).then(_ => {
          setTop({
            id: id,
            flag: status
          }).then((res)=>{
            if(res.code == 0){
              this.$notify({message: status==1? this.$t('article_cancel_to_top_success') : this.$t('article_to_top_success')})
              this.getList()
            }
          })
        }).catch(()=>{})

      },
      toComment(info){
        this.$router.push('/article/comment?id='+info.InfoId)
      },
      deleteApply(id){
        this.$confirm(this.$t('article_delete_msg'), '', {
          confirmButton: this.$t('newsweb_btn_ok'),
          cancelButton: this.$t('newsweb_btn_cancel')
        }).then(_ => {
          adminDeleteArticle({
            id
          }, {
            [SUCCESS_NOTIFY_MSG]: this.$t('article_has_deleted')
          }).then(res => {
            if (res.code === 0){
              this.getList();
            }
          })
        }).catch(_ => _)
      },
      //设置属性默认值
      setAttribute (item) {
        var BannerStatus = item.BannerStatus;
        var SortWeight = item.SortWeight;
        var SyncFlag = item.SyncFlag;
        var date = new Date(item.CreateTime * 1000)
        var CreateTime = formatDate(date, 'yyyy-MM-dd hh:mm');
        var ScannedCount = item.ScannedCount;
        var isgiveList = false;

        if(BannerStatus == 0){
          BannerStatus = false
        }else {
          BannerStatus = true
        }
        if(SyncFlag == 0){
          SyncFlag = '0'
        }else if(SyncFlag == 1){
          SyncFlag = '1'
        }else if(SyncFlag == 2){
          SyncFlag = '2'
        }
        if(SortWeight!=0){
          isgiveList = true
        }else{
          isgiveList = false
        }

        this.setProperties = {
          BannerStatus:BannerStatus,
          SortWeight:SortWeight,
          SyncFlag:SyncFlag,
          InfoId:item.InfoId,
          isgiveList:isgiveList,
          CreateTime:CreateTime,
          ScannedCount:ScannedCount
        }
        this.dialogProjectVisible = true;
      },
      //设置属性确定提交
      BtndialogSet () {
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
          id: this.setProperties.InfoId,
          flag: this.setProperties.BannerStatus,
          weight: this.setProperties.SortWeight,
          syncflag: this.setProperties.SyncFlag,
          createtime:date,
          scannedcount:this.setProperties.ScannedCount
        }).then((res)=>{
          if(res.code == 0){
            this.dialogProjectVisible = false;
            this.getList();
          }
        })
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
      },
      type(){
        //同flag
        this.list = [];
        this.total = 0;

        this.currentPage === 1 ? this.getList() : this.currentPage = 1;
      },
      wgid(newVal){
        if(newVal.length){
          this.selectorDisabled = true;
        }else{
          this.selectorDisabled = false;
        }
      }
    }
  }
</script>
