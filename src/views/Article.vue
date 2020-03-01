<template>
<div class="ARTI">
  <label-component @getArti="newArti"></label-component>
  <create-arti></create-arti>
  <!-- 最近访问时间 -->
  <div class="ARTI-stamp">
    <p>最近访问时间： <span>{{ last_time }}</span></p>
  </div>
  <!-- 文章区 -->
  <mavon-editor :subfield="false" :value="article" defaultOpen="preview" class="ARTI-index" :toolbarsFlag="false"></mavon-editor>
</div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import LabelComponent from '@/components/article/label.vue';
import CreateArti from '@/components/article/create.vue';

@Component({
  components: {
    LabelComponent,
    CreateArti
  }
})
export default class Home extends Vue {
  private article: string = this.$store.state.article;

  private newArti(val: string) {
    this.article = val;
  }

  private last_time: string = '12';
}
</script>

<style lang='scss' scoped>
.ARTI {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  background-color: rgba($color: gainsBoro, $alpha: .4);
  .ARTI-stamp {
    width: 35%;
    padding: 20px;
    background-color: #fff;
    border-radius: 20px;
    margin-top: 2rem;
    margin-left: 2%;
    p {
      font-weight: bold;
      font-size: 22px;
      text-align: left;
      padding-left: 40px;
      span {
        color: #ff6e5c;
      }
    }
  }
  .ARTI-index {
    position: absolute;
    right: 0;
    top: 0;
    width: 56%;
    height: 94%;
    // overflow: auto;
    margin-right: 1rem;
    padding: 20px;
    background-color: #fff;
    border-radius: 20px;
    margin-top: 10px;
    text-align: left;
  }
}
</style>
