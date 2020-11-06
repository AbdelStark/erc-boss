import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import router from './router' // loads from src/router/index.js

Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(VueRouter);

// create store
const store = new Vuex.Store({
    state: {
        settings: {
            lang: 'EN',
        },
    },
    mutations: {}
});

new Vue({
    router,
    render: h => h(App),
    store,
}).$mount('#app');
