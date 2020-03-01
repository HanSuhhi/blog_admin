<template>
  <router-link id="menu" :to="message.path">
    <i class="el-icon-upload"></i>
    <span>{{ message.title }}</span>
  </router-link>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class MenuItem extends Vue {
  @Prop({
    required: true,
    type: Object
  })
  message!: any;  
}
</script>

<style lang="scss" scoped>
#menu {
  padding: 1rem 5rem;
  text-decoration: none;
  i {
    width: 20px;
    font-size: 20px;
    text-align: center;
    color: white;
  }
  span {
    color: #ffffff;
    font-weight: 600;
    margin-left: 1rem;
    letter-spacing: 5px;
  }
}
.router-link-active {
  background-color: #67d3e0;
  text-decoration: none;
}
.selected {
  color: white;
}
</style>
