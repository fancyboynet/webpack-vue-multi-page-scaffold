<style lang="scss">
	.data-box{
		//border-top:1px solid #cfd2d5;
    background:#fff;
		padding:0 0 35px 0;
		dl{
			float:left;
			width:25%;
			height:90px;
			border-right:1px solid #cfd2d5;
			text-align: center;
			&:last-child{
				border-right:none;
			}
			dd{
				font-size: 36px;
				line-height: 54px;
				color: #1b1b1b;
			}
			dt{
				font-size:18px;
				color:#8f969e;
				line-height: 30px;
			}
		}
	}
</style>

<template>
	<div class="data-box">
		<typeHead @change="changetype" ></typeHead>
		<div class="data-box clearfix">
			<dl>
				<dd><toNumber  :to="num1" ></toNumber></dd>
				<dt>{{$t('newsweb_txt_date_views')}}</dt>
			</dl>
			<dl>
				<dd><toNumber  :to="num2" ></toNumber></dd>
				<dt>{{$t('newsweb_txt_date_viewer')}}</dt>
			</dl>
			<dl>
				<dd><toNumber  :to="num3" ></toNumber></dd>
				<dt>{{$t('newsweb_txt_date_comment')}}</dt>
			</dl>
			<dl>
				<dd><toNumber  :to="num4" ></toNumber></dd>
				<dt>{{$t('newsweb_txt_date_favorite')}}</dt>
			</dl>
		</div>
	</div>
</template>

<script>
	import typeHead from './data-tab-head.vue'
	import toNumber from './number.vue'
	import {getGuide} from 'api/Data'
	export default {
		data(){
			return {
					num1:0,
					num2:0,
					num3:0,
					num4: 0
			}
		},
		methods:{
			changetype(type){
				this.getGuide(type);
			},
			getGuide(n){
				getGuide({
					day: n
				}).then((res)=>{
					if(res.code == 0){
						this.num1 = parseInt(res.info.viewnum)
						this.num2 = parseInt(res.info.viewuser)
						this.num3 = parseInt(res.info.comment)
						this.num4 = parseInt(res.info.favorite)
					}
				})
			}
		},
		components:{
			typeHead,
			toNumber
		},
		mounted(){
			this.getGuide(1)
		}
	}
</script>
