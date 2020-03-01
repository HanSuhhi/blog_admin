<template>
<div class="SIDE">
  <div class="SIDE-title">生平区间</div>
  <!-- 首页 -->
  <div class="SIDE-block">
    <p id="firstTitle">首页</p>
    <menu-item :message="homeMenu"></menu-item>
  </div>
  <!-- 内容管理 -->
  <div class="SIDE-block">
    <p id="firstTitle">内容管理</p>
    <menu-item :message="artiMenu"></menu-item>
  </div>

</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import MenuItem from '@/components/menuItem.vue';

interface menuItem {
  title: string;
  path: string;
  icon: string;
}

@Component({
  components: {
    MenuItem
  }
})
export default class Side extends Vue {
  private homeMenu: menuItem = {
    title: '数据统计',
    path: '/home',
    icon: 'el-icon-upload'
  }

  private artiMenu: menuItem = {
    title: '文章详情',
    path: '/arti',
    icon: 'el-icon-upload'
  }
}
</script>

<style lang='scss' scoped>
.SIDE {
  position: fixed;
  left: 0;
  top: 0;
  background-color:  #253e55;
  width: 16%;
  height: 100%;
  border-right: 1px solid gray;
  .SIDE-title {
    padding-top: 1rem;
    font-size: 22px;
    font-weight: bold;
    letter-spacing: 2px;
    color: #ffffff;
  }
  .SIDE-block {
    text-align: left;
    color: #ffffff;
    #firstTitle {
      padding: 20px 15px 10px;
      color: #cbcbcb;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      font-weight: 600;
      margin: .4rem;
    }
  }
}
</style>
