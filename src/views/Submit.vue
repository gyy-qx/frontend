<template>
    <div id="submitOrl">
        <h4 class="submitTitle">一、基本信息</h4>
        <table border="1" class="SubmitTable">
          <tr>
            <td>课程名称（中文）</td>
            <td colspan="3" v-text="course.courseName"></td>
          </tr>
          <tr>
            <td>课程名称（英文）</td>
            <td colspan="3"><input type="text" class="mes" v-model="course.courseEnglish"></td>
          </tr>
          <tr>
            <td>课程封面</td>
            <td colspan="3" style="text-align: center">
              <el-upload
                class="avatar-uploader"
                action="http://localhost:8080/uploadCover"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
              >
                <!--        <img :src = imageUrl class="avatar" />-->
                <el-popover placement="right" trigger="hover">
                  <img :src= "imageUrl" style="width: 300px;height: 300px">
                  <img slot="reference" :src= "imageUrl" class="avatar">
                </el-popover>
                <!--        <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
              </el-upload>
            </td>
          </tr>
          <tr>
            <td>课程类别</td>
            <td colspan="3">
              <input type="radio" name="Classification" v-model="course.courseClassification" value="公共选修课">公共选修课
              <input type="radio" name="Classification" v-model="course.courseClassification" value="专业基础课">专业基础课
              <input type="radio" name="Classification" v-model="course.courseClassification" value="专业核心课">专业核心课
              <input type="radio" name="Classification" v-model="course.courseClassification" value="专业选修课">专业选修课
              <input type="radio" name="Classification" v-model="course.courseClassification" value="文化素质选修课">文化素质选修课
            </td>
          </tr>
          <tr>
            <td>课程性质</td>
            <td>
              <input type="radio" name="Character" v-model="course.courseCharacter" value="必修">必修
              <input type="radio" name="Character" v-model="course.courseCharacter" value="选修">选修
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
            <td>
              <input type="text" class="mes" v-model="course.courseApplyMajor">
            </td>
            <td>先修课程</td>
            <td><input type="text" class="mes" v-model="course.courseAdvancedPlacement"></td>
          </tr>
          <tr>
            <td rowspan="2">考核方式</td>
            <td>
              <input type="radio" name="ExaminationMethod" v-model="course.courseExaminationMethod" value="考试">考试
            </td>
            <td colspan="2">
              <input type="radio" name="SpecificMethod" v-model="course.courseSpecificMethod" value="开卷">开卷
              <input type="radio" name="SpecificMethod" v-model="course.courseSpecificMethod" value="闭卷">闭卷
              <input type="radio" name="SpecificMethod" v-model="course.courseSpecificMethod" value="考试其他">其他
            </td>
          </tr>
          <tr>
            <td><input type="radio" name="ExaminationMethod" v-model="course.courseExaminationMethod" value="考察">考察</td>
            <td colspan="2">
              <input type="radio" name="SpecificMethod" v-model="course.courseSpecificMethod" value="考试">考试
              <input type="radio" name="SpecificMethod" v-model="course.courseSpecificMethod" value="答辩">答辩
              <input type="radio" name="SpecificMethod" v-model="course.courseSpecificMethod" value="论文">论文
              <input type="radio" name="SpecificMethod" v-model="course.courseSpecificMethod" value="考察其他">其他
            </td>
          </tr>
          <tr>
            <td>撰写人</td>
            <td><input type="text" class="mes" v-model="course.courseTeacher"></td>
            <td>审核人</td>
            <td><input type="text" class="mes"></td>
          </tr>
        </table>
        <h4 class="submitTitle">二、课程教学目标</h4>
        <table border="1" class="SubmitTable">
          <tr>
            <td></td>
            <td>课程目标内容</td>
            <td>支撑的毕业要求</td>
          </tr>
          <tr>
            <td>课程目标1</td>
            <td>
              <el-input
                type="textarea"
                :rows="6"
                placeholder="请输入内容"
                v-model="character.courseTargetOne"
                maxlength="200"
                show-word-limit
              >
              </el-input>
            </td>
            <td>
              <el-input
                type="textarea"
                :rows="6"
                placeholder="请输入内容"
                v-model="character.courseRequirementOne"
                maxlength="200"
                show-word-limit
              >
              </el-input>
            </td>
          </tr>
          <tr>
            <td>课程目标2</td>
            <td>
              <el-input
                type="textarea"
                :rows="6"
                placeholder="请输入内容"
                v-model="character.courseTargetTwo"
                maxlength="200"
                show-word-limit
              >
              </el-input>
            </td>
            <td>
              <el-input
                type="textarea"
                :rows="6"
                placeholder="请输入内容"
                v-model="character.courseRequirementTwo"
                maxlength="200"
                show-word-limit
              >
              </el-input>
            </td>
          </tr>
          <tr>
            <td>课程目标3</td>
            <td>
              <el-input
                type="textarea"
                :rows="6"
                placeholder="请输入内容"
                v-model="character.courseTargetThree"
                maxlength="200"
                show-word-limit
              >
              </el-input>
              </td>
            <td>
              <el-input
                type="textarea"
                :rows="6"
                placeholder="请输入内容"
                v-model="character.courseRequirementThree"
                maxlength="200"
                show-word-limit
              >
              </el-input>
              </td>
          </tr>
          <tr>
            <td>课程目标4</td>
            <td>
              <el-input
                type="textarea"
                :rows="6"
                placeholder="请输入内容"
                v-model="character.courseTargetFour"
                maxlength="200"
                show-word-limit
              >
              </el-input>
              </td>
            <td>
              <el-input
                type="textarea"
                :rows="6"
                placeholder="请输入内容"
                v-model="character.courseRequirementFour"
                maxlength="200"
                show-word-limit
              >
              </el-input>
              </td>
          </tr>
          <tr>
            <td>课程目标5</td>
            <td>
              <el-input
                type="textarea"
                :rows="6"
                placeholder="请输入内容"
                v-model="character.courseTargetFive"
                maxlength="200"
                show-word-limit
              >
              </el-input>
              </td>
            <td>
              <el-input
                type="textarea"
                :rows="6"
                placeholder="请输入内容"
                v-model="character.courseRequirementFive"
                maxlength="200"
                show-word-limit
              >
              </el-input>
              </td>
          </tr>
        </table>
        <h4 class="submitTitle">三、课程考核</h4>
        <table border="1" class="SubmitTable">
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
        <el-button type="primary" @click="submit" id="submitButton">提交<i class="el-icon-upload el-icon--right"></i></el-button>
    </div>
