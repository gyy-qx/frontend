<template>
  <div>
  <h1>课程目标评价系统 <span>用户注册</span></h1>
  <div id="signIn">
    <p class="first" style="margin-top: 120px"><span>*</span>基本信息</p>
    <p class="sec">
      <span>教师工号</span><input type="text" placeholder="请输入职工编号" v-model="teacher.teacher_number">
    </p>
    <p class="sec">
      <span>姓名</span><input type="text" placeholder="输入你的名字" v-model="teacher.teacher_name">
    </p>
    <p class="sec">
      <span>性别</span>
      <select name="sex" id="sex" @click="getSex">
        <option value="男">男</option>
        <option value="女">女</option>
      </select>
    </p>
    <p class="sec">
      <span>联系方式</span><input type="text" placeholder="请输入电话号码" v-model="teacher.teacher_tel">
    </p>
    <p class="sec">
      <span>邮箱</span><input type="text" placeholder="请输入邮箱" v-model="teacher.teacher_email">
    </p>
    <p class="first"><span>*</span>工作信息</p>
    <p class="sec">
      <span>职称</span><input type="text" placeholder="请输入职称" v-model="teacher.teacher_professional_title">
    </p>
    <p class="sec">
      <span>学历</span><input type="text" placeholder="请输入学历/学位" v-model="teacher.teacher_education">
    </p>
    <p class="sec">
      <span>所属教研室</span>
      <select name="researchName" id="researchName" @click="GetResearch">
        <option v-for="(research,index) in researches" :key="index">{{research}}</option>
      </select>
    </p>
    <div class="sec">
      <span>身份</span>
      <div class="identity">
        <input type="radio" name="identity" value="teacher" id="teacher" @click="GetIdentity">
        <label for="teacher">教师</label>
      </div>
      <div class="identity">
        <input type="radio" name="identity"  value="teacher_head" id="teacher_head" @click="GetIdentity">
        <label for="teacher_head">教研室主任</label>
      </div>
      <input type="button" @click="verifyIdentity" value="验证">
    </div>
    <p class="first"><span>*</span>请设置登录密码</p>
    <p class="sec">
      <span>密码</span><input type="text" placeholder="设置你的密码" v-model="password">
    </p>
  </div>
  <input type="button" @click="register" value="注  册">
  </div>
</template>

<!--加上scoped能够防止样式之间的冲突-->
<style>
  @import "../assets/SignIn.css";
</style>

<script>
import axios from 'axios'
export default {
  name: 'SignIn',
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
    axios.get('api/created').then(response => {
      const result = response.data
      for (let i = 0; i < result.length; i++) {
        console.log(result)
      }
      this.researches = response.data
    }).catch(function (error) {
      console.log(error)
    })
  },
  methods: {
    getSex (event) {
      this.teacher.teacher_sex = event.target.value
      console.log(this.teacher.teacher_sex)
    },
    GetIdentity (event) {
      const radioval = event.target.value
      this.identity = radioval
      console.log(this.identity)
    },
    GetResearch (event) {
      this.teacher.teacher_research = event.target.value
      console.log(this.teacher.teacher_research)
    },
    verifyIdentity () {
      // 前端操作时要加上必须验证之后才能提交注册
      if (this.identity === 'teacher_head') {
        axios.post('api/verifyIdentity', {
          researchName: this.teacher.teacher_research
        }).then(res => {
          console.log(res.data)
          console.log(this.teacher.teacher_number)
          if (res.data.toString() === this.teacher.teacher_number) { alert('验证成功') } else { alert('您好，请确认您的身份信息') }
        })
      }
    },
    register () {
      axios.post('api/register', {
        Login:
          {
            user: this.teacher.teacher_number,
            password: this.password,
            id: this.identity
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
        // if (res.data === 'reginst success') alert('注册成功')
        // else alert('注册失败')
      }).catch(function (error) {
        console.log(error)
      }
      )
    }
  }
}
</script>
