<style lang="scss">
  .data-admin-article {
    background: #fff;
    .fr {
      float: right;
      margin-right: 10px;
    }
    .input-box {
      padding: 20px;
      label {
        margin-right: 20px;
      }
    }
  }
</style>

<template>
  <div class="data-admin-article">
    <div class="d-head">
      <typeHead @change="onDayChange"></typeHead>
      <div class="input-box">
        <label>
          {{$t('status')}}
          <div class="selector">
            <el-select v-model="status">
              <el-option :value="SUBJECT_STATUS.RELEASE.CODE" :label="$t('newsweb_btn_web_publish')"></el-option>
              <el-option :value="SUBJECT_STATUS.DELETE.CODE" :label="$t('newsweb_btn_web_revoke')"></el-option>
            </el-select>
          </div>
        </label>
        <label>
          <el-button type="primary" size="small" @click="readList">
            {{$t('newsweb_btn_ok')}}
          </el-button>
        </label>
      </div>
    </div>
    <el-table
      :data="data"
      style="width: 100%">
      <el-table-column
        prop="title"
        :label="$t('newsweb_txt_data_title')" align="center"
      >
      </el-table-column>
      <el-table-column
        prop="viewNum"
        :label="$t('newsweb_txt_date_views')" align="center"
        width="180">
      </el-table-column>
      <el-table-column
        prop="viewUser" align="center"
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
        prop="viewtime" align="center"
        :label="$t('newsweb_txt_addtime')">
      </el-table-column>
    </el-table>
    <div class="page-box">
      <el-pagination
        :current-page="pagination.page"
        :page-size="pagination.limit"
        layout="total, prev, pager, next, jumper"
        v-on:current-change="onPageChange"
        :total="pagination.total">
      </el-pagination>
    </div>

  </div>
</template>

<script>
  import typeHead from 'components/data-tab-head.vue'
  import { readStatSubjectList } from 'model/stat'
  import Pagination from 'model/pagination'
  import {SUBJECT_STATUS} from 'model/subject'

  export default {
    data () {
      return {
        day: '',
        status: SUBJECT_STATUS.RELEASE.CODE,
        SUBJECT_STATUS: SUBJECT_STATUS,
        data: [],
        pagination: new Pagination()
      }
    },
    methods: {
      onDayChange (v) {
        this.day = v
        this.pagination = new Pagination()
      },
      readList () {
        readStatSubjectList({
          day: this.day,
          status: this.status
        }).then(({data, pagination}) => {
          this.data = data
          this.pagination.setTotal(pagination.total)
        })
      },
      onPageChange (n) {
        this.pagination.setPage(n)
        this.readList()
      }
    },
    components: {
      typeHead
    },
    mounted () {
      this.readList()
    }
  }
</script>