</template>

<!--加上scoped能够防止样式之间的冲突-->
<style scoped>
  @import "../assets/submit.css";
</style>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      imageUrl: '',
      courseName: sessionStorage.getItem('courseName'),
      courseGrade: sessionStorage.getItem('courseGrade'),
      courseMajor: sessionStorage.getItem('courseMajor'),
      course: {
        courseName: sessionStorage.getItem('courseName'),
        courseCover: '',
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
        courseGrade: '',
        courseMajor: '',
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
    axios.post('api/getCourseInformation', {
      courseName: this.courseName,
      courseGrade: this.courseGrade,
      courseMajor: this.courseMajor
    }).then(res => {
      this.course = res.data
      this.imageUrl = 'http://localhost:8080/coverImg/' + this.course.courseCover
    }).catch(function (error) {
      console.log(error)
    })
    axios.post('api/getCourseCharacter', {
      courseName: this.courseName,
      courseGrade: this.courseGrade,
      courseMajor: this.courseMajor
    }).then(res => {
      if (res.data.length === 0) {
        this.character = []
      } else { this.character = res.data }
    }).catch(function (error) {
      console.log(error)
    })
    axios.post('api/getCourseTarget', {
      courseName: this.courseName,
      courseGrade: this.courseGrade,
      courseMajor: this.courseMajor
    }).then(res => {
      if (res.data.length === 0) {
        this.character = []
      } else {
        this.target = res.data
      }
    }).catch(function (error) {
      console.log(error)
    })
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.course.courseCover = res
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
    },
    submit () {
      console.log(this.target)
      console.log(this.targetText)
      axios.post('api/scoreRatio', {
        course: {
          courseName: this.course.courseName,
          courseCover: this.course.courseCover,
          courseGrade: this.courseGrade,
          courseEnglish: this.course.courseEnglish,
          courseClassification: this.course.courseClassification,
          courseCharacter: this.course.courseCharacter,
          courseTerm: this.course.courseTerm,
          courseCredit: this.course.courseCredit,
          courseClassHour: this.course.courseClassHour,
          courseApplyMajor: this.course.courseApplyMajor,
          courseMajor: this.courseMajor,
          courseExaminationMethod: this.course.courseExaminationMethod,
          courseSpecificMethod: this.course.courseSpecificMethod,
          courseAdvancedPlacement: this.course.courseAdvancedPlacement,
          courseTeacher: this.user
        },
        character: {
          courseName: this.course.courseName,
          courseGrade: this.courseGrade,
          courseMajor: this.courseMajor,
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
          courseName: this.course.courseName,
          courseGrade: this.courseGrade,
          courseMajor: this.courseMajor,
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
          ordinaryThreeTargetScore: this.target.ordinaryThreeTargetScore,
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
        if (res.data === '提交成功') {
          this.$message({
            message: '提交成功',
            type: 'success'
          })
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
