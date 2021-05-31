<template>
    <div>
        <h1>{{courseName}} <span>{{courseMajor}}{{courseGrade}}</span>  </h1>
      <div id="targetText">
        <p class="strong">课程目标一：<span v-text="targetText.courseTargetOne"></span> </p>
        <p class="strong">课程目标二：<span v-text="targetText.courseTargetTwo"></span></p>
        <p class="strong">课程目标三：<span v-text="targetText.courseTargetThree"></span></p>
        <p class="strong">课程目标四：<span v-text="targetText.courseTargetFour"></span></p>
        <p class="strong">课程目标五：<span v-text="targetText.courseTargetFive"></span></p>
      </div>
      <el-col>
      <el-row>
      <el-menu :default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1" @click="goTo('AssignOrdinary')">平时任务</el-menu-item>
        <el-menu-item index="2" @click="goTo('AssignExperiment')">实验</el-menu-item>
        <el-menu-item index="3" @click="goTo('AssignEnding')">考试</el-menu-item>
<!--        <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>-->
      </el-menu>
      <!--    路由匹配到的组件将显示在这里-->
      </el-row>
      <router-view></router-view>
      </el-col>
    </div>
</template>

<!--加上scoped能够防止样式之间的冲突-->
<style scoped>
@import "../assets/schedule.css";
</style>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      courseName: this.$route.params.courseName,
      courseMajor: this.$route.params.courseMajor,
      courseGrade: this.$route.params.courseGrade,
      targetText: {
        courseTargetOne: '',
        courseTargetTwo: '',
        courseTargetThree: '',
        courseTargetFour: '',
        courseTargetFive: ''
      }
    }
  },
  created () {
    axios.post('api/getTargetText', {
      courseName: this.$route.params.courseName,
      courseMajor: this.$route.params.courseMajor,
      courseGrade: this.$route.params.courseGrade
    }).then(res => {
      this.targetText = res.data
    }).catch(function (error) {
      console.log(error)
    })
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    goTo (name) {
      this.$router.replace({ name, params: { courseName: this.courseName, courseMajor: this.courseMajor, courseGrade: this.courseGrade } })
    }
  }
}
</script>
