<template>
    <div class="mt-2 ml-2 mr-2" v-if="info.loaded">
        <b-table :items="items" hover striped></b-table>
        <div class="accordion mt-2" role="tablist">
            <b-card class="mb-1" no-body>
                <b-card-header class="p-1" header-tag="header" role="tab">
                    <b-button block v-b-toggle.accordion-balance-of variant="dark">Balance Of</b-button>
                </b-card-header>
                <b-collapse accordion="my-accordion" id="accordion-balance-of" role="tabpanel">
                    <b-card-body>
                        <b-input-group class="mt-2" prepend="Account">
                            <b-form-input
                                    class="mr-2"
                                    placeholder="Enter account address" v-model="balanceOf.address"></b-form-input>
                            <b-button variant="dark" class="mr-2" @click="fillBalanceOfAddressWithSelectedEthereumAddress">Me</b-button>
                            <b-button disabled v-if="balanceOf.balance != null" variant="outline-info">
                                {{balanceOf.balance}}
                            </b-button>
                            <b-input-group-append>
                                <b-button-group class="mx-1">
                                    <b-button class="ml-2" @click="callBalanceOf">&raquo;</b-button>
                                </b-button-group>
                            </b-input-group-append>
                        </b-input-group>
                    </b-card-body>
                </b-collapse>
            </b-card>

            <b-card class="mb-1" no-body>
                <b-card-header class="p-1" header-tag="header" role="tab">
                    <b-button block v-b-toggle.accordion-transfer variant="dark">Transfer</b-button>
                </b-card-header>
                <b-collapse accordion="my-accordion" id="accordion-transfer" role="tabpanel">
                    <b-card-body>
                        <b-input-group class="mt-2" prepend="From">
                            <b-form-input
                                    class="mr-2"
                                    placeholder="Enter recipient address" v-model="transfer.recipient"></b-form-input>
                        </b-input-group>
                        <b-input-group class="mt-2" prepend="Amount">
                            <b-form-input
                                    class="mr-2"
                                    placeholder="Enter amount" v-model="transfer.amount"></b-form-input>
                            <b-input-group-append v-if="!transfer.inProgress">
                                <b-button-group class="mx-1">
                                    <b-button @click="sendTransfer">&raquo;</b-button>
                                </b-button-group>
                            </b-input-group-append>
                            <b-input-group-append v-if="transfer.inProgress">
                                <b-spinner label="Spinning"></b-spinner>
                            </b-input-group-append>
                        </b-input-group>
                    </b-card-body>
                </b-collapse>
            </b-card>
            <b-card class="mb-1" no-body>
                <b-card-header class="p-1" header-tag="header" role="tab">
                    <b-button block v-b-toggle.accordion-allowance variant="dark">Allowance</b-button>
                </b-card-header>
                <b-collapse accordion="my-accordion" id="accordion-allowance" role="tabpanel">
                    <b-card-body>
                        <b-input-group class="mt-2" prepend="Owner">
                            <b-form-input
                                    class="mr-2"
                                    placeholder="Enter owner address" v-model="allowance.owner"></b-form-input>
                        </b-input-group>
                        <b-input-group class="mt-2" prepend="Spender">
                            <b-form-input
                                    class="mr-2"
                                    placeholder="Enter spender address" v-model="allowance.spender"></b-form-input>
                            <b-button disabled v-if="allowance.returnValue != null" variant="outline-info">
                                {{allowance.returnValue}}
                            </b-button>
                            <b-input-group-append>
                                <b-button-group class="mx-1">
                                    <b-button @click="callAllowance">&raquo;</b-button>
                                </b-button-group>
                            </b-input-group-append>
                        </b-input-group>
                    </b-card-body>
                </b-collapse>
            </b-card>
            <b-card class="mb-1" no-body>
                <b-card-header class="p-1" header-tag="header" role="tab">
                    <b-button block v-b-toggle.accordion-approve variant="dark">Approve</b-button>
                </b-card-header>
                <b-collapse accordion="my-accordion" id="accordion-approve" role="tabpanel">
                    <b-card-body>
                        <b-input-group class="mt-2" prepend="Spender">
                            <b-form-input
                                    class="mr-2"
                                    placeholder="Enter spender address" v-model="approve.spender"></b-form-input>
                        </b-input-group>
                        <b-input-group class="mt-2" prepend="Amount">
                            <b-form-input
                                    class="mr-2"
                                    placeholder="Enter amount" v-model="approve.amount"></b-form-input>
                            <b-input-group-append v-if="!approve.inProgress">
                                <b-button-group class="mx-1">
                                    <b-button @click="sendApprove">&raquo;</b-button>
                                </b-button-group>
                            </b-input-group-append>
                            <b-input-group-append v-if="approve.inProgress">
                                <b-spinner label="Spinning"></b-spinner>
                            </b-input-group-append>
                        </b-input-group>
                    </b-card-body>
                </b-collapse>
            </b-card>
            <b-card class="mb-1" no-body>
                <b-card-header class="p-1" header-tag="header" role="tab">
                    <b-button block v-b-toggle.accordion-transfer-from variant="dark">Transfer from</b-button>
                </b-card-header>
                <b-collapse accordion="my-accordion" id="accordion-transfer-from" role="tabpanel">
                    <b-card-body>
                        <b-input-group class="mt-2" prepend="Sender">
                            <b-form-input
                                    class="mr-2"
                                    placeholder="Enter sender address" v-model="transferFrom.sender"></b-form-input>
                        </b-input-group>
                        <b-input-group class="mt-2" prepend="Recipient">
                            <b-form-input
                                    class="mr-2"
                                    placeholder="Enter recipient address"
                                    v-model="transferFrom.recipient"></b-form-input>
                        </b-input-group>
                        <b-input-group class="mt-2" prepend="Amount">
                            <b-form-input
                                    class="mr-2"
                                    placeholder="Enter amount" v-model="transferFrom.amount"></b-form-input>
                            <b-input-group-append v-if="!transferFrom.inProgress">
                                <b-button-group class="mx-1">
                                    <b-button @click="sendTransferFrom">&raquo;</b-button>
                                </b-button-group>
                            </b-input-group-append>
                            <b-input-group-append v-if="transferFrom.inProgress">
                                <b-spinner label="Spinning"></b-spinner>
                            </b-input-group-append>
                        </b-input-group>
                    </b-card-body>
                </b-collapse>
            </b-card>
        </div>
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
                transfer: {
                    recipient: '',
                    amount: 0,
                    receipt: null,
                    inProgress: false,
                },
                allowance: {
                    owner: '',
                    spender: '',
                    returnValue: null,
                },
                approve: {
                    spender: '',
                    amount: 0,
                    receipt: null,
                    inProgress: false,
                },
                transferFrom: {
                    sender: '',
                    recipient: '',
                    amount: 0,
                    receipt: null,
                    inProgress: false,
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
            this.info.name = await this.contract.methods.name().call();
            this.info.symbol = await this.contract.methods.symbol().call();
            this.info.totalSupply = await this.contract.methods.totalSupply().call();
            this.items = infoToItems(this.info);
            this.info.loaded = true;
        },
        methods: {
            fillBalanceOfAddressWithSelectedEthereumAddress(){
                this.balanceOf.address = window.ethereum.selectedAddress;
            },
            async callBalanceOf() {
                this.balanceOf.balance = await this.contract.methods.balanceOf(this.balanceOf.address).call();
            },
            async callAllowance() {
                this.allowance.returnValue = await this.contract.methods.allowance(this.allowance.owner, this.allowance.spender).call();
            },
            async sendTransfer() {
                this.transfer.inProgress = true;
                const transferReturn = this.transfer;
                this.contract.methods.transfer(this.transfer.recipient, this.transfer.amount).send()
                    .then(function (receipt) {
                        console.log(receipt);
                        transferReturn.receipt = receipt;
                        transferReturn.inProgress = false;
                    });
            },
            async sendTransferFrom() {
                this.transferFrom.inProgress = true;
                const transferFromReturn = this.transferFrom;
                this.contract.methods.transferFrom(this.transferFrom.sender, this.transferFrom.recipient, this.transferFrom.amount).send()
                    .then(function (receipt) {
                        console.log(receipt);
                        transferFromReturn.receipt = receipt;
                        transferFromReturn.inProgress = false;
                    });
            },
            async sendApprove() {
                this.approve.inProgress = true;
                const approveReturn = this.approve;
                this.contract.methods.approve(this.approve.spender, this.approve.amount).send()
                    .then(function (receipt) {
                        console.log(receipt);
                        approveReturn.receipt = receipt;
                        approveReturn.inProgress = false;
                    });
            },
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