<template>
    <div>
        <b-form class="ml-2 mr-2">
            <b-input-group @reset="reset" @submit="deployERC" class="mt-3" prepend="ERC">
                <b-form-select :options="form.ercOptions"
                               class="mr-2"
                               v-model="form.ercType"></b-form-select>
            </b-input-group>
            <b-form-group class="mt-2">
                <b-button class="mr-2" type="submit" variant="primary">Deploy</b-button>
                <b-button type="reset" variant="danger">Reset</b-button>
            </b-form-group>
        </b-form>
    </div>
</template>

<script>
    export default {
        name: "Deploy",
        data() {
            return {
                form: {
                    ercType: null,
                    ercOptions: [
                        {value: null, text: 'Please select an option'},
                        {value: 'erc-20', text: 'ERC-20 Token Standard '},
                        {value: 'erc-721', text: 'ERC-721 Non-Fungible Token Standard'},
                    ],
                },
            }
        },
        methods: {
            deployERC(evt) {
                evt.preventDefault();
            },
            reset(evt) {
                evt.preventDefault();
                this.form.ercType = null;
            },
        }
    }
</script>

<style scoped>

</style>