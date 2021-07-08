<template>
  <div id="resultScoreCompute">
    <div id="printMe">
      <p v-text="courseName" class="title"></p><p v-text="studentClass" class="title"></p><p class="title">班成绩统计（原始）</p>
      <table>
        <tr>
          <td>学号</td>
          <td>姓名</td>
          <td>性别</td>
          <td>专业</td>
          <td>年级</td>
          <td v-for="(item,index) in processScoreList[0].displayScore" :key="index">
            <span>{{item.processClassification}}{{item.processNumber}}</span>
          </td>
        </tr>
          <tr v-for="(item1,index1) in processScoreList" :key="index1">
        <td v-text="item1.studentSno"></td>
        <td v-text="item1.studentName"></td>
        <td v-text="item1.studentSex"></td>
        <td v-text="item1.studentMajor"></td>
        <td v-text="item1.studentGrade"></td>
        <td v-for="(score,index2) in processScoreList[index1].displayScore" :key="index2">
          <span>{{score.processScore}}</span>
        </td>
      </tr>
      </table>
    </div>
  <el-button type="primary" v-print="printObj" class="bottomButton">打印原始成绩</el-button>
<!--    <el-button type="primary" @click="add" class="bottomButton">达成度计算表</el-button>-->
    <el-button type="primary" @click="ToCompute()">打印达成度计算表<i class="el-icon-arrow-right el-icon--right"></i></el-button>
    <el-button type="primary" @click="ToReport()">打印达成度分析报告<i class="el-icon-arrow-right el-icon--right" ></i></el-button>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>已上传过成绩信息，是否更新？</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="update">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible1"
      width="30%"
      :before-close="handleClose">
      <span>未发现成绩，是否录入？</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible1 = false">取 消</el-button>
    <el-button type="primary" @click="insert">确 定</el-button>
  </span>
    </el-dialog>
</div>
</template>

