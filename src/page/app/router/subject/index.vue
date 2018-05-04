<template>
  <layout-aside-nav :nav="nav"></layout-aside-nav>
</template>

<script>
  import LayoutAsideNav from 'components/layout-aside-nav'
  export default {
    data(){
      return {
        nav: [
          {
            path: '/subject/list',
            text: this.$t('newsweb_txt_subjectlist')
          },
          {
            path: '/subject/setting',
            text: this.$t('newsweb_txt_web_setting')
          }
        ]
      }
    },
    components:{
      'layout-aside-nav': LayoutAsideNav
    }
  }
</script>



