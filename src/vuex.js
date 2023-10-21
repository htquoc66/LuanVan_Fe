import { createStore } from "vuex";
// store.js
const state = {
  user: null,
  admin: null,
  selectedNotarizedDocuments: [], 

};

const getters = {
  admin: (state) => {
    return state.admin;
  },
  user: (state) => {
    return state.user;
  },
  selectedNotarizedDocuments: (state) => {
    return state.selectedNotarizedDocuments;
  },

};

const actions = {
  setAdmin(context, admin) {
    context.commit("setAdmin", admin);
  },
  setUser(context, user) {
    context.commit("setUser", user);
  },
  setSelectedNotarizedDocuments(context, selectedNotarizedDocuments) {
    context.commit("setSelectedNotarizedDocuments", selectedNotarizedDocuments);
  },
  logoutAdmin(context) {
    context.commit("logoutAdmin", null);
  },
  logoutUser(context) {
    context.commit("logoutUser", null);
  },

};

const mutations = {
  setAdmin(state, admin) {
    state.admin = admin;
  },
  setUser(state, user) {
    state.user = user;
  },
  setSelectedNotarizedDocuments(state, selectedNotarizedDocuments) {
    state.selectedNotarizedDocuments = selectedNotarizedDocuments;
  },
  logoutAdmin(state) {
    state.admin = null;
  },
  logoutUser(state) {
    state.user = null;
  },


};

const store = createStore({
  state,
  getters,
  actions,
  mutations,
});

// Lưu trạng thái của store vào localStorage khi có thay đổi
store.subscribe((mutation, state) => {
  localStorage.setItem("store", JSON.stringify(state));
});

export default store;


