<template>
  <div id="firstPage">
    <h3>我教的课<span>{{user}}</span></h3>
    <el-button @click="drawer = true">测试</el-button>
    <el-button @click="drawer = true" type="primary" style="margin-left: 16px;" v-for="(course1,index) in courseList" :key="index" >
      {{course1}}
    </el-button>
    <el-drawer
      title="教学大纲"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
      size="80%">
      <h4>一、基本信息</h4>
      <table border="1">
        <tr>
          <td>课程名称（中文）</td>
          <td><input type="text" class="mes" v-model="course.courseName"></td>
        </tr>
        <tr>
          <td>课程名称（英文）</td>
          <td><input type="text" class="mes" v-model="course.courseEnglish"></td>
        </tr>
        <tr>
          <td>课程类别</td>
          <td>
            <input type="radio" name="Classification" @click="GetClassification" value="公共选修课">公共选修课
            <input type="radio" name="Classification" @click="GetClassification" value="专业基础课">专业基础课
            <input type="radio" name="Classification" @click="GetClassification" value="专业核心课">专业核心课
            <input type="radio" name="Classification" @click="GetClassification" value="专业选修课">专业选修课
            <input type="radio" name="Classification" @click="GetClassification" value="文化素质选修课">文化素质选修课
          </td>
        </tr>
        <tr>
          <td>课程性质</td>
          <td>
            <input type="radio" name="Character" @click="GetCharacter" value="必修">必修
            <input type="radio" name="Character" @click="GetCharacter" value="选修">选修
          </td>
          <td>开课学期</td>
          <td><input type="text" placeholder="第XX学期" class="mes" v-model="course.courseTerm"></td>
        </tr>
        <tr>
          <td>学分</td>
          <td><input type="text" placeholder="填写数字" class="mes" v-model="course.courseCredit"></td>
          <td>学时</td>
          <td><input type="text" placeholder="填写数字" class="mes" v-model="course.courseClassHour"></td>
        </tr>
        <tr>
          <td>适用专业</td>
          <td><input type="text" class="mes" v-model="course.courseMajor"></td>
          <td>先修课程</td>
          <td><input type="text" class="mes" v-model="course.courseAdvancedPlacement"></td>
        </tr>
        <tr>
          <td>考核方式</td>
          <td>
            <input type="radio" name="ExaminationMethod" @click="GetExaminationMethod" value="考试">考试
            <input type="radio" name="ExaminationMethod" @click="GetExaminationMethod" value="考察">考察
          </td>
          <td>
            <input type="radio" name="SpecificMethod" @click="GetSpecificMethod" value="开卷">开卷
            <input type="radio" name="SpecificMethod" @click="GetSpecificMethod" value="闭卷">闭卷
            <input type="radio" name="SpecificMethod" @click="GetSpecificMethod" value="其他">其他
            <input type="radio" name="SpecificMethod" @click="GetSpecificMethod" value="考试">考试
            <input type="radio" name="SpecificMethod" @click="GetSpecificMethod" value="答辩">答辩
            <input type="radio" name="SpecificMethod" @click="GetSpecificMethod" value="论文">论文
            <input type="radio" name="SpecificMethod" @click="GetSpecificMethod" value="其他">其他
          </td>
        </tr>
        <tr>
          <td>撰写人</td>
          <td><input type="text" class="mes" v-model="course.courseTeacher"></td>
          <td>审核人</td>
          <td><input type="text" class="mes"></td>
        </tr>
      </table>
      <h4>二、课程教学目标</h4>
      <table border="1">
        <tr>
          <td></td>
          <td>课程目标内容</td>
          <td>支撑的毕业要求</td>
        </tr>
        <tr>
          <td>课程目标1</td>
          <td><input type="textarea" class="area" v-model="character.courseTargetOne"></td>
          <td><input type="textarea" class="area" v-model="character.courseRequirementOne"></td>
        </tr>
        <tr>
          <td>课程目标2</td>
          <td><input type="textarea" class="area" v-model="character.courseTargetTwo"></td>
          <td><input type="textarea" class="area" v-model="character.courseRequirementTwo"></td>
        </tr>
        <tr>
          <td>课程目标3</td>
          <td><input type="textarea" class="area" v-model="character.courseTargetThree"></td>
          <td><input type="textarea" class="area" v-model="character.courseRequirementThree"></td>
        </tr>
        <tr>
          <td>课程目标4</td>
          <td><input type="textarea" class="area" v-model="character.courseTargetFour"></td>
          <td><input type="textarea" class="area" v-model="character.courseRequirementFour"></td>
        </tr>
        <tr>
          <td>课程目标5</td>
          <td><input type="textarea" class="area" v-model="character.courseTargetFive"></td>
          <td><input type="textarea" class="area" v-model="character.courseRequirementFive"></td>
        </tr>
      </table>
      <h4>三、课程考核</h4>
      <table border="1">
        <!--        考核细则表不再生成，页面设计时看是否能做成随课程信息生成-->
        <tr>
          <td colspan="2">课程目标/课程目标权重ri</td>
          <td>1/r1=<input type="text" class="ratio" v-model="target.courseWeightOne"></td>
          <td>2/r2=<input type="text" class="ratio" v-model="target.courseWeightTwo"></td>
          <td>3/r3=<input type="text" class="ratio" v-model="target.courseWeightThree"></td>
          <td>4/r4=<input type="text" class="ratio" v-model="target.courseWeightFour"></td>
          <td>5/r5=<input type="text" class="ratio" v-model="target.courseWeightFive"></td>
        </tr>
        <tr>
          <td>平时成绩</td>
          <td>【】/<input type="text" class="ratio" v-model="target.courseOrdinaryTargetScore"></td>
          <td>A1【】/<input type="text" class="ratio" v-model="target.ordinaryOneTargetScore"></td>
          <td>A2【】/<input type="text" class="ratio" v-model="target.ordinaryTwoTargetScore"></td>
          <td>A3【】/<input type="text" class="ratio" v-model="target.ordinaryThreeTargetScore"></td>
          <td>A4【】/<input type="text" class="ratio" v-model="target.ordinaryFourTargetScore"></td>
          <td>A5【】/<input type="text" class="ratio" v-model="target.ordinaryFiveTargetScore"></td>
        </tr>
        <tr>
          <td>实验成绩</td>
          <td>【】/<input type="text" class="ratio" v-model="target.courseExperimentTargetScore"></td>
          <td>B1【】/<input type="text" class="ratio" v-model="target.experimentOneTargetScore"></td>
          <td>B2【】/<input type="text" class="ratio" v-model="target.experimentTwoTargetScore"></td>
          <td>B3【】/<input type="text" class="ratio" v-model="target.experimentThreeTargetScore"></td>
          <td>B4【】/<input type="text" class="ratio" v-model="target.experimentFourTargetScore"></td>
          <td>B5【】/<input type="text" class="ratio" v-model="target.experimentFiveTargetScore"></td>
        </tr>
        <tr>
          <td>结课成绩</td>
          <td>【】/<input type="text" class="ratio" v-model="target.courseEndingTargetScore"></td>
          <td>C1【】/<input type="text" class="ratio" v-model="target.endingOneTargetScore"></td>
          <td>C2【】/<input type="text" class="ratio" v-model="target.endingTwoTargetScore"></td>
          <td>C3【】/<input type="text" class="ratio" v-model="target.endingThreeTargetScore"></td>
          <td>C4【】/<input type="text" class="ratio" v-model="target.endingFourTargetScore"></td>
          <td>C5【】/<input type="text" class="ratio" v-model="target.endingFiveTargetScore"></td>
        </tr>
        <tr>
          <td colspan="2">课程对毕业要求指标点的支撑度Sij</td>
          <td colspan="5">S=（∑Ai+∑Bi+∑Ci）/100</td>
        </tr>
        <tr>
          <td colspan="2">课程目标达成度Ri</td>
          <td>R1=（A1+B1+c1）/{{targetR1}}</td>
          <td>R2=（A2+B2+c2）/{{targetR2}}</td>
          <td>R3=（A3+B3+c3）/{{targetR3}}</td>
          <td>R4=（A4+B4+c4）/{{targetR4}}</td>
          <td>R5=（A5+B5+c5）/{{targetR5}}</td>
        </tr>
        <tr>
          <td colspan="2">课程达成度R</td>
          <td colspan="5">R=r1R1+r2R2+r3R3+r4R4+r5R5</td>
        </tr>
      </table>
      <p id="annotate">注：
        1、根据教学大纲要求，本表由任课教师给出分数；达成度计算由任课教师完成；
        2、表中 Ai 为平时成绩对应于各毕业要求指标点的分值；Bi 为过程成绩对应于各毕业要求指标点的分值；Ci 为
        结课成绩 对应于各毕业要求指标点的分值；Sij 为课程对毕业要求指标点 i.j 的支撑度；Ri 为课程目标 i 的达成
        度；R 为课程达成度；
        3、 表中【】内由任课教师填写学生在相应考核点取得的分值；/后的数字代表相应考核点的满分值</p>
      <br>
      <br>
      <el-button type="primary" @click="submit">提交<i class="el-icon-upload el-icon--right"></i></el-button>
    </el-drawer>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'FirstPage.vue',
  data () {
    return {
      drawer: false,
      direction: 'rtl',
      user: this.$store.state.user,
      courseList: null,
      course: {
        courseName: '',
        courseEnglish: '',
        courseClassification: '',
        courseCharacter: '',
        courseTerm: '',
        courseCredit: '',
        courseClassHour: '',
        courseMajor: '',
        courseExaminationMethod: '',
        courseSpecificMethod: '',
        courseAdvancedPlacement: '',
        courseTeacher: ''
      },
      character: {
        courseTargetOne: '',
        courseTargetTwo: '',
        courseTargetThree: '',
        courseTargetFour: '',
        courseTargetFive: '',
        courseRequirementOne: '',
        courseRequirementTwo: '',
        courseRequirementThree: '',
        courseRequirementFour: '',
        courseRequirementFive: ''
      },
      target: {
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
      },
      targetR1: '',
      targetR2: '',
      targetR3: '',
      targetR4: '',
      targetR5: ''
    }
  },
  created () {
    axios.post('api/scoreCreated', {
      teacherNum: this.user
    }).then(res => {
      console.log(res.data)
      this.courseList = res.data
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
    GetClassification (event) {
      this.course.courseClassification = event.target.value
      console.log(this.course.courseClassification)
    },
    GetCharacter (event) {
      this.course.courseCharacter = event.target.value
    },
    GetExaminationMethod (event) {
      this.course.GetExaminationMethod = event.target.value
    },
    GetSpecificMethod (event) {
      this.course.courseSpecificMethod = event.target.value
    },
    submit () {
      axios.post('api/scoreRatio', {
        course: {
          courseName: this.course.courseName,
          courseEnglish: this.course.courseEnglish,
          courseClassification: this.course.courseClassification,
          courseCharacter: this.course.courseCharacter,
          courseTerm: this.course.courseTerm,
          courseCredit: this.course.courseCredit,
          courseClassHour: this.course.courseClassHour,
          courseMajor: this.course.courseMajor,
          courseExaminationMethod: this.course.courseExaminationMethod,
          courseSpecificMethod: this.course.courseSpecificMethod,
          courseAdvancedPlacement: this.course.courseAdvancedPlacement,
          courseTeacher: this.user
        },
        character: {
          courseName: this.course.courseName,
          courseTargetOne: this.character.courseTargetOne,
          courseTargetTwo: this.character.courseTargetTwo,
          courseTargetThree: this.character.courseTargetThree,
          courseTargetFour: this.character.courseTargetFour,
          courseTargetFive: this.character.courseTargetFive,
          courseRequirementOne: this.character.courseRequirementOne,
          courseRequirementTwo: this.character.courseRequirementTwo,
          courseRequirementThree: this.character.courseRequirementThree,
          courseRequirementFour: this.character.courseRequirementFour,
          courseRequirementFive: this.character.courseRequirementFive
        },
        target: {
          courseWeightOne: this.target.courseWeightOne,
          courseWeightTwo: this.target.courseWeightTwo,
          courseWeightThree: this.target.courseWeightThree,
          courseWeightFour: this.target.courseWeightFour,
          courseWeightFive: this.target.courseWeightFive,
          courseOrdinaryTargetScore: this.target.courseOrdinaryTargetScore,
          courseExperimentTargetScore: this.target.courseExperimentTargetScore,
          courseEndingTargetScore: this.target.courseEndingTargetScore,
          ordinaryOneTargetScore: this.target.ordinaryOneTargetScore,
          experimentOneTargetScore: this.target.experimentOneTargetScore,
          endingOneTargetScore: this.target.endingOneTargetScore,
          ordinaryTwoTargetScore: this.target.ordinaryTwoTargetScore,
          experimentTwoTargetScore: this.target.experimentTwoTargetScore,
          endingTwoTargetScore: this.target.endingTwoTargetScore,
          ordinaryThreeTargetScore: this.ordinaryThreeTargetScore,
          experimentThreeTargetScore: this.target.experimentThreeTargetScore,
          endingThreeTargetScore: this.target.endingThreeTargetScore,
          ordinaryFourTargetScore: this.target.ordinaryFourTargetScore,
          experimentFourTargetScore: this.target.experimentFourTargetScore,
          endingFourTargetScore: this.target.endingFourTargetScore,
          ordinaryFiveTargetScore: this.target.ordinaryFiveTargetScore,
          experimentFiveTargetScore: this.target.experimentFiveTargetScore,
          endingFiveTargetScore: this.target.endingFiveTargetScore
        }
      }).then(res => {
      }).catch(function (error) {
        console.log(error)
      })
    }
  },
  watch: {
    'target.ordinaryOneTargetScore': function () {
      this.targetR1 = parseInt(this.target.ordinaryOneTargetScore) + parseInt(this.target.experimentOneTargetScore) + parseInt(this.target.endingOneTargetScore)
    },
    'target.experimentOneTargetScore': function () {
      this.targetR1 = parseInt(this.target.ordinaryOneTargetScore) + parseInt(this.target.experimentOneTargetScore) + parseInt(this.target.endingOneTargetScore)
    },
    'target.endingOneTargetScore': function () {
      this.targetR1 = parseInt(this.target.ordinaryOneTargetScore) + parseInt(this.target.experimentOneTargetScore) + parseInt(this.target.endingOneTargetScore)
    },
    'target.ordinaryTwoTargetScore': function () {
      this.targetR2 = parseInt(this.target.ordinaryTwoTargetScore) + parseInt(this.target.experimentTwoTargetScore) + parseInt(this.target.endingTwoTargetScore)
    },
    'target.experimentTwoTargetScore': function () {
      this.targetR2 = parseInt(this.target.ordinaryTwoTargetScore) + parseInt(this.target.experimentTwoTargetScore) + parseInt(this.target.endingTwoTargetScore)
    },
    'target.endingTwoTargetScore': function () {
      this.targetR2 = parseInt(this.target.ordinaryTwoTargetScore) + parseInt(this.target.experimentTwoTargetScore) + parseInt(this.target.endingTwoTargetScore)
    },
    'target.ordinaryThreeTargetScore': function () {
      this.targetR3 = parseInt(this.target.ordinaryThreeTargetScore) + parseInt(this.target.experimentThreeTargetScore) + parseInt(this.target.endingThreeTargetScore)
    },
    'target.experimentThreeTargetScore': function () {
      this.targetR3 = parseInt(this.target.ordinaryThreeTargetScore) + parseInt(this.target.experimentThreeTargetScore) + parseInt(this.target.endingThreeTargetScore)
    },
    'target.endingThreeTargetScore': function () {
      this.targetR3 = parseInt(this.target.ordinaryThreeTargetScore) + parseInt(this.target.experimentThreeTargetScore) + parseInt(this.target.endingThreeTargetScore)
    },
    'target.ordinaryFourTargetScore': function () {
      this.targetR4 = parseInt(this.target.ordinaryFourTargetScore) + parseInt(this.target.experimentFourTargetScore) + parseInt(this.target.endingFourTargetScore)
    },
    'target.experimentFourTargetScore': function () {
      this.targetR4 = parseInt(this.target.ordinaryFourTargetScore) + parseInt(this.target.experimentFourTargetScore) + parseInt(this.target.endingFourTargetScore)
    },
    'target.endingFourTargetScore': function () {
      this.targetR4 = parseInt(this.target.ordinaryFourTargetScore) + parseInt(this.target.experimentFourTargetScore) + parseInt(this.target.endingFourTargetScore)
    },
    'target.ordinaryFiveTargetScore': function () {
      this.targetR5 = parseInt(this.target.ordinaryFiveTargetScore) + parseInt(this.target.experimentFiveTargetScore) + parseInt(this.target.endingFiveTargetScore)
    },
    'target.experimentFiveTargetScore': function () {
      this.targetR5 = parseInt(this.target.ordinaryFiveTargetScore) + parseInt(this.target.experimentFiveTargetScore) + parseInt(this.target.endingFiveTargetScore)
    },
    'target.endingFiveTargetScore': function () {
      this.targetR5 = parseInt(this.target.ordinaryFiveTargetScore) + parseInt(this.target.experimentFiveTargetScore) + parseInt(this.target.endingFiveTargetScore)
    }
  }
}
</script>

<style scoped>
  @import "../assets/firstPage.css";
</style>
