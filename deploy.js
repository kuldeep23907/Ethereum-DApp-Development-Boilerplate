const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const {abi,bytecode} = require('./compile')
require('dotenv').config()

const provider = new HDWalletProvider(
    process.env.ETH_MNEMONIC,
    process.env.INFURA_KOVAN_API
)

const web3 = new Web3(provider)

const deploy = async () => {
    accounts = await web3.eth.getAccounts()

    console.log('account 1 address', accounts[0])

    const dummy = await new web3.eth.Contract(abi)
    .deploy({data: bytecode, arguments:['Hello']})
    .send({from:accounts[0], gas:'1000000'})

    console.log('Contract deployed at address', dummy.options.address)
}

deploy();