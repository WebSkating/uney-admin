import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './static/js/types'

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    user: {},
    token: '',
    session: '',
    title: '',
    navIndex: 0,
    transIndex: 0,
    orderIndex: 0,
    uneySellsId: '',
    uneyBuysId: '',
    bankselect: '',
    browserType: '',
    symbolBuysIndex: 0,
    symbolBuysName: '',
    symbolSellsIndex: 0,
    symbolSellsName: '',
    symbolIndex: 0,
    symbolName:'',
    pictureBaseUrl: process.env.BASE_PICTURE_ADDR
  },
  mutations: {
    changeSymbolIndex: (state, index) => {
      state.symbolIndex = index;
    },
    changeSymbolName: (state, name) => {
      state.symbolName = name;
    },
    changeSymbolBuysIndex: (state, index) => {
      state.symbolBuysIndex = index;
    },
    changeSymbolBuysName: (state, name) => {
      state.symbolBuysName = name;
    },
    changeSymbolSellsIndex: (state, index) => {
      state.symbolSellsIndex = index;
    },
    changeSymbolSellsName: (state, name) => {
      state.symbolSellsName = name;
    },
    changeBankSelect: (state, index) => {
      state.bankselect = index;
    },
    saveUneySellsId: (state, uneySellsId) => {
      localStorage.uneySellsId = uneySellsId;
      state.uneySellsId = uneySellsId;
    },
    clearUneySellsId: (state) => {
      localStorage.removeItem('uneySellsId');;
      state.uneySellsId = null;
    },
    saveUneyBuysId: (state, uneyBuysId) => {
      localStorage.uneyBuysId = uneyBuysId;
      state.uneyBuysId = uneyBuysId;
    },
    clearUneyBuysId: (state) => {
      localStorage.removeItem('uneyBuysId');;
      state.uneyBuysId = null;
    },
    changeOrderIndex: (state, index) => {
      state.orderIndex = index;
    },
    changeTransIndex: (state, index) => {
      state.transIndex = index;
    },
    changeNavIndex: (state, index) => {
      state.navIndex = index;
    },
    setBrowserType: (state, browserType) => {
      state.browserType = browserType;
    },
    [types.LOGIN]: (state, data) => {
      localStorage.token = data.token;
      localStorage.session = data.sessionId;
      state.token = data.token;
      state.session = data.sessionId;
    },
    [types.LOGOUT]: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('session');
      sessionStorage.clear();
      state.token = null;
      state.session = null;
    },
    [types.TITLE]: (state, data) => {
      state.title = data;
    }
  }
})
