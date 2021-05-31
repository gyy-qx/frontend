<template>
    <div id="teacherManage">
        <h3>{{researchName}}</h3>
      <hr>
      <div id="search">
        <el-input id="inputTeacher"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      </div>
      <table>
        <tr>
          <th>教师编号</th>
          <th>教师姓名</th>
          <th>性别</th>
          <th>职称</th>
          <th>学历</th>
          <th>电话</th>
          <th>邮箱</th>
          <th>操作</th>
        </tr>
        <tr v-for="(teacher,index) in teacherList" :key="index">
          <td><input type="text" class="mes" v-model="teacher.teacherNumber" disabled="disabled"></td>
          <td><input type="text" class="mes" v-model="teacher.teacherName"></td>
          <td><input type="text" class="mes" v-model="teacher.teacherSex"></td>
          <td><input type="text" class="mes" v-model="teacher.teacherProfessionalTitle"></td>
          <td><input type="text" class="mes" v-model="teacher.teacherEducation"></td>
          <td><input type="text" class="mes" v-model="teacher.teacherTel"></td>
          <td><input type="text" class="mes" v-model="teacher.teacherEmail"></td>
          <td>  <el-button type="primary" icon="el-icon-check" @click="updateTeacher(index)">提交修改</el-button>
            <el-button type="danger" icon="el-icon-delete" @click="deleteTeacher(index)">删除教师</el-button></td>
        </tr>
      </table>
    </div>
</template>

<!--加上scoped能够防止样式之间的冲突-->
<style scoped>
    body {
        background-color: #ff0000;
    }
    #teacherManage{
      margin-left: 15%;
    }
    el-divider{
      margin-left: 20%;
    }
    table{
      margin-left: 5%;
    }
    table td,th{
      border: solid 1px #e1e3e4;
      border-radius: 5px;
    }
    h3{
      margin-top:50px;
      margin-left:5%;
      margin-bottom: 10px;
      font-family: 幼圆;
      font-size: 30px;
    }
  #search #inputTeacher{
    display: inline-block;
    width: 5%;
  }
</style>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      disabled: true,
      user: '',
      researchName: '',
      teacherList: [
        {
          teacherNumber: '',
          teacherName: '',
          teacherSex: '',
          teacherProfessionalTitle: '',
          teacherEducation: '',
          teacherResearch: '',
          teacherTel: '',
          teacherEmail: ''
        }
      ],
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
  created () {
    this.user = sessionStorage.getItem('loginUser')
    axios.post('api/getResearch', {
      teacherNumber: this.user
    }).then(res => {
      this.researchName = res.data
    }).catch(function (error) {
      console.log(error)
    })

    axios.post('api/getAllTeacher', {
      teacherNumber: this.user
    }).then(res => {
      console.log(res.data)
      this.teacherList = res.data
      console.log(this.teacherList)
    }).catch(function (error) {
      console.log(error)
    })
  },
  methods: {
    deleteTeacher (index) {
      this.$confirm('删除教师会影响课程, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post('api/deleteTeacher', {
          teacherNumber: this.teacherList[index].teacherNumber
        }).then(res => {
          this.$message({
            type: 'success',
            message: res.data
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    updateTeacher (index) {
      axios.post('api/updateTeacher', {
        teacherNumber: this.teacherList[index].teacherNumber,
        teacherName: this.teacherList[index].teacherName,
        teacherSex: this.teacherList[index].teacherSex,
        teacherProfessionalTitle: this.teacherList[index].teacherProfessionalTitle,
        teacherEducation: this.teacherList[index].teacherEducation,
        teacherResearch: this.teacherList[index].teacherResearch,
        teacherTel: this.teacherList[index].teacherTel,
        teacherEmail: this.teacherList[index].teacherEmail
      }).then(res => {
        alert(res.data)
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>
