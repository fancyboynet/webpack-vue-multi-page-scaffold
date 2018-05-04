<style>
</style>

<template>
  <div>
    <tabs>
      <el-tabs v-model="activeStatus" slot="tabs">
        <el-tab-pane :label="$t('newsweb_txt_subject')" :name="SUBJECT_STATUS.RELEASE.CODE.toString()"></el-tab-pane>
        <el-tab-pane :label="$t('newsweb_txt_web_drafts')" :name="SUBJECT_STATUS.DRAFT.CODE.toString()"></el-tab-pane>
        <el-tab-pane :label="$t('newsweb_txt_web_recycle')" :name="SUBJECT_STATUS.DELETE.CODE.toString()"></el-tab-pane>
      </el-tabs>
      <el-button slot="tools" type="warning" @click="toCreate" size="min">{{$t('newsweb_txt_subjectnew')}}</el-button>
    </tabs>
    <subject-list :data="data" @on-del="onDel" @on-edit="onEdit"></subject-list>
    <el-pagination
      :current-page="pagination.page"
      :page-size="pagination.limit"
      layout="total, prev, pager, next, jumper"
      v-on:current-change="onPageChange"
      :total="pagination.total">
    </el-pagination>
  </div>
</template>

<script>
  import {SUBJECT_STATUS, readSubjectList, deleteSubject} from 'model/subject'
  import Tabs from 'components/tabs'
  import SubjectList from 'components/subject-list'
  import Pagination from 'model/pagination'

  export default {
    data () {
      return {
        SUBJECT_STATUS,
        activeStatus: SUBJECT_STATUS.RELEASE.CODE.toString(),
        data: [],
        pagination: new Pagination()
      }
    },
    computed: {
      activeStatusCode () {
        return parseInt(this.activeStatus)
      }
    },
    watch: {
      activeStatus () {
        this.onTabChange()
      }
    },
    methods: {
      onTabChange () {
        this.pagination = new Pagination()
      },
      toCreate() {
        this.$router.push(`create`)
      },
      remove (item) {
        this.data = this.data.filter(i => i.id !== item.id)
      },
      onDel (item) {
        this.$confirm(this.$t('newsweb_txt_subjectdel'), this.$t('hint'), {
          confirmButtonText: this.$t('newsweb_btn_ok'),
          cancelButtonText: this.$t('newsweb_btn_cancel'),
          type: 'warning'
        }).then(() => {
          deleteSubject(item).then( () => {
            this.remove(item)
          })
        })
      },
      onEdit (item) {
        this.$router.push(`edit/${item.id}`)
      },
      readList () {
        readSubjectList({
          status: this.activeStatusCode
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
      Tabs,
      SubjectList
    },
    mounted () {
      this.readList()
    }
  }
</script>
