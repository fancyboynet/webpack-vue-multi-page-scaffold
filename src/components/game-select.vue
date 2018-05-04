<template>
  <div>
    <el-select size="mini" v-model="val" :placeholder="$t('article_placeholder_select')" @change="onChange">
      <el-option v-for="item in data" :value="item.id" :key="item.id" :label="item.name"></el-option>
    </el-select>
  </div>

</template>

<script>
  import {readGameList} from 'model/game'
  export default {
    props: {
      value: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        data: [],
        val: this.value
      }
    },
    watch: {
      value(){
        this.val = this.value
      }
    },
    computed: {
      game(){
        return this.data.find((v) => {
          return v.id === this.val
        })
      }
    },
    methods: {
      onChange(val){
        this.$emit('input', val)
        this.$emit('change', this.game)
      }
    },
    mounted(){
      readGameList().then((v) => {
        this.data = v
      })
    }
  }
</script>
