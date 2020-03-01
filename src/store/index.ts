import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    article: '',
  },
  mutations: {
    getArticle(state, article: string) {
      state.article = article 
    }
  },
  actions: {
    saveArticle(context) {
    }
  },
  modules: {
  }
})
