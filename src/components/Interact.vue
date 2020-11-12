<template>
    <div>
        <b-form class="ml-2 mr-2">
            <b-input-group class="mt-3" prepend="ERC">
                <b-form-select :options="form.ercOptions"
                               class="mr-2"
                               v-model="form.ercType"></b-form-select>
            </b-input-group>
            <b-input-group class="mt-2" prepend="At">
                <b-form-input
                        class="mr-2"
                        placeholder="Enter smart contract address" v-model="form.address"></b-form-input>
            </b-input-group>
            <b-form-row class="mt-2">
                <b-button @click="loadERCForm" class="mr-2" variant="primary">Load</b-button>
                <b-button @click="reset" variant="danger">Reset</b-button>
            </b-form-row>
        </b-form>
        <erc20-form :address="form.address" class="ml-2 mr-2" v-if="form.show['erc-20']"/>
    </div>
</template>

<script>
    import Erc20Form from "./erc/interact/Erc20Form";

    export default {
        name: "Interact",
        components: {Erc20Form},
        mounted() {
            console.log(this.$route.params);
            if (typeof this.$route.params.type !== 'undefined' && typeof this.$route.params.address !== 'undefined') {
                this.form.ercType = this.$route.params.type;
                this.form.address = this.$route.params.address;
                this.loadERCForm(null);
            }
        },
        data() {
            return {
                form: {
                    ercType: null,
                    address: null,
                    ercOptions: [
                        {value: null, text: 'Please select an option'},
                        {value: 'erc-20', text: 'ERC-20 Token Standard '},
                        {value: 'erc-721', text: 'ERC-721 Non-Fungible Token Standard'},
                    ],
                    loading: false,
                    show: initShowForms(),
                },
            }
        },
        methods: {
            loadERCForm(evt) {
                if (evt != null) {
                    evt.preventDefault();
                }
                this.form.show = initShowForms();
                this.$nextTick(() => {
                    this.form.show[this.form.ercType] = true;
                });
            },
            reset(evt) {
                evt.preventDefault();
                this.form.ercType = null;
                this.form.address = null;
                this.form.show = initShowForms();
            },
        },
    }

    function initShowForms() {
        return {
            "erc-20": false,
        };
    }
</script>

<style scoped>

</style>