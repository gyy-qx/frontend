<template>
    <div id="chairmanHomepage">
<!--        <h4>课程目标评价系统</h4>-->
      <el-row class="tac">
        <el-col :span="12">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            id="menu"
          >
            <el-popover placement="right" trigger="hover">
              <img :src= "imageUrl" style="width: 300px;height: 300px">
              <img slot="reference" :src= "imageUrl" class="headAvatar">
            </el-popover>
            <el-submenu index="1">
            </el-submenu>
            <el-menu-item index="/courseManage" @click="goTo('/courseManage')">
              <i class="el-icon-notebook-1"></i>
              <span slot="title">课程管理</span>
            </el-menu-item>
            <el-menu-item index="/teacherManage" @click="goTo('/teacherManage')">
              <i class="el-icon-s-check"></i>
              <span slot="title">教师管理</span>
            </el-menu-item>
            <el-menu-item index="/studentManage" @click="goTo('/studentManage')">
              <i class="el-icon-cold-drink"></i>
              <span slot="title">学生管理</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <!--    路由匹配到的组件将显示在这里-->
        <router-view></router-view>
      </el-row>
    </div>
</template>

<!--加上scoped能够防止样式之间的冲突-->
<style scoped>
  @import "../assets/homepage.css";
</style>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      pathImg: '',
      imageUrl: ''
    }
  },
  components: {
    // Homepage: Homepage
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
