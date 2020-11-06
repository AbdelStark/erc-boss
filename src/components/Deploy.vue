<template>
    <div>
        <b-form class="ml-2 mr-2" @reset="reset" @submit="deployERC">
            <b-input-group  class="mt-3" prepend="ERC">
                <b-form-select :options="form.ercOptions"
                               class="mr-2"
                               v-model="form.ercType"></b-form-select>
            </b-input-group>
            <b-form-group class="mt-2">
                <b-button class="mr-2"  type="submit" variant="primary">Deploy</b-button>
                <b-button type="reset" variant="danger">Reset</b-button>
            </b-form-group>
        </b-form>
    </div>
</template>

<script>
    import Web3 from "web3";

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
        mounted() {
            initWeb3Environment();
        },
        methods: {
            deployERC(evt) {
                console.log('deploying contract');
                evt.preventDefault();
                window.erc777Contract.deploy({
                    data: window.erc20ByteCode,
                    arguments: ['coinboss', 'CBOSS'],
                })
                    .send({
                        from: window.ethereum.selectedAddress,
                    }, function (err, transactionHash) {
                        if (err) {
                            console.error(err);
                        } else {
                            console.log('transaction hash: ', transactionHash);
                        }
                    })
                    .on('receipt', function (receipt) {
                        console.log(receipt.contractAddress) // contains the new contract address
                    })
                    .then(async function (newContractInstance) {
                        console.log(newContractInstance);
                        const name = await newContractInstance.methods.name().call({from: window.ethereum.selectedAddress});
                        console.log('name: ', name);
                    });
            },
            reset(evt) {
                evt.preventDefault();
                this.form.ercType = null;
            },
        }
    }

    function initWeb3Environment() {
        console.log('initializing web3 environment');
        const ethEnabled = () => {
            if (window.ethereum) {
                window.web3 = new Web3(window.ethereum);
                window.ethereum.enable();
                return true;
            }
            return false;
        };
        if (!ethEnabled()) {
            alert("Please install an Ethereum compatible browser or extension like MetaMask to use this dApp!");
        } else {
            console.log('web3 environment successfully loaded');
            loadERC20Contract();
        }
    }

    function loadERC20Contract() {
        window.erc20ABI = require('../../contracts/ERC20').abi;
        window.erc20ByteCode = require('../../contracts/ERC20').bytecode;
        window.erc777Contract = new window.web3.eth.Contract(window.erc20ABI);
    }
</script>

<style scoped>

</style>