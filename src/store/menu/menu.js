import {
  getmenutable
} from "../../model/user"
export default {
  namespaced :true,
  state() {
    return {
      menuLists: []
    }
  },
  mutations: {
    menuList(state, data) {
      state.menuLists = data
    }
  },
  actions: {
    getmenuList({commit}) {
      getmenutable().then(res => {
        commit("menuList", res.list)
      })

    }
  }
}
