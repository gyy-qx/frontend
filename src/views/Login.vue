<template>
  <div id="LoginPage">
  <h2>课程目标评价系统 <span>登录</span> </h2>
    <div id="signIn">
    <div id="toLogin">
      <el-input type="text" class="input1" placeholder="请输入职工编号" v-model="login_person.user"><i slot="prefix" class="el-input__icon el-icon-user"></i></el-input>
      <el-input type="text" class="input1" placeholder="密码" v-model="login_person.password" show-password><i slot="prefix" class="el-input__icon el-icon-s-cooperation"></i></el-input>
      <div class="identity">
        <input type="radio" name="identity" value="teacher" id="teacher" @click="GetIdentity">
        <label for="teacher">教师</label>
      </div>
        <div class="identity">
          <input type="radio" name="identity"  value="teacher_head" id="teacher_head" @click="GetIdentity">
          <label for="teacher_head">教研室主任</label>
        </div>
        <!--        <input type="text" class="input2" placeholder="验证码" v-model="user.code">-->
        <!--        <img class="verify" @click.prevent="refresh" ref="codeImg" alt="验证码" src=""/>-->
        <input type="button" value="登录" id="sign" @click="login">
      <router-link to="/signIn">
        <p id="register"><u>注册</u></p>
      </router-link>
    </div>
    </div>
    <footer>
      @North China University of water resources and hydropower
    </footer>
</div>
</template>

<!--加上scoped能够防止样式之间的冲突-->
<style>
  @import "../assets/login.css";
</style>

<script>
import axios from 'axios'
import router from '../router'

export default {
  name: 'Login',
  data () {
    return {
      login_person: {
        user: '',
        password: '',
        id: ''
      }
    }
  },
  methods: {
    GetIdentity (event) {
      const radioval = event.target.value
      this.login_person.id = radioval
      console.log(this.login_person.id)
    },
    login: function () {
      // this.$store.commit('setUser', this.login_person.user)
      // console.log(this.$store.state.user)
      sessionStorage.setItem('loginUser', this.login_person.user)
      axios.post('api/login', {
        user: this.login_person.user,
        password: this.login_person.password,
        id: this.login_person.id
        // headers: { 'content-Type': 'application/json;charset=utf-8' }
      }).then(
        res => {
          if (res.data === 'login success') {
            this.$message({
              message: '登录成功',
              type: 'success'
            })
            if (this.login_person.id === 'teacher') {
              // localStorage.setItem('teacher', JSON.stringify(this.user))
              router.push('/teacherHomepage')
            } else {
              // localStorage.setItem('teacher', JSON.stringify(this.user))
              router.push('/choice')
            }
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
