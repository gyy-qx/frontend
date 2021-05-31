<template>
  <div id="registerUp">
  <h2>课程目标评价系统 <span>用户注册</span></h2>
  <div id="register">
    <p class="first" style="margin-top: 120px"><span>*</span>基本信息</p>
    <p class="sec" style="display: inline-block">头像</p>
    <div class="hello">
      <el-upload
        class="avatar-uploader"
        action="http://localhost:8080/upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
    <p class="sec">
      <span>教师工号</span><input type="text" placeholder="请输入职工编号" v-model="teacher.teacher_number">
    </p>
    <p class="sec">
      <span>姓名</span><input type="text" placeholder="输入你的名字" v-model="teacher.teacher_name">
    </p>
    <p class="sec">
      <span>性别</span>
      <select name="sex" id="sex" @click="getSex">
        <option value="男" checked="checked">男</option>
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
      <el-radio v-model="identity" label="teacher" class="userIdentity">教师</el-radio>
      <el-radio v-model="identity" label="teacher_head" class="userIdentity">教研室主任</el-radio>
    </div>
    <p class="first"><span>*</span>请设置登录密码</p>
    <p class="sec">
      <span>密码</span><input type="text" placeholder="设置你的密码" v-model="password">
    </p>
    <input type="button" @click="register" id="login" value="注  册">
  </div>
  </div>
</template>

<!--加上scoped能够防止样式之间的冲突-->
<style>
  @import "../assets/signIn.css";
</style>

<script>
import axios from 'axios'
export default {
  name: 'SignIn',
  data () {
    return {
      imageUrl: '',
      pathImg: '',
      researches: null,
      password: '',
      identity: '',
      teacher: {
        teacher_number: '',
        teacher_name: '',
        teacher_sex: '男',
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
    },
    GetIdentity (event) {
      const radioval = event.target.value
      this.identity = radioval
    },
    GetResearch (event) {
      this.teacher.teacher_research = event.target.value
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.pathImg = res
    },
    register () {
      if (this.identity === 'teacher_head') {
        axios.post('api/verifyIdentity', {
          researchName: this.teacher.teacher_research
        }).then(res => {
          if (res.data.toString() === this.teacher.teacher_number) {
            axios.post('api/register', {
              Login:
                {
                  user: this.teacher.teacher_number,
                  password: this.password,
                  id: this.identity,
                  pathImg: this.pathImg
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
              alert(res.data)
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
            }
            )
          } else {
            this.$message({
              message: '您好，请确认您的身份信息',
              type: 'warning'
            })
          }
        })
      } else {
        axios.post('api/register', {
          Login:
            {
              user: this.teacher.teacher_number,
              password: this.password,
              id: this.identity,
              pathImg: this.pathImg
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
        }
        )
      }
    }
  }
}
</script>
