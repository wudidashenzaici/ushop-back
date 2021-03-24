import {
  getcatelist
} from "../../model/Category"
export default {
  namespaced :true,
  state() {
    return {
      CateLists: []
    }
  },
  mutations: {
    CateList(state, data) {
      state.CateLists = data
    }
  },
  actions: {
    getCategoryList({commit}) {
      getcatelist().then(res => {
        commit("CateList", res.list)
      })

    }
  }
}
