<template>
<div id="register" style="margin-top: 200px">
  <p class="first"><span>*</span>请设置登录密码</p>
  <p style="margin-top: 50px;margin-left: 30%">
    <span>密码</span><el-input type="password" style="width: 250px;margin-left:9% " placeholder="设置你的密码" v-model="password" show-password></el-input>
  </p>
  <p style="margin-top: 50px;margin-left: 30%">
    <span>请确认密码</span><el-input type="password" style="width: 250px;margin-left:5% " placeholder="你的密码" v-model="passwordTwo" show-password></el-input>
  </p>
  <input type="button" @click="register" id="login" value="注  册">
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'thridStep.vue',
  data () {
    return {
      identity: sessionStorage.getItem('identity'),
      password: '',
      passwordTwo: '',
      teacher: ''
    }
  },
  created: function () {
    this.teacher = JSON.parse(sessionStorage.getItem('teacher'))
    console.log(JSON.parse(sessionStorage.getItem('teacher')))
    console.log('第三' + this.teacher)
    console.log(this.identity)
  },
  methods: {
    register () {
      if (this.password === this.passwordTwo) {
        axios.post('api r', {
          Login: {
            user: this.teacher.teacher_number,
            password: this.password,
            id: this.identity,
            pathImg: sessionStorage.getItem('pathImg')
          },
          Teacher: {
            teacherNumber: this.teacher.teacher_number,
            teacherName: this.teacher.teacher_name,
            teacherSex: this.teacher.teacher_sex,
            teacherProfessionalTitle: this.teacher.teacher_professional_title,
            teacherEducation: this.teacher.teacher_education,
            teacherResearch: this.teacher.teacher_research,
            teacherTel: this.teacher.teacher_tel,
            teacherEmail: this.teacher.teacher_email
          }
        }).then(res => {
          if (res.data === '注册成功') {
            this.$message({
              message: '注册成功',
              type: 'success'
            })
            this.$router.push('/')
          } else {
            this.$message({
              message: res.data,
              type: 'warning'
            })
          }
        }).catch(function (error) {
          console.log(error)
        })
      } else {
        this.$message('请确认密码')
      }
    }
  }
}
</script>

<style scoped>
  @import "../assets/signIn.css";
</style>
