<template>
  <div>
    <el-select size="mini" v-model="val" :placeholder="$t('article_placeholder_select')" @change="onChange">
      <el-option value="" :label="$t('newsweb_txt_web_all')" v-if="showAll"></el-option>
      <el-option v-for="item in LANG" :value="item.CODE" :key="item.CODE" :label="item.TRANSLATION"></el-option>
    </el-select>
  </div>

</template>

<script>
  import {LANG} from 'config/lang'
  export default {
    props: {
      value: {
        type: String,
        default: LANG.EN.CODE
      },
      showAll: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        LANG,
        val: this.value
      }
    },
    watch: {
      value(){
        this.val = this.value
      }
    },
    methods: {
      onChange(val){
        this.$emit('input', val)
        this.$emit('change', val)
      }
    }
  }
</script>
