<style lang="scss">
.data-admin-article{
  background:#fff;
  .fr{
    float:right;
    margin-right:10px;
  }
  .input-box{
    position: relative;
  	padding:20px;
    padding-right: 100px;
  	label{
      display: inline-block;
  		margin-right:20px;
      margin-bottom: 15px;
  	}
    .export-btn{
      position: absolute;
      right:20px;
      top:20px;
    }
  }
  .no-data{
    height: 100px;
    text-align: center;
    p{
      margin-top: 30px;
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
            {{$t('newsweb_txt_web_game')}}
            <div class="selector">
              <el-select v-model="game"
              :placeholder="$t('article_placeholder_select')">
              		<el-option value="0" :label="$t('newsweb_txt_web_all')" ></el-option>
                  <el-option v-for="v in gameList"
                   :value="v.id"
                   :key="v.id"
                   :label="v.name"></el-option>
              </el-select>
            </div>
        </label>
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
            {{$t('newsweb_txt_web_layout')}}
            <div class="selector">
                <el-select v-model="plate"
                           :placeholder="$t('article_placeholder_select')">
                    <el-option value="0" :label="$t('newsweb_txt_web_all')" ></el-option>
                    <el-option v-for="v in plateList"
                               :value="v.id"
                               :key="v.id"
                               :label="v.name"></el-option>
                </el-select>
            </div>
        </label>
        <label>
	        {{$t('status')}}
	        <div class="selector">
	          <el-select v-model="status">
	            <!-- <el-option value="0" label="全部"></el-option> -->
	            <el-option value="1" :label="$t('examining')"></el-option>
	            <el-option value="2" :label="$t('examined')"></el-option>
	            <el-option value="3" :label="$t('examine_filed')"></el-option>
	            <el-option value="4" :label="$t('newsweb_txt_web_delete2')"></el-option>
	          </el-select>
	        </div>
	      </label>
	      <label>
	      	WGID
	      	<div class="selector">
	      		<el-input v-model="wgid" size="mini" :placeholder="$t('input_wgid')"	></el-input>
	      	</div>
	      </label>
        <label>
          {{$t('newsweb_txt_addtime')}}
          <el-date-picker
            v-model="daterange"
            size="mini"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd HH:mm">
          </el-date-picker>
        </label>
	      <label>
	      	<el-button type="primary" size="small" @click="getArticleData(1)">
            {{$t('newsweb_btn_ok')}}
          </el-button>
	      </label>
        <div class="export-btn" v-if="n==-1">
          <form id="form" :action="baseURL+'/admin/data/allinfo/downarticleinfo'" method="get">
              <input type="hidden" name="pagenum" v-model="pagenum">
              <input type="hidden" name="page" v-model="page">
              <input type="hidden" name="flag" v-model="status">
              <input type="hidden" name="day" v-model="n">
              <input type="hidden" name="begintime" v-model="begintime">
              <input type="hidden" name="endtime" v-model="endtime">
              <input type="hidden" name="lang" v-model="lang">
              <input type="hidden" name="gameid" v-model="game">
              <input type="hidden" name="catalog" v-model="plate">
              <input type="hidden" name="wgid" v-model="wgid">
          </form>
          <el-button type="success" size="small" @click="exportData">
            {{$t('newsweb_btn_export')}}
          </el-button>
        </div>
      </div>
    </div>
    <div v-if="tableData.length>0">
      <el-table
        :data="tableData"
        style="width: 100%" @sort-change="sortMethod">
        <el-table-column
          prop="Title"
          :label="$t('newsweb_txt_data_title')" align="center"
        >
        </el-table-column>
        <el-table-column
          prop="viewnum"
          :label="$t('newsweb_txt_date_views')" align="center"
          width="180" :sortable="n==-1?'custom':false">
          <template slot-scope="scope">
            <i v-if="n==-1" @click="editView(scope.row.InfoId)" class="el-icon-edit"></i>
            <span style="margin-left: 10px">{{ scope.row.viewnum }}</span>
            <span v-if="n==-1">({{ scope.row.basenum || 0 }})</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="viewuser" align="center"
          :label="$t('newsweb_txt_date_viewer')">
        </el-table-column>
        <el-table-column
          prop="comment" align="center"
          :label="$t('newsweb_txt_date_comment')" :sortable="n==-1?'custom':false" >
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
          prop="NickName" align="center"
          :label="$t('news_txt_autor')">
          <template slot-scope="scope">
            <p>{{$t('wegamer_author_apply_nickname')}}: {{ scope.row.NickName }}</p>
            <p>WGID: {{ scope.row.WeGamerId}}</p>
          </template>
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
    <div class="no-data" v-else>
      <p>{{$t('no_data')}}</p>
    </div>
  </div>
</template>

<script>
  import typeHead from './data-tab-head.vue'
  import {getAdminArticleData,exportData} from 'api/Data'
  import {getGameList,getPlateList,setAttrComment} from 'api/Article'
  import {formatDate} from 'utils/util'
  import {CONFIG} from "config/config"
  export default {
    data(){
      return {
        status:'1',
        pagenum: 10,
        page:1,
        tableData: [],
        total: 0,
        n: 1,
        game: '0',
        plate: '0',
        lang: '',
        wgid: '',
        daterange:'',
        begintime:'',
        endtime:'',
        baseURL:CONFIG.api,
        sortfield:0,
        sorttype:0
    	}
    },
    computed:{
    	gameList(){
        return this.$store.getters.gameList
      },
      plateList(){
        return this.$store.getters.plateList
      }
    },
    watch:{
      daterange(val){
        if(!val){
          this.begintime = '';
          this.endtime = '';
        }else{
          this.begintime = this.daterange[0] ? formatDate(new Date(this.daterange[0]),"yyyy-MM-dd hh:mm") : '';
          this.endtime = this.daterange[1] ? formatDate(new Date(this.daterange[1]),"yyyy-MM-dd hh:mm") : '';
        }
          
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
        this.n = type
        this.getArticleData()
      },
      getArticleData(p){
      	var params = {
      		day: this.n,
          flag: this.status,
          pagenum: this.pagenum,
          page: arguments.length>0 ? p: this.page,
          wgid: this.wgid,
          lang: this.lang,
          gameid: this.game,
          catalog: this.plate,
          begintime:this.begintime,
          endtime:this.endtime,
          sortfield:this.sortfield,
          sorttype:this.sorttype
      	}
      	if(this.wgid == ''){
      		delete params.wgid
      	}else{
      		delete params.lang
      		delete params.gameid
      		delete params.catalog
      		//delete params.flag
      	}
        getAdminArticleData(params).then((res)=>{
          if(res.code == 0){
            this.tableData = res.datalist
            this.total = res.total
          }else{
            this.tableData = [];
            this.total = 0;
          }
        })
      },
      pageChange(n){
        this.page = n
        this.getArticleData()
      },
      editView:function(id){
　　　　　this.$prompt(this.$t('newsweb_txt_modify'), '', {
          confirmButtonText: this.$t('newsweb_btn_ok'),
          cancelButtonText: this.$t('newsweb_btn_cancel')
        }).then(({ value }) => {
            setAttrComment({
              id: id,
              flag: 2,
              scannedcount:value
            }).then((res)=>{
              if(res.code == 0){
                this.getArticleData();
              }
            })
        }).catch(() => {});
      },
      exportData:function(){
        document.getElementById("form").submit();
      },
      sortMethod:function(obj){
        this.sortfield= obj.prop == "viewnum" ? 1:2;
        this.sorttype = obj.order=="descending" ? 2:1;
        this.getArticleData()
      }
    },
    components:{
      typeHead
    },
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
      this.getArticleData()

    }
  }
</script>
