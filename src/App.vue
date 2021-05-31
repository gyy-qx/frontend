<template>
    <router-view/>
</template>

<style>
#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<script>
export default {
  created () {
    document.title =
        '课程目标评价系统'
  }
}
</script>
