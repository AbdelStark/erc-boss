import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import Vuex from 'vuex'


Vue.config.productionTip = false;
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        settings: {
            lang: 'EN',
        },
    },
    mutations: {}
});


new Vue({
    render: h => h(App),
    store,
}).$mount('#app');
