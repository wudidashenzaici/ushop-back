import {
    getmemberlist
  } from "../../model/vip"
  export default {
    namespaced :true,
    state() {
      return {
        memberLists: []
      }
    },
    mutations: {
        memberList(state, data) {
        state.memberLists = data
      }
    },
    actions: {
      getmemberList({commit}) {
        getmemberlist().then(res => {
          commit("memberList", res.list)
        })
  
      }
    }
  }
  