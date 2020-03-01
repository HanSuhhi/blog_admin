<template>
  <div class="LABEL">
    <p>查看文章</p>
    <tree :articles="articles" @getNewArticle="getArti"></tree>
    <div class="LABEL-buttons">
      <el-button type="warning" id="button">编辑文章</el-button>
      <el-button type="danger" id="button" @click="deleteArticle">删除文章</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Type from '@/common/article/type.interface';
import LabelType from '@/common/article/labels.interface';
import Tree from './tree.vue';

@Component({
  components: {
    Tree
  }
})
export default class Label extends Vue {
  private activeName: number = 1;
  private newArti: string = '';

  // 接受到的标签数据
  private types: Array<Type> = [];
  // 根据标签获取相应的文章链
  private labels: Array<LabelType> = [];
  // 文章链详情文章
  private articles: any[] = [];

  private mounted() {
    // 请求标签数据
    this.axios({
      method: "get",
      url: '/types',
    }).then(( message ) => {
      console.log(message);
      // 存放标签
      for(let type of message.data) {      
        // 请求标签链
        this.axios({
          method: "get",
          url: '/labels/' + type.typeName
        }).then(( message ) => {
          let label: string = '';
          let lineTitle: string = '';
          let temp: any = '';
          let articlesLength: number = 0;
          for(let i = 0; i < message.data.length; i++) {
            label = message.data[i].type_label;
            lineTitle = message.data[i].lines.lineTitle;
            articlesLength = this.articles.length;
            
            // 计算一级标题
            if(articlesLength === 0) {
              this.articles.push({ 'label': label, children: [] })
            } else {
              this.articles.forEach((item) => {
                item.label === label ? '' : this.articles.push({ 'label': label, children: [] })
              })
            }

            // 计算二级标题
            if (this.articles) {
              this.articles.forEach(item => {
                if (item.label === label) {
                  item.children.push({ 'label': lineTitle, children: [] })
                }
              })
            }

            // 计算三级标题
            if (this.articles) {
              this.articles.forEach( item => {
                if (item.label === label) {
                  temp = item.children[item.children.length - 1];
                  if (lineTitle === temp.label) {
                    for (let article of message.data[i].lines.articles) {
                      temp.children.push({ 'label': article})
                    }
                  }
                }
              })
            }

          }

        })
      }
    })
  }

  private getArti(val: string) {
    this.newArti = val;
    this.$emit('getArti', this.newArti);
  }

  private deleteArticle() {
    let type_label = 'UI学习'
    let title: string = '何必' 
    
    // console.log(this.$store.state.article);
    // this.deleteHome('颜色可以这么做原来 | UI学习一')
    // this.deleteItem('颜色可以这么做原来 | UI学习一');
    this.deleteLine(type_label, title)
  }

  // 删除首页推送
  private deleteHome(title: string): number {
    this.axios({
      method: 'GET',
      url: '/short-art/' + title
    }).then( message => {
      // this.axios({
      //   method: 'DELETE',
      //   url: '/short-art/' + message.data[0]._id,
      // })
    })
    return 0;
  }

  // 删除文章详情
  private deleteItem(title: string): number {
    this.axios({
      method: 'GET',
      url: '/articles/' + title
    }).then( message => {
      this.axios({
        method: 'DELETE',
        url: '/articles/' + message.data[0]._id
      })
    })
    return 0;
  }

  // 删除标签及文章链
  private deleteLine(type_label: string, title: string): number {
    this.axios({
      method: 'GET',
      url: '/labels/' + type_label
    }).then( message => {
      for(let i of message.data) {
        if (i.lines.lineTitle === title) {
          let number = i.lines.articles.length;
          if (number === 1) {
            this.axios({
              method: 'DELETE',
              url: '/labels/' + i._id
            })
          } else {
            let articles = i.lines.articles;
            for (let j = 0; j < articles.length; j++) {
              if(articles[j] === title) {
                articles.splice(j, 1)
                i.lines.articles = articles;
                this.axios({
                  method: 'PUT',
                  url: '/labels/' + i._id
                })
                break;
              }
          }
        }
      }
      // this.axios({
      //   method: 'DELETE',
      //   url: '/labels/' + message.data[0]._id
      // })
    })
    return 0;
  }

  // 管理标签
  private manageType(){}
}
</script>

<style lang='scss' scoped>
  .LABEL {
    position: relative;
    width: 35%;
    height: 69%;
    margin-left: 2%;
    margin-top: 1%;
    padding: 20px;
    background-color: #fff;
    height: 60vh;
    border-radius: 20px;
    p {
      font-weight: 800;
      letter-spacing: 5px;
      font-size: 22px;
    }
    .LABEL-buttons {
      position: absolute;
      bottom: .7rem;
      width: 100%;
      #button {
        width: 30%;
        display: inline-block;
      }
    }
  }
</style>