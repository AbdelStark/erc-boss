<template>
    <div id="app">
        <app-nav-bar/>
    </div>
</template>

<script>

  import AppNavBar from "./components/AppNavBar";
  import {mapState} from "vuex";

  export default {
        name: 'App',
        components: {
            AppNavBar
        },
        computed: {
            ...mapState([
                'settings',
            ])
        },
    }
</script>

<style>
</style>
