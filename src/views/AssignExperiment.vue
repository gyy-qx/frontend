<template>
  <div id="assignOrdinary">
    <h1>{{courseName}} <span>{{courseMajor}}{{courseGrade}}</span>  </h1>
    <div id="targetText">
      <p class="strong" v-if="targetText.courseTargetOne!=null&&targetText.courseTargetOne.length!=0">课程目标一：<span v-text="targetText.courseTargetOne"></span> </p>
      <p class="strong" v-if="targetText.courseTargetTwo!=null&&targetText.courseTargetTwo.length!=0">课程目标二：<span v-text="targetText.courseTargetTwo"></span></p>
      <p class="strong" v-if="targetText.courseTargetThree!=null&&targetText.courseTargetThree.length!=0">课程目标三：<span v-text="targetText.courseTargetThree"></span></p>
      <p class="strong" v-if="targetText.courseTargetFour!=null&&targetText.courseTargetFour.length!=0">课程目标四：<span v-text="targetText.courseTargetFour"></span></p>
      <p class="strong" v-if="targetText.courseTargetFive!=null&&targetText.courseTargetFive.length!=0">课程目标五：<span v-text="targetText.courseTargetFive"></span></p>
    </div>
    <table>
      <tr><el-button type="primary" icon="el-icon-plus" @click="dialogVisible1 = true">添加实验（测验）题目</el-button></tr>
      <tr>
        <td style="width: 100px">考核类别</td>
        <td style="width: 100px">实验（测验）序号</td>
        <td style="width: 200px">实验（测验）内容</td>
        <td style="width: 200px" v-if="target[0].experimentOneTargetScore!==null&&target[0].experimentOneTargetScore!==0">是否支撑课程目标一</td>
        <td style="width: 200px" v-if="target[0].experimentTwoTargetScore!==null&&target[0].experimentTwoTargetScore!==0">是否支撑课程目标二</td>
        <td style="width: 200px" v-if="target[0].experimentThreeTargetScore!==null&&target[0].experimentThreeTargetScore!==0">是否支撑课程目标三</td>
        <td style="width: 200px" v-if="target[0].experimentFourTargetScore!==null&&target[0].experimentFourTargetScore!==0">是否支撑课程目标四</td>
        <td style="width: 200px" v-if="target[0].experimentFiveTargetScore!==null&&target[0].experimentFiveTargetScore!==0">是否支撑课程目标五</td>
        <td style="width: 200px" colspan="2">操作</td>
      </tr>
      <tr v-for="(pro,index) in processList" :key="index">
        <td><el-input v-model="pro.processClassification" disabled="disabled"></el-input></td>
        <td><el-input v-model="pro.processNumber"></el-input></td>
        <td><a href="javascript:void(0);" @click="contentLook(index)">{{pro.processContent | length(8) }}</a></td>
        <td v-if="target[0].experimentOneTargetScore!==null&&target[0].experimentOneTargetScore!==0&&pro.ifCourseOne==='true'"><el-checkbox v-model="checked">支撑</el-checkbox></td>
        <td v-else-if="target[0].experimentOneTargetScore!==null&&target[0].experimentOneTargetScore!==0&&(pro.ifCourseOne.length===0||pro.ifCourseOne==='false')"><el-checkbox>支撑</el-checkbox></td>
        <td v-if="target[0].experimentTwoTargetScore!==null&&target[0].experimentTwoTargetScore!==0&&pro.ifCourseTwo==='true'"><el-checkbox v-model="checked">支撑</el-checkbox></td>
        <td v-else-if="target[0].experimentTwoTargetScore!==null&&target[0].experimentTwoTargetScore!==0&&(pro.ifCourseTwo.length===0||pro.ifCourseTwo==='false')"><el-checkbox>支撑</el-checkbox></td>
        <td v-if="target[0].experimentThreeTargetScore!==null&&target[0].experimentThreeTargetScore!==0&&pro.ifCourseThree==='true'"><el-checkbox v-model="checked">支撑</el-checkbox></td>
        <td v-else-if="target[0].experimentThreeTargetScore!==null&&target[0].experimentThreeTargetScore!==0&&(pro.ifCourseThree.length===0||pro.ifCourseThree==='false')"><el-checkbox>支撑</el-checkbox></td>
        <td v-if="target[0].experimentFourTargetScore!==null&&target[0].experimentFourTargetScore!==0&&pro.ifCourseFour==='true'"><el-checkbox v-model="checked">支撑</el-checkbox></td>
        <td v-else-if="target[0].experimentFourTargetScore!==null&&target[0].experimentFourTargetScore!==0&&(pro.ifCourseFour.length===0||pro.ifCourseFour==='false')"><el-checkbox>支撑</el-checkbox></td>
        <td v-if="target[0].experimentFiveTargetScore!==null&&target[0].experimentFiveTargetScore!==0&&pro.ifCourseFive==='true'"><el-checkbox v-model="checked">支撑</el-checkbox></td>
        <td v-else-if="target[0].experimentFiveTargetScore!==null&&target[0].experimentFiveTargetScore!==0&&(pro.ifCourseFive.length===0||pro.ifCourseFive==='false')"><el-checkbox>支撑</el-checkbox></td>
        <td><el-button type="primary" @click="submitDisplay(index)">提交实验（测验）成绩</el-button></td>
        <td><el-button type="danger" @click="deleteTr(index)">删除</el-button></td>
      </tr>
    </table>
    <el-dialog title="添加实验（测验）题目" :visible.sync="dialogVisible1">
      <table>
        <td>考核类别</td>
        <td>实验（测验）序号</td>
        <td>实验（测验）内容</td>
        <td v-if="target[0].experimentOneTargetScore!==null&&target[0].experimentOneTargetScore!==0">是否支撑课程目标一</td>
        <td v-if="target[0].experimentTwoTargetScore!==null&&target[0].experimentTwoTargetScore!==0">是否支撑课程目标二</td>
        <td v-if="target[0].experimentThreeTargetScore!==null&&target[0].experimentThreeTargetScore!==0">是否支撑课程目标三</td>
        <td v-if="target[0].experimentFourTargetScore!==null&&target[0].experimentFourTargetScore!==0">是否支撑课程目标四</td>
        <td v-if="target[0].experimentFiveTargetScore!==null&&target[0].experimentFiveTargetScore!==0">是否支撑课程目标五</td>
        <tr>
          <td><el-input v-model="process.processClassification" disabled="disabled"></el-input></td>
          <td><el-input v-model="process.processNumber" maxlength="6" οninput="value=value.replace(/[^\d]/g,'')" placeholder="填写小写数字"></el-input></td>
          <td>
            <el-input
              type="textarea"
              :rows="6"
              :cols="80"
              placeholder="请输入内容"
              v-model="process.processContent"
              maxlength="200"
              show-word-limit
            >
            </el-input>
          </td>
          <td v-if="target[0].experimentOneTargetScore!==null&&target[0].experimentOneTargetScore!==0"><el-checkbox v-model="process.ifCourseOne">支撑</el-checkbox></td>
          <td v-if="target[0].experimentTwoTargetScore!==null&&target[0].experimentTwoTargetScore!==0"><el-checkbox v-model="process.ifCourseTwo">支撑</el-checkbox></td>
          <td v-if="target[0].experimentThreeTargetScore!==null&&target[0].experimentThreeTargetScore!==0"><el-checkbox v-model="process.ifCourseThree">支撑</el-checkbox></td>
          <td v-if="target[0].experimentFourTargetScore!==null&&target[0].experimentFourTargetScore!==0"><el-checkbox v-model="process.ifCourseFour">支撑</el-checkbox></td>
          <td v-if="target[0].experimentFiveTargetScore!==null&&target[0].experimentFiveTargetScore!==0"><el-checkbox v-model="process.ifCourseFive">支撑</el-checkbox></td>
        </tr>
      </table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="insertProcessText">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="提交实验（测验）成绩" :visible.sync="dialogVisible2">
      <table class="resultScoreTable">
        <tr>请以百分制打分</tr>
        <tr>
          <th>学号</th>
          <th>班级</th>
          <th>姓名</th>
          <th>任务成绩</th>
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
    <el-dialog title="更新实验（测验）成绩" :visible.sync="dialogVisible3">
      <table class="resultScoreTable">
        <tr>请以百分制打分</tr>
        <tr>
          <th>学号</th>
          <th>班级</th>
          <th>姓名</th>
          <th>任务成绩</th>
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
    <el-dialog title="查看任务详情" :visible.sync="dialogVisible4">
      <div>题目：{{contentPlay.Classification}}{{contentPlay.number}}</div>
      <br>
      <div>内容：{{contentPlay.content}}</div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible4 = false">确  认</el-button>
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
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3: false,
      dialogVisible4: false,
      processNumber: '',
      courseName: sessionStorage.getItem('courseName'),
      courseGrade: sessionStorage.getItem('courseGrade'),
      courseMajor: sessionStorage.getItem('courseMajor'),
      targetText: {
        courseTargetOne: '',
        courseTargetTwo: '',
        courseTargetThree: '',
        courseTargetFour: '',
        courseTargetFive: ''
      },
      contentPlay: {
        Classification: '',
        number: '',
        content: ''
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
        processClassification: '实验（测验）',
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
        experimentOneTargetScore: '',
        experimentTwoTargetScore: '',
        experimentThreeTargetScore: '',
        experimentFourTargetScore: '',
        experimentFiveTargetScore: ''
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
      processClassification: '实验（测验）'
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
  filters: {
    length (value, num) {
      return value.slice(0, num) + '...'
    }
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
        processClassification: '实验（测验）',
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
    contentLook (index) {
      this.dialogVisible4 = true
      this.contentPlay.Classification = this.processList[index].processClassification
      this.contentPlay.number = this.processList[index].processNumber
      this.contentPlay.content = this.processList[index].processContent
    },
    insertProcessText () {
      this.dialogVisible1 = false
      axios.post('api/insertProcessText', {
        courseName: sessionStorage.getItem('courseName'),
        courseGrade: sessionStorage.getItem('courseGrade'),
        courseMajor: sessionStorage.getItem('courseMajor'),
        processClassification: '实验（测验）',
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
        processClassification: '实验（测验）',
        processNumber: this.processNumber
      }).then(res => {
        if (res.data.length === 0) {
          this.dialogVisible2 = true
          axios.post('api/getStudentByGrade', {
            courseMajor: sessionStorage.getItem('courseMajor'),
            courseGrade: sessionStorage.getItem('courseGrade')
          }).then(res => {
            this.processScoreList = res.data
            this.processScoreList.sort(this.compare('studentClass'))
          }).catch(function (error) {
            console.log(error)
          })
        } else {
          this.dialogVisible3 = true
          this.processScoreList = res.data
          this.processScoreList.sort(this.compare('studentClass'))
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
        this.processScoreList[i].processClassification = '实验（测验）'
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
