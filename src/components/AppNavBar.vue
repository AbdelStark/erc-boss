<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand href="#">ERC Boss</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item href="#">Deploy</b-nav-item>
                    <b-nav-item href="#">Interact</b-nav-item>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-form>
                        <b-form-input class="mr-sm-2" placeholder="Search" size="sm"></b-form-input>
                        <b-button class="my-2 my-sm-0" size="sm" type="submit">Search</b-button>
                    </b-nav-form>

                    <b-nav-item-dropdown right text="Lang">
                        <b-dropdown-item @click="switchLangToEn" href="#">EN</b-dropdown-item>
                        <b-dropdown-item @click="switchLangToFr" href="#">FR</b-dropdown-item>
                    </b-nav-item-dropdown>

                    <b-nav-item-dropdown right>
                        <template #button-content>
                            <em>User</em>
                        </template>
                        <b-dropdown-item href="#">Profile</b-dropdown-item>
                        <b-dropdown-item href="#">Sign Out</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>

    export default {
        name: "AppNavBar",
        methods: {
            switchLangToEn() {
                this.$store.state.settings.lang = 'EN';
            },
            switchLangToFr() {
                this.$store.state.settings.lang = 'FR';
            },
        },
    }
</script>

<style scoped>

</style>