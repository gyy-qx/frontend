<template>
<div id="register" style="margin-top: 200px">
  <p class="first"><span>*</span>工作信息</p>
  <p class="sec" style="margin-top: 50px">
    <span>职称</span><el-input type="text" placeholder="请输入职称" v-model="teacher.teacher_professional_title"></el-input>
  </p>
  <p class="sec">
    <span>学历</span><el-input type="text" placeholder="请输入学历/学位" v-model="teacher.teacher_education"></el-input>
  </p>
  <p class="sec">
    <span>所属教研室</span>
    <select name="researchName" id="researchName" @click="GetResearch">
      <option v-for="(research,index) in researches" :key="index">{{research}}</option>
    </select>
  </p>
  <div class="sec">
    <span>身份</span>
    <input type="radio" v-model="identity" label="teacher" value="teacher" name="identity" style="margin-left:15%">教师
    <input type="radio" v-model="identity" label="teacher_head" value="teacher_head" name="identity" style="margin-left:3%">教研室主任
<!--    <radio v-model="identity" label="teacher" class="identity" >教师</radio>-->
<!--    <radio v-model="identity" label="teacher_head" class="identity">教研室主任</radio>-->
  </div>
  <el-button type="primary" @click="next()" class="next">下一步<i class="el-icon-arrow-right el-icon--right"></i></el-button>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'secondStep.vue',
  data () {
    return {
      researches: null,
      password: '',
      identity: '',
      teacher: {
        teacher_number: '',
        teacher_name: '',
        teacher_sex: '',
        teacher_professional_title: '',
        teacher_education: '',
        teacher_research: '',
        teacher_tel: '',
        teacher_email: ''
      }
    }
  },
  created: function () {
    this.teacher = JSON.parse(sessionStorage.getItem('teacher'))
    axios.get('api/created').then(response => {
      this.researches = response.data
      this.teacher.teacher_research = this.researches[0]
    }).catch(function (error) {
      console.log(error)
    })
  },
  methods: {
    GetIdentity (event) {
      const radioval = event.target.value
      this.identity = radioval
    },
    GetResearch (event) {
      this.teacher.teacher_research = event.target.value
    },
    next () {
      const objStr = JSON.stringify(this.teacher)
      if (this.identity === 'teacher_head') {
        axios.post('api/verifyIdentity', {
          researchName: this.teacher.teacher_research
        }).then(res => {
          if (res.data.toString() === this.teacher.teacher_number) {
            sessionStorage.setItem('teacher', [objStr])
            sessionStorage.setItem('identity', this.identity)
            this.$router.push({ name: 'thridStep' })
          } else {
            this.$message('请核对身份信息')
          }
        })
      } else {
        sessionStorage.setItem('teacher', [objStr])
        sessionStorage.setItem('identity', this.identity)
        this.$router.push({ name: 'thridStep' })
      }
    }
  }
}
</script>

<style scoped>
  @import "../assets/signIn.css";
</style>
