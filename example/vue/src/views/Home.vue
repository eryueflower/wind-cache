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
    this.$winux.setStorageSync(
      'color1',
      { one: 'black', two: 'green' },
      {
        expires: 1000 * 60 * 2
      }
    )
  }
}
</script>
