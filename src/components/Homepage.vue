<template>
  <el-row class="tac">
    <el-col :span="12">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        id="menu"
      >
        <el-avatar icon="el-icon-user-solid"></el-avatar>
        <el-submenu index="1">
        </el-submenu>
        <el-menu-item index="/firstPage" @click="goTo('/firstPage')">
          <i class="el-icon-s-shop"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/assign" @click="goTo('/assign')">
          <i class="el-icon-s-order"></i>
          <span slot="title">布置作业</span>
        </el-menu-item>
        <el-menu-item index="/submit" @click="goTo('/submit')">
          <i class="el-icon-folder-opened"></i>
          <span slot="title">提交成绩</span>
        </el-menu-item>
        <el-menu-item index="/myAccount" @click="goTo('/myAccount')">
          <i class="el-icon-user"></i>
          <span slot="title">我的</span>
        </el-menu-item>
      </el-menu>
    </el-col>
<!--    路由匹配到的组件将显示在这里-->
    <router-view></router-view>
  </el-row>
</template>

<script>
export default {
  name: 'Homepage.vue',
  data () {
    return {}
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    goTo (path) {
      this.$router.replace(path)
    }
  }
}
</script>

<style scoped>
  #menu{
    width: 40%;
  }
</style>
