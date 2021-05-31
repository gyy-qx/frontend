<template>
    <div id="emailMy">
      <h3>我的邮箱</h3>
      <hr>
      <el-button @click="updateStateAll" id="updateStateAll">全部已读</el-button>
      <div v-for="(item,index) in emailList" :key="index">
        <div v-if="item.emailState==='0'" class="noRead">
        <button @click="open(index)">
          <h4>{{item.emailTitle}}</h4>
          <h5>{{item.courseMajor}}{{item.courseGrade}}{{item.courseName}}</h5>
          <br>
          <p>邮件内容：</p><p class="content">{{item.emailContent}} </p>
          <p class="time">{{item.emailTime}}</p>
        </button>
      </div>
      </div>
      <div v-for="(item,index) in emailList" :key="index">
        <div v-if="item.emailState==='1'" class="haveRead">
          <button @click="open(index)">
            <h4>{{item.emailTitle}}</h4>
            <h5>{{item.courseMajor}}{{item.courseGrade}}{{item.courseName}}</h5>
            <br>
            <p>邮件内容：</p> <p class="content">{{item.emailContent}}</p>
            <p class="time">{{item.emailTime}}</p>
          </button>
        </div>
      </div>
      <el-dialog title="邮件" :visible.sync="dialogVisible">
        <button id="delete" @click="deleteEmail">删除</button>
        <br>
        发件人<el-input disabled="disabled" v-model="this.emailTeacher"></el-input>
        主题<el-input v-model="email.emailTitle" disabled="disabled"></el-input>
        内容 <br> <textarea name="" id="" cols="100" rows="10" v-model="email.emailContent" disabled="disabled"></textarea>
        <br><br> 是否跳转到课程 <a href="http://localhost:3000/#/submit">点击跳转</a>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateState" v-if="email.emailState==='0'">已 读</el-button>
          <el-button type="primary" @click="updateState" v-else>标为未读</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<!--加上scoped能够防止样式之间的冲突-->
<style scoped>
@import "../assets/email.css";
</style>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      emailTeacher: '',
      dialogVisible: false,
      email: {
        courseName: '',
        courseMajor: '',
        courseGrade: '',
        courseTeacher: '',
        emailTitle: '',
        emailTeacher: '',
        emailContent: '',
        emailState: '',
        emailTime: ''
      },
      emailList: [{
        courseName: '',
        courseMajor: '',
        courseGrade: '',
        courseTeacher: '',
        emailTitle: '',
        emailTeacher: '',
        emailContent: '',
        emailState: '',
        emailTime: ''
      }]
    }
  },
  created () {
    axios.post('api/getEmailByTeacher', {
      courseTeacher: sessionStorage.getItem('loginUser')
    }).then(res => {
      this.emailList = res.data
      this.emailList.reverse()
    }).catch(function (error) {
      console.log(error)
    })
  },
  methods: {
    open (index) {
      this.dialogVisible = true
      this.email = this.emailList[index]
      axios.post('api/getEmailPersonName', {
        emailTeacher: this.email.courseTeacher
      }).then(res => {
        this.emailTeacher = res.data
      })
      sessionStorage.setItem('courseName', this.email.courseName)
      sessionStorage.setItem('courseMajor', this.email.courseMajor)
      sessionStorage.setItem('courseGrade', this.email.courseGrade)
    },
    updateState () {
      this.dialogVisible = false
      axios.post('api/updateEmailState', {
        courseName: this.email.courseName,
        courseMajor: this.email.courseMajor,
        courseGrade: this.email.courseGrade,
        courseTeacher: this.email.courseTeacher,
        emailTitle: this.email.emailTitle,
        emailContent: this.email.emailContent,
        emailState: this.email.emailState,
        emailTime: this.email.emailTime
      }).then(res => {
      }).catch(function (error) {
        console.log(error)
      })
    },
    updateStateAll () {
      axios.post('api/updateEmailStateAll', {
        emailList: this.emailList
      }).then(res => {
        this.$message({
          message: res.data,
          type: 'success'
        })
      })
    },
    deleteEmail (done) {
      this.$confirm('删除后将自己不可见, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post('api/deleteEmail', {
          courseName: this.email.courseName,
          courseMajor: this.email.courseMajor,
          courseGrade: this.email.courseGrade,
          courseTeacher: this.email.courseTeacher,
          emailTitle: this.email.emailTitle,
          emailContent: this.email.emailContent,
          emailState: this.email.emailState,
          emailTime: this.email.emailTime
        }).then(res => {
          if (res.data === '删除成功') {
            this.dialogVisible = false
            this.$message({
              message: res.data,
              type: 'success'
            })
          } else {
            this.$message({
              message: res.data,
              type: 'warning'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
