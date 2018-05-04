<style scoped>
  li {
    display: flex;
    margin: 0 0 0 35px;
    padding: 30px 0 25px;
    border-bottom: 1px solid #e2e4e6;
    color: #8f969e;
  }

  .cover {
    width: 113px;
    height: 86px;
    margin: 0 18px 0 0;
  }

  h3 {
    font-size: 18px;
    color: #1b1b1b;
  }

  p {
    margin: .5em 0;
  }
</style>

<template>
  <ul>
    <li v-for="item in data">
      <img class="cover" :src="item.smallCoverUrl" alt="">
      <div>
        <h3>{{ item.title}}</h3>
        <p>{{ item.brief}}</p>
        <el-button
          type="info"
          plain
          size="mini"
          @click="toEdit(item)"
        >{{$t('newsweb_txt_web_edit')}}
        </el-button>
        <el-button
          plain
          size="mini"
          @click="toDel(item)"
        >{{$t('newsweb_txt_web_delete')}}
        </el-button>
      </div>
    </li>
  </ul>
</template>

<script>
  export default {
    props: {
      data: {
        type: Array,
        default () {
          return []
        }
      }
    },
    methods: {
      toEdit (item){
        this.$emit('on-edit', item)
      },
      toDel (item){
        this.$emit('on-del', item)
      }
    }
  }
</script>
