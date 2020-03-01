<template>
  <div id="app">
    <sidebar-component></sidebar-component>
    <router-view class="app"></router-view>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import sidebarComponent from '@/components/sidebar-component.vue';

@Component({
  components: {
    sidebarComponent
  }
})
export default class App extends Vue {
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif, 微软雅黑;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .app {
    position: absolute;
    right: 0;
    width: 84%;
  }
}

</style>
