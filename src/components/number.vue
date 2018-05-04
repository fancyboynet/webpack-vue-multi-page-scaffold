<style>

</style>

<template>
	<span>{{num}}</span>
</template>

<script>
  //import {tween} from 'shifty'
	export default {
		props:{
			duration: {
				type: Number,
				default: 1000
			},
			from: {
				type: Number,
				default: 0
			},
			to: {
				type: Number,
				default: 0
			}
		},
		data(){
			return {
				num: this.from,
				loop: '',
        start: 0
			}

		},
		methods:{
      easeOut: function(t, b, c, d) {
        //return -c *(t /= d)*(t-2) + b;
         return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b; // 缓动算法
      },
			animate(){
        var during = Math.ceil(this.duration / 17);
        var loop = ()=>{
          let value = this.easeOut(this.start, this.from, this.to - this.from, during)
          this.start++
          if (this.start <= during) {
            this.num = Math.floor(value)
            requestAnimationFrame(loop);
          } else {
            this.start = 0
            //this.num = this.to
            //setTimeout(()=>{this.num = this.to},80) // 延迟80ms 使缓动效果更加明显
            this.num = this.to
              // 动画结束，这里可以插入回调...
            this.$emit('end',this.num)
          }
        }
        loop()
			}
		},
		watch:{
			'to':{
				'handler': function(obj){
					this.animate()
				},
				'deep': true
			}
		},
		mounted(){
			this.animate()

		}
	}
</script>
