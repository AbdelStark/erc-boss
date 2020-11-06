import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import router from './router'
import Web3 from "web3"; // loads from src/router/index.js

Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(VueRouter);

// create store
const store = new Vuex.Store({
    state: {
        web3: null,
        settings: {
            lang: 'EN',
        },
        ercContracts: initERCContracts(),
    },
    mutations: {}
});

initWeb3Environment(store.state);

new Vue({
    router,
    render: h => h(App),
    store,
}).$mount('#app');

function initWeb3Environment(state) {
    console.log('initializing web3 environment');
    const ethEnabled = () => {
        if (window.ethereum) {
            state.web3 = new Web3(window.ethereum);
            window.ethereum.enable();
            return true;
        }
        return false;
    };
    if (!ethEnabled()) {
        alert("Please install an Ethereum compatible browser or extension like MetaMask to use this dApp!");
    } else {
        console.log('web3 environment successfully loaded');
        loadERCContracts(state);
    }
}

function initERCContracts() {
    const erc20 = require('../contracts/ERC20');
    return {
        "erc-20": {
            abi: erc20.abi,
            code: erc20.bytecode,
            contract: null,
        }
    }
}

function loadERCContracts(state) {
    state.ercContracts["erc-20"].contract = new state.web3.eth.Contract(state.ercContracts["erc-20"].abi);
}