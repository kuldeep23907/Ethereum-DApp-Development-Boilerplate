const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3')
const web3 = new Web3(ganache.provider())
const {abi, bytecode} = require('../compile')

let accounts;
let dummy;

beforeEach('Deploy contract before each test', async() => {
    // get accounts from geth
    accounts = await web3.eth.getAccounts()
    // 10 acconts with 100 fake eth from ganache
    // console.log(accounts)

    dummy = await new web3.eth.Contract((abi))
    .deploy({data: bytecode, arguments:['Hello']})
    .send({from: accounts[0], gas: '1000000'})

    // dummy is here works as contrats written in sol
    // console.log(dummy)
})

describe('demo tests', () => {
    it('deploys contracts correctly', () => {
        assert.ok(dummy.options.address)
    })

    it('checks the default message',async() => {
        const msg = await dummy.methods.str().call()
        assert.equal(msg, 'Hello')
    })

    it('checks if string is getting updated correctly', async () => {
        await dummy.methods.updateString('Hi').send({from:accounts[0]})
        const msg = await dummy.methods.str().call()
        assert.equal(msg, 'Hi')        
    })
})
