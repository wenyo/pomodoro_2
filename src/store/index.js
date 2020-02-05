import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    vPath: ['/', '/list', '/chart', '/bomb'],
    vCountTimeList : [['25:00', '05:00'], ['00:10', '00:05']],
    vToDoList: [],
    date: new Date().getFullYear() + '/' + new Date().getMonth() + '/' +new Date().getDate()  
  },
  mutations: {
    // 將資料存入 Loclstorage
    storeInLoclstorage: function(state, name, data){
      localStorage.setItem(name, JSON.stringify(data));
    },
    // 送出資料
    submit: function(state, textInput){
      //const textInput = document.querySelector('#textInput');
      if(textInput !== ""){
          let vToDoListTemp;

          vToDoListTemp = {
              'content': textInput,
              'tomatoNum': 0,
              'checked': false,
              'bHoverBtn': false,
              'bReadyBtnClick': false,
              'creatDate': state.date,
              'finishDate': '00/00'
          };
          state.vToDoList.unshift(vToDoListTemp);
      }
      console.log(state.vToDoList)
      state.storeInLoclstorage('todo', state.vToDoList); /// mutations call mutations???
    },
  },
  actions: {},
  modules: {}
});
