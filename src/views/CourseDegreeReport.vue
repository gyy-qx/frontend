<template>
  <div id="CourseDegreeReport">
<!--    <el-button type="primary" id = "compute" @click="compute">加载</el-button>-->
    <div id="printMe">
      <h4 id="reportTitle" style="
    margin-top:50px;
    margin-left:20%;
    margin-bottom: 20px;
    font-family: 幼圆;
    font-size: 30px;">华北水利水电大学课程目标达成度评价表</h4>
        <table border="1" id="tableEdit">
          <tr>
            <td>教师姓名</td>
            <td v-text="teacher.teacherName"></td>
            <td>职称</td>
            <td v-text="teacher.teacherProfessionalTitle"></td>
            <td>学历/学位</td>
            <td v-text="teacher.teacherEducation"></td>
            <td>所属教研室</td>
            <td v-text="teacher.teacherResearch"></td>
          </tr>
          <tr>
            <td colspan="2">课程（环节）名称</td>
            <td v-text="courseName" colspan="2"></td>
            <td colspan="2">修读性质</td>
            <td v-text="course.courseClassification" colspan="2"></td>
          </tr>
          <tr>
            <td rowspan="2">专业班级</td>
            <td v-text="this.courseClass" rowspan="2"></td>
            <td rowspan="2">计划学时</td>
            <td v-text="course.courseClassHour" rowspan="2"></td>
