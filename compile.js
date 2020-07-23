const path =  require('path');
const fs = require('fs');
const solc = require('solc');

contractPath = path.resolve(__dirname,'contracts', 'demo.sol');
sourceCode = fs.readFileSync(contractPath,'utf8');

// solidity version 0.6.0 and after expects json input as described below
var input = {
    language: 'Solidity',
    sources: {
      'demo.sol': {
        content: sourceCode
      }
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*']
        }
      }
    }
  }

// the output is also json so we have to parse it to read it
compiledCode = JSON.parse(solc.compile(JSON.stringify(input)));
// ABI of demo.sol
console.log((compiledCode).contracts['demo.sol'].Demo.abi);
// Bytecode of demo.sol
for (var contractName in compiledCode.contracts['demo.sol']) {
    console.log(
      contractName +
        ': ' +
        compiledCode.contracts['demo.sol'][contractName].evm.bytecode.object
    );
  }

const abi = (compiledCode).contracts['demo.sol'].Demo.abi;
const bytecode = (compiledCode).contracts['demo.sol'].Demo.evm.bytecode.object;

module.exports = {abi,bytecode};
