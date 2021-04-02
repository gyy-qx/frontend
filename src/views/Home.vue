<template>
  <div>
<!--  <h1>欢迎进入课程目标达成度评价系统</h1>-->
  <p>{{user}}</p>
    <p>{{password}}</p>
    <p>{{id}}</p>
  <button @click="hello">提交</button>
    <br>
    <br>
    <router-link to="/login">
      <button type="link">去登录</button>
    </router-link>
    <br>
    <br>
    <router-link to="/signIn">
      <button type="link">去注册</button>
    </router-link>
    <br>
    <br>
    <router-link to="/teacherHomepage">
      <button type="link">去教师页面</button>
    </router-link>
  </div>
</template>

<script>
import axios from 'axios'
// @ is an alias to /src
export default {
  name: 'Home',
  data () {
    return {
      user: '',
      password: '',
      id: ''
    }
  },
  methods: {
    hello: function () {
      axios.get('api/testmybatis').then(
        res => {
          this.user = res.data.user
          this.password = res.data.password
          this.id = res.data.id
        })
    }
  }
}
</script>
