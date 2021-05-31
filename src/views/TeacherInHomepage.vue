<template>
  <el-row class="tac">
    <el-col :span="12">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        id="menu"
        background-color="#545c64"
        text-color="#fff"
      >
            <el-popover placement="right" trigger="hover">
              <img :src= "imageUrl" style="width: 300px;height: 300px">
              <img slot="reference" :src= "imageUrl" class="headAvatar">
            </el-popover>
            <!--        <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
        <el-submenu index="1">
        </el-submenu>
        <el-menu-item index="2" @click="goTo('/submit')">
          <i class="el-icon-edit-outline"></i>
          <span slot="title">提交教学大纲</span>
        </el-menu-item>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-date"></i>
            <span>教学安排</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-1" @click="goTo('/assignOrdinary')">平时任务</el-menu-item>
            <el-menu-item index="3-2" @click="goTo('/assignExperiment')">实验（测验）</el-menu-item>
            <el-menu-item index="3-3" @click="goTo('/assignEnding')">考试</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="4" @click="goTo('/upLoad')">
          <i class="el-icon-upload2"></i>
          <span slot="title">提交成绩</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <!--    路由匹配到的组件将显示在这里-->
    <router-view></router-view>
  </el-row>
</template>

<script>
import axios from 'axios'
export default {
  name: 'TeacherInHomepage',
  data () {
    return {
      pathImg: '',
      imageUrl: ''
    }
  },
  created () {
    axios.post('api/myAccountLogin', {
      teacherNumber: sessionStorage.getItem('loginUser')
    }).then(response => {
      this.pathImg = response.data.pathImg
      this.imageUrl = 'http://localhost:8080/headImg/' + this.pathImg
    }).catch(function (error) {
      console.log(error)
    })
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
  @import "../assets/homepage.css";
</style>
