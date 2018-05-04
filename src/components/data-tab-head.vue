<style lang="scss">
	.data-tab-head{
		margin-left: 10px;
    display:block;
	}
</style>

<template>
	<div class="data-tab-head add-article">
    <el-tabs v-model="activeName">
      <el-tab-pane name="1" :label="$t('newsweb_txt_date_today')">
      </el-tab-pane>
      <el-tab-pane name="7" :label="$t('newsweb_txt_date_7d')">
      </el-tab-pane>
      <el-tab-pane name="14" :label="$t('newsweb_txt_date_14d')">
      </el-tab-pane>
      <el-tab-pane name="30" :label="$t('newsweb_txt_date_30d')">
      </el-tab-pane>
      <el-tab-pane :name="DAY.ALL.CODE.toString()" :label="$t('newsweb_txt_date_total')">
      </el-tab-pane>
    </el-tabs>
	</div>
</template>

<script>
  import {DAY} from 'model/stat'
	export default {
		data(){
			return {
        activeName: '1',
        DAY: DAY
			}
		},
    watch: {
      activeName(){
        this.$emit('change',parseInt(this.activeName))
      }
    }
	}
</script>
