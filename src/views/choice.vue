<template>
  <div>
  <div class="about">
    <router-link to="/teacherHomepage">
      <div class="choice">《《《 教师页面</div>
<!--      <el-button type="link" class="choice" id="teacher">教师页面</el-button>-->
    </router-link>
    <router-link to="/chairmanHomepage">
      <div class="choice" style="margin-left: 20%">教研室主任页面 》》》</div>
    </router-link>
  </div>
    <footer>
      @North China University of water resources and hydropower
    </footer>
  </div>
</template>
<style>
  .about{
    width: 100%;
    height:600px ;
    margin-top: 150px;
    margin-bottom: 100px;
    background-image: url("../assets/png/background1.jpg");
    background-size:130% 100%;
    background-position:-200px 0px;
  }
  .choice{
    display: inline-block;
    font-size: 40px;
    color: white;
    text-decoration: skyblue;
    margin-top: 10%;
    margin-left: 20%;
  }
footer{
    text-align: center;
    color: #9a9c9d;
  }
</style>

<script>
export default {
  data () {
    return { msg: '这个是Vue模板页' }
  }
}
</script>
