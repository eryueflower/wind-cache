<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script>
export default {
  name: 'About',
  created() {
    console.log(this.$winux.getStorageSync('color'))
    console.log(this.$winux.getStorageSync('color1'))
  }
}
</script>
