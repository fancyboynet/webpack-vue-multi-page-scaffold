<style lang="scss" scoped="">
	.wg-main-header{
		height: 81px;
		border-bottom: 1px solid #cfd2d5;
		.module-name{
			display: inline-block;
			vertical-align: bottom;
			margin-left: 35px;
			height: 80px;
			line-height: 84px;
			border-bottom: 3px solid #405b84;
			padding: 0 9px;
			color: #405b84;
			font-size: 18px;
		}
		.tools{
			float: right;
			margin-right: 25px;
			margin-top: 20px;
			&>div{
				display:inline-block;
				&:first-child{
					margin-right: 15px;
				}
			}
		}
	}
</style>

<template>
	<div class="wg-main-header">
		<div class="module-name">{{name}}</div>
		<div class="tools">
			<slot name="tools"></slot>
			<slot name="uploadVideo"></slot>
		</div>
	</div>
</template>

<script>
	export default{
		props: ['name'],
		data(){
		    return {

			}
		}
	}
</script>