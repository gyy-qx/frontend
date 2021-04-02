<template>
    <div>
      <input type="text" v-model="a">
      <input type="text" v-model="b">
      {{c}}
    </div>
</template>

<!--加上scoped能够防止样式之间的冲突-->
<style scoped>
    body {
        background-color: #ff0000;
    }
</style>

<script>
export default {
  data () {
    return {
      a: '',
      b: '',
      c: ''
    }
  },
  watch: {
    a: function () {
      this.c = this.a + this.b
    },
    b: function () {
      this.c = parseInt(this.a) + parseInt(this.b)
    }
  }
}
</script>
