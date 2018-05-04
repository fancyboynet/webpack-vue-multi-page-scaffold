<style scoped>
  .upload-trigger{
    display: inline-block;
    vertical-align: top;
  }
  .top{
    display: flex;
    margin: 10px 0;
    font-size: 18px;
    color: #8f969e;
  }
  .handler{
    margin-left: auto;
    display: flex;
  }
  .main{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 236px;
    height: 150px;
    background: #edebeb;
    color: #8f969e;
    font-weight: bold;
    font-size: 30px;
    cursor: pointer;
    position: relative;
  }
  .main img{
    max-width: 100%;
    max-height: 100%;
  }
</style>

<template>
  <div class="upload-trigger">
    <div class="top">
      <label v-if="label">{{ label }}</label>
      <div class="handler">
        <el-button v-if="imageUrl" @click="onDel" slot="handler" size="mini" type="danger">{{$t('newsweb_txt_web_delete')}}</el-button>
      </div>
    </div>
    <div class="main" @click="onAdd">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </div>
  </div>
</template>

<script>
	export default{
	  props: {
      label: {
        type: String,
        default: '',
        required: true
      },
      imageUrl: {
        type: String,
        default: ''
      }
    },
    methods: {
      onDel() {
        this.$emit('on-del')
      },
      onAdd() {
        this.$emit('on-add')
      }
    }
  }
</script>
