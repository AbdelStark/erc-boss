<template>
    <div class="mt-2 ml-2 mr-2">
        <b-table v-if="info.loaded" striped hover :items="items"></b-table>
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
    }

    function emptyInfo(){
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