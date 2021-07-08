<template>
    <div id="UpLoad">
      <h1>{{courseName}} <span>{{courseMajor}}{{courseGrade}}</span>  </h1>
          <table id="classTable">
            <tr>
              <td>班级</td>
              <td>录入成绩</td>
              <td>上传成绩</td>
              <td colspan="2">下载</td>
            </tr>
            <tr v-for="(itemCla,index1) in classList" :key="index1">
              <td>{{itemCla}}</td>
              <td><el-button type="primary" icon="el-icon-edit"  @click="openEdit(index1)">录入总成绩</el-button></td>
              <td><el-button type="primary" @click="inToCompute(index1)">计算成绩<i class="el-icon-upload el-icon--right"></i></el-button></td>
              <td><el-button type="primary" @click="intoTable(index1)">下载达成度计算表<i class="el-icon-download el-icon--right"></i></el-button></td>
              <td><el-button type="primary" @click="intoReport(index1)">下载达成度分析报告<i class="el-icon-download el-icon--right"></i></el-button></td>
            </tr>
          </table>
      <el-drawer
        title="录入成绩"
        :visible.sync="drawer1"
        :before-close="handleClose"
        size="85%">
        <el-input v-model="courseName" disabled="disabled" class="disabled"></el-input>
        <el-input v-model="courseClass" disabled="disabled" class="disabled"></el-input>
        <table class="scoreEdit">
          <tr>
            <td colspan="2">学生/课程目标</td>
            <td colspan="3">课程目标一(<span v-text="target[0].courseWeightOne"></span>)</td>
            <td colspan="3">课程目标二(<span v-text="target[0].courseWeightTwo"></span>)</td>
            <td colspan="3">课程目标三(<span v-text="target[0].courseWeightThree"></span>)</td>
            <td colspan="3">课程目标四(<span v-text="target[0].courseWeightFour"></span>)</td>
            <td colspan="3">课程目标五(<span v-text="target[0].courseWeightFive"></span>)</td>
          </tr>
          <tr>
            <td>学号</td>
            <td>姓名</td>
            <td>平时(<span v-text="target[0].ordinaryOneTargetScore"></span>)</td>
            <td>实验(<span v-text="target[0].experimentOneTargetScore"></span>)</td>
            <td>结课(<span v-text="target[0].endingOneTargetScore"></span>)</td>
            <td>平时(<span v-text="target[0].ordinaryTwoTargetScore"></span>)</td>
            <td>实验(<span v-text="target[0].experimentTwoTargetScore"></span>)</td>
            <td>结课(<span v-text="target[0].endingTwoTargetScore"></span>)</td>
            <td>平时(<span v-text="target[0].ordinaryThreeTargetScore"></span>)</td>
            <td>实验(<span v-text="target[0].experimentThreeTargetScore"></span>)</td>
            <td>结课(<span v-text="target[0].endingThreeTargetScore"></span>)</td>
            <td>平时(<span v-text="target[0].ordinaryFourTargetScore"></span>)</td>
            <td>实验(<span v-text="target[0].experimentFourTargetScore"></span>)</td>
            <td>结课(<span v-text="target[0].endingFourTargetScore"></span>)</td>
            <td>平时(<span v-text="target[0].ordinaryFiveTargetScore"></span>)</td>
            <td>实验(<span v-text="target[0].experimentFiveTargetScore"></span>)</td>
            <td>结课(<span v-text="target[0].endingFiveTargetScore"></span>)</td>
          </tr>
          <tr v-for="(result,index2) in resultList" :key="index2">
            <td><el-input v-model="result.studentSno" class="stu1"></el-input></td>
            <td><el-input v-model="result.studentName" class="stu1" placeholder="可不填"></el-input></td>
            <td><el-input class="stu2" v-model="result.courseOneOrdinaryScore"></el-input></td>
            <td><el-input class="stu2" v-model="result.courseOneExperimentScore"></el-input></td>
            <td><el-input class="stu2" v-model="result.courseOneEndingScore"></el-input></td>
            <td><el-input class="stu2" v-model="result.courseTwoOrdinaryScore"></el-input></td>
            <td><el-input class="stu2" v-model="result.courseTwoExperimentScore"></el-input></td>
            <td><el-input class="stu2" v-model="result.courseTwoEndingScore"></el-input></td>
            <td><el-input class="stu2" v-model="result.courseThreeOrdinaryScore"></el-input></td>
            <td><el-input class="stu2" v-model="result.courseThreeExperimentScore"></el-input></td>
            <td><el-input class="stu2" v-model="result.courseThreeEndingScore"></el-input></td>
            <td><el-input class="stu2" v-model="result.courseFourOrdinaryScore"></el-input></td>
            <td><el-input class="stu2" v-model="result.courseFourExperimentScore"></el-input></td>
            <td><el-input class="stu2" v-model="result.courseFourEndingScore"></el-input></td>
            <td><el-input class="stu2" v-model="result.courseFiveOrdinaryScore"></el-input></td>
            <td><el-input class="stu2" v-model="result.courseFiveExperimentScore"></el-input></td>
            <td><el-input class="stu2" v-model="result.courseFiveEndingScore"></el-input></td>
          </tr>
        </table>
        <el-button type="primary" @click="submit">提交</el-button>
      </el-drawer>
      <el-drawer
        title="更新成绩"
        :visible.sync="drawer2"
        :before-close="handleClose"
        size="85%">
        <el-input v-model="courseName" disabled="disabled" class="disabled"></el-input>
        <el-input v-model="courseClass" disabled="disabled" class="disabled"></el-input>
        <table class="scoreEdit">
          <tr>
            <td colspan="2">学生/课程目标</td>
            <td colspan="3">课程目标一(<span v-text="target[0].courseWeightOne"></span>)</td>
            <td colspan="3">课程目标二(<span v-text="target[0].courseWeightTwo"></span>)</td>
            <td colspan="3">课程目标三(<span v-text="target[0].courseWeightThree"></span>)</td>
            <td colspan="3">课程目标四(<span v-text="target[0].courseWeightFour"></span>)</td>
            <td colspan="3">课程目标五(<span v-text="target[0].courseWeightFive"></span>)</td>
          </tr>
          <tr>
            <td>学号</td>
            <td>姓名</td>
            <td>平时(<span v-text="target[0].ordinaryOneTargetScore"></span>)</td>
            <td>实验(<span v-text="target[0].experimentOneTargetScore"></span>)</td>
            <td>结课(<span v-text="target[0].endingOneTargetScore"></span>)</td>
            <td>平时(<span v-text="target[0].ordinaryTwoTargetScore"></span>)</td>
            <td>实验(<span v-text="target[0].experimentTwoTargetScore"></span>)</td>
            <td>结课(<span v-text="target[0].endingTwoTargetScore"></span>)</td>
            <td>平时(<span v-text="target[0].ordinaryThreeTargetScore"></span>)</td>
            <td>实验(<span v-text="target[0].experimentThreeTargetScore"></span>)</td>
            <td>结课(<span v-text="target[0].endingThreeTargetScore"></span>)</td>
            <td>平时(<span v-text="target[0].ordinaryFourTargetScore"></span>)</td>
            <td>实验(<span v-text="target[0].experimentFourTargetScore"></span>)</td>
            <td>结课(<span v-text="target[0].endingFourTargetScore"></span>)</td>
            <td>平时(<span v-text="target[0].ordinaryFiveTargetScore"></span>)</td>
            <td>实验(<span v-text="target[0].experimentFiveTargetScore"></span>)</td>
            <td>结课(<span v-text="target[0].endingFiveTargetScore"></span>)</td>
          </tr>
          <tr v-for="(result,index2) in resultList" :key="index2">
            <td><el-input v-model="result.studentSno" class="stu1"></el-input></td>
            <td><el-input v-model="result.studentName" class="stu1" placeholder="可不填"></el-input></td>
            <td><el-input class="stu2" v-model="result.courseOneOrdinaryScore"></el-input></td>
            <td><el-input class="stu2" v-model="result.courseOneExperimentScore"></el-input></td>
            <td><el-input class="stu2" v-model="result.courseOneEndingScore"></el-input></td>
            <td><el-input class="stu2" v-model="result.courseTwoOrdinaryScore"></el-input></td>
            <td><el-input class="stu2" v-model="result.courseTwoExperimentScore"></el-input></td>
            <td><el-input class="stu2" v-model="result.courseTwoEndingScore"></el-input></td>
            <td><el-input class="stu2" v-model="result.courseThreeOrdinaryScore"></el-input></td>
            <td><el-input class="stu2" v-model="result.courseThreeExperimentScore"></el-input></td>
            <td><el-input class="stu2" v-model="result.courseThreeEndingScore"></el-input></td>
            <td><el-input class="stu2" v-model="result.courseFourOrdinaryScore"></el-input></td>
            <td><el-input class="stu2" v-model="result.courseFourExperimentScore"></el-input></td>
            <td><el-input class="stu2" v-model="result.courseFourEndingScore"></el-input></td>
            <td><el-input class="stu2" v-model="result.courseFiveOrdinaryScore"></el-input></td>
            <td><el-input class="stu2" v-model="result.courseFiveExperimentScore"></el-input></td>
            <td><el-input class="stu2" v-model="result.courseFiveEndingScore"></el-input></td>
          </tr>
        </table>
        <el-button type="primary" @click="update">更新</el-button>
      </el-drawer>
    </div>
