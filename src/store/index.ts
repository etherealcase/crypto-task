import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        coins: {},
        showSlide: false,
        dataForChart: {},
        time: []
    },
    getters: {
        coins(state) {
            return state.coins;
        },
        showSlide(state) {
            return state.showSlide
        },
        dataForChart(state) {
            return state.dataForChart
        },
    },
    mutations: {
        SET_COINS(state, payload) {
            state.coins = payload;
        },
        SET_SHOW_SLIDE(state, payload) {
            state.showSlide = payload
        },
        SET_DATA_FOR_CHART(state, payload) {
            state.dataForChart = payload
        },
    },
    actions: {
        GET_DATA_FOR_CHART: async (context,coin) => {
            try {
                const {data} = await axios
                    .get(`https://min-api.cryptocompare.com/data/v2/histoday?fsym=${coin}&tsym=USD&limit=10`);
                    context.commit('SET_DATA_FOR_CHART', data.Data);
            } catch (error) {
                console.error(error);
            }
        },
        GET_COINS: async (context) => {
            try {
                const {data} = await axios
                    .get('https://min-api.cryptocompare.com/data/top/totaltoptiervolfull?limit=20&tsym=USD');
                context.commit('SET_COINS', data.Data);
            } catch (error) {
                console.error(error);
            }
        },
    },
    modules: {},
});
