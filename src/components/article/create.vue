<template>
<div class="CREATE">
  <p>编辑选择</p>
  <el-button type="success" style="width: 80%;" @click="routeToCreate">创建文章</el-button>
</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class CreateArt extends Vue {
  private routeToCreate() {
    this.$router.push({
      name: 'create'
    })
  }
}
</script>

<style lang='scss' scoped>
.CREATE {
  width: 35%;
  margin-left: 2%;
  margin-top: 2%;
  background: #fff;
  border-radius: 20px;
  padding: 20px;
  p {
    font-weight: 800;
    letter-spacing: 5px;
    font-size: 22px;
  }
}
</style>
