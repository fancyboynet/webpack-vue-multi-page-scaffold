<style lang="scss">
.author-manage{
  position:relative;
  .input-box{
    float:right;
    padding:5px 5px;
    z-index:9;
    label{
      margin-right:20px;
    }
  }
  .showPop{
    .user-msg{
      margin-top:15px;
      dd{
        float:left;
        margin-right:15px;
      }
      dt{
        float:left;
        line-height:60px;
        color:#8f969e;
        font-size:18px;
      }
    }
    .checkbox{

      li{
        float:left;
        width:33.33%;
      }
    }
  }
  .mypop{
    width:400px;
  }
}
</style>

<template>
  <div class="author-manage">
    <div class="d-head" >
      <div class="input-box">
        <label>
          <div class="selector">
            <el-input v-model="wgid" prefix-icon="el-icon-search" size="mini" :placeholder="$t('input_wgid')"  ></el-input>
          </div>
        </label>
        <label>
          <el-button type="primary" size="small" @click="search" >{{$t('newsweb_txt_search')}}</el-button>
        </label>
        <label>
          <el-button type="warning" size="small" @click="showAdd">{{$t('newsweb_txt_author_add')}}</el-button>
        </label>
      </div>


    </div>
    <el-table
      :data="tableData"
      style="width: 100%" >
      <el-table-column
        prop="NickName"
        :label="$t('author_nickname')" align="center"
      >
      </el-table-column>
      <el-table-column
        prop="Wgid"
        label="WGID" align="center"
      >
      </el-table-column>
      <el-table-column
        prop="Uin" align="center"
        label="UserID">
      </el-table-column>
      <el-table-column
        prop="Opentime" align="center"
        :formatter="getTime"
        width="150"
        :label="$t('newsweb_txt_author_date')">
      </el-table-column>
      <el-table-column
        prop="Authorityflag" align="center"
        :formatter="getAuthority"
        width="300"
        :label="$t('newsweb_txt_author_limit')">
      </el-table-column>
      <el-table-column
        prop="TotalInfoNum" align="center"
        :label="$t('newsweb_txt_author_num')">
      </el-table-column>
      <el-table-column
        prop="viewnum" align="center"
        :label="$t('newsweb_txt_author_views')">
      </el-table-column>
      <el-table-column
        prop="comment" align="center"
        :label="$t('newsweb_txt_author_comments')">
      </el-table-column>
      <el-table-column
        align="center"
        width="180"
        :label="$t('newsweb_txt_author_operate')">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">{{$t('newsweb_txt_author_permission')}}</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">{{$t('newsweb_txt_author_delet')}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page-box">
      <el-pagination
                :current-page="page"
                :page-size="pagenum"
                layout="total, prev, pager, next, jumper"
                v-on:current-change="pageChange"
                :total="total">
        </el-pagination>
    </div>

    <el-dialog
      :visible.sync="showAddPop"
      custom-class="mypop"
    >
      <div class="showPop">
        <div class="pop-search-box" v-if="!isEdit">
          <label>
            <div class="selector">
              <el-input v-model="findUin" placeholder="UIN"></el-input>
            </div>
            <el-button type="primary" size="small" @click="findAuthor" >{{$t('newsweb_txt_search')}}</el-button>
          </label>
        </div>
        <dl class="user-msg clearfix">
          <dd><img :src="avatar" height="60" width="60" alt=""></dd>
          <dt>{{nickname}}</dt>
        </dl>
        <el-checkbox-group v-model="selectList">
          <ul class="clearfix checkbox">
            <li><el-checkbox  label="1">{{$t('newsweb_txt_web_imagetext')}}</el-checkbox></li>
            <li><el-checkbox  label="2">{{$t('newsweb_txt_web_album')}}</el-checkbox></li>
            <li><el-checkbox  label="4">{{$t('newsweb_txt_web_video')}}</el-checkbox></li>
            <li><el-checkbox  label="8" >{{$t('newsweb_txt_web_url')}}</el-checkbox></li>
            <li><el-checkbox  label="16" >{{$t('newsweb_txt_web_apppage')}}</el-checkbox></li>
          </ul>
        </el-checkbox-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showAddPop = false">{{$t('newsweb_btn_cancel')}}</el-button>
        <el-button type="primary" @click="addAuthor">{{$t('newsweb_btn_ok')}}</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import {getAuthorList,findAuthor,addAuthor,editAuthor,deleteAuthor} from 'api/Author'
  import moment from 'moment'
  import {FAILED_NOTIFY_MSG,FAILED_CODE} from 'api/CustomConfigKeys'
  export default {
    data(){
      return {
        wgid: '',
        pagenum: 10,
        page:1,
        tableData: [],
        total: 0,
        showAddPop: false,
        selectList: ['1','2','4'],
        uin: '',
        findUin: '',
        avatar: '',
        nickname: '',
        isEdit: true
      }
    },

    methods:{
      search(){
        this.page = 1
        this.getArticleData()
      },
      getArticleData(){
        var params = {
          pagenum: this.pagenum,
          page: this.page,
          kw: this.wgid
        }

        getAuthorList(params).then((res)=>{
          if(res.code == 0){
            this.tableData = res.datalist
            this.total = res.total
          }
        })
      },
      getAuthority(row){
        let arr = row.Authorityflag.split(",")
        let target = []
        let obj = {
          "1": this.$t('newsweb_txt_web_imagetext'),
          "2": this.$t('newsweb_txt_web_album'),
          "4": this.$t('newsweb_txt_web_video'),
          "8": this.$t('newsweb_txt_web_url'),
          "16": this.$t('newsweb_txt_web_apppage')
        }
        arr.map((val)=>{
          target.push(obj[val])
        })
        return target.join("，")
      },
      getTime(row){
        return moment(row.Opentime*1000).format('YYYY-MM-DD HH:mm')
      },
      pageChange(n){
        this.page = n
        this.getArticleData()
      },
      handleEdit(index,rows){
        this.avatar = ''
        this.uin = ''
        this.nickname = ''
        this.showAddPop = true
        this.isEdit = true
        this.selectList = rows.Authorityflag.split(",")
        this.findUin = rows.Uin
        this.findAuthor()
      },
      handleDelete(index,rows){
        this.$confirm(this.$t('is_delete_auhtor')+rows.NickName+'?', this.$t('hint'), {
          confirmButtonText: this.$t('newsweb_btn_ok'),
          cancelButtonText: this.$t('newsweb_btn_cancel'),
          type: 'warning'
        }).then(() => {
          deleteAuthor({uin:rows.Uin}).then((res)=>{
            if(res.code == 0){
              this.$message({
                type: 'success',
                message: this.$t('delete_success')
              });
              this.getArticleData()
            }
          })
        }).catch(() => {});
      },
      showAdd(){
        this.showAddPop = true
        this.isEdit = false
        this.selectList = ["1","2","4"]
        this.avatar = ''
        this.findUin = ''
        this.uin = ''
        this.nickname = ''
      },
      findAuthor(){
        if(this.findUin == ''){
          this.$notify({message: this.$t('author_input_uin')})
          return
        }
        findAuthor({uin:this.findUin}).then((res)=>{
          if(res.code == 0){
            this.avatar = res.userinfo.avatar
            this.nickname = res.userinfo.nickname
            this.uin = res.userinfo.uin
          }
        })
      },
      addAuthor(){ // 添加作者
        if(this.uin == ''){
          this.$notify({message: this.$t('find_author')})
          return
        }
        if(this.selectList.length == 0){
          this.$notify({message: this.$t('choose_authority')})
          return
        }
        if(this.isEdit){
          editAuthor({
            uin: this.uin,
            auth: this.selectList.toString()
          }).then((res)=>{
            if(res.code == 0){
              this.$notify.success({message:this.$t('change_authority_success')})
              this.getArticleData()
              this.showAddPop = false
            }
          })
        }else{
          addAuthor({
            uin: this.uin,
            auth: this.selectList.toString()
          },{
            [FAILED_NOTIFY_MSG]: this.$t('newsweb_err_repeat'),
            [FAILED_CODE]: "-2"
          }).then((res)=>{
            if(res.code == 0){
              this.$notify({message:this.$t('add_success')})
              this.getArticleData()
              this.showAddPop = false
            }
          })
        }

      }
    },
    mounted(){
      this.getArticleData()
    }
  }
</script>
