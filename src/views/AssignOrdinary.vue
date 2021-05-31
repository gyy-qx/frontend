<template>
    <div id="assignOrdinary">
        <h1>{{courseName}} <span>{{courseMajor}}{{courseGrade}}</span>  </h1>
        <div id="targetText">
          <p class="strong">课程目标一：<span v-text="targetText.courseTargetOne"></span> </p>
          <p class="strong">课程目标二：<span v-text="targetText.courseTargetTwo"></span></p>
          <p class="strong">课程目标三：<span v-text="targetText.courseTargetThree"></span></p>
          <p class="strong">课程目标四：<span v-text="targetText.courseTargetFour"></span></p>
          <p class="strong">课程目标五：<span v-text="targetText.courseTargetFive"></span></p>
        </div>
      <table>
        <tr><el-button type="primary" icon="el-icon-plus"  @click="dialogVisible1 = true">添加任务题目</el-button></tr>
        <tr>
          <td>考核类别</td>
          <td>任务序号</td>
          <td>任务内容</td>
          <td v-if="target[0].ordinaryOneTargetScore!==null&&target[0].ordinaryOneTargetScore!==0">是否支撑课程目标一</td>
          <td v-if="target[0].ordinaryTwoTargetScore!==null&&target[0].ordinaryTwoTargetScore!==0">是否支撑课程目标二</td>
          <td v-if="target[0].ordinaryThreeTargetScore!==null&&target[0].ordinaryThreeTargetScore!==0">是否支撑课程目标三</td>
          <td v-if="target[0].ordinaryFourTargetScore!==null&&target[0].ordinaryFourTargetScore!==0">是否支撑课程目标四</td>
          <td v-if="target[0].ordinaryFiveTargetScore!==null&&target[0].ordinaryFiveTargetScore!==0">是否支撑课程目标五</td>
          <td colspan="2">操作</td>
        </tr>
        <tr v-for="(pro,index) in processList" :key="index">
          <td><el-input v-model="pro.processClassification" disabled="disabled"></el-input></td>
          <td><el-input v-model="pro.processNumber"></el-input></td>
          <td><el-input v-model="pro.processContent"></el-input></td>
          <td v-if="target[0].ordinaryOneTargetScore!==null&&target[0].ordinaryOneTargetScore!==0&&pro.ifCourseOne==='true'"><el-checkbox v-model="checked">支撑</el-checkbox></td>
          <td v-else-if="target[0].ordinaryOneTargetScore!==null&&target[0].ordinaryOneTargetScore!==0&&(pro.ifCourseOne.length===0||pro.ifCourseOne==='false')"><el-checkbox>支撑</el-checkbox></td>
          <td v-if="target[0].ordinaryTwoTargetScore!==null&&target[0].ordinaryTwoTargetScore!==0&&pro.ifCourseTwo==='true'"><el-checkbox v-model="checked">支撑</el-checkbox></td>
          <td v-else-if="target[0].ordinaryTwoTargetScore!==null&&target[0].ordinaryTwoTargetScore!==0&&(pro.ifCourseTwo.length===0||pro.ifCourseTwo==='false')"><el-checkbox>支撑</el-checkbox></td>
          <td v-if="target[0].ordinaryThreeTargetScore!==null&&target[0].ordinaryThreeTargetScore!==0&&pro.ifCourseThree==='true'"><el-checkbox v-model="checked">支撑</el-checkbox></td>
          <td v-else-if="target[0].ordinaryThreeTargetScore!==null&&target[0].ordinaryThreeTargetScore!==0&&(pro.ifCourseThree.length===0||pro.ifCourseThree==='false')"><el-checkbox>支撑</el-checkbox></td>
          <td v-if="target[0].ordinaryFourTargetScore!==null&&target[0].ordinaryFourTargetScore!==0&&pro.ifCourseFour==='true'"><el-checkbox v-model="checked">支撑</el-checkbox></td>
          <td v-else-if="target[0].ordinaryFourTargetScore!==null&&target[0].ordinaryFourTargetScore!==0&&(pro.ifCourseFour.length===0||pro.ifCourseFour==='false')"><el-checkbox>支撑</el-checkbox></td>
          <td v-if="target[0].ordinaryFiveTargetScore!==null&&target[0].ordinaryFiveTargetScore!==0&&pro.ifCourseFive==='true'"><el-checkbox v-model="checked">支撑</el-checkbox></td>
          <td v-else-if="target[0].ordinaryFiveTargetScore!==null&&target[0].ordinaryFiveTargetScore!==0&&(pro.ifCourseFive.length===0||pro.ifCourseFive==='false')"><el-checkbox>支撑</el-checkbox></td>
          <td><el-button type="primary" @click="submitDisplay(index)">提交平时任务成绩</el-button></td>
          <td><el-button type="danger" @click="deleteTr(index)">删除</el-button></td>
        </tr>
      </table>
      <el-dialog title="添加任务题目" :visible.sync="dialogVisible1">
        <table>
          <td>考核类别</td>
          <td>任务序号</td>
          <td>任务内容</td>
          <td v-if="target[0].ordinaryOneTargetScore!==null&&target[0].ordinaryOneTargetScore!==0">是否支撑课程目标一</td>
          <td v-if="target[0].ordinaryTwoTargetScore!==null&&target[0].ordinaryTwoTargetScore!==0">是否支撑课程目标二</td>
          <td v-if="target[0].ordinaryThreeTargetScore!==null&&target[0].ordinaryThreeTargetScore!==0">是否支撑课程目标三</td>
          <td v-if="target[0].ordinaryFourTargetScore!==null&&target[0].ordinaryFourTargetScore!==0">是否支撑课程目标四</td>
          <td v-if="target[0].ordinaryFiveTargetScore!==null&&target[0].ordinaryFiveTargetScore!==0">是否支撑课程目标五</td>
          <tr>
            <td><el-input v-model="process.processClassification" disabled="disabled"></el-input></td>
            <td><el-input v-model="process.processNumber" maxlength="6" οninput="value=value.replace(/[^\d]/g,'')" placeholder="填写小写数字"></el-input></td>
            <td><textarea v-model="process.processContent" cols="50" rows="10"></textarea></td>
            <td v-if="target[0].ordinaryOneTargetScore!==null&&target[0].ordinaryOneTargetScore!==0"><el-checkbox v-model="process.ifCourseOne">支撑</el-checkbox></td>
            <td v-if="target[0].ordinaryTwoTargetScore!==null&&target[0].ordinaryTwoTargetScore!==0"><el-checkbox v-model="process.ifCourseTwo">支撑</el-checkbox></td>
            <td v-if="target[0].ordinaryThreeTargetScore!==null&&target[0].ordinaryThreeTargetScore!==0"><el-checkbox v-model="process.ifCourseThree">支撑</el-checkbox></td>
            <td v-if="target[0].ordinaryFourTargetScore!==null&&target[0].ordinaryFourTargetScore!==0"><el-checkbox v-model="process.ifCourseFour">支撑</el-checkbox></td>
            <td v-if="target[0].ordinaryFiveTargetScore!==null&&target[0].ordinaryFiveTargetScore!==0"><el-checkbox v-model="process.ifCourseFive">支撑</el-checkbox></td>
          </tr>
        </table>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="insertProcessText">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="提交任务成绩" :visible.sync="dialogVisible2">
        <table>
          <tr>请以百分制打分</tr>
          <tr>
            <td>学号</td>
            <td>班级</td>
            <td>姓名</td>
            <td>任务成绩</td>
          </tr>
          <tr v-for="(stu,index) in processScoreList" :key="index">
            <td>{{stu.studentSno}}</td>
            <td>{{stu.studentClass}}</td>
            <td>{{stu.studentName}}</td>
            <td> <el-input v-model="stu.processScore"></el-input> </td>
          </tr>
        </table>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="submitScore">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="更新任务成绩" :visible.sync="dialogVisible3">
        <table>
          <tr>请以百分制打分</tr>
          <tr>
            <td>学号</td>
            <td>班级</td>
            <td>姓名</td>
            <td>任务成绩</td>
          </tr>
          <tr v-for="(stu,index) in processScoreList" :key="index">
            <td>{{stu.studentSno}}</td>
            <td>{{stu.studentClass}}</td>
            <td>{{stu.studentName}}</td>
            <td> <el-input v-model="stu.processScore"></el-input> </td>
          </tr>
        </table>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible3 = false">取 消</el-button>
          <el-button type="primary" @click="submitNewScore">更新</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<!--加上scoped能够防止样式之间的冲突-->
