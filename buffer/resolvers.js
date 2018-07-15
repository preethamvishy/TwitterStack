var request = require('request-promise');
import base from './base';

var opts = base.constructOpts('/profiles.json', 'GET')
const profiles = () => request(opts).then(res => res)

export default {
  Query: {
    profiles,
  },
}