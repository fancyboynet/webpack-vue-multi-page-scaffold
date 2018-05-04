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
        prop="ApplyTime" align="center"
        :formatter="getTime"
        width="150"
        :label="$t('newsweb_txt_author_time')">
      </el-table-column>
      <el-table-column
        prop="ContectDetails" align="center"
        :label="$t('newsweb_txt_author_contact')">
      </el-table-column>
      <el-table-column
        align="left"
        width="300"
        :label="$t('newsweb_txt_author_experience')">
         <template slot-scope="scope">
            <p v-html="scope.row.Introduce"></p>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="180"
        :label="$t('newsweb_txt_author_operate')">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="pass(scope.$index, scope.row)">{{$t('newsweb_btn_web_pass')}}</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">{{$t('newsweb_txt_author_delete')}}</el-button>
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
          <dd><img :src="[avatar==''?'assert/images/development_demo/material.png':avatar]" height="60" width="60" alt=""></dd>
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
  import {applyAuthor,findAuthor,applyPass,applyDelete} from 'api/Author'
  import moment from 'moment'
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

        applyAuthor(params).then((res)=>{
          if(res.code == 0){
            this.tableData = res.datalist
            this.total = res.total
          }
        })
      },
      getTime(row){
        return moment(row.ApplyTime*1000).format('YYYY-MM-DD HH:mm')
      },
      pageChange(n){
        this.page = n
        this.getArticleData()
      },
      pass(index,rows){
        this.avatar = ''
        this.uin = ''
        this.nickname = ''
        this.showAddPop = true
        this.isEdit = true
        this.selectList = ["1","2","4"]
        this.findUin = rows.Uin
        this.findAuthor()
      },
      handleDelete(index,rows){
        this.$confirm(this.$t('newsweb_txt_author_deletehint'), this.$t('hint'), {
          confirmButtonText: this.$t('newsweb_btn_ok'),
          cancelButtonText: this.$t('newsweb_btn_cancel'),
          type: 'warning'
        }).then(() => {
          applyDelete({uin:rows.Uin}).then((res)=>{
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
      addAuthor(){
        if(this.selectList.length == 0){
          this.$notify({message: this.$t('choose_authority')})
          return
        }
      	applyPass({
      		uin: this.uin,
      		auth: this.selectList.toString()
      	}).then((res)=>{
      		if(res.code == 0){
      			this.$notify.success({message: this.$t('pass_success')})
            this.showAddPop = false

      		}
      		this.getArticleData()
      	})
      }


    },
    mounted(){
      this.getArticleData()
    }
  }
</script>
