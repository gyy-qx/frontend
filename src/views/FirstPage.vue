<template>
  <div id="firstPage">
    <h3>我教的课</h3>
    <hr>
    <div id="course">
      <div v-for="(course1,index) in courseList" :key="index" class="courseBack">
        <button @click="into(index)" class="intoButton">
<!--          <el-popover placement="right" trigger="hover">-->
<!--            <img :src= "'http://localhost:8080/coverImg/' + course1.courseCover" style="width: 300px;height: 300px">-->
            <img slot="reference" :src= "'http://localhost:8080/coverImg/' + course1.courseCover" class="avatarOne">
<!--          </el-popover>-->
        <p>{{course1.courseGrade}}</p>
        <p>{{course1.courseName}}</p>
        <p>{{course1.courseMajor}}</p>
        </button>
      </div>
    </div>
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
      user: '',
      courseList: null,
      courseMajor: '',
      courseGrade: '',
      majorList: [],
      course: {
        courseName: '',
        courseEnglish: '',
        courseClassification: '',
        courseCharacter: '',
        courseTerm: '',
        courseCredit: '',
        courseClassHour: '',
        courseApplyMajor: '',
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
        courseName: '',
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
    this.user = sessionStorage.getItem('loginUser')
    axios.post('api/scoreCreated', {
      teacherNum: this.user
    }).then(res => {
      this.courseList = res.data
    }).catch(function (error) {
      console.log(error)
    })
    axios.get('api/majorCreated').then(res => {
      this.majorList = res.data
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
    into (index) {
      this.$router.push({ name: 'Submit' })
      sessionStorage.setItem('courseName', this.courseList[index].courseName)
      sessionStorage.setItem('courseMajor', this.courseList[index].courseMajor)
      sessionStorage.setItem('courseGrade', this.courseList[index].courseGrade)
    },
    GetClassification (event) {
      this.course.courseClassification = event.target.value
      console.log(this.course.courseClassification)
    },
    GetCharacter (event) {
      this.course.courseCharacter = event.target.value
    },
    GetExaminationMethod (event) {
      this.course.courseExaminationMethod = event.target.value
    },
    GetSpecificMethod (event) {
      this.course.courseSpecificMethod = event.target.value
    }
  }
}
</script>

<style scoped>
  @import "../assets/firstPage.css";
</style>
