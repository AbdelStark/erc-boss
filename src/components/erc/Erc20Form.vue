<template>
    <div>
        Name: {{this.info.name}} <br/>
        Symbol: {{this.info.symbol}} <br />
        Total supply: {{this.info.totalSupply}}
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
                info: {
                    name: null,
                    symbol: null,
                    totalSupply: null,
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
        },
    }
</script>

<style scoped>

</style>