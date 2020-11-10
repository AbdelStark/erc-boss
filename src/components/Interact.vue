<template>
    <div>
        <b-form class="ml-2 mr-2">
            <b-input-group class="mt-3" prepend="ERC">
                <b-form-select :options="form.ercOptions"
                               class="mr-2"
                               v-model="form.ercType"></b-form-select>
            </b-input-group>
            <b-input-group prepend="At" class="mt-2">
                <b-form-input
                        class="mr-2"
                        v-model="form.address" placeholder="Enter smart contract address"></b-form-input>
            </b-input-group>
            <b-form-row class="mt-2">
                <b-button @click="loadERCForm" class="mr-2" variant="primary">Load</b-button>
                <b-button @click="reset" variant="danger">Reset</b-button>
            </b-form-row>
        </b-form>
        <erc20-form v-if="form.show['erc-20']" :address="form.address" class="ml-2 mr-2"/>
    </div>
</template>

<script>
    import Erc20Form from "./erc/Erc20Form";

    export default {
        name: "Interact",
        components: {Erc20Form},
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
                evt.preventDefault();
                this.form.show = initShowForms();
                this.form.show[this.form.ercType] = true;
            },
            reset(evt) {
                evt.preventDefault();
                this.form.ercType = null;
                this.form.address = null;
                this.form.show = initShowForms();
            },
            /*onChangeERCType(selected) {
                this.form.show = initShowForms();
                this.form.show[selected] = true;
            },*/
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