</template>

<!--加上scoped能够防止样式之间的冲突-->
<style>
  @import "../assets/upLoad.css";
</style>

<script>
import axios from 'axios'
// import router from '../router'
export default {
  data () {
    return {
      drawer1: false,
      drawer2: false,
      courseName: sessionStorage.getItem('courseName'),
      courseGrade: sessionStorage.getItem('courseGrade'),
      courseMajor: sessionStorage.getItem('courseMajor'),
      courseClass: '',
      classList: [
      ],
      resultList: [{
        studentSno: '',
        courseName: '',
        courseOneOrdinaryScore: '',
        courseOneExperimentScore: '',
        courseOneEndingScore: '',
        courseTwoOrdinaryScore: '',
        courseTwoExperimentScore: '',
        courseTwoEndingScore: '',
        courseThreeOrdinaryScore: '',
        courseThreeExperimentScore: '',
        courseThreeEndingScore: '',
        courseFourOrdinaryScore: '',
        courseFourExperimentScore: '',
        courseFourEndingScore: '',
        courseFiveOrdinaryScore: '',
        courseFiveExperimentScore: '',
        courseFiveEndingScore: ''
      }],
      target: [{
        courseWeightOne: '',
        courseWeightTwo: '',
        courseWeightThree: '',
        courseWeightFour: '',
        courseWeightFive: '',
        courseOrdinaryTargetScore: '',
        courseExperimentTargetScore: '',
        courseEndingTargetScore: '',
        ordinaryOneTargetScore: '',
        experimentOneTargetScore: '',
        endingOneTargetScore: '',
        ordinaryTwoTargetScore: '',
        experimentTwoTargetScore: '',
        endingTwoTargetScore: '',
        ordinaryThreeTargetScore: '',
        experimentThreeTargetScore: '',
        endingThreeTargetScore: '',
        ordinaryFourTargetScore: '',
        experimentFourTargetScore: '',
        endingFourTargetScore: '',
        ordinaryFiveTargetScore: '',
        experimentFiveTargetScore: '',
        endingFiveTargetScore: ''
      }]
    }
  },
  created () {
    axios.post('api/getClassByGrade', {
      courseName: this.courseName,
      courseGrade: this.courseGrade,
      courseMajor: this.courseMajor
    }).then(res => {
      this.classList = res.data
      this.classList.sort()
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
    openEdit (index1) {
      this.courseClass = this.classList[index1]
      axios.post('api/getTargetScore', {
        courseName: this.courseName,
        courseGrade: this.courseGrade,
        courseMajor: this.courseMajor
      }).then(res => {
        if (res.data.length === 0) {
          this.$message({
            message: '请提交教学大纲后再录入成绩',
            type: 'warning'
          })
        } else {
          this.target = res.data
          axios.post('api/ifHaveScoreResult', {
            courseName: this.courseName,
            studentClass: this.courseClass
          }).then(res => {
            if (res.data.length === 0) {
              this.drawer1 = true
              axios.post('api/selectStudentByClass', {
                studentClass: this.courseClass
              }).then(res => {
                this.resultList = res.data
              }).catch(function (error) {
                console.log(error)
              })
            } else {
              this.drawer2 = true
              this.resultList = res.data
            }
          })
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    submit () {
      for (let i = 0; i < this.resultList.length; i++) {
        this.resultList[i].courseName = this.courseName
        this.resultList[i].studentClass = this.courseClass
      }
      axios.post('api/insertScoreResult', {
        resultList: this.resultList
      }).then(res => {
        if (res.data === '录入成功') {
          this.$message({
            message: res.data,
            type: 'success'
          })
          sessionStorage.setItem('courseClass', this.courseClass)
          this.$router.push({ name: 'CourseDegreeCompute' })
        } else {
          this.$message({
            message: res.data,
            type: 'warning'
          })
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    intoTable (index1) {
      sessionStorage.setItem('courseClass', this.classList[index1])
      this.$router.push({ name: 'CourseDegreeCompute' })
    },
    intoReport (index1) {
      axios.post('api/getTargetScore', {
        courseName: this.courseName,
        courseGrade: this.courseGrade,
        courseMajor: this.courseMajor
      }).then(res => {
        if (res.data.length === 0) {
          this.$message({
            message: '请提交教学大纲后再下载达成度分析报告',
            type: 'warning'
          })
        } else {
          sessionStorage.setItem('courseClass', this.classList[index1])
          this.$router.push({ name: 'CourseDegreeReport' })
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    inToCompute (index1) {
      axios.post('api/getTargetScore', {
        courseName: this.courseName,
        courseGrade: this.courseGrade,
        courseMajor: this.courseMajor
      }).then(res => {
        if (res.data.length === 0) {
          this.$message({
            message: '请提交教学大纲后再计算成绩',
            type: 'warning'
          })
        } else {
          sessionStorage.setItem('courseClass', this.classList[index1])
          this.$router.push({ name: 'ResultScoreCompute' })
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    update () {
      axios.post('api/updateScoreResult', {
        resultList: this.resultList
      }).then(res => {
        if (res.data === '更新成功') {
          this.$message({
            message: res.data,
            type: 'success'
          })
          sessionStorage.setItem('courseClass', this.courseClass)
          this.$router.push({ name: 'CourseDegreeCompute' })
        } else {
          this.$message({
            message: res.data,
            type: 'warning'
          })
        }
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>
