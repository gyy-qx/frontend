<template>
  <div id="MyAccount">
    <h3>我的账户</h3>
    <hr>
    <p class="MyAccount_first" style="margin-top: 120px"><span>*</span>基本信息</p>
    <p class="MyAccount_sec"> <span>头像</span></p>
      <el-upload
        class="MyAccount_avatar-uploader"
        action="http://localhost:8080/upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
      >
<!--        <img :src = imageUrl class="avatar" />-->
        <el-popover placement="right" trigger="hover">
          <img :src= "imageUrl" style="width: 300px;height: 300px">
          <img slot="reference" :src= "imageUrl" class="avatar">
        </el-popover>
<!--        <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
      </el-upload>
    <p class="MyAccount_sec" style="margin-top: 20px">
      <span>教师工号</span><el-input type="text" v-model="teacher.teacherNumber"></el-input>
    </p>
    <p class="MyAccount_sec">
      <span>姓名</span><el-input type="text" v-model="teacher.teacherName"></el-input>
    </p>
    <p class="MyAccount_sec">
      <span>性别</span>
      <select name="sex" id="MyAccount_sex" @click="getSex" style="height: 25px">
        <option value="男">男</option>
        <option value="女">女</option>
      </select>
    </p>
    <p class="MyAccount_sec">
      <span>联系方式</span><el-input type="text" v-model="teacher.teacherTel"></el-input>
    </p>
    <p class="MyAccount_sec">
      <span>邮箱</span><el-input type="text" v-model="teacher.teacherEmail"></el-input>
    </p>
    <p class="MyAccount_first"><span>*</span>工作信息</p>
    <p class="MyAccount_sec">
      <span>职称</span><el-input type="text" v-model="teacher.teacherProfessionalTitle"></el-input>
    </p>
    <p class="MyAccount_sec">
      <span>学历</span><el-input type="text" v-model="teacher.teacherEducation"></el-input>
    </p>
    <p class="MyAccount_sec">
      <span>所属教研室</span>
      <select name="researchName" id="MyAccount_researchName" v-model="teacher.teacherResearch" style="height: 25px">
        <option v-for="(research,index) in researches" :key="index">{{research}}</option>
      </select>
    </p>
    <div class="MyAccount_sec">
      <span>身份</span>
      <input type="radio" v-model="identity" label="teacher" value="teacher" name="identity" style="margin-left:15%">教师
      <input type="radio" v-model="identity" label="teacher_head" value="teacher_head" name="identity" style="margin-left:3%">教研室主任
<!--      <el-radio v-model="identity" label="teacher" class="userIdentity" >教师</el-radio>-->
<!--      <el-radio v-model="identity" label="teacher_head" class="userIdentity">教研室主任</el-radio>-->
    </div>
    <p class="MyAccount_first"><span>*</span>修改登录密码</p>
    <p class="MyAccount_sec">
      <span>密码</span><el-input type="text" v-model="password"></el-input>
    </p>
    <input type="button" id="MyAccount_submit" value="提  交" @click="submit">
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'MyAccount.vue',
  data () {
    return {
      pathImg: '',
      imageUrl: '',
      researches: null,
      password: '',
      identity: '',
      teacher: {
        teacherNumber: '',
        teacherName: '',
        teacherSex: '',
        teacherProfessionalTitle: '',
        teacherEducation: '',
        teacherResearch: '',
        teacherTel: '',
        teacherEmail: ''
      }
    }
  },
  created: function () {
    axios.post('api/myAccountLogin', {
      teacherNumber: sessionStorage.getItem('loginUser')
    }).then(response => {
      console.log(response.data)
      this.password = response.data.password
      this.identity = response.data.id
      this.pathImg = response.data.pathImg
      this.imageUrl = 'http://localhost:8080/headImg/' + this.pathImg
    }).catch(function (error) {
      console.log(error)
    })
    axios.post('api/myAccountTeacher', {
      teacherNumber: sessionStorage.getItem('loginUser')
    }).then(response => {
      this.teacher = response.data
      console.log(this.teacher)
    }).catch(function (error) {
      console.log(error)
    })
    axios.post('api/created').then(response => {
      this.researches = response.data
      console.log(this.researches)
    }).catch(function (error) {
      console.log(error)
    })
  },
  methods: {
    getSex (event) {
      this.teacher.teacher_sex = event.target.value
      console.log(this.teacher.teacher_sex)
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.pathImg = res
    },
    submit () {
      axios.post('api/myAccountSubmit', {
        Login:
            {
              user: this.teacher.teacherNumber,
              password: this.password,
              id: this.identity,
              pathImg: this.pathImg
            },
        Teacher: {
          teacherNumber: this.teacher.teacherNumber,
          teacherName: this.teacher.teacherName,
          teacherSex: this.teacher.teacherSex,
          teacherProfessionalTitle: this.teacher.teacherProfessionalTitle,
          teacherEducation: this.teacher.teacherEducation,
          teacherResearch: this.teacher.teacherResearch,
          teacherTel: this.teacher.teacherTel,
          teacherEmail: this.teacher.teacherEmail
        }
      }).then(res => {
        if (res.data === '修改成功') {
          this.$message({
            message: res.data,
            type: 'success'
          })
        } else {
          this.$message({
            message: res.data,
            type: 'error'
          })
        }
      }).catch(function (error) {
        console.log(error)
      }
      )
    }
  }
}
</script>

<style scoped>
  @import "../assets/myaccount.css";
</style>
