<template>
  <div id="teacherHomepage">
    <h5>课程目标评价系统</h5>
    <Homepage></Homepage>
  </div>
</template>

<script>
import Homepage from '@/components/Homepage'

export default {
  name: 'TeacherHomepage',
  data () {
    return {}
  },
  components: {
    Homepage: Homepage
  }
}
</script>

<style scoped>
  .el-col-12{
    width: 15%;
  }
</style>
