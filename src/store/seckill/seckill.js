import {
  getSeckLists
} from "../../model/seckill"
export default {
  namespaced :true,
  state() {
    return {
      seckLists: []
    }
  },
  mutations: {
    seckList(state, data) {
      state.seckLists = data
    }
  },
  actions: {
    getSeckList({commit}) {
      getSeckLists().then(res => {
        commit("seckList", res.list)
      })

    }
  }
}
