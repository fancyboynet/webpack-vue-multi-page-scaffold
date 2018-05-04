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
	      <el-tab-pane label="概况" name="all">
	        <guideTmp></guideTmp>
	      </el-tab-pane>
	      <el-tab-pane label="文章数据" name="article">
	        <dataArticle v-if="role == 2" ></dataArticle>
	        <dataAdminArticle v-if="role == 1"></dataAdminArticle>
	      </el-tab-pane>
	      <el-tab-pane v-if="role == 1" label="推荐文章数据" name="tj">
	        <dataAdminRecommend></dataAdminRecommend>
	      </el-tab-pane>
	    </el-tabs>
		</div>

	</div>
</template>

<script>
	import guideTmp from 'components/data-guide.vue'
  import dataArticle from 'components/data-article.vue'
  import dataAdminArticle from 'components/data-admin-article.vue'
  import dataAdminRecommend from 'components/data-admin-recommend.vue'
	export default {
		data(){
			return {
				defaultTab: "all"
			}
		},
		computed:{
			role(){
        return this.$store.getters.userInfo.role
      }
		},
		methods:{
			handleClick(){

			}
		},
		components:{
			guideTmp,
      dataArticle,
      dataAdminArticle,
      dataAdminRecommend
		}
	}
</script>
