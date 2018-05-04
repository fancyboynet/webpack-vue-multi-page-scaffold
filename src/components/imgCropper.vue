<style lang="scss">
  .cropper-box{
    position:relative;
    margin:0 auto auto auto;
    .cropper{
      display:block;
      background:#ceced6;
      position:relative;
      z-index:9;
    }
    .hide{
      //display:none;
      left:0;
      top:0;
      position:absolute;
      z-index:0;
    }
    .dragger{
      position:absolute;
      z-index:9;
      background:rgba(255,255,255,.4);
      border:4px dashed #405b84;
      cursor:move;
      i{
        position:absolute;
        width:6px;
        height:6px;
        // border:1px solid #405b84;
        // background:#fff;
      }
      .lt{
        left:-3px;
        top:-3px;
        cursor:nw-resize;
      }
      .rt{
        right:-3px;
        top:-3px;
        cursor:ne-resize;
      }
      .lb{
        left:-3px;
        bottom:-3px;
        cursor:sw-resize;
      }
      .rb{
        right:-3px;
        bottom:-3px;
        cursor:se-resize;
      }
    }
  }
</style>

<template>
  <div class="cropper-box" :style="{width:width+'px',height:height+'px'}" >
    <canvas class="cropper" :width="width" :height="height" ref="canvas"></canvas>
    <canvas class="hide" ref="hide" :width="dragger.width" :height="dragger.height" ></canvas>
    <div class="dragger" :style="{width:dragger.width+'px',height:dragger.height+'px',left:dragger.left+'px',top:dragger.top+'px'}"
      @mousedown="start($event,'move')"
     >
      <i class="lt" @mousedown.stop="start($event,'lt')" ></i>
      <i class="rt" @mousedown.stop="start($event,'rt')" ></i>
      <i class="lb" @mousedown.stop="start($event,'lb')" ></i>
      <i class="rb" @mousedown.stop="start($event,'rb')" ></i>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    width:{
      type: Number,
      default: 480
    },
    height:{
      type: Number,
      default: 270
    },
    url:{
      type: String,
      default: ''//'http://localhost:8080/api/upfile/image/7170/H26XfJOd.jpg' //'http://10.0.2.121:8090/upfile/image/4574/6wRFs9NB.png'   //http://10.0.2.121:8090/upfile/image/7170/H26XfJOd.jpg   // 图片测试url
    },
    draggerRatio:{
      type: [String,Number],
      default: null
    },
    draggerWidth:{
      type: Number,
      default: 480
    }
  },
  data(){
    return {
      ctx: '',
      clicked: false,
      type: '',
      x: '',
      y: '',
      url2: '',
      dragger:{
        width: 480,
        height:270,
        left: 0,
        top: 0
      },
      img: ''
    }
  },
  computed:{
    WLratio(){
      return this.draggerRatio || (this.width/this.height).toFixed(2) // 默认的长宽比
    }
  },
  methods:{
    start(event,type){
      var event =  document.all ? window.event : arguments[0] ? arguments[0] : event; // 兼容火狐
      this.clicked = true
      this.type = type
      this.x = event.clientX
      this.y = event.clientY
    },
    end(){
      this.clicked = false
    },
    getCrop(){
      var imgDataUrl = this.$refs.canvas.toDataURL();

      var imgData = this.ctx.getImageData(this.dragger.left,this.dragger.top,this.dragger.width,this.dragger.height);
      this.$refs.hide.getContext("2d").putImageData(imgData,0,0);

      var img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = imgDataUrl;
      img.onload = ()=>{

        this.ctx.clearRect(0,0,this.width,this.height)
        if(this.draggerRatio != null){
          let h = parseInt(this.width / this.draggerRatio)
          let t = ((this.height - h)/2).toFixed(2)
          this.ctx.drawImage(img,this.dragger.left,this.dragger.top,this.dragger.width,this.dragger.height,0,t,this.width,h)
        }else{
          this.ctx.drawImage(img,this.dragger.left,this.dragger.top,this.dragger.width,this.dragger.height,0,0,this.width,this.height)
        }
        this.dragger.left = 0;
        this.dragger.top = 0;
        this.dragger.width = this.width;
        this.dragger.height = this.height;
        var imgDataUrl = this.$refs.canvas.toDataURL();

        var arr = imgDataUrl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        var imgBlob = new Blob([u8arr], {type:mime});
        this.$emit('getImgBlob',imgBlob)

      }
    }
  },
  mounted(){
    //此处因为canvas图片跨域处理，打包时记得删除
    //this.url = this.url.replace('http://10.0.2.121:8090/','http://localhost:8081/api/')
    //let URL = new window.URL(this.url);
    //this.url2 = this.url.replace(URL.host,location.host+'/canvas')

    if(this.draggerRatio != null){
      this.dragger.width = this.draggerWidth;
      this.dragger.height = parseInt(this.draggerWidth/this.draggerRatio)
      this.dragger.left = (this.width - this.draggerWidth)/2
      this.dragger.top = (this.height - this.dragger.height)/2
    }

    this.img = new Image();
    var img = this.img
    img.crossOrigin = 'anonymous';
    img.src = this.url
    this.ctx = this.$refs.canvas.getContext("2d")
    img.onerror = ()=>{
      this.$notify({
        title: this.$t('warning'),
        message: this.$t('img_load_filed'),
        type: 'warning'
      });
    }
    img.onload = ()=>{ // canvas画图
      const w = img.width
      const h = img.height
      if(w < 330 || h < 210){
        this.$notify({
            message: this.$t('newsweb_txt_mincover'),
            duration: 3000,
            type: 'error'
        });
        this.$emit('close')
        return
      }
      const ratio = w/h
      let x = 0
      let y = 0
      if(ratio > this.WLratio){
        img.width = this.width;
        img.height = parseInt(this.width/ratio)
        y = (this.height - img.height)/2
      }else{
        img.height = this.height;
        img.width = parseInt(this.height * ratio)
        x = (this.width - img.width)/2
      }
      this.ctx.drawImage(img,x,y,img.width,img.height)
    }
    const body = document.getElementsByTagName('body')[0]
    body.addEventListener('mousemove',(e)=>{ // 一堆判断
      if(this.clicked){
        //console.log(e.clientX,e.clientY)
        let deltaX = e.clientX - this.x;
        let deltaY = e.clientY - this.y;
        switch (this.type){
          case 'lt' : // 左上图标
            this.dragger.left += deltaX;
            this.dragger.top += parseInt(deltaX/this.WLratio);
            this.dragger.width -= deltaX;
            this.dragger.height = parseInt(this.dragger.width/this.WLratio);
            break;
          case 'rt' :
            this.dragger.top -= parseInt(deltaX/this.WLratio);
            this.dragger.width += deltaX;
            this.dragger.height = parseInt(this.dragger.width/this.WLratio);
            break
          case 'rb' :

            this.dragger.width += deltaX;
            this.dragger.height = parseInt(this.dragger.width/this.WLratio);
            break
          case 'lb' :
            this.dragger.left += deltaX;
            this.dragger.width -= deltaX;
            this.dragger.height = parseInt(this.dragger.width/this.WLratio);
            break
          case 'move' :
            this.dragger.left += deltaX
            this.dragger.top += deltaY
            break

        }
        this.x = e.clientX;  // 一堆边界判断
        this.y = e.clientY;
        this.dragger.left = this.dragger.left < 0 ? 0 : this.dragger.left;
        this.dragger.top = this.dragger.top < 0 ? 0 : this.dragger.top;
        this.dragger.width = this.dragger.width > this.width ? this.width : this.dragger.width;
        this.dragger.height = this.dragger.height > this.height ?  this.height :  this.dragger.height;
        this.dragger.left = this.dragger.width + this.dragger.left > this.width ? this.width - this.dragger.width : this.dragger.left;
        this.dragger.top = this.dragger.height + this.dragger.top > this.height ? this.height - this.dragger.height : this.dragger.top;
        this.dragger.width = this.dragger.width + this.dragger.left > this.width ? this.width - this.dragger.left : this.dragger.width;
        this.dragger.height = this.dragger.height + this.dragger.top > this.height ? this.height - this.dragger.top : this.dragger.height;

      }
    })

    body.addEventListener('mouseup',(e)=>{
      this.clicked = false
    })


  }

}
</script>