<style scoped>
@import "../assets/assignOrdinary.css";
</style>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      checked: true,
      courseName: sessionStorage.getItem('courseName'),
      courseGrade: sessionStorage.getItem('courseGrade'),
      courseMajor: sessionStorage.getItem('courseMajor'),
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3: false,
      processNumber: '',
      targetText: {
        courseTargetOne: '',
        courseTargetTwo: '',
        courseTargetThree: '',
        courseTargetFour: '',
        courseTargetFive: ''
      },
      processScoreList: [{
        studentSno: '',
        studentName: '',
        processScore: '',
        courseName: '',
        studentMajor: '',
        studentGrade: '',
        studentClass: '',
        processClassification: ''
      }],
      process: {
        courseName: sessionStorage.getItem('courseName'),
        courseGrade: sessionStorage.getItem('courseGrade'),
        courseMajor: sessionStorage.getItem('courseMajor'),
        processClassification: '平时任务',
        processNumber: '',
        processContent: '',
        ifCourseOne: '',
        ifCourseTwo: '',
        ifCourseThree: '',
        ifCourseFour: '',
        ifCourseFive: ''
      },
      processList: [{
        courseName: '',
        courseMajor: '',
        courseGrade: '',
        processClassification: '',
        processNumber: '',
        processContent: '',
        ifCourseOne: '',
        ifCourseTwo: '',
        ifCourseThree: '',
        ifCourseFour: '',
        ifCourseFive: ''
      }],
      target: [{
        ordinaryOneTargetScore: '',
        ordinaryTwoTargetScore: '',
        ordinaryThreeTargetScore: '',
        ordinaryFourTargetScore: '',
        ordinaryFiveTargetScore: ''
      }]
    }
  },
  created () {
    axios.post('api/getTargetText', {
      courseName: sessionStorage.getItem('courseName'),
      courseGrade: sessionStorage.getItem('courseGrade'),
      courseMajor: sessionStorage.getItem('courseMajor')
    }).then(res => {
      this.targetText = res.data
    }).catch(function (error) {
      console.log(error)
    })
    axios.post('api/selectOrdinary', {
      courseName: sessionStorage.getItem('courseName'),
      courseGrade: sessionStorage.getItem('courseGrade'),
      courseMajor: sessionStorage.getItem('courseMajor'),
      processClassification: '平时任务'
    }).then(res => {
      this.processList = res.data
      this.processList.sort(this.compare('processNumber'))
    }).catch(function (error) {
      console.log(error)
    })
    axios.post('api/getTargetScore', {
      courseName: sessionStorage.getItem('courseName'),
      courseGrade: sessionStorage.getItem('courseGrade'),
      courseMajor: sessionStorage.getItem('courseMajor')
    }).then(res => {
      console.log(res.data)
      this.target = res.data
    }).catch(function (error) {
      console.log(error)
    })
  },
  methods: {
    compare (attr) {
      return function (a, b) {
        var val1 = a[attr]
        var val2 = b[attr]
        return val1 - val2
      }
    },
    deleteTr (index) {
      axios.post('api/deleteOrdinary', {
        courseName: sessionStorage.getItem('courseName'),
        courseGrade: sessionStorage.getItem('courseGrade'),
        courseMajor: sessionStorage.getItem('courseMajor'),
        processClassification: '平时任务',
        processNumber: this.processList[index].processNumber
      }).then(res => {
        if (res.data === '删除成功') {
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
      })
    },
    insertProcessText () {
      this.dialogVisible1 = false
      axios.post('api/insertProcessText', {
        courseName: sessionStorage.getItem('courseName'),
        courseGrade: sessionStorage.getItem('courseGrade'),
        courseMajor: sessionStorage.getItem('courseMajor'),
        processClassification: '平时任务',
        processNumber: this.process.processNumber,
        processContent: this.process.processContent,
        ifCourseOne: this.process.ifCourseOne,
        ifCourseTwo: this.process.ifCourseTwo,
        ifCourseThree: this.process.ifCourseThree,
        ifCourseFour: this.process.ifCourseFour,
        ifCourseFive: this.process.ifCourseFive
      }).then(res => {
        if (res.data === '添加成功') {
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
      })
    },
    submitDisplay (index) {
      this.processNumber = this.processList[index].processNumber
      axios.post('api/ifHaveProcessScore', {
        studentMajor: sessionStorage.getItem('courseMajor'),
        studentGrade: sessionStorage.getItem('courseGrade'),
        courseName: sessionStorage.getItem('courseName'),
        processClassification: '平时任务',
        processNumber: this.processNumber
      }).then(res => {
        if (res.data.length === 0) {
          this.dialogVisible2 = true
          axios.post('api/getStudentByGrade', {
            courseMajor: sessionStorage.getItem('courseMajor'),
            courseGrade: sessionStorage.getItem('courseGrade')
          }).then(res => {
            this.processScoreList = res.data
          }).catch(function (error) {
            console.log(error)
          })
        } else {
          this.dialogVisible3 = true
          this.processScoreList = res.data
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    submitScore () {
      this.dialogVisible2 = false
      for (let i = 0; i < this.processScoreList.length; i++) {
        this.processScoreList[i].studentMajor = sessionStorage.getItem('courseMajor')
        this.processScoreList[i].studentGrade = sessionStorage.getItem('courseGrade')
        this.processScoreList[i].courseName = sessionStorage.getItem('courseName')
        this.processScoreList[i].processClassification = '平时任务'
        this.processScoreList[i].processNumber = this.processNumber
      }
      console.log(this.processScoreList)
      axios.post('api/insertProcessScore', {
        processScoreList: this.processScoreList
      }).then(res => {
        if (res.data === '录入成功') {
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
      })
    },
    submitNewScore () {
      this.dialogVisible3 = false
      axios.post('api/updateProcessScore', {
        processScoreList: this.processScoreList
      }).then(res => {
        if (res.data === '更新成功') {
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
      })
    }
  }
}
</script>
