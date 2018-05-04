<style lang="scss">
.data-article{
  background:#fff;
  .fr{
    float: right;
    position: absolute;
    top: 26px;
    right: 20px;
    margin-right:10px;
  }
}
</style>

<template>
  <div class="data-article">
    <div class="d-head" >
      <typeHead @change="change"></typeHead>
      <div class="fr">
        {{$t('status')}}
        <div class="selector">
          <el-select v-model="status" @change="changeStatus">
            <el-option value="0" :label="$t('newsweb_txt_web_all')"></el-option>
            <el-option value="1" :label="$t('newsweb_txt_web_verifying')"></el-option>
            <el-option value="2" :label="$t('examined')"></el-option>
            <el-option value="3" :label="$t('newsweb_txt_web_norecommended')"></el-option>
          </el-select>
        </div>
      </div>

    </div>
    <el-table
      :data="tableData"
      style="width: 100%" >
      <el-table-column
        prop="Title"
        :label="$t('newsweb_txt_data_title')" align="center"
      >
      </el-table-column>
      <el-table-column
        prop="viewnum"
        :label="$t('newsweb_txt_date_views')" align="center"
        width="180">
      </el-table-column>
      <el-table-column
        prop="viewuser" align="center"
        :label="$t('newsweb_txt_date_viewer')">
      </el-table-column>
      <el-table-column
        prop="comment" align="center"
        :label="$t('newsweb_txt_date_comment')">
      </el-table-column>
      <el-table-column
        prop="favorite" align="center"
        :label="$t('newsweb_txt_date_favorite')">
      </el-table-column>
      <el-table-column
        prop="CreateTime" align="center"
        :label="$t('newsweb_txt_addtime')">
        <template slot-scope="scope">
          <span >{{scope.row.CreateTime | formatDate}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="viewtime" align="center"
        :label="$t('newsweb_txt_date_staytime')">
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

  </div>
</template>

<script>
  import typeHead from './data-tab-head.vue'
  import {getArticleData} from 'api/Data'
  import {formatDate} from 'utils/util'
  export default {
    data(){
      return {
        status:'0',
        pagenum: 10,
        page:1,
        tableData: [],
        total: 0,
        n: 1
      }
    },
    filters:{
      formatDate:function(val){
        if(!val) return;
        let date = new Date(val*1000);
          return formatDate(date,"yyyy-MM-dd hh:mm");
      }
    },
    methods:{
      change(type){
        this.n = type;
        this.page=1;
        this.getArticleData()
      },
      getArticleData(){
        getArticleData({
          day: this.n,
          flag: this.status,
          pagenum: this.pagenum,
          page: this.page
        }).then((res)=>{
          if(res.code == 0){
            this.tableData = res.datalist
            this.total = res.total
          }
        })
      },
      pageChange(n){
        this.page = n
        this.getArticleData()
      },
      changeStatus(status){
        this.status = status
        this.getArticleData()
      }
    },
    components:{
      typeHead
    },
    mounted(){
      this.getArticleData(0)
    }
  }
</script>
