// compile code will go here
// req some module

const solc = require('solc')

// The path module provides utilities for working with file and directory paths.
const path = require('path');

// The fs module enables interacting with the file system in a way modeled on standard POSIX functions.
const fs = require('fs');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
console.log(inboxPath);

const source = fs.readFileSync(inboxPath, 'utf8');
console.log(source);

console.log(solc.compile(source, 1).contracts[':Inbox']);