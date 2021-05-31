<template>
  <div class="about">
    <h1>This is a about page</h1>
    <router-link to="/teacherHomepage">
      <el-button type="link">教师页面</el-button>
    </router-link>
    <router-link to="/chairmanHomepage">
      <el-button type="link">教研室主任页面</el-button>
    </router-link>
  </div>
</template>
<style>
  el-button{
    margin-left: 50px;
  }
</style>
