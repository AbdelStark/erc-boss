import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import Deploy from '../components/Deploy'
import Interact from "../components/Interact";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: '/deploy',
        name: 'deploy',
        component: Deploy,
    },
    {
        path: '/interact/:type?/:address?',
        name: 'interact',
        component: Interact,
    }
];

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router
