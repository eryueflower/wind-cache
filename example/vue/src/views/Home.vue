<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
  </div>
</template>

<script>
export default {
  name: 'Home',
  created() {
    console.log(this.$winux)
    this.$winux.setStorageSync('color', { one: 'red', two: 'blue' })
  }
}
</script>
