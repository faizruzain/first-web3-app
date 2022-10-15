// contract test code will go here
const assert = require('assert')
const ganache = require('ganache') // ethereum blockchain simulator
const Web3 = require('web3')
const web3 = new Web3(ganache.provider())
const { bytecode, interface } = require('../compile')

let accounts
let inbox
const INITIAL_PESAN = 'Bismillah lulus tepat waktu!!!'

beforeEach(async() => {
  // Get list of all accounts
  accounts = await web3.eth.getAccounts()

  // Use one of those accounts to deploy a contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: [INITIAL_PESAN] })
    .send({ from: accounts[0], gas: '1000000' })

});

describe('my smart contract called Inbox', () => {
  it('deploys a contract',() => {
    assert.ok(inbox.options.address)
    //console.log(inbox)
  })

  it('has a default message', async() =>{
    const pesan = await inbox.methods.pesan().call()
    assert.equal(pesan, INITIAL_PESAN)
  })

  it('can change pesan', async() => {
    await inbox.methods.setPesan('Amiiinnn paling kenceng!!').send({ from: accounts[0] })
    const pesan = await inbox.methods.pesan().call()
    assert.equal(pesan, 'Amiiinnn paling kenceng!!')
  })

})

// describe('.sol Compiler', () => {
//   it('should return bytecode and interface',() => {
//     console.log(bytecode);
//     console.log('\n');
//     console.log(interface);
//   })
// })











// class Car {
//   park() {
//     return 'stop'
//   }

//   drive() {
//     return 'vrom'
//   }

// }

// describe('Car Class', () => {

//   let car;

//   beforeEach(() => {
//     car = new Car();
//   })

//   describe('method: park', () => {
//     it('should return stop', () => {
//       assert.equal(car.park(), 'stop');
//     });
//   });

//   describe('method: drive', () => {
//     it('should return vrom', () => {
//       assert.equal(car.drive(), 'vrom');
//     }) ;
//   });

// });