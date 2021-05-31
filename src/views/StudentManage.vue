<template>
    <div id="studentManage">
      <h3>{{researchName}}</h3>
      <hr>
      <div id="search">
      <el-select v-model="student.studentGrade" placeholder="选择年级">
        <el-option v-for="(item,index) in gradeList"
                   :key="index"
                   :value="item"></el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      </div>
      <el-button type="primary" icon="el-icon-plus" @click="addClass" id="addClass">添加班级</el-button>
      <table style="width:60%" id="classTable">
        <tr>
          <th>班级</th>
          <th colspan="2">操作</th>
        </tr>
        <tr v-for="(cla,index) in classList" :key="index">
          <td>{{cla}}</td>
          <td><el-button type="primary" icon="el-icon-plus" @click="addPlay(index)">添加学生</el-button>
            <el-dialog title="添加学生" :visible.sync="dialogVisible1">
              学号<el-input v-model="student.studentSno"></el-input>
              姓名<el-input v-model="student.studentName"></el-input>
              专业<el-input v-model="student.studentMajor" disabled="disabled"></el-input>
              年纪<el-input v-model="student.studentGrade" disabled="disabled"></el-input>
              班级<el-input v-model="student.studentClass" disabled="disabled"></el-input>
              性别<el-input v-model="student.studentSex"></el-input>
              生日<el-input v-model="student.studentData" placeholder="yyyy-MM-dd"></el-input>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="addOneStudent">确 定</el-button>
              </div>
            </el-dialog>
          </td>
          <td>
            <el-button type="primary" icon="el-icon-check" @click="getStudentByClass(index)">查看</el-button>
            <el-dialog title="查看班级" :visible.sync="dialogVisible2">
              <table>
                <tr>
                  <td>学号</td>
                  <td>姓名</td>
                  <td>专业</td>
                  <td>年纪</td>
                  <td>班级</td>
                  <td>性别</td>
                  <td>出生日期</td>
                  <td class="option" colspan="2">操作</td>
                </tr>
                <tr v-for="(student,index) in studentList" :key="index">
                  <td><input type="text" class="mes" v-model="student.studentSno" disabled="disabled"></td>
                  <td><input type="text" class="mes" v-model="student.studentName"></td>
                  <td><input type="text" class="mes" v-model="student.studentMajor"></td>
                  <td><input type="text" class="mes" v-model="student.studentGrade"></td>
                  <td><input type="text" class="mes" v-model="student.studentClass"></td>
                  <td><input type="text" class="mes" v-model="student.studentSex"></td>
                  <td><input type="text" class="mes" v-model="student.studentData"></td>
                  <td class="option">  <el-button type="primary" icon="el-icon-check" circle @click="updateStudent(index)"></el-button>
                    <el-button type="danger" icon="el-icon-delete" circle @click="deleteStudent(index)"></el-button></td>
                </tr>
              </table>
              <div slot="footer" class="dialog-footer">
              </div>
            </el-dialog>
          </td>
        </tr>
      </table>
      <el-drawer
        title="添加班级"
        :visible.sync="drawer"
        :before-close="handleClose"
      size="85%">
        <table>
          <tr>
            <td colspan="2">专业<el-input v-model="student.studentMajor" disabled="disabled"></el-input></td>
            <td>年级<el-input v-model="student.studentGrade" placeholder="XXXX级"></el-input></td>
            <td>班级<el-input v-model="student.studentClass"></el-input></td>
          </tr>
          <tr>
            <td id="addStudent" colspan="6"><el-button type="primary" icon="el-icon-plus" @click="addTr">添加学生</el-button></td></tr>
          <tr>
            <td>学号</td>
            <td>姓名</td>
            <td>性别</td>
            <td>生日</td>
          </tr>
          <tr v-for="(stu,index) in studentList" :key="index ">
            <td><el-input v-model="stu.studentSno"></el-input></td>
            <td><el-input v-model="stu.studentName"></el-input></td>
            <td><el-input v-model="stu.studentSex"></el-input></td>
            <td><el-input v-model="stu.studentData"  placeholder="yyyy-MM-dd"></el-input></td>
            <td><el-button type="danger" @click="deleteTr(index)">删除</el-button></td>
          </tr>
        </table>
        <el-button type="primary" @click="insertStudentByClass" id="submitClass">提交</el-button>
      </el-drawer>
    </div>
