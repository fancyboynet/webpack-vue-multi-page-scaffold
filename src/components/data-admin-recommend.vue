<style lang="scss">
.data-admin-article{
  background:#fff;
  .fr{
    float:right;
    margin-right:10px;
  }
  .input-box{
  	padding:20px;
  	label{
  		margin-right:20px;
  	}
  }
}
</style>

<template>
  <div class="data-admin-article">
    <div class="d-head" >
      <typeHead @change="change"></typeHead>
      <div class="input-box">
        <label>
            {{$t('newsweb_txt_web_language')}}
            <div class="selector">
                <el-select v-model="lang"
                           :placeholder="$t('article_placeholder_select')">
                  <el-option value="" :label="$t('newsweb_txt_web_all')" ></el-option>
                  <el-option v-for="(val,key) in $store.state.app.langListNew"
                             :value="key"
                             :key="key"
                             :label="val"></el-option>
                </el-select>
            </div>
        </label>

        <label>
	        {{$t('status')}}
	        <div class="selector">
	          <el-select v-model="status">
	            <el-option value="0" :label="$t('newsweb_txt_web_all')"></el-option>
	            <el-option value="1" :label="$t('normal')"></el-option>
	            <el-option value="2" :label="$t('newsweb_btn_web_revoke')"></el-option>
	          </el-select>
	        </div>
	      </label>
	      <label>
	      	<el-button type="primary" size="small" @click="getArticleData">
            {{$t('newsweb_btn_ok')}}
          </el-button>
	      </label>
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
        prop="WebScannedCount" align="center"
        :label="$t('newsweb_txt_pagewiew')">
      </el-table-column>
      <el-table-column
        prop="downnum" align="center"
        :label="$t('newsweb_txt_downloadnum')">
      </el-table-column>
      <el-table-column
        prop="favorite" align="center"
        :label="$t('newsweb_txt_date_favorite')">
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
  import {getAdminRecommendData} from 'api/Data'
  export default {
    data(){
      return {
        status:'1',
        pagenum: 10,
        page:1,
        tableData: [],
        total: 0,
        n: 1,
        lang: '',
    	}
    },

    methods:{
      change(type){
        this.n = type;
        this.page = 1;
        this.getArticleData()
      },
      getArticleData(){
      	var params = {
      		day: this.n,
          flag: this.status,
          pagenum: this.pagenum,
          page: this.page,
          lang: this.lang
      	}

        getAdminRecommendData(params).then((res)=>{
          if(res.code == 0){
            this.tableData = res.datalist
            this.total = res.total
          }
        })
      },
      pageChange(n){
        this.page = n
        this.getArticleData()
      }
    },
    components:{
      typeHead
    },
    mounted(){
      this.getArticleData()
    }
  }
</script>