<!--            <td>执行学时</td>-->
<!--            <td><input type="text" class="mes"></td>-->
            <td rowspan="2">考核方式</td>
            <td>
              <input type="radio" value="考察" name="examination" v-model="course.courseExaminationMethod">考察
            </td>
            <td colspan="2">
              <input type="radio" value="考试" v-model="course.courseSpecificMethod">考试
              <input type="radio" value="答辩" v-model="course.courseSpecificMethod">答辩
              <input type="radio" value="论文" v-model="course.courseSpecificMethod">论文
              <input type="radio" value="考察其他" v-model="course.courseSpecificMethod">其他
            </td>
          </tr>
          <tr>
            <td>
              <input type="radio" value="考试" name="examination" v-model="course.courseExaminationMethod">考试
            </td>
            <td colspan="2">
              <input type="radio" value="开卷" v-model="course.courseSpecificMethod">开卷
              <input type="radio" value="闭卷" v-model="course.courseSpecificMethod">闭卷
              <input type="radio" value="考试其他" v-model="course.courseSpecificMethod">其他
            </td>
          </tr>
          <tr>
            <td rowspan="3">成绩分布</td>
            <td colspan="2">分数段（等级）</td>
            <td>[100-90](优秀)</td>
            <td>(90-80](良好)</td>
            <td>(80-70](中等)</td>
            <td>(70-60](及格)</td>
            <td>(60-0](不及格)</td>
          </tr>
          <tr>
            <td colspan="2">人数</td>
            <td v-text="person.excellentAmount"></td>
            <td v-text="person.goodAmount"></td>
            <td v-text="person.averageAmount"></td>
            <td v-text="person.fairAmount"></td>
            <td v-text="person.poorAmount"></td>
          </tr>
          <tr>
            <td colspan="2">比例</td>
            <td v-text="person.excellentRatio + '%'"></td>
            <td v-text="person.goodRatio + '%'"></td>
            <td v-text="person.averageRatio + '%'"></td>
            <td v-text="person.fairRatio + '%'"></td>
            <td v-text="person.poorRatio + '%'"></td>
          </tr>
          <tr>
            <td>课程目标</td>
            <td colspan="4">毕业要求观测点支撑关系</td>
            <td>考核内容目标分值</td>
            <td>考试内容得分值</td>
            <td>达成度</td>
          </tr>
          <tr v-if="target[0].courseWeightOne!=null">
            <td>课程目标一</td>
            <td v-text="requirement.courseRequirementOne" colspan="4"></td>
            <td v-text="target[0].ordinaryOneTargetScore+target[0].experimentOneTargetScore+target[0].endingOneTargetScore"></td>
            <td v-text="parseFloat(classResult.courseOneOrdinaryScore + classResult.courseOneExperimentScore + classResult.courseOneEndingScore).toFixed(2)"></td>
            <td v-text="classResult.courseOneAchievementDegree"></td>
          </tr>
          <tr v-if="target[0].courseWeightTwo!=null">
            <td>课程目标二</td>
            <td v-text="requirement.courseRequirementTwo" colspan="4"></td>
            <td v-text="target[0].ordinaryTwoTargetScore+target[0].experimentTwoTargetScore+target[0].endingTwoTargetScore"></td>
            <td v-text="parseFloat(classResult.courseTwoOrdinaryScore + classResult.courseTwoExperimentScore + classResult.courseTwoEndingScore).toFixed(2)"></td>
            <td v-text="classResult.courseTwoAchievementDegree"></td>
          </tr>
          <tr v-if="target[0].courseWeightThree!=null">
            <td>课程目标三</td>
            <td v-text="requirement.courseRequirementThree" colspan="4"></td>
            <td v-text="target[0].ordinaryThreeTargetScore+target[0].experimentThreeTargetScore+target[0].endingThreeTargetScore"></td>
            <td v-text="parseFloat(classResult.courseThreeOrdinaryScore + classResult.courseThreeExperimentScore + classResult.courseThreeEndingScore).toFixed(2)"></td>
            <td v-text="classResult.courseThreeAchievementDegree"></td>
          </tr>
          <tr v-if="target[0].courseWeightFour!=null">
            <td>课程目标四</td>
            <td v-text="requirement.courseRequirementFour" colspan="4"></td>
            <td v-text="target[0].ordinaryFourTargetScore+target[0].experimentFourTargetScore+target[0].endingFourTargetScore"></td>
            <td v-text="parseFloat(classResult.courseFourOrdinaryScore + classResult.courseFourExperimentScore + classResult.courseFourEndingScore).toFixed(2)"></td>
            <td v-text="classResult.courseFourAchievementDegree"></td>
          </tr>
          <tr v-if="target[0].courseWeightFive!=null">
            <td>课程目标五</td>
            <td v-text="requirement.courseRequirementFive" colspan="4"></td>
            <td v-text="target[0].ordinaryFiveTargetScore+target[0].experimentFiveTargetScore+target[0].endingFiveTargetScore"></td>
            <td v-text="parseFloat(classResult.courseFiveOrdinaryScore + classResult.courseFiveExperimentScore + classResult.courseFiveEndingScore).toFixed(2)"></td>
            <td v-text="classResult.courseFiveAchievementDegree"></td>
          </tr>
          <tr>
            <td>采用的教学方式</td>
            <td colspan="7">
              <input type="radio" value="课堂教学" name="teach">课堂教学
              <input type="radio" name="teach">线上教学
              <input type="radio" name="teach">混合式教学：其中线上 <input class="data" style="
    width: 30px;
    margin-right: 10px;
    border-top: none;
    border-left: none;
    border-right: none;">学时
              <br>
              线上教学部分采用的教学平台 <input class="signName" style="
              border-top: none;
              border-left: none;
              border-right: none;
              margin-right: 20px;">
            </td>
          </tr>
          <tr>
            <td rowspan="3">教学过程中学生学习效果调查（支撑材料）</td>
            <td colspan="2">调查内容</td>
            <td colspan="2">采取方式</td>
            <td>效果</td>
            <td colspan="2">改进措施</td>
          </tr>
          <tr>
            <td colspan="2">
              <el-input class="widthTd"></el-input>
            </td>
            <td colspan="2">
              <el-input class="widthTd"></el-input>
            </td>
            <td>
              <el-input class="widthTd"></el-input>
            </td>
            <td colspan="2">
              <el-input class="widthTd"></el-input>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <el-input class="widthTd"></el-input>
            </td>
            <td colspan="2">
              <el-input class="widthTd"></el-input>
            </td>
            <td>
              <el-input class="widthTd"></el-input>
            </td>
            <td colspan="2">
              <el-input class="widthTd"></el-input>
            </td>
          </tr>
          <tr>
            <td class="widthTd">成绩构成及评分标准</td>
            <td colspan="7"><el-input class="longText"></el-input></td>
          </tr>
          <tr>
            <td class="widthTd">成绩分析(包括成绩异常）及改进措施</td>
            <td colspan="7"><el-input class="longText"></el-input></td>
          </tr>
          <tr>
            <td rowspan="2" class="widthTd">专业负责人审核意见：</td>
            <td colspan="7" style="border: none">
            <el-input class="longText"></el-input>
            </td>
          </tr>
          <tr>
            <td colspan="7" style="text-align: right;border: none" >
              签名： <input type="text" class="signName" style="
              border-top: none;
              border-left: none;
              border-right: none;
              margin-right: 20px;"><input class="data" style="
    width: 30px;
    margin-right: 10px;
    border-top: none;
    border-left: none;
    border-right: none;">年 <input class="data" style="
    width: 30px;
    margin-right: 10px;
    border-top: none;
    border-left: none;
    border-right: none;">月<input class="data" style="
    width: 30px;
    margin-right: 10px;
    border-top: none;
    border-left: none;
    border-right: none;">日
            </td>
          </tr>
        </table>
    </div>
    <br>
    <el-button type="primary" v-print="printObj" id="printButton">打印班级达成度分析报告</el-button>
  </div>
</template>

<!--加上scoped能够防止样式之间的冲突-->
<style scoped>
@import "../assets/courseDegreeReport.css";
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
        extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',
        scanStyles: false
      },
      teacherNumber: sessionStorage.getItem('loginUser'),
      courseName: sessionStorage.getItem('courseName'),
      courseGrade: sessionStorage.getItem('courseGrade'),
      courseMajor: sessionStorage.getItem('courseMajor'),
      courseClass: sessionStorage.getItem('courseClass'),
      target: null,
      requirement: {
        courseRequirementOne: '',
        courseRequirementTwo: '',
        courseRequirementThree: '',
        courseRequirementFour: '',
        courseRequirementFive: ''
      },
      classResult: {
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
      teacher: {
        teacherNumber: this.teacherNumber,
        teacherName: '',
        teacherResearch: '',
        teacherProfessionalTitle: '',
        teacherEducation: ''
      },
      course: {
        courseName: this.courseName,
        courseGrade: this.courseGrade,
        courseMajor: this.courseMajor,
        courseCredit: '',
        courseClassHour: '',
        courseClassification: '',
        courseExaminationMethod: '',
        courseSpecificMethod: ''
      },
      person: {
        excellentAmount: '',
        excellentRatio: '',
        goodAmount: '',
        goodRatio: '',
        averageAmount: '',
        averageRatio: '',
        fairAmount: '',
        fairRatio: '',
        poorAmount: '',
        poorRatio: ''
      },
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
      }]
    }
  },
  created () {
    axios.post('api/getTeacherByNum', {
      teacherNumber: this.teacherNumber
    }).then(res => {
      this.teacher = res.data
    }).catch(function (error) {
      console.log(error)
    })
    axios.post('api/getCourseOne', {
      courseName: this.courseName,
      courseMajor: this.courseMajor,
      courseGrade: this.courseGrade
    }).then(res => {
      this.course = res.data
    }).catch(function (error) {
      console.log(error)
    })
    axios.post('api/getTargetScore', {
      courseName: this.courseName,
      courseMajor: this.courseMajor,
      courseGrade: this.courseGrade
    }).then(res => {
      this.target = res.data
      axios.post('api/getResultScore', {
        courseName: this.courseName,
        studentClass: this.courseClass
      }).then(res => {
        this.resultList = res.data
        this.compute()
      }).catch(function (error) {
        console.log(error)
      })
      axios.post('api/getClassResult', {
        courseName: this.courseName,
        className: this.courseClass
      }).then(res => {
        this.classResult = res.data
      }).catch(function (error) {
        console.log(error)
      })
      axios.post('api/getTargetText', {
        courseName: this.courseName,
        courseMajor: this.courseMajor,
        courseGrade: this.courseGrade
      }).then(res => {
        this.requirement = res.data
      }).catch(function (error) {
        console.log(error)
      })
    }).catch(function (error) {
      console.log(error)
    })
    this.$message('请填写相关条目后下载达成度分析报告')
  },
  methods: {
    compute () {
      this.person.excellentAmount = 0
      this.person.excellentRatio = 0
      this.person.goodAmount = 0
      this.person.goodRatio = 0
      this.person.averageAmount = 0
      this.person.averageRatio = 0
      this.person.fairAmount = 0
      this.person.fairRatio = 0
      this.person.poorAmount = 0
      this.person.poorRatio = 0
      for (let i = 0; i < this.resultList.length; i++) {
        const score = parseFloat(this.resultList[i].courseOneOrdinaryScore + this.resultList[i].courseOneExperimentScore +
          this.resultList[i].courseOneEndingScore + this.resultList[i].courseTwoOrdinaryScore + this.resultList[i].courseTwoExperimentScore +
          this.resultList[i].courseTwoEndingScore + this.resultList[i].courseThreeOrdinaryScore + this.resultList[i].courseThreeExperimentScore +
          this.resultList[i].courseThreeEndingScore + this.resultList[i].courseFourOrdinaryScore + this.resultList[i].courseFourExperimentScore +
          this.resultList[i].courseFourEndingScore + this.resultList[i].courseFiveOrdinaryScore + this.resultList[i].courseFiveExperimentScore +
          this.resultList[i].courseFiveEndingScore)
        console.log(score)
        if (score >= 90 && score < 100) {
          this.person.excellentAmount = this.person.excellentAmount + 1
        } else if (score >= 80 && score < 90) {
          this.person.goodAmount = this.person.goodAmount + 1
        } else if (score >= 70 && score < 80) {
          this.person.averageAmount = this.person.averageAmount + 1
        } else if (score >= 60 && score < 70) {
          this.person.fairAmount = this.person.fairAmount + 1
        } else if (score >= 0 && score < 60) {
          this.person.poorAmount = this.person.poorAmount + 1
        }
      }
      this.person.excellentRatio = parseFloat(this.person.excellentAmount / this.resultList.length * 100).toFixed(2)
      this.person.goodRatio = parseFloat((this.person.goodAmount / this.resultList.length) * 100).toFixed(2)
      this.person.averageRatio = parseFloat(this.person.averageAmount / this.resultList.length * 100).toFixed(2)
      this.person.fairRatio = parseFloat(this.person.fairAmount / this.resultList.length * 100).toFixed(2)
      this.person.poorRatio = parseFloat(this.person.poorAmount / this.resultList.length * 100).toFixed(2)
    }
  }
}
</script>
