<style lang="scss">
    .add-article {
        .el-tabs {
            padding-top: 10px;
        }
        .el-tabs__nav-wrap {
            padding: 0 40px;
        }
        .el-tabs__item {
            font-size: 18px;
            color: #8f969e;
            height: 60px;
            line-height: 60px;
        }
        .is-active {
            color: #405b84;
        }
        .el-tabs__active-bar {
            background: #405b84;
        }
    }
</style>

<template>
    <div class="add-article">
        <el-tabs v-model="defaultTab">
            <el-tab-pane v-for="(val,key) in showTab" :label="keyMap[key]"
                         :name="key" :key="key">
                <component :is="val.tmp" :ref="key" :key="key" ></component>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
  import articleTmp from 'components/article-article.vue'
  import videoTmp from 'components/article-video.vue'
  import photosTmp from 'components/article-photos.vue'
  import urlTmp from 'components/article-url.vue'
  import appTmp from 'components/article-app.vue'
  import getParams from 'utils/urlParams'
  import getXmlParams from 'utils/getXmlParams'
  import {getDetail} from 'api/Article'

  export default {
    data(){
      return {
        defaultTab: '',
        tabMap: ['','article','photos','video','url','app'],
        showTab:{
        },
        keyMap:{
          article: this.$t('newsweb_txt_web_imagetext'),
          photos: this.$t('newsweb_txt_web_album'),
          video: this.$t('newsweb_txt_web_video'),
          url: this.$t('newsweb_txt_web_url'),
          app: this.$t('newsweb_txt_web_apppage')
        }
      }
    },
    methods: {
      getInfo(){

      },
      preLoad(info,type){
        if(this.$route.path == '/recommend/edit'){ // 如果是推荐文章判断
          this.$refs[type][0].$refs.mod.isRecommend = true
          this.$refs[type][0].$refs.mod.defaultIndex = info.RecommendSite
        }
        this.$refs[type][0].title = info.Title
        this.$refs[type][0].$refs.mod.pregame = info.GameId
        this.$refs[type][0].$refs.mod.lang = info.Lang
        this.$refs[type][0].$refs.mod.preplate = info.ModuleId
        this.$refs[type][0].$refs.mod.coverType = info.CoverCount == 1 ? "1" : "2"
        this.$refs[type][0].$refs.mod.isEdit = true
        this.$refs[type][0].$refs.mod.articleId = info.InfoId
        if(info.CoverCount == 1){
          this.$refs[type][0].$refs.mod.singleImg = {
            preview:info.CoverList[0].SmallImgUrl,
            origin:info.CoverList[0].BigImgUrl
          }
        }else{
          var arr = []
          info.CoverList.map((val,i)=>{
            var obj = {}
            obj.preview = val.SmallImgUrl
            obj.origin = val.BigImgUrl
            arr.push(obj)
          })
          this.$refs[type][0].$refs.mod.imgList = arr
        }
        var xml = getXmlParams(info.ObjectDesc)
        switch (type){ // 初始赋值
          case 'article' :
            this.$refs[type][0].setContent(info.content)
            break;
          case 'video' :
          	const videoDom = xml.getElementsByTagName("Video")[0]
          	var thumb = videoDom.getElementsByTagName("Thumb")[0].innerHTML
          	var timelen = videoDom.getElementsByTagName("TimeLen")[0].innerHTML
          	var url = videoDom.getElementsByTagName("Url")[0].innerHTML
          	var desc = videoDom.getElementsByTagName("Desc")[0].innerHTML
          	this.$refs[type][0].responseMsg = {
          		thumb: thumb,
          		url: url,
          		desc: desc,
          	  timelen: timelen
          	}
          	this.$refs[type][0].content = desc
            break;
           case 'photos' :
           	const p = xml.getElementsByTagName("Photos")[0]
           	var list = p.getElementsByTagName("Item")
           	var _arr = []
           	for(var i=0;i<list.length;i++){
           		var _obj = {}
           		_obj.url = list[i].getElementsByTagName("Url")[0].innerHTML
           		_obj.desc = list[i].getElementsByTagName("Desc")[0].innerHTML
           		_obj.key = list[i].getElementsByTagName("Index")[0].innerHTML
           		_arr.push(_obj)
           	}
           	_arr.map((val)=>{ // push方法可以触发vue数组更新
           		this.$refs[type][0].imgList.push(val)
           	})
           	//this.$refs[type][0].imgList = arr
           	break;
           	case 'url' :
           		const u = xml.getElementsByTagName("Url")[0].innerHTML
           		var url = u.split('<![CDATA[')[1].split("]]>")[0]
           		this.$refs[type][0].url = url
           		break
           	case 'app' :
           		const a_id = xml.getElementsByTagName("JumpParam")[0].innerHTML
              const mod = xml.getElementsByTagName("JumpPage")[0].innerHTML
           		this.$refs[type][0].id = a_id
              this.$refs[type][0].appMod = mod
           		break;
        }


      }
    },
    components: {
      articleTmp,
      videoTmp,
      photosTmp,
      urlTmp,
      appTmp
    },
    mounted(){
      console.log()
      const id = getParams("id")
      getDetail({id:id}).then((res)=>{
      	if(res.code == 0){
      		var info = res.info
		      const type = this.tabMap[info.ObjectType]
		      this.defaultTab = type
		      this.showTab[type] = {
		        display: true,
		        tmp: type+"Tmp"
		      }

		      setTimeout(()=>{
            this.preLoad(info,type)
          },800)
		      //this.preLoad(info,type)
      	}
      })


    }
  }
</script>
