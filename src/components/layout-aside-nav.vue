<style lang='scss'>
  .layout-aside-nav {
    .el-aside {
      & > ul {
        padding: 10px 5px 0;
        & > li {
          font-size: 18px;
          color: #1b1b1b;
          line-height: 20px;
          padding: 15px 25px;
          border-bottom: 1px solid #ecedee;
          span {
            cursor: pointer;
            &:hover {
              color: #405b84;
            }
          }

          ul {
            display: none;
            margin: 18px 0;
            li {
              font-size: 14px;
              color: #8f969e;
              line-height: 20px;
              margin: 5px 0;
            }
            .on {
              color: #405b84;
            }
          }
          &.on {
            color: #405b84;
            background: #ecedee;
            ul {
              display: list-item;
            }
          }
        }
      }
    }
  }
</style>

<template>
  <el-container class="layout-aside-nav">
    <el-aside width="210px">
      <ul>
        <li v-for="item in nav" :class="{on: currentPath === item.path}">
          <router-link :to="item.path" tag="span">{{item.text}}</router-link>
        </li>
      </ul>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>

  export default {
    props: {
      nav: {
        type: Array,
        default() {
          return [{
            path: '/',
            text: ''
          }]
        }
      }
    },
    computed: {
      currentPath () {
        return this.$route.path
      }
    }
  }
</script>



