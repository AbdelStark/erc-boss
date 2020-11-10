<template>
    <div class="mt-2 ml-2 mr-2" v-if="info.loaded">
        <b-table striped hover :items="items"></b-table>
        <div class="accordion mt-2" role="tablist">
            <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-button block v-b-toggle.accordion-balance-of variant="dark">Balance Of</b-button>
                </b-card-header>
                <b-collapse id="accordion-balance-of" accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                        <b-input-group prepend="Account" class="mt-2">
                            <b-form-input
                                    class="mr-2"
                                    v-model="balanceOf.address" placeholder="Enter account address"></b-form-input>
                            <b-button v-if="balanceOf.balance != null" disabled variant="outline-info">
                                {{balanceOf.balance}}
                            </b-button>
                            <b-input-group-append>
                                <b-button-group class="mx-1">
                                    <b-button @click="callBalanceOf">&raquo;</b-button>
                                </b-button-group>
                            </b-input-group-append>
                        </b-input-group>
                    </b-card-body>
                </b-collapse>
            </b-card>

            <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-button block v-b-toggle.accordion-transfer variant="dark">Transfer</b-button>
                </b-card-header>
                <b-collapse id="accordion-transfer" accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                        <b-input-group prepend="From" class="mt-2">
                            <b-form-input
                                    class="mr-2"
                                    v-model="transfer.recipient" placeholder="Enter recipient address"></b-form-input>
                        </b-input-group>
                        <b-input-group prepend="Amount" class="mt-2">
                            <b-form-input
                                    class="mr-2"
                                    v-model="transfer.amount" placeholder="Enter amount"></b-form-input>
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
            <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-button block v-b-toggle.accordion-allowance variant="dark">Allowance</b-button>
                </b-card-header>
                <b-collapse id="accordion-allowance" accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                        <b-input-group prepend="Owner" class="mt-2">
                            <b-form-input
                                    class="mr-2"
                                    v-model="allowance.owner" placeholder="Enter owner address"></b-form-input>
                        </b-input-group>
                        <b-input-group prepend="Spender" class="mt-2">
                            <b-form-input
                                    class="mr-2"
                                    v-model="allowance.spender" placeholder="Enter spender address"></b-form-input>
                            <b-button v-if="allowance.returnValue != null" disabled variant="outline-info">
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
            <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-button block v-b-toggle.accordion-approve variant="dark">Approve</b-button>
                </b-card-header>
                <b-collapse id="accordion-approve" accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                        <b-input-group prepend="Spender" class="mt-2">
                            <b-form-input
                                    class="mr-2"
                                    v-model="approve.spender" placeholder="Enter spender address"></b-form-input>
                        </b-input-group>
                        <b-input-group prepend="Amount" class="mt-2">
                            <b-form-input
                                    class="mr-2"
                                    v-model="approve.amount" placeholder="Enter amount"></b-form-input>
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
            <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-button block v-b-toggle.accordion-transfer-from variant="dark">Transfer from</b-button>
                </b-card-header>
                <b-collapse id="accordion-transfer-from" accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                        <b-input-group prepend="Sender" class="mt-2">
                            <b-form-input
                                    class="mr-2"
                                    v-model="transferFrom.sender" placeholder="Enter sender address"></b-form-input>
                        </b-input-group>
                        <b-input-group prepend="Recipient" class="mt-2">
                            <b-form-input
                                    class="mr-2"
                                    v-model="transferFrom.recipient"
                                    placeholder="Enter recipient address"></b-form-input>
                        </b-input-group>
                        <b-input-group prepend="Amount" class="mt-2">
                            <b-form-input
                                    class="mr-2"
                                    v-model="transferFrom.amount" placeholder="Enter amount"></b-form-input>
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