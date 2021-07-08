<template>
  <div id="register" style="margin-top: 200px">
    <p class="first"><span>*</span>基本信息</p>
    <p class="sec" style="display: inline-block">头像</p>
    <div class="hello">
      <el-upload
        class="avatar-uploader"
        style="margin-left: 47%"
        action="http://localhost:8080/upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
    <p class="sec">
      <span>教师工号</span><el-input type="text" style="height: 30px" placeholder="请输入职工编号" v-model="teacher.teacher_number"></el-input>
    </p>
    <p class="sec">
      <span>姓名</span><el-input type="text" style="height: 30px" placeholder="输入你的名字" v-model="teacher.teacher_name"></el-input>
    </p>
    <p class="sec">
      <span>性别</span>
      <select name="sex" id="sex" @click="getSex">
        <option value="男" checked="checked">男</option>
        <option value="女">女</option>
      </select>
    </p>
    <p class="sec">
      <span>联系方式</span><el-input type="text" style="height: 30px" placeholder="请输入电话号码" v-model="teacher.teacher_tel"></el-input>
    </p>
    <p class="sec">
      <span>邮箱</span><el-input type="text" style="height: 30px" placeholder="请输入邮箱" v-model="teacher.teacher_email"></el-input>
    </p>
    <el-button type="primary" @click="next()" class="next">下一步<i class="el-icon-arrow-right el-icon--right"></i></el-button>
  </div>
</template>

<script>
export default {
  name: 'firstStep.vue',
  data () {
    return {
      imageUrl: '',
      pathImg: '',
      researches: null,
      password: '',
      identity: '',
      teacher: {
        teacher_number: '',
        teacher_name: '',
        teacher_sex: '男',
        teacher_professional_title: '',
        teacher_education: '',
        teacher_research: '',
        teacher_tel: '',
        teacher_email: ''
      }
    }
  },
  methods: {
    getSex (event) {
      this.teacher.teacher_sex = event.target.value
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.pathImg = res
    },
    next () {
      const objStr = JSON.stringify(this.teacher)
      sessionStorage.setItem('teacher', [objStr])
      sessionStorage.setItem('pathImg', this.pathImg)
      this.$router.push({ name: 'secondStep' })
    }
  }
}
</script>

<style scoped>
  @import "../assets/signIn.css";
</style>