<!--加上scoped能够防止样式之间的冲突-->
<style scoped>
@import '../assets/resultScoreCompute.css';
</style>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      dialogVisible: false,
      dialogVisible1: false,
      printObj: {
        id: 'printMe',
        popTitle: 'good print',
        extraCss: 'https://www.google.com,https://www.google.com',
        extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>'
      },
      courseName: sessionStorage.getItem('courseName'),
      studentGrade: sessionStorage.getItem('courseGrade'),
      studentMajor: sessionStorage.getItem('courseMajor'),
      studentClass: sessionStorage.getItem('courseClass'),
      processScoreList: [{
        studentSno: '',
        studentName: '',
        studentSex: '',
        courseName: '',
        studentMajor: '',
        studentGrade: '',
        studentClass: '',
        displayScore: [{
          processClassification: '',
          processNumber: '',
          processScore: ''
        }]
      }],
      resultList: [],
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
        ordinaryFiveTargetScore: '',
        experimentOneTargetScore: '',
        experimentTwoTargetScore: '',
        experimentThreeTargetScore: '',
        experimentFourTargetScore: '',
        experimentFiveTargetScore: '',
        endingOneTargetScore: '',
        endingTwoTargetScore: '',
        endingThreeTargetScore: '',
        endingFourTargetScore: '',
        endingFiveTargetScore: ''
      }]
    }
  },
  created () {
    axios.post('api/getStudentByClass', {
      studentClass: this.studentClass
    }).then(res => {
      this.processScoreList = res.data
      // console.log(this.processScoreList)
      for (let i = 0; i < this.processScoreList.length; i++) {
        axios.post('api/getProcessScore', {
          studentSno: this.processScoreList[i].studentSno,
          courseName: this.courseName
        }).then(res => {
          this.processScoreList[i].displayScore = res.data
          this.processScoreList[i].displayScore.sort(this.compare('processClassification'))
          this.add()
        }).catch(function (error) {
          console.log(error)
        })
      }
    }).catch(function (error) {
      console.log(error)
    })
    axios.post('api/getProcessTextIf', {
      courseName: this.courseName,
      courseMajor: this.studentMajor,
      courseGrade: this.studentGrade
    }).then(res => {
      this.processList = res.data
    }).catch(function (error) {
      console.log(error)
    })
    axios.post('api/getTargetScore', {
      courseName: this.courseName,
      courseMajor: this.studentMajor,
      courseGrade: this.studentGrade
    }).then(res => {
      this.target = res.data
    }).catch(function (error) {
      console.log(error)
    })
  },
  methods: {
    compare (attr) {
      return function (a, b) {
        var a1 = a[attr]
        var b1 = b[attr]
        if ((a1 === '平时任务' && b1 === '实验（测验）') || (a1 === '平时任务' && b1 === '考试') || (a1 === '实验（测验）' && b1 === '考试')) { return -1 } else if ((a1 === '平时任务' && b1 === '平时任务') || (a1 === '实验（测验）' && b1 === '实验（测验）') || (a1 === '考试' && b1 === '考试')) { return 0 } else return 1
      }
    },
    add () {
      this.resultList = []
      for (let i = 0; i < this.processScoreList.length; i++) {
        let ordinaryOneCount = 0
        let experimentOneCount = 0
        let ordinaryOneScoreSum = 0
        let experimentOneScoreSum = 0
        let endingOneCount = 0
        let endingOneScoreSum = 0
        let ordinaryTwoCount = 0
        let experimentTwoCount = 0
        let ordinaryTwoScoreSum = 0
        let experimentTwoScoreSum = 0
        let endingTwoCount = 0
        let endingTwoScoreSum = 0
        let ordinaryThreeCount = 0
        let experimentThreeCount = 0
        let ordinaryThreeScoreSum = 0
        let experimentThreeScoreSum = 0
        let endingThreeCount = 0
        let endingThreeScoreSum = 0
        let ordinaryFourCount = 0
        let experimentFourCount = 0
        let ordinaryFourScoreSum = 0
        let experimentFourScoreSum = 0
        let endingFourCount = 0
        let endingFourScoreSum = 0
        let ordinaryFiveCount = 0
        let experimentFiveCount = 0
        let ordinaryFiveScoreSum = 0
        let experimentFiveScoreSum = 0
        let endingFiveCount = 0
        let endingFiveScoreSum = 0
        this.resultList.push({
          studentSno: this.processScoreList[i].studentSno,
          courseName: this.courseName,
          studentClass: this.studentClass
        })
        for (let j = 0; j < this.processScoreList[i].displayScore.length; j++) {
          if (this.processScoreList[i].displayScore[j].processClassification === '平时任务') {
            for (let k = 0; k < this.processList.length; k++) {
              if (this.processList[k].processClassification === this.processScoreList[i].displayScore[j].processClassification && (this.processList[k].processNumber - this.processScoreList[i].displayScore[j].processNumber === 0) &&
                this.processList[k].ifCourseOne === 'true') {
                ordinaryOneCount = ordinaryOneCount + 1
                ordinaryOneScoreSum = ordinaryOneScoreSum + this.processScoreList[i].displayScore[j].processScore
              }
              if (this.processList[k].processClassification === this.processScoreList[i].displayScore[j].processClassification && (this.processList[k].processNumber - this.processScoreList[i].displayScore[j].processNumber === 0) &&
                this.processList[k].ifCourseTwo === 'true') {
                ordinaryTwoCount = ordinaryTwoCount + 1
                ordinaryTwoScoreSum = ordinaryTwoScoreSum + this.processScoreList[i].displayScore[j].processScore
              }
              if (this.processList[k].processClassification === this.processScoreList[i].displayScore[j].processClassification && (this.processList[k].processNumber - this.processScoreList[i].displayScore[j].processNumber === 0) &&
                this.processList[k].ifCourseThree === 'true') {
                ordinaryThreeCount = ordinaryThreeCount + 1
                ordinaryThreeScoreSum = ordinaryThreeScoreSum + this.processScoreList[i].displayScore[j].processScore
              }
              if (this.processList[k].processClassification === this.processScoreList[i].displayScore[j].processClassification && (this.processList[k].processNumber - this.processScoreList[i].displayScore[j].processNumber === 0) &&
                this.processList[k].ifCourseFour === 'true') {
                ordinaryFourCount = ordinaryFourCount + 1
                ordinaryFourScoreSum = ordinaryFourScoreSum + this.processScoreList[i].displayScore[j].processScore
              }
              if (this.processList[k].processClassification === this.processScoreList[i].displayScore[j].processClassification && (this.processList[k].processNumber - this.processScoreList[i].displayScore[j].processNumber === 0) &&
                this.processList[k].ifCourseFive === 'true') {
                ordinaryFiveCount = ordinaryFiveCount + 1
                ordinaryFiveScoreSum = ordinaryFiveScoreSum + this.processScoreList[i].displayScore[j].processScore
              }
            }
          }
          if (this.processScoreList[i].displayScore[j].processClassification === '实验（测验）') {
            for (let k = 0; k < this.processList.length; k++) {
              if (this.processList[k].processClassification === this.processScoreList[i].displayScore[j].processClassification && (this.processList[k].processNumber - this.processScoreList[i].displayScore[j].processNumber === 0) &&
                this.processList[k].ifCourseOne === 'true') {
                experimentOneCount = experimentOneCount + 1
                experimentOneScoreSum = experimentOneScoreSum + this.processScoreList[i].displayScore[j].processScore
              }
              if (this.processList[k].processClassification === this.processScoreList[i].displayScore[j].processClassification && (this.processList[k].processNumber - this.processScoreList[i].displayScore[j].processNumber === 0) &&
                this.processList[k].ifCourseTwo === 'true') {
                experimentTwoCount = experimentTwoCount + 1
                experimentTwoScoreSum = experimentTwoScoreSum + this.processScoreList[i].displayScore[j].processScore
              }
              if (this.processList[k].processClassification === this.processScoreList[i].displayScore[j].processClassification && (this.processList[k].processNumber - this.processScoreList[i].displayScore[j].processNumber === 0) &&
                this.processList[k].ifCourseThree === 'true') {
                experimentThreeCount = experimentThreeCount + 1
                experimentThreeScoreSum = experimentThreeScoreSum + this.processScoreList[i].displayScore[j].processScore
              }
              if (this.processList[k].processClassification === this.processScoreList[i].displayScore[j].processClassification && (this.processList[k].processNumber - this.processScoreList[i].displayScore[j].processNumber === 0) &&
                this.processList[k].ifCourseFour === 'true') {
                experimentFourCount = experimentFourCount + 1
                experimentFourScoreSum = experimentFourScoreSum + this.processScoreList[i].displayScore[j].processScore
              }
              if (this.processList[k].processClassification === this.processScoreList[i].displayScore[j].processClassification && (this.processList[k].processNumber - this.processScoreList[i].displayScore[j].processNumber === 0) &&
                this.processList[k].ifCourseFive === 'true') {
                experimentFiveCount = experimentFiveCount + 1
                experimentFiveScoreSum = experimentFiveScoreSum + this.processScoreList[i].displayScore[j].processScore
              }
            }
          }
          if (this.processScoreList[i].displayScore[j].processClassification === '考试') {
            for (let k = 0; k < this.processList.length; k++) {
              if (this.processList[k].processClassification === this.processScoreList[i].displayScore[j].processClassification && (this.processList[k].processNumber - this.processScoreList[i].displayScore[j].processNumber === 0) &&
                this.processList[k].ifCourseOne === 'true') {
                endingOneCount = endingOneCount + 1
                endingOneScoreSum = endingOneScoreSum + this.processScoreList[i].displayScore[j].processScore
              }
              if (this.processList[k].processClassification === this.processScoreList[i].displayScore[j].processClassification && (this.processList[k].processNumber - this.processScoreList[i].displayScore[j].processNumber === 0) &&
                this.processList[k].ifCourseTwo === 'true') {
                endingTwoCount = endingTwoCount + 1
                endingTwoScoreSum = endingTwoScoreSum + this.processScoreList[i].displayScore[j].processScore
              }
              if (this.processList[k].processClassification === this.processScoreList[i].displayScore[j].processClassification && (this.processList[k].processNumber - this.processScoreList[i].displayScore[j].processNumber === 0) &&
                this.processList[k].ifCourseThree === 'true') {
                endingThreeCount = endingThreeCount + 1
                endingThreeScoreSum = endingThreeScoreSum + this.processScoreList[i].displayScore[j].processScore
              }
              if (this.processList[k].processClassification === this.processScoreList[i].displayScore[j].processClassification && (this.processList[k].processNumber - this.processScoreList[i].displayScore[j].processNumber === 0) &&
                this.processList[k].ifCourseFour === 'true') {
                endingFourCount = endingFourCount + 1
                endingFourScoreSum = endingFourScoreSum + this.processScoreList[i].displayScore[j].processScore
              }
              if (this.processList[k].processClassification === this.processScoreList[i].displayScore[j].processClassification && (this.processList[k].processNumber - this.processScoreList[i].displayScore[j].processNumber === 0) &&
                this.processList[k].ifCourseFive === 'true') {
                endingFiveCount = endingFiveCount + 1
                endingFiveScoreSum = endingFiveScoreSum + this.processScoreList[i].displayScore[j].processScore
              }
            }
          }
        }
        // console.log('平时任务课程目标一' + ordinaryOneCount + '次')
        if (ordinaryOneCount > 0) { this.resultList[i].courseOneOrdinaryScore = parseFloat((ordinaryOneScoreSum / ordinaryOneCount) / 100 * this.target[0].ordinaryOneTargetScore).toFixed(3) } else this.resultList[i].courseOneOrdinaryScore = 0
        // console.log(this.resultList[i].courseOneOrdinaryScore)
        // console.log('平时任务课程目标二' + ordinaryTwoCount + '次')
        if (ordinaryTwoCount > 0) { this.resultList[i].courseTwoOrdinaryScore = parseFloat((ordinaryTwoScoreSum / ordinaryTwoCount) / 100 * this.target[0].ordinaryTwoTargetScore).toFixed(3) } else this.resultList[i].courseTwoOrdinaryScore = 0
        // console.log(this.resultList[i].courseTwoOrdinaryScore)
        // console.log('平时任务课程目标三' + ordinaryThreeCount + '次')
        if (ordinaryThreeCount > 0) { this.resultList[i].courseThreeOrdinaryScore = parseFloat((ordinaryThreeScoreSum / ordinaryThreeCount) / 100 * this.target[0].ordinaryThreeTargetScore).toFixed(3) } else this.resultList[i].courseThreeOrdinaryScore = 0
        // console.log(this.resultList[i].courseThreeOrdinaryScore)
        // console.log('平时任务课程目标四' + ordinaryFourCount + '次')
        if (ordinaryFourCount > 0) { this.resultList[i].courseFourOrdinaryScore = parseFloat((ordinaryFourScoreSum / ordinaryFourCount) / 100 * this.target[0].ordinaryFourTargetScore).toFixed(3) } else this.resultList[i].courseFourOrdinaryScore = 0
        // console.log(this.resultList[i].courseFourOrdinaryScore)
        // console.log('平时任务课程目标五' + ordinaryFiveCount + '次')
        if (ordinaryFiveCount > 0) { this.resultList[i].courseFiveOrdinaryScore = parseFloat((ordinaryFiveScoreSum / ordinaryFiveCount) / 100 * this.target[0].ordinaryFiveTargetScore).toFixed(3) } else this.resultList[i].courseFiveOrdinaryScore = 0
        // console.log(this.resultList[i].courseFiveOrdinaryScore)
        // console.log('实验课程目标一' + experimentOneCount + '次')
        if (experimentOneCount > 0) { this.resultList[i].courseOneExperimentScore = parseFloat((experimentOneScoreSum / experimentOneCount) / 100 * this.target[0].experimentOneTargetScore).toFixed(3) } else this.resultList[i].courseOneExperimentScore = 0
        // console.log(this.resultList[i].courseOneExperimentScore)
        // console.log('实验课程目标二' + experimentTwoCount + '次')
        if (experimentTwoCount > 0) { this.resultList[i].courseTwoExperimentScore = parseFloat((experimentTwoScoreSum / experimentTwoCount) / 100 * this.target[0].experimentTwoTargetScore).toFixed(3) } else this.resultList[i].courseTwoExperimentScore = 0
        // console.log(this.resultList[i].courseTwoExperimentScore)
        // console.log('实验课程目标三' + experimentThreeCount + '次')
        if (experimentThreeCount > 0) { this.resultList[i].courseThreeExperimentScore = parseFloat((experimentThreeScoreSum / experimentThreeCount) / 100 * this.target[0].experimentThreeTargetScore).toFixed(3) } else this.resultList[i].courseThreeExperimentScore = 0
        // console.log(this.resultList[i].courseThreeExperimentScore)
        // console.log('实验课程目标四' + experimentFourCount + '次')
        if (experimentFourCount > 0) { this.resultList[i].courseFourExperimentScore = parseFloat((experimentFourScoreSum / experimentFourCount) / 100 * this.target[0].experimentFourTargetScore).toFixed(3) } else this.resultList[i].courseFourExperimentScore = 0
        // console.log(this.resultList[i].courseFourExperimentScore)
        // console.log('实验课程目标五' + experimentFiveCount + '次')
        if (experimentFiveCount > 0) { this.resultList[i].courseFiveExperimentScore = parseFloat((experimentFiveScoreSum / experimentFiveCount) / 100 * this.target[0].experimentFiveTargetScore).toFixed(3) } else this.resultList[i].courseFiveExperimentScore = 0
        // console.log(this.resultList[i].courseFiveExperimentScore)
        // console.log('考试课程目标一' + endingOneCount + '次')
        if (endingOneCount > 0) { this.resultList[i].courseOneEndingScore = parseFloat((endingOneScoreSum / endingOneCount) / 100 * this.target[0].endingOneTargetScore).toFixed(3) } else this.resultList[i].courseOneEndingScore = 0
        // console.log(this.resultList[i].courseOneEndingScore)
        // console.log('考试课程目标二' + endingTwoCount + '次')
        if (endingTwoCount > 0) { this.resultList[i].courseTwoEndingScore = parseFloat((endingTwoScoreSum / endingTwoCount) / 100 * this.target[0].endingTwoTargetScore).toFixed(3) } else this.resultList[i].courseTwoEndingScore = 0
        // console.log(this.resultList[i].courseTwoEndingScore)
        // console.log('考试课程目标三' + endingThreeCount + '次')
        if (endingThreeCount > 0) { this.resultList[i].courseThreeEndingScore = parseFloat((endingThreeScoreSum / endingThreeCount) / 100 * this.target[0].endingThreeTargetScore).toFixed(3) } else this.resultList[i].courseThreeEndingScore = 0
        // console.log(this.resultList[i].courseThreeEndingScore)
        // console.log('考试课程目标四' + endingFourCount + '次')
        if (endingFourCount > 0) { this.resultList[i].courseFourEndingScore = parseFloat((endingFourScoreSum / endingFourCount) / 100 * this.target[0].endingFourTargetScore).toFixed(3) } else this.resultList[i].courseFourEndingScore = 0
        // console.log(this.resultList[i].courseFourEndingScore)
        // console.log('考试课程目标五' + endingFiveCount + '次')
        if (endingFiveCount > 0) { this.resultList[i].courseFiveEndingScore = parseFloat((endingFiveScoreSum / endingFiveCount) / 100 * this.target[0].endingFiveTargetScore).toFixed(3) } else this.resultList[i].courseFiveEndingScore = 0
        // console.log(this.resultList[i].courseFiveEndingScore)
      }
      axios.post('api/getResultScore', {
        courseName: this.courseName,
        studentClass: this.studentClass
      }).then(res => {
        if (res.data.length === 0) {
          this.dialogVisible1 = true
          console.log(this.resultList)
        } else {
          this.dialogVisible = true
          console.log(this.resultList)
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    handleClose () {
      this.dialogVisible = false
    },
    insert () {
      this.dialogVisible1 = false
      axios.post('api/insertScoreResult', {
        resultList: this.resultList
      }).then(res => {
        if (res.data === '录入成功') {
          this.$message({
            message: '已成功录入成绩',
            type: 'success'
          })
        // this.$router.push({ name: 'CourseDegreeCompute', params: { courseName: this.courseName, courseClass: this.studentClass, courseMajor: this.studentMajor, courseGrade: this.studentGrade } })
        } else {
          this.$message({
            message: '录入成绩失败',
            type: 'warning'
          })
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    update () {
      this.dialogVisible = false
      axios.post('api/updateScoreResult', {
        resultList: this.resultList
      }).then(res => {
        if (res.data === '更新成功') {
          this.$message({
            message: '已成功更新成绩',
            type: 'success'
          })
          // this.$router.push({ name: 'CourseDegreeCompute', params: { courseName: this.courseName, courseClass: this.studentClass, courseMajor: this.studentMajor, courseGrade: this.studentGrade } })
        } else {
          this.$message({
            message: '更新成绩失败',
            type: 'warning'
          })
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    ToCompute () {
      this.$router.push({ name: 'CourseDegreeCompute' })
    },
    ToReport () {
      this.$router.push({ name: 'CourseDegreeReport' })
      // this.$router.push({ name: 'CourseDegreeCompute', params: { courseName: this.courseName, courseClass: this.studentClass, courseMajor: this.studentMajor, courseGrade: this.studentGrade } })
    }
  }
}
</script>
