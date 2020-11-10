<template>
    <div class="mt-2 ml-2 mr-2" v-if="info.loaded">
        <b-table striped hover :items="items"></b-table>
        <b-input-group prepend="Balance" class="mt-2">
            <b-form-input
                    class="mr-2"
                    v-model="balanceOf.address" placeholder="Enter account address"></b-form-input>
            <b-button v-if="balanceOf.balance != null" disabled variant="outline-info">{{balanceOf.balance}}</b-button>
            <b-input-group-append>
                <b-button-group class="mx-1">
                    <b-button @click="callBalanceOf">&raquo;</b-button>
                </b-button-group>
            </b-input-group-append>
        </b-input-group>
    </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: "Erc20Form",
        props: ['address'],
        data() {
            return {
                contract: null,
                info: emptyInfo(),
                items: infoToItems(emptyInfo()),
                balanceOf: {
                    address: '',
                    balance: null,
                },
            }
        },
        computed: {
            ...mapState([
                'ercContracts',
            ])
        },
        async mounted() {
            const state = this.$store.state;
            const fromAddress = window.ethereum.selectedAddress;
            this.contract = new state.web3.eth.Contract(
                state.ercContracts["erc-20"].abi,
                this.address,
                {from: fromAddress}
            );
            console.log(this.contract);
            this.info.name = await this.contract.methods.name().call();
            this.info.symbol = await this.contract.methods.symbol().call();
            this.info.totalSupply = await this.contract.methods.totalSupply().call();
            this.items = infoToItems(this.info);
            this.info.loaded = true;
        },
        methods: {
            async callBalanceOf() {
                this.balanceOf.balance = await this.contract.methods.balanceOf(this.balanceOf.address).call();
            }
        },
    }

    function emptyInfo() {
        return {
            name: '',
            symbol: '',
            totalSupply: '',
            loaded: false,
        }
    }

    function infoToItems(info) {
        return [{name: info.name, symbol: info.symbol, totalSupply: info.totalSupply}];
    }

</script>

<style scoped>

</style>