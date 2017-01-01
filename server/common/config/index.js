const path = require('path');

const port = 3000
const host = 'localhost'

// makes an object of the form {userJoined: 'userJoined'}
const messageTypes = [
  'sayHello',
  'newDonor',
  'getDonor',
  'joinRequested'
].reduce((accum, msg) => {
  accum[ msg ] = msg
  return accum
}, {})

module.exports = {
  port,
  host,
  messageTypes,
  uri: `http://${host}:${port}`
}
