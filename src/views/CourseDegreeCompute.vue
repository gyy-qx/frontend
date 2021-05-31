<template>
    <div id="CourseDegreeCompute">
        <div id="printMe">
          <p v-text="courseName" class="title"></p><p v-text="courseClass" class="title"></p><p class="title">班</p>
          <table id="scoreEdit">
        <tr>
          <td colspan="2" style="font-size: 10px">学生/课程目标</td>
          <td colspan="3" v-if="target[0].courseWeightOne!=null">课程目标一(<span v-text="target[0].courseWeightOne"></span>)</td>
          <td colspan="3" v-if="target[0].courseWeightTwo!=null">课程目标二(<span v-text="target[0].courseWeightTwo"></span>)</td>
          <td colspan="3" v-if="target[0].courseWeightThree!=null">课程目标三(<span v-text="target[0].courseWeightThree"></span>)</td>
          <td colspan="3" v-if="target[0].courseWeightFour!=null">课程目标四(<span v-text="target[0].courseWeightFour"></span>)</td>
          <td colspan="3" v-if="target[0].courseWeightFive!=null">课程目标五(<span v-text="target[0].courseWeightFive"></span>)</td>
        </tr>
        <tr>
          <td>学号</td>
          <td>姓名</td>
          <td v-if="target[0].courseWeightOne!=null">平时(<span v-text="target[0].ordinaryOneTargetScore"></span>)</td>
          <td v-if="target[0].courseWeightOne!=null">实验(<span v-text="target[0].experimentOneTargetScore"></span>)</td>
          <td v-if="target[0].courseWeightOne!=null">结课(<span v-text="target[0].endingOneTargetScore"></span>)</td>
          <td v-if="target[0].courseWeightTwo!=null">平时(<span v-text="target[0].ordinaryTwoTargetScore"></span>)</td>
          <td v-if="target[0].courseWeightTwo!=null">实验(<span v-text="target[0].experimentTwoTargetScore"></span>)</td>
          <td v-if="target[0].courseWeightTwo!=null">结课(<span v-text="target[0].endingTwoTargetScore"></span>)</td>
          <td v-if="target[0].courseWeightThree!=null">平时(<span v-text="target[0].ordinaryThreeTargetScore"></span>)</td>
          <td v-if="target[0].courseWeightThree!=null">实验(<span v-text="target[0].experimentThreeTargetScore"></span>)</td>
          <td v-if="target[0].courseWeightThree!=null">结课(<span v-text="target[0].endingThreeTargetScore"></span>)</td>
          <td v-if="target[0].courseWeightFour!=null">平时(<span v-text="target[0].ordinaryFourTargetScore"></span>)</td>
          <td v-if="target[0].courseWeightFour!=null">实验(<span v-text="target[0].experimentFourTargetScore"></span>)</td>
          <td v-if="target[0].courseWeightFour!=null">结课(<span v-text="target[0].endingFourTargetScore"></span>)</td>
          <td v-if="target[0].courseWeightFive!=null">平时(<span v-text="target[0].ordinaryFiveTargetScore"></span>)</td>
          <td v-if="target[0].courseWeightFive!=null">实验(<span v-text="target[0].experimentFiveTargetScore"></span>)</td>
          <td v-if="target[0].courseWeightFive!=null">结课(<span v-text="target[0].endingFiveTargetScore"></span>)</td>
          <td v-if="target[0].courseWeightOne!=null">课程目标一达成度</td>
          <td v-if="target[0].courseWeightTwo!=null">课程目标二达成度</td>
          <td v-if="target[0].courseWeightThree!=null">课程目标三达成度</td>
          <td v-if="target[0].courseWeightFour!=null">课程目标四达成度</td>
          <td v-if="target[0].courseWeightFive!=null">课程目标五达成度</td>
          <td>课程目标达成度</td>
        </tr>
        <tr v-for="(result,index2) in resultList" :key="index2">
          <td><el-input v-model="result.studentSno" class="stu1" disabled="disabled"></el-input></td>
          <td><el-input v-model="studentNameList[index2]" class="stu1" disabled="disabled"></el-input></td>
          <td v-if="target[0].courseWeightOne!=null"><el-input class="stu2" v-model="result.courseOneOrdinaryScore"></el-input></td>
          <td v-if="target[0].courseWeightOne!=null"><el-input class="stu2" v-model="result.courseOneExperimentScore"></el-input></td>
          <td v-if="target[0].courseWeightOne!=null"><el-input class="stu2" v-model="result.courseOneEndingScore"></el-input></td>
          <td v-if="target[0].courseWeightTwo!=null"><el-input class="stu2" v-model="result.courseTwoOrdinaryScore"></el-input></td>
          <td v-if="target[0].courseWeightTwo!=null"><el-input class="stu2" v-model="result.courseTwoExperimentScore"></el-input></td>
          <td v-if="target[0].courseWeightTwo!=null"><el-input class="stu2" v-model="result.courseTwoEndingScore"></el-input></td>
          <td v-if="target[0].courseWeightThree!=null"><el-input class="stu2" v-model="result.courseThreeOrdinaryScore"></el-input></td>
          <td v-if="target[0].courseWeightThree!=null"><el-input class="stu2" v-model="result.courseThreeExperimentScore"></el-input></td>
          <td v-if="target[0].courseWeightThree!=null"><el-input class="stu2" v-model="result.courseThreeEndingScore"></el-input></td>
          <td v-if="target[0].courseWeightFour!=null"><el-input class="stu2" v-model="result.courseFourOrdinaryScore"></el-input></td>
          <td v-if="target[0].courseWeightFour!=null"><el-input class="stu2" v-model="result.courseFourExperimentScore"></el-input></td>
          <td v-if="target[0].courseWeightFour!=null"><el-input class="stu2" v-model="result.courseFourEndingScore"></el-input></td>
          <td v-if="target[0].courseWeightFive!=null"><el-input class="stu2" v-model="result.courseFiveOrdinaryScore"></el-input></td>
          <td v-if="target[0].courseWeightFive!=null"><el-input class="stu2" v-model="result.courseFiveExperimentScore"></el-input></td>
          <td v-if="target[0].courseWeightFive!=null"><el-input class="stu2" v-model="result.courseFiveEndingScore"></el-input></td>
          <td v-if="target[0].courseWeightOne!=null"><el-input class="stu2" v-model="result.courseOneAchievementDegree"></el-input></td>
          <td v-if="target[0].courseWeightTwo!=null"><el-input class="stu2" v-model="result.courseTwoAchievementDegree"></el-input></td>
          <td v-if="target[0].courseWeightThree!=null"><el-input class="stu2" v-model="result.courseThreeAchievementDegree"></el-input></td>
          <td v-if="target[0].courseWeightFour!=null"><el-input class="stu2" v-model="result.courseFourAchievementDegree"></el-input></td>
          <td v-if="target[0].courseWeightFive!=null"><el-input class="stu2" v-model="result.courseFiveAchievementDegree"></el-input></td>
          <td><el-input class="stu2" v-model="result.courseAchievementDegree"></el-input></td>
        </tr>
        <tr>
          <td colspan="2">班级均值</td>
          <td v-if="target[0].courseWeightOne!=null"><el-input class="stu2" v-model="classSum.courseOneOrdinaryScore"></el-input></td>
          <td v-if="target[0].courseWeightOne!=null"><el-input class="stu2" v-model="classSum.courseOneExperimentScore"></el-input></td>
          <td v-if="target[0].courseWeightOne!=null"><el-input class="stu2" v-model="classSum.courseOneEndingScore"></el-input></td>
          <td v-if="target[0].courseWeightTwo!=null"><el-input class="stu2" v-model="classSum.courseTwoOrdinaryScore"></el-input></td>
          <td v-if="target[0].courseWeightTwo!=null"><el-input class="stu2" v-model="classSum.courseTwoExperimentScore"></el-input></td>
          <td v-if="target[0].courseWeightTwo!=null"><el-input class="stu2" v-model="classSum.courseTwoEndingScore"></el-input></td>
          <td v-if="target[0].courseWeightThree!=null"><el-input class="stu2" v-model="classSum.courseThreeOrdinaryScore"></el-input></td>
          <td v-if="target[0].courseWeightThree!=null"><el-input class="stu2" v-model="classSum.courseThreeExperimentScore"></el-input></td>
          <td v-if="target[0].courseWeightThree!=null"><el-input class="stu2" v-model="classSum.courseThreeEndingScore"></el-input></td>
          <td v-if="target[0].courseWeightFour!=null"><el-input class="stu2" v-model="classSum.courseFourOrdinaryScore"></el-input></td>
          <td v-if="target[0].courseWeightFour!=null"><el-input class="stu2" v-model="classSum.courseFourExperimentScore"></el-input></td>
          <td v-if="target[0].courseWeightFour!=null"><el-input class="stu2" v-model="classSum.courseFourEndingScore"></el-input></td>
          <td v-if="target[0].courseWeightFive!=null"><el-input class="stu2" v-model="classSum.courseFiveOrdinaryScore"></el-input></td>
          <td v-if="target[0].courseWeightFive!=null"><el-input class="stu2" v-model="classSum.courseFiveExperimentScore"></el-input></td>
          <td v-if="target[0].courseWeightFive!=null"><el-input class="stu2" v-model="classSum.courseFiveEndingScore"></el-input></td>
          <td v-if="target[0].courseWeightOne!=null"><el-input class="stu2" v-model="classSum.courseOneAchievementDegree"></el-input></td>
          <td v-if="target[0].courseWeightTwo!=null"><el-input class="stu2" v-model="classSum.courseTwoAchievementDegree"></el-input></td>
          <td v-if="target[0].courseWeightThree!=null"><el-input class="stu2" v-model="classSum.courseThreeAchievementDegree"></el-input></td>
          <td v-if="target[0].courseWeightFour!=null"><el-input class="stu2" v-model="classSum.courseFourAchievementDegree"></el-input></td>
          <td v-if="target[0].courseWeightFive!=null"><el-input class="stu2" v-model="classSum.courseFiveAchievementDegree"></el-input></td>
          <td><el-input class="stu2" v-model="classSum.courseAchievementDegree"></el-input></td>
        </tr>
      </table>
      </div>
      <br>
      <el-button type="primary" v-print="printObj" id="printButton">打印班级达成度计算表</el-button>
    </div>
