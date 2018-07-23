<template>
    <div class="page">
        <router-link to="/b">跳到B页</router-link>
        <div>scss test</div>
        <i class="iconfont">&#xe600;</i>
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
    .page{
        background: url("~assets/bg.png") no-repeat;
        div{
            color: red;
        }
    }
</style>
