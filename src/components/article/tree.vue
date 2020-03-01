<template>
<el-tree
  :data="articles"
  :props="defaultProps"
  accordion
  @node-click="handleNodeClick">
</el-tree>
</template>

<script lang='ts'>
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

@Component
export default class Tree extends Vue {
  @Prop({
    required: true
  })
  private articles !: any;

  private changeItem: string = this.$store.state.article;
  @Watch('changeItem', {
    immediate: true,
    deep: true
  })
  private haveChangeItems(newItem: string, oldItem: string) {
    this.$emit('getNewArticle', this.changeItem)
  }

  private defaultProps: any =  {
    children: 'children',
    label: 'label'
  }

  private handleNodeClick(data: any) {
    // 当是最末元素时
    if (!data.children) {
      let title = data.label;
      // 获取点击文章
      this.axios({
        method: 'get',
        url: '/articles/' + title
      }).then((message) => {
        this.changeItem = message.data[0].message;
      })
      console.log(data);
    }
    this.$store.commit('getArticle', data.label);
  }
}
</script>