</template>

<!--加上scoped能够防止样式之间的冲突-->
<style scoped>
@import "../assets/courseDegreeCompute.css";
</style>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      printObj: {
        id: 'printMe',
        popTitle: 'good print',
        extraCss: 'https://www.google.com,https://www.google.com',
        extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>'
      },
      courseName: sessionStorage.getItem('courseName'),
      courseGrade: sessionStorage.getItem('courseGrade'),
      courseMajor: sessionStorage.getItem('courseMajor'),
      courseClass: sessionStorage.getItem('courseClass'),
      studentNameList: [],
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
        courseFiveEndingScore: '',
        courseOneAchievementDegree: '',
        courseTwoAchievementDegree: '',
        courseThreeAchievementDegree: '',
        courseFourAchievementDegree: '',
        courseFiveAchievementDegree: '',
        courseAchievementDegree: ''
      }],
      classSum: {
        courseName: '',
        className: '',
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
        courseFiveEndingScore: '',
        courseOneAchievementDegree: '',
        courseTwoAchievementDegree: '',
        courseThreeAchievementDegree: '',
        courseFourAchievementDegree: '',
        courseFiveAchievementDegree: '',
        courseAchievementDegree: ''
      },
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
    axios.post('api/getTargetScore', {
      courseName: this.courseName,
      courseMajor: this.courseMajor,
      courseGrade: this.courseGrade
    }).then(res => {
      if (res.data.length === 0) {
        this.$message({
          message: '请提交教学大纲后再下载达成度计算表',
          type: 'warning'
        })
      } else {
        this.target = res.data
        axios.post('api/getResultScore', {
          courseName: this.courseName,
          studentClass: this.courseClass
        }).then(res => {
          this.resultList = res.data
          this.compute()
          this.getStudentName()
        }).catch(function (error) {
          console.log(error)
        })
      }
    }).catch(function (error) {
      console.log(error)
    })
    // this.$message('如有成绩更新，请重新加载')
  },
  methods: {
    getStudentName () {
      axios.post('api/selectStudentByClass', {
        studentClass: this.courseClass
      }).then(res => {
        console.log(res.data[0].studentName)
        for (let i = 0; i < res.data.length; i++) {
          this.studentNameList.push(res.data[i].studentName)
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    compute () {
      let i
      this.classSum.courseOneOrdinaryScore = 0
      this.classSum.courseOneExperimentScore = 0
      this.classSum.courseOneEndingScore = 0
      this.classSum.courseTwoOrdinaryScore = 0
      this.classSum.courseTwoExperimentScore = 0
      this.classSum.courseTwoEndingScore = 0
      this.classSum.courseThreeOrdinaryScore = 0
      this.classSum.courseThreeExperimentScore = 0
      this.classSum.courseThreeEndingScore = 0
      this.classSum.courseFourOrdinaryScore = 0
      this.classSum.courseFourExperimentScore = 0
      this.classSum.courseFourEndingScore = 0
      this.classSum.courseFiveOrdinaryScore = 0
      this.classSum.courseFiveExperimentScore = 0
      this.classSum.courseFiveEndingScore = 0
      this.classSum.courseOneAchievementDegree = 0
      this.classSum.courseTwoAchievementDegree = 0
      this.classSum.courseThreeAchievementDegree = 0
      this.classSum.courseFourAchievementDegree = 0
      this.classSum.courseFiveAchievementDegree = 0
      this.classSum.courseAchievementDegree = 0
      if (this.target[0].courseWeightOne != null) {
        for (i = 0; i < this.resultList.length; i++) {
          this.resultList[i].courseOneAchievementDegree = parseFloat((this.resultList[i].courseOneOrdinaryScore +
            this.resultList[i].courseOneExperimentScore + this.resultList[i].courseOneEndingScore) / (this.target[0].ordinaryOneTargetScore +
          this.target[0].experimentOneTargetScore + this.target[0].endingOneTargetScore)).toFixed(2)
          this.resultList[i].courseAchievementDegree = this.resultList[i].courseOneAchievementDegree * this.target[0].courseWeightOne
          this.classSum.courseOneOrdinaryScore = parseFloat(this.classSum.courseOneOrdinaryScore + this.resultList[i].courseOneOrdinaryScore)
          this.classSum.courseOneExperimentScore = parseFloat(this.classSum.courseOneExperimentScore + this.resultList[i].courseOneExperimentScore)
          this.classSum.courseOneEndingScore = parseFloat(this.classSum.courseOneEndingScore + this.resultList[i].courseOneEndingScore)
        }
        this.classSum.courseOneOrdinaryScore = parseFloat(this.classSum.courseOneOrdinaryScore / i).toFixed(2)
        this.classSum.courseOneExperimentScore = parseFloat(this.classSum.courseOneExperimentScore / i).toFixed(2)
        this.classSum.courseOneEndingScore = parseFloat(this.classSum.courseOneEndingScore / i).toFixed(2)
        this.classSum.courseOneAchievementDegree = parseFloat((parseFloat(this.classSum.courseOneOrdinaryScore) + parseFloat(this.classSum.courseOneExperimentScore) + parseFloat(this.classSum.courseOneEndingScore)) /
          (this.target[0].ordinaryOneTargetScore + this.target[0].experimentOneTargetScore + this.target[0].endingOneTargetScore)).toFixed(2)
        this.classSum.courseAchievementDegree = this.classSum.courseAchievementDegree + this.classSum.courseOneAchievementDegree * this.target[0].courseWeightOne
      }
      if (this.target[0].courseWeightTwo != null) {
        for (i = 0; i < this.resultList.length; i++) {
          this.resultList[i].courseTwoAchievementDegree = parseFloat((this.resultList[i].courseTwoOrdinaryScore + this.resultList[i].courseTwoExperimentScore +
            this.resultList[i].courseTwoEndingScore) / (this.target[0].ordinaryTwoTargetScore + this.target[0].experimentTwoTargetScore +
            this.target[0].endingTwoTargetScore)).toFixed(2)
          this.resultList[i].courseAchievementDegree = this.resultList[i].courseAchievementDegree + this.resultList[i].courseTwoAchievementDegree * this.target[0].courseWeightTwo
          this.classSum.courseTwoOrdinaryScore = parseFloat(this.classSum.courseTwoOrdinaryScore + this.resultList[i].courseTwoOrdinaryScore)
          this.classSum.courseTwoExperimentScore = parseFloat(this.classSum.courseTwoExperimentScore + this.resultList[i].courseTwoExperimentScore)
          this.classSum.courseTwoEndingScore = parseFloat(this.classSum.courseTwoEndingScore + this.resultList[i].courseTwoEndingScore)
        }
        this.classSum.courseTwoOrdinaryScore = (this.classSum.courseTwoOrdinaryScore / i).toFixed(2)
        this.classSum.courseTwoExperimentScore = (this.classSum.courseTwoExperimentScore / i).toFixed(2)
        this.classSum.courseTwoEndingScore = (this.classSum.courseTwoEndingScore / i).toFixed(2)
        this.classSum.courseTwoAchievementDegree = parseFloat((parseFloat(this.classSum.courseTwoOrdinaryScore) + parseFloat(this.classSum.courseTwoExperimentScore) + parseFloat(this.classSum.courseTwoEndingScore)) /
          (this.target[0].ordinaryTwoTargetScore + this.target[0].experimentTwoTargetScore + this.target[0].endingTwoTargetScore)).toFixed(2)
        this.classSum.courseAchievementDegree = this.classSum.courseAchievementDegree + this.classSum.courseTwoAchievementDegree * this.target[0].courseWeightTwo
      }
      if (this.target[0].courseWeightThree != null) {
        for (let i = 0; i < this.resultList.length; i++) {
          this.resultList[i].courseThreeAchievementDegree = parseFloat((this.resultList[i].courseThreeOrdinaryScore +
            this.resultList[i].courseThreeExperimentScore + this.resultList[i].courseThreeEndingScore) / (this.target[0].ordinaryThreeTargetScore +
            this.target[0].experimentThreeTargetScore + this.target[0].endingThreeTargetScore)).toFixed(2)
          this.resultList[i].courseAchievementDegree = this.resultList[i].courseAchievementDegree + this.resultList[i].courseThreeAchievementDegree * this.target[0].courseWeightThree
          this.classSum.courseThreeOrdinaryScore = parseFloat(this.classSum.courseThreeOrdinaryScore + this.resultList[i].courseThreeOrdinaryScore)
          this.classSum.courseThreeExperimentScore = parseFloat(this.classSum.courseThreeExperimentScore + this.resultList[i].courseThreeExperimentScore)
          this.classSum.courseThreeEndingScore = parseFloat(this.classSum.courseThreeEndingScore + this.resultList[i].courseThreeEndingScore)
        }
        this.classSum.courseThreeOrdinaryScore = (this.classSum.courseThreeOrdinaryScore / i).toFixed(2)
        this.classSum.courseThreeExperimentScore = (this.classSum.courseThreeExperimentScore / i).toFixed(2)
        this.classSum.courseThreeEndingScore = (this.classSum.courseThreeEndingScore / i).toFixed(2)
        this.classSum.courseThreeAchievementDegree = parseFloat((parseFloat(this.classSum.courseThreeOrdinaryScore) + parseFloat(this.classSum.courseThreeExperimentScore) + parseFloat(this.classSum.courseThreeEndingScore)) /
          (this.target[0].ordinaryThreeTargetScore + this.target[0].experimentThreeTargetScore + this.target[0].endingThreeTargetScore)).toFixed(2)
        this.classSum.courseAchievementDegree = this.classSum.courseAchievementDegree + this.classSum.courseThreeAchievementDegree * this.target[0].courseWeightThree
      }
      if (this.target[0].courseWeightFour != null) {
        for (let i = 0; i < this.resultList.length; i++) {
          this.resultList[i].courseFourAchievementDegree = parseFloat((this.resultList[i].courseFourOrdinaryScore + this.resultList[i].courseFourExperimentScore +
            this.resultList[i].courseFourEndingScore) / (this.target[0].ordinaryFourTargetScore + this.target[0].experimentFourTargetScore +
            this.target[0].endingFourTargetScore)).toFixed(2)
          this.resultList[i].courseAchievementDegree = this.resultList[i].courseAchievementDegree + this.resultList[i].courseFourAchievementDegree * this.target[0].courseWeightFour
          this.classSum.courseFourOrdinaryScore = parseFloat(this.classSum.courseFourOrdinaryScore + this.resultList[i].courseFourOrdinaryScore)
          this.classSum.courseFourExperimentScore = parseFloat(this.classSum.courseFourExperimentScore + this.resultList[i].courseFourExperimentScore)
          this.classSum.courseFourEndingScore = parseFloat(this.classSum.courseFourEndingScore + this.resultList[i].courseFourEndingScore)
        }
        this.classSum.courseFourOrdinaryScore = (this.classSum.courseFourOrdinaryScore / i).toFixed(2)
        this.classSum.courseFourExperimentScore = (this.classSum.courseFourExperimentScore / i).toFixed(2)
        this.classSum.courseFourEndingScore = (this.classSum.courseFourEndingScore / i).toFixed(2)
        this.classSum.courseFourAchievementDegree = parseFloat((parseFloat(this.classSum.courseFourOrdinaryScore) + parseFloat(this.classSum.courseFourExperimentScore) + parseFloat(this.classSum.courseFourEndingScore)) /
          (this.target[0].ordinaryFourTargetScore + this.target[0].experimentFourTargetScore + this.target[0].endingFourTargetScore)).toFixed(2)
        this.classSum.courseAchievementDegree = this.classSum.courseAchievementDegree + this.classSum.courseFourAchievementDegree * this.target[0].courseWeightFour
      }
      if (this.target[0].courseWeightFive != null) {
        for (let i = 0; i < this.resultList.length; i++) {
          this.resultList[i].courseFiveAchievementDegree = parseFloat((this.resultList[i].courseFiveOrdinaryScore + this.resultList[i].courseFiveExperimentScore +
            this.resultList[i].courseFiveEndingScore) / (this.target[0].ordinaryFiveTargetScore + this.target[0].experimentFiveTargetScore +
            this.target[0].endingFiveTargetScore)).toFixed(2)
          this.resultList[i].courseAchievementDegree = this.resultList[i].courseAchievementDegree + this.resultList[i].courseFiveAchievementDegree * this.target[0].courseWeightFive
          this.classSum.courseFiveOrdinaryScore = parseFloat(this.classSum.courseFiveOrdinaryScore + this.resultList[i].courseFiveOrdinaryScore)
          this.classSum.courseFiveExperimentScore = parseFloat(this.classSum.courseFiveExperimentScore + this.resultList[i].courseFiveExperimentScore)
          this.classSum.courseFiveEndingScore = parseFloat(this.classSum.courseFiveEndingScore + this.resultList[i].courseFiveEndingScore)
        }
        this.classSum.courseFiveOrdinaryScore = (this.classSum.courseFiveOrdinaryScore / i).toFixed(2)
        this.classSum.courseFiveExperimentScore = (this.classSum.courseFiveExperimentScore / i).toFixed(2)
        this.classSum.courseFiveEndingScore = (this.classSum.courseFiveEndingScore / i).toFixed(2)
        this.classSum.courseFiveAchievementDegree = parseFloat((parseFloat(this.classSum.courseFiveOrdinaryScore) + parseFloat(this.classSum.courseFiveExperimentScore) + parseFloat(this.classSum.courseFiveEndingScore)) /
          (this.target[0].ordinaryFiveTargetScore + this.target[0].experimentFiveTargetScore + this.target[0].endingFiveTargetScore)).toFixed(2)
        this.classSum.courseAchievementDegree = this.classSum.courseAchievementDegree + this.classSum.courseFiveAchievementDegree * this.target[0].courseWeightFive
      }
      for (let i = 0; i < this.resultList.length; i++) {
        this.resultList[i].courseAchievementDegree = parseFloat(this.resultList[i].courseAchievementDegree).toFixed(2)
      }
      this.classSum.className = this.courseClass
      this.classSum.courseName = this.courseName
      console.log(this.classSum)
      this.classSum.courseAchievementDegree = parseFloat(this.classSum.courseAchievementDegree).toFixed(2)
      axios.post('api/updateAchievementDegree', {
        resultList: this.resultList,
        classResult: this.classSum
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>
