<template>
    <div id="CourseUpdate">
      <h2>课程信息</h2>
      <el-button icon="el-icon-delete"  @click="deleteCourse()" id="deleteButton">删除课程</el-button>
        <table>
          <tr>
            <td>课程名称</td>
            <td><el-input type="text" class="inputCourse" v-model="course.courseName" disabled="disabled"></el-input></td>
            </tr>
            <tr>
          <td>课程封面</td>
          <td>
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
            <td>课程英文名称</td>
            <td><el-input type="text" class="inputCourse" v-model="course.courseEnglish"></el-input></td>
            </tr>
          <tr>
            <td>授课教师</td>
            <td>
              <el-select v-model="teacher" placeholder="选择任课教师">
                <el-option-group label="本教研室教师">
                  <el-option v-for="(item,index) in researchTeacherList"
                             :key="index"
                             :value="item.teacherName">
                  </el-option>
                </el-option-group>
                <el-option-group label="所有教师">
                  <el-option v-for="(item,index) in teacherList"
                             :key="index"
                             :value="item"></el-option>
                </el-option-group>
              </el-select>
            </td>
            </tr>
          <tr>
            <td>课程类别</td>
            <td><el-input type="text" class="inputCourse" v-model="course.courseClassification"></el-input></td>
            </tr>
          <tr>
            <td>课程性质</td>
            <td><el-input type="text" class="inputCourse" v-model="course.courseCharacter"></el-input></td>
            </tr>
          <tr>
            <td>开课学期</td>
            <td><el-input type="text" class="inputCourse" v-model="course.courseTerm"></el-input></td>
            </tr>
          <tr>
            <td>学分</td>
            <td><el-input type="text" class="inputCourse" v-model="course.courseCredit"></el-input></td>
            </tr>
          <tr>
            <td>课程学时</td>
            <td><el-input type="text" class="inputCourse" v-model="course.courseClassHour"></el-input></td>
            </tr>
          <tr>
            <td>课程所属专业</td>
            <td><el-input type="text" class="inputCourse" v-model="course.courseMajor"></el-input></td>
            </tr>
          <tr>
            <td>课程考核方式</td>
            <td><el-input type="text" class="inputCourse" v-model="course.courseExaminationMethod"></el-input></td>
            </tr>
          <tr>
            <td>具体考核方式</td>
            <td><el-input type="text" class="inputCourse" v-model="course.courseSpecificMethod"></el-input></td>
            </tr>
          <tr>
            <td>先修课程</td>
            <td><el-input type="text" class="inputCourse" v-model="course.courseAdvancedPlacement"></el-input></td>
            </tr>
          <tr>
            <td rowspan="2">操作</td>
            <td><el-button type="primary" icon="el-icon-check" @click="updateCourse()">提交修改</el-button>
              <el-button type="primary" icon="el-icon-s-comment" @click="dialogVisible = true">发送邮件</el-button>
            </td>
            </tr>
<!--          <tr>-->
<!--            删除课程<el-button type="danger" icon="el-icon-delete" circle @click="deleteCourse()"></el-button>-->
<!--          </tr>-->
        </table>
      <el-dialog title="发送邮件" :visible.sync="dialogVisible">
        课程名称<el-input v-model="courseName" disabled="disabled"></el-input>
        收件人<el-input v-model="course.courseTeacher" disabled="disabled"></el-input>
        主题<el-input v-model="email.emailTitle"></el-input>
        内容 <br> <textarea name="" id="" cols="100" rows="10" v-model="email.emailContent"></textarea>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addEmail">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<!--加上scoped能够防止样式之间的冲突-->
<style scoped>
  @import "../assets/courseUpdate.css";
</style>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      dialogVisible: false,
      pathImg: '',
      imageUrl: '',
      teacher: '',
      researchTeacherList: [],
      teacherList: [],
      courseName: sessionStorage.getItem('courseName'),
      courseGrade: sessionStorage.getItem('courseGrade'),
      courseMajor: sessionStorage.getItem('courseMajor'),
      course: {
        courseName: '',
        courseCover: '',
        courseGrade: '',
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
      email: {
        courseTeacher: '',
        emailTitle: '',
        emailContent: '',
        emailState: 0,
        emailTime: ''
      }
    }
  },
  created () {
    axios.post('api/getCourseOne', {
      courseName: this.courseName,
      courseMajor: this.courseMajor,
      courseGrade: this.courseGrade
    }).then(res => {
      this.course = res.data
      this.imageUrl = 'http://localhost:8080/coverImg/' + this.course.courseCover
      axios.post('api/getTeacherName', {
        teacherNumber: this.course.courseTeacher
      }).then(res => {
        this.teacher = res.data
      })
    }).catch(function (error) {
      console.log(error)
    })
    axios.get('api/getWholeTeacher').then(res => {
      this.teacherList = res.data
    }).catch(function (error) {
      console.log(error)
    })
    axios.post('api/getAllTeacher', {
      teacherNumber: sessionStorage.getItem('loginUser')
    }).then(res => {
      this.researchTeacherList = res.data
      console.log(this.researchTeacherList)
    }).catch(function (error) {
      console.log(error)
    })
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.course.courseCover = res
    },
    deleteCourse () {
      axios.post('api/deleteCourse', {
        courseName: this.course.courseName,
        courseMajor: this.course.courseMajor,
        courseGrade: this.course.courseGrade
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
      })
    },
    updateCourse () {
      axios.post('api/getTeacherNum', {
        teacherName: this.teacher
      }).then(res => {
        this.course.courseTeacher = res.data
        axios.post('api/updateCourse', {
          courseName: this.course.courseName,
          courseCover: this.course.courseCover,
          courseGrade: this.course.courseGrade,
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
          courseTeacher: this.course.courseTeacher
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
      })
    },
    addEmail () {
      this.dialogVisible = false
      axios.post('api/emailToTeacher', {
        courseName: this.courseName,
        courseMajor: this.courseMajor,
        courseGrade: this.courseGrade,
        courseTeacher: this.course.courseTeacher,
        emailTitle: this.email.emailTitle,
        emailTeacher: sessionStorage.getItem('loginUser'),
        emailContent: this.email.emailContent,
        emailState: this.email.emailState,
        emailTime: this.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
      }).then(res => {
        if (res.data === '发送成功') {
          this.$message({
            message: res.data,
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
  }
}
</script>
