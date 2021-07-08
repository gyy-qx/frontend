<template>
    <div id="courseManage">
      <h3>{{researchName}}</h3>
      <hr>
      <div class="block">
          <el-cascader
            ref="cascader"
            v-model="value"
            :options="options"
            :props="{ expandTrigger: 'hover' }"
            @change="handleChange"></el-cascader>
        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        </div>
      <div id="courseList">
      <el-button type="primary" icon="el-icon-plus" @click="addCourse" id="addCourse">添加课程</el-button>
      <el-dialog title="添加课程" :visible.sync="dialogVisible">
        课程名称<el-input v-model="courseName"></el-input>
        <p>添加封面</p>
        <el-upload
          class="coverAvatar-uploader"
          action="http://localhost:8080/uploadCover"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <!--        <img :src = imageUrl class="avatar" />-->
          <el-popover placement="right" trigger="hover">
            <img :src= "imageUrl" style="width: 300px;height: 300px">
            <img slot="reference" :src= "imageUrl" class="coverAvatar">
          </el-popover>
          <!--        <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
        </el-upload>
        <p>年级</p><el-select v-model="courseGrade" placeholder="选择年级">
          <el-option v-for="(item,index) in gradeList"
                     :key="index"
                     :value="item"></el-option>
        </el-select>
        <p>任课教师</p><el-select v-model="courseTeacher" placeholder="选择任课教师">
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
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="insertCourse">确 定</el-button>
        </div>
      </el-dialog>
        <div v-for="(course1,index) in courseList" :key="index" class="courseBack">
          <button @click="into(index)" class="intoButton">
            <!--        <router-link :to="{name:'Submit',params:{courseName: course1.courseName,courseGrade:course1.courseGrade,courseMajor:course1.courseMajor}}">-->
<!--            <el-popover placement="right" trigger="hover">-->
<!--              <img :src= "'http://localhost:8080/coverImg/' + course1.courseCover" style="width: 300px;height: 300px">-->
              <img slot="reference" :src= "'http://localhost:8080/coverImg/' + course1.courseCover" class="avatarOne">
<!--            </el-popover>-->
            <p>{{course1.courseGrade}}</p>
            <p>{{course1.courseName}}</p>
            <p>{{course1.courseMajor}}</p>
          </button>
        </div>
      </div>
    </div>
</template>

<!--加上scoped能够防止样式之间的冲突-->
<style scoped>
  @import "../assets/courseManage.css";
</style>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      value: [],
      options: [{
        value: 'grade',
        label: '按照年级',
        children: [{
          value: Object,
          label: Object
        }]
      },
      {
        value: 'teacher',
        label: '按照教师',
        children: []
      }],
      imageUrl: '',
      pathImg: '',
      user: '',
      researchName: '',
      valueOne: '',
      valueTwo: '',
      courseName: '',
      courseTeacher: '',
      courseGrade: '',
      dialogVisible: false,
      gradeList: '',
      researchTeacherList: '',
      teacherList: '',
      courseList: [
        {
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
        }
      ]
    }
  },
  created () {
    this.user = sessionStorage.getItem('loginUser')
    console.log(this.user)
    axios.post('api/getResearch', {
      teacherNumber: this.user
    }).then(res => {
      this.researchName = res.data
      axios.post('api/selectCourseByMajor', {
        researchName: this.researchName
      }).then(res => {
        this.courseList = res.data
      }).catch(function (error) {
        console.log(error)
      })
    }).catch(function (error) {
      console.log(error)
    })
    axios.get('api/getGrade').then(res => {
      this.gradeList = res.data
      // this.options[0].children = this.gradeList
      // children是对象数组，gradeList是字符串数组，不能直接赋值
      for (let i = 0; i < this.gradeList.length; i++) {
        this.options[0].children = this.gradeList.map(item => {
          return {
            value: item,
            label: item
          }
        })
      }
    }).catch(function (error) {
      console.log(error)
    })
    axios.get('api/getWholeTeacher').then(res => {
      this.teacherList = res.data
      // children是对象数组，gradeList是字符串数组，不能直接赋值
      for (let i = 0; i < this.teacherList.length; i++) {
        this.options[1].children = this.teacherList.map(item => {
          return {
            value: item,
            label: item
          }
        })
      }
    }).catch(function (error) {
      console.log(error)
    })
  },
  methods: {
    into (index) {
      this.$router.push({ name: 'CourseUpdate' })
      sessionStorage.setItem('courseName', this.courseList[index].courseName)
      sessionStorage.setItem('courseMajor', this.courseList[index].courseMajor)
      sessionStorage.setItem('courseGrade', this.courseList[index].courseGrade)
    },
    search () {
      if (this.valueOne === 'grade') {
        axios.post('api/getAllCourse', {
          researchName: this.researchName,
          courseGrade: this.valueTwo
        }).then(res => {
          this.courseList = res.data
        }).catch(function (error) {
          console.log(error)
        })
      } else {
        axios.post('api/getTeacherNum', {
          teacherName: this.valueTwo
        }).then(res => {
          axios.post('api/scoreCreated', {
            teacherNum: res.data
          }).then(res => {
            this.courseList = res.data
          }).catch(function (error) {
            console.log(error)
          })
        }).catch(function (error) {
          console.log(error)
        })
      }
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.pathImg = res
    },
    handleChange (value) {
      console.log(value)
      this.valueOne = value[0]
      this.valueTwo = value[1]
    },
    addCourse () {
      this.dialogVisible = true
      axios.get('api/getWholeTeacher').then(res => {
        this.teacherList = res.data
      }).catch(function (error) {
        console.log(error)
      })
      axios.post('api/getAllTeacher', {
        teacherNumber: this.user
      }).then(res => {
        this.researchTeacherList = res.data
        console.log(this.researchTeacherList)
      }).catch(function (error) {
        console.log(error)
      })
    },
    insertCourse () {
      axios.post('api/insertCourse', {
        researchName: this.researchName,
        courseName: this.courseName,
        courseGrade: this.courseGrade,
        courseTeacher: this.courseTeacher,
        courseCover: this.pathImg
      }).then(res => {
        if (res.data === '添加成功') {
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
      this.dialogVisible = false
    }
  }
}
</script>
