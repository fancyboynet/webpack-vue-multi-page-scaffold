<style scoped></style>

<template>
  <div>
    <div v-for="item in value" :key="item.lang" v-show="lang === item.lang">
      <el-input :placeholder="$t('newsweb_txt_subject_title')" v-model="item.title"></el-input>
      <el-input
        type="textarea"
        :rows="5"
        :placeholder="$t('newsweb_txt_subject_info')" v-model="item.brief">
      </el-input>
    </div>
  </div>
</template>

<script>
  import {LANG} from 'config/lang'
  export default {
    props: {
      value: {
        type: Array,
        default () {
          return []
        }
      },
      lang: {
        type: String,
        default: LANG.EN.CODE
      }
    },
    data(){
      return {}
    }
  }
</script>