</template>

<!--加上scoped能够防止样式之间的冲突-->
<style scoped>
  @import "../assets/studentManage.css";
</style>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      user: '',
      researchName: '',
      drawer: false,
      dialogVisible1: false,
      dialogVisible2: false,
      classList: null,
      studentList: [{
        studentSno: '',
        studentName: '',
        studentMajor: '',
        studentGrade: '',
        studentClass: '',
        studentSex: '',
        studentData: ''
      }],
      student: {
        studentSno: '',
        studentName: '',
        studentMajor: '',
        studentGrade: '',
        studentClass: '',
        studentSex: '',
        studentData: ''
      },
      gradeList: ''
    }
  },
  created () {
    this.user = sessionStorage.getItem('loginUser')
    console.log(this.user)
    axios.post('api/getResearch', {
      teacherNumber: this.user
    }).then(res => {
      this.researchName = res.data
      axios.post('api/getStudentClassALL', {
        researchName: this.researchName
      }).then(res => {
        this.classList = res.data
      }).catch(function (error) {
        console.log(error)
      })
    }).catch(function (error) {
      console.log(error)
    })
    axios.get('api/getGrade').then(res => {
      this.gradeList = res.data
    }).catch(function (error) {
      console.log(error)
    })
  },
  methods: {
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    search () {
      axios.post('api/getStudentClass', {
        researchName: this.researchName,
        studentGrade: this.student.studentGrade
      }).then(res => {
        this.classList = res.data
      }).catch(function (error) {
        console.log(error)
      })
    },
    addClass () {
      this.drawer = true
      axios.post('api/getMajor', {
        researchName: this.researchName
      }).then(res => {
        this.student.studentMajor = res.data
      }).catch(function (error) {
        console.log(error)
      })
    },
    deleteTr (index) {
      this.studentList.splice(index, 1)
    },
    addTr () {
      this.studentList.push({
        studentSno: '',
        studentName: '',
        studentSex: '',
        studentData: ''
      })
    },
    addPlay (index) {
      this.dialogVisible1 = true
      this.student.studentClass = this.classList[index]
      axios.post('api/getMajor', {
        researchName: this.researchName
      }).then(res => {
        this.student.studentMajor = res.data
      }).catch(function (error) {
        console.log(error)
      })
    },
    addOneStudent () {
      axios.post('api/insertStudent', {
        studentSno: this.student.studentSno,
        studentName: this.student.studentName,
        studentMajor: this.student.studentMajor,
        studentGrade: this.student.studentGrade,
        studentClass: this.student.studentClass,
        studentSex: this.student.studentSex,
        studentData: this.student.studentData
      }).then(res => {
        alert(res.data)
      }
      ).catch(function (error) {
        console.log(error)
      })
      this.dialogVisible1 = false
    },
    insertStudentByClass () {
      this.drawer = false
      // i<=  数组越界
      for (let i = 0; i < this.studentList.length; i++) {
        this.studentList[i].studentClass = this.student.studentClass
        this.studentList[i].studentGrade = this.student.studentGrade
        this.studentList[i].studentMajor = this.student.studentMajor
      }
      console.log(this.studentList)
      axios.post('api/insertStudentByClass', {
        studentList: this.studentList
      }).then(res => {
        alert(res.data)
      }).catch(function (error) {
        console.log(error)
      })
    },
    getStudentByClass (index) {
      this.dialogVisible2 = true
      axios.post('api/getStudentByClass', {
        studentClass: this.classList[index]
      }).then(res => {
        console.log(res.data)
        this.studentList = res.data
        console.log(this.studentList)
      }).catch(function (error) {
        console.log(error)
      })
    },
    updateStudent (index) {
      axios.post('api/updateStudent', {
        studentSno: this.studentList[index].studentSno,
        studentName: this.studentList[index].studentName,
        studentMajor: this.studentList[index].studentMajor,
        studentGrade: this.studentList[index].studentGrade,
        studentClass: this.studentList[index].studentClass,
        studentSex: this.studentList[index].studentSex,
        studentData: this.studentList[index].studentData
      }).then(res => {
        alert(res.data)
      }).catch(function (error) {
        console.log(error)
      })
    },
    deleteStudent (index) {
      axios.post('api/deleteStudent', {
        studentSno: this.studentList[index].studentSno
      }).then(res => {
        alert(res.data)
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>
