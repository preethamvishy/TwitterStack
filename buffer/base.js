var config = require('../config');
const bufferAPIUrl = 'https://api.bufferapp.com/1';

export default {
    constructOpts(endpoint, method) {
        return {
            url: bufferAPIUrl + endpoint,
            method: method,
            json: true,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            auth: {
                bearer: config.bufferAccessToken
            },
        };
    }
}