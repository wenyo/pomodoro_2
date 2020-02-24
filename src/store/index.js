import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    vPath: ['/', '/list', '/chart', '/bomb'],
    vCountTimeList : [['25:00', '05:00'], ['00:10', '00:05']],
    vToDoList: [],
    vToDoneList: [],
    iTodoNow: 0,
    date: new Date().getFullYear() + '/' + new Date().getMonth() + '/' +new Date().getDate()
  },
  mutations: {
    // 從 Loclstorage 拿資料
    getFromLoclstorage(state){
      const vTodoListTemp = JSON.parse(localStorage.getItem('todo'));
      state.vToDoList = Array.isArray(vTodoListTemp) ? vTodoListTemp : [];
    },
    // 將資料存入 Loclstorage
    storeInLoclstorage(state, name){
      if(name == 'todo'){
        localStorage.setItem(name, JSON.stringify(state.vToDoList));
      }else if(name == 'todone'){
        localStorage.setItem(name, JSON.stringify(state.vToDoneList));
      }
    },
    // 送出 todo 資料
    submit(state, textInput){
      if(textInput !== ""){
          let vToDoListTemp;

          vToDoListTemp = {
              'sn': Date.now(),
              'content': textInput,
              'tomatoNum': 0,
              'creatDate': state.date,
              'finishDate': '00/00'
          };
          state.vToDoList.unshift(vToDoListTemp);
      }
    },
    // 現在的 todoIdx
    getNowTodo(state, idx){
      state.iTodoNow = state.vToDoList[idx]['sn'];
    },
    // 勾選已完成的 todo 項目
    addToDo2Todone(state, idx){
      let vToDo = state.vToDoList[idx];
      if(state.iTodoNow == vToDo['sn']){
        state.iTodoNow = 0;
      }
      state.vToDoneList.push(vToDo);
      state.vToDoList.splice( idx, 1 );
    }
  },
  actions: {
    checkToDo({commit}, idx){
      commit('addToDo2Todone', idx);
      commit('storeInLoclstorage', 'todo');
      commit('storeInLoclstorage', 'todone');
    }
  },
  modules: {}
});
