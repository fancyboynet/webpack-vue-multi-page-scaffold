<style scoped>
  .tabs{
    position: relative;
  }
  .tools{
    position: absolute;
    top: 0;
    right: 27px;
    display: flex;
    height: 80px;
    align-items: center;
  }
</style>

<template>
  <div class="tabs add-article">
    <slot name="tabs"></slot>
    <div class="tools">
      <slot name="tools"></slot>
    </div>
  </div>
</template>

<script>
	export default{}
</script>
