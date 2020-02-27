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
    date: new Date().getFullYear() + '/' + new Date().getMonth() + '/' +new Date().getDate(),
    bPlayTimer: false, // false = 不倒數; true = 倒數;
  },
  mutations: {
    // 從 Loclstorage 拿資料
    getFromLoclstorage(state){
      const vToDoListTemp = JSON.parse(localStorage.getItem('todo'));
      const vTodoneListTemp = JSON.parse(localStorage.getItem('todone'));
      state.vToDoList = Array.isArray(vToDoListTemp) ? vToDoListTemp : [];
      state.vToDoneList = Array.isArray(vTodoneListTemp) ? vTodoneListTemp : [];
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
              'finishDate': '00/00',
              'bWork': 0
          };
          state.vToDoList.unshift(vToDoListTemp);
      }
    },
    // 現在的 todoIdx
    getNowTodo(state, idx){
      state.iTodoNow = state.vToDoList[idx]['sn'];
    },
    // 勾選已完成的 todo 項目
    addToDo2ToDone(state, idx){
      let vToDo = state.vToDoList[idx];
      if(state.iTodoNow == vToDo['sn']){
        state.iTodoNow = 0;
      }
      state.vToDoneList.unshift(vToDo);
      state.vToDoList.splice( idx, 1 );
    },
    // 取消勾選已完成的 todone 項目
    removeToDone2ToDo(state, idx){
      let vToDone = state.vToDoneList[idx];
      state.vToDoList.unshift(vToDone);
      state.vToDoneList.splice( idx, 1 );
    },
    // 修改 vToDoList
    reviceToDo(state, vTodoNow){
      for (const idx in state.vToDoList) {
        if (state.vToDoList[idx].sn == state.iTodoNow) {
          state.vToDoList[idx] = vTodoNow;
          break;
        }
      }
    },
    // 倒數與否
    checkCount(state){
      state.bPlayTimer = !state.bPlayTimer;
    }
  },
  actions: {
    // 將 todo 給 todone
    checkToDo({commit, dispatch}, idx){
      commit('addToDo2ToDone', idx);
      dispatch('inserData');
    },
    // 將 todone 給 todo
    checkToDone({commit, dispatch}, idx){
      commit('removeToDone2ToDo', idx);
      dispatch('inserData');
    },
    // 更新 vToDoList
    updateToDo({commit,dispatch}, vTodoNow){
      commit('reviceToDo', vTodoNow);
      dispatch('inserData');
    },
    // 存資料到 localStorage
    inserData({commit}){
      commit('storeInLoclstorage', 'todo');
      commit('storeInLoclstorage', 'todone');
    }
  },
  modules: {}
});
