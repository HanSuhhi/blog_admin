<template>
<div class="CREATE">
  <mavon-editor v-model="arti" style="height: 90%;"></mavon-editor>
  <el-button class="CREATE-button" type="success" @click="createArti()">创建文章</el-button>
</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {
  }
})
export default class Create extends Vue {
  private index:number = 0;
  private title: string = '';
  private type_label: string = '';
  private lineTitle: string = '';
  private introduction: string = '';
  
  private arti: string = '### 这是我的第一篇博客 *<UI学习>*^读《三国演义》有感^> 简介___';

  private update: any = '';
  private updateId: string = '';
  private haveArti: boolean = false;

  private mounted() {

  }

  // 创建请求
  private createArti() {
    let word = this.arti;
    this.title = word.substring(word.indexOf('#') + 2, word.indexOf('*') - 1);
    this.type_label = word.substring(word.indexOf('*') + 2, word.indexOf('^') - 2);
    this.lineTitle = word.substring(word.indexOf('^') + 1, this.find(word, '>',1) - 2);
    this.introduction = word.substring(this.find(word, '>',1) + 2, word.indexOf('_'));
    this.arti = word.substring(word.indexOf('___') + 3)
    this.createTypes();
    this.createShort();
    this.createArticle();
    this.createLabels();
  }
  // 字符第几次出现
  private find(str: string, cha: string, num: number): number{
    var x=str.indexOf(cha);
    for(var i=0;i<num;i++){
        x=str.indexOf(cha,x+1);
    }
    return x;
  }

  private async back() {
    await alert('创建成功');
    await this.$router.push({
      name: 'article'
    }).then(() => {
      location.reload();
    })
  }
  // 创建首页简介
  private createShort() {
    this.axios({
      method: 'post',
      url: '/short-art',
      data: {
        index: this.index,
        title: this.title,
        type_label: this.type_label,
        lineTitle: this.lineTitle,
        introduction: this.introduction,
        pub_time: this.getTime(),
        may_time: this.getReadTime()
      }
    }).then( message => {})
  }

  // 创建文章
  private createArticle() {
    this.axios({
      method: 'post',
      url: '/articles',
      data: {
        title: this.title,
        message: this.arti
      }
    }).then( message => {})
  }

  // 创建/修改文章链
  private createLabels() {
    if (this.haveArti){
      this.axios({
        method: 'put',
        url: '/labels/' + this.updateId,
        data: this.update
      }).then( message => {
        this.back();
      })
    } else {
      this.axios({
        method: 'post',
        url: '/labels',
        data: {
          type_label: this.type_label,
          lines: {
            lineTitle: this.lineTitle,
            articles: [
              this.title
            ]
          }
        }
      }).then(message => {
          this.back();
      })
    }
  }

  private createTypes() {
    this.axios({
      method: 'get',
      url: '/types',
    }).then( message => {
      let same: boolean = false;
      let typeId = message.data.length + 1;
      let typeName = this.type_label;

      if (message.data != []) {
        for(let i of message.data) {
          if (typeName === i.typeName) {
            same = true;
            break;
          } else {
            same = false;
          }
        }
      } else {
        same = false;
      }
      if (!same) {
        this.axios({
          method: 'post',
          url: '/types',
          data: {
            typeId: typeId,
            typeName: typeName
          }
        }).then( message => {})
      }
    })
  }

  private createIndex() {
    this.axios({
      method: 'get',
      url: '/short-art'
    }).then( message => {
      this.index = message.data.length + 1;
    })
  }
  // 判断文章链是否存在，是则修改，非则新建
  private haveArticles() {
    this.axios({
      method: 'get',
      url: '/labels/' + this.type_label
    }).then( message => {
      let data = message.data;
      for( let i of data) {
        if (i.lines.lineTitle === this.lineTitle) {
          i.lines.articles.push(this.title)
          this.update = i;
          this.updateId = i._id;
          this.haveArti = true;
          break;
        }
        this.haveArti = false;
      }
    })
  }

  // 获取上传时间
  private getTime(): string {
    let date: any = new Date();
    let year: number = date.getFullYear();
    let month: number = date.getMonth()+1;
    let day: number = date.getDate();
    let hour: number = date.getHours();
    let minute: string = date.getMinutes().toString();
    if (minute.length === 1) {
      minute = '0' + minute.toString();
    }
    let pub_time: string = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
    return pub_time;
  }

  // 获取预计阅读时间
  private getReadTime(): number {
    return Math.ceil(this.arti.length / 400);
  }
}
</script>

<style lang='scss' scoped>
.CREATE {
  background-color: rgba($color: gainsBoro, $alpha: .4);
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  .CREATE-button {
    margin-top: 2rem;
    width: 35%;
  }
} 
</style>
