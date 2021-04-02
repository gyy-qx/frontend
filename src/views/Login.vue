<template>
  <div>
  <h1>课程目标评价系统 <span>登录</span> </h1>
    <div id="all">
        <input type="text" class="text-input1" placeholder="请输入职工编号" v-model="login_person.user">
        <input type="text" class="text-input1" placeholder="密码" v-model="login_person.password">
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
        <input type="button" value="登录" id="login" @click="login">
        <p id="regist"><u>注册</u></p>
    </div>
</div>
</template>

<!--加上scoped能够防止样式之间的冲突-->
<style>
  @import "../assets/Login.css";
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
    },
    login: function () {
      this.$store.commit('setUser', this.login_person.user)
      console.log(this.$store.state.user)
      axios.post('api/login', {
        user: this.login_person.user,
        password: this.login_person.password,
        id: this.login_person.id
        // headers: { 'content-Type': 'application/json;charset=utf-8' }
      }).then(
        res => {
          if (res.data === 'login success') {
            alert('登录成功')
            router.push('/teacherHomepage')
          } else {
            alert(res.data)
          }
        }).catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>
