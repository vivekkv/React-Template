const path = require('path');

const port = process.env.YOUR_PORT || process.env.PORT || 80;
const host = process.env.YOUR_HOST || '0.0.0.0'

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
  uri: `http://${host}:${port}`,
  jwtSecret: "secret token phrase"
}
