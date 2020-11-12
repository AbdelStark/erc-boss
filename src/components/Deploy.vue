<template>
    <div>
        <b-form @reset="reset" @submit="deployERC" class="ml-2 mr-2">
            <b-alert class="mt-3" dismissible v-model="alert.success.show" variant="success">
                {{alert.success.message}}
            </b-alert>
            <b-input-group class="mt-2" prepend="ERC">
                <b-form-select :options="form.ercOptions"
                               @change="onChangeERCType"
                               class="mr-2"
                               v-model="form.ercType"></b-form-select>
            </b-input-group>

            <div v-if="form.show['erc-20']">
                <b-input-group class="mt-2" prepend="Name">
                    <b-form-input
                            required
                            v-model="form['erc-20'].name"
                    ></b-form-input>
                </b-input-group>
                <b-input-group class="mt-2" prepend="Symbol">
                    <b-form-input
                            required
                            v-model="form['erc-20'].symbol"
                    ></b-form-input>
                </b-input-group>
                <b-input-group class="mt-2" prepend="Initial supply">
                    <b-form-input
                            required
                            v-model="form['erc-20'].initialSupply"
                    ></b-form-input>
                </b-input-group>
            </div>
            <b-form-row class="mt-2 ml-1">
                <b-button class="mr-2" type="submit" v-if="!this.form.loading" variant="primary">Deploy</b-button>
                <b-button disabled v-if="this.form.loading" variant="primary">
                    <b-spinner small type="grow"></b-spinner>
                    Deploying...
                </b-button>
                <b-button class="ml-2" type="reset" variant="danger">Reset</b-button>
                <b-button @click="goInteract" class="ml-2" type="submit" v-if="this.form.showInteractButton"
                          variant="info">Interact
                </b-button>
            </b-form-row>
        </b-form>
    </div>
</template>

<script>

    export default {
        name: "Deploy",
        data() {
            return {
                alert: {
                    success: {
                        show: false,
                        message: '',
                    },
                },
                form: {
                    ercType: null,
                    ercOptions: [
                        {value: null, text: 'Please select an option'},
                        {value: 'erc-20', text: 'ERC-20 Token Standard '},
                        {value: 'erc-721', text: 'ERC-721 Non-Fungible Token Standard'},
                    ],
                    loading: false,
                    show: initShowForms(),
                    showInteractButton: false,
                    "erc-20": {
                        name: '',
                        symbol: '',
                        initialSupply: '',
                    },
                    deployed: {
                        ercType: null,
                        contractAddress: null,
                    }
                },
            }
        },
        methods: {
            deployERC(evt) {
                this.form.loading = true;
                console.log('deploying contract');
                evt.preventDefault();
                const erc = this.$store.state.ercContracts[this.form.ercType];
                const form = this.form;
                const erc20Form = this.form["erc-20"];
                const fromAddress = window.ethereum.selectedAddress;
                const currentDeployVue = this;
                erc.contract.deploy({
                    data: erc.code,
                    arguments: [erc20Form.name, erc20Form.symbol, erc20Form.initialSupply],
                })
                    .send({
                        from: fromAddress,
                    }, function (err, transactionHash) {
                        if (err) {
                            console.error(err);
                            form.loading = false;
                        } else {
                            console.log('transaction hash: ', transactionHash);
                        }
                    })
                    .on('receipt', function (receipt) {
                        console.log(receipt.contractAddress); // contains the new contract address
                        currentDeployVue.$nextTick(() => {
                            console.log('contract deployed at: ', receipt.contractAddress);
                            form.deployed.ercType = currentDeployVue.form.ercType;
                            form.deployed.contractAddress = receipt.contractAddress;
                            form.loading = false;
                            form.showInteractButton = true;
                            currentDeployVue.alert.success.message = `Contract successfully deployed at ${receipt.contractAddress}`;
                            currentDeployVue.alert.success.show = true;
                        });
                    })
                    .then(async function (newContractInstance) {
                        console.log(newContractInstance);
                    });
            },
            reset(evt) {
                evt.preventDefault();
                this.form.ercType = null;
                this.form.show = initShowForms();
            },
            onChangeERCType(selected) {
                this.form.show = initShowForms();
                this.form.show[selected] = true;
            },
            goInteract() {
                const ercType = this.form.deployed.ercType;
                const contractAddress = this.form.deployed.contractAddress;
                const path = `/interact/${ercType}/${contractAddress}`;
                this.$router.push(path);
            },
        }
    }

    function initShowForms() {
        return {
            "erc-20": false,
        };
    }
</script>

<style scoped>

</style>