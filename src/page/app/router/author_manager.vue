<style lang="scss">
  .data-page{
    width:1260px;
    background:#fff;
  }
</style>

<template>
  <div class="add-article">
    <div class="data-page">
      <el-tabs v-model="defaultTab" @tab-click="handleClick">
        <el-tab-pane :label="$t('newsweb_txt_authormanage')" name="manage">
          <authorManager></authorManager>
        </el-tab-pane>
        <el-tab-pane :label="$t('newsweb_txt_author_apply')" name="apply">
          <applyManager></applyManager>
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>

<script>
  import authorManager from 'components/author-manage.vue'
  import applyManager from 'components/apply-manage.vue'
  export default {
    data(){
      return {
        defaultTab: "manage"
      }
    },
    methods:{
      handleClick(tab){
        if(sessionStorage){
          sessionStorage.nowTabName = tab.name
        }
      }
    },
    computed:{
      role(){
        return this.$store.getters.userInfo.role
      }
    },
    components:{
      authorManager,
      applyManager
    },
    created(){
      if(sessionStorage && sessionStorage.nowTabName){
        this.defaultTab = sessionStorage.nowTabName
      }
    }
  }
</script>
