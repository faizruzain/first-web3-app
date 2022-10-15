require('dotenv').config()

// deploy code will go here
const Web3 = require('web3')
const { bytecode, interface } = require('./compile')
const HDWalletProvider = require("@truffle/hdwallet-provider")

const API = process.env.API
const mnemonicPhrase = process.env.MNEMONIC_PHRASE // should save this in .env variable
let provider = new HDWalletProvider({
  mnemonic: {
    phrase: mnemonicPhrase
  },
  providerOrUrl: API
})

//let provider = new HDWalletProvider(mnemonicPhrase, API)

const web3 = new Web3(provider)

const deploy = async() => {
  const INITIAL_PESAN = 'Bismillah lulus tepat waktu!!!'

  const accounts = await web3.eth.getAccounts()
  console.log(` Attempting to deploy from account ${accounts[0]}`)

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: [INITIAL_PESAN] })
    .send({ from: accounts[0] })
  
  console.log(`Contract deployed at address: ${result.options.address}`)

  // At termination, `provider.engine.stop()' should be called to finish the process elegantly.
  provider.engine.stop()

}

deploy()