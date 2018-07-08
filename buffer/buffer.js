var request = require('request');
const Buffer = require('buffer-js');
var config = require('../config');

const bufferAPIUrl = 'https://api.bufferapp.com/1'
const opts = {
    access_token: config.bufferAccessToken
};
var Profiles = new Buffer.Profiles(opts);
var Updates = new Buffer.Updates(opts);


export default {
    profiles: function(req, res) {
        Profiles.all((body) => {
            res.json(body)
        });
    },
    profile: function(req, res) {
        var profOpts = opts;
        profOpts.profile_id = req.params.id;
        Profiles.get((body) => {
            res.json(body)
        });
    },
    
    pendingUpdates: function(req, res) {
        var updateOpts = opts;
        updateOpts.profile_id = req.params.id;
        Profiles.pendingUpdates(updateOpts, (body) => {
            res.json(body)
        });
    },

    createUpdates: function (req, res) {
        var createOpts = {
            access_token: config.bufferAccessToken,
            profile_ids: req.body.profile_id,
            text: req.body.text ||  '',
            now: req.body.now || 'false',
            top: req.body.top || 'false',
        }
        if (req.body.media !== undefined)
            createOpts.media = {
                photo: req.body.media
            }
        if (req.body.scheduled_at !== undefined)
            createOpts.scheduled_at = req.body.scheduled_at

        var options = {
            method: req.method,
            url: `${bufferAPIUrl}/updates/create.json`,
            headers:
            {
                'Cache-Control': 'no-cache',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            form: createOpts
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            res.json(body);
        });
    },
    
    shuffleUpdates: function(req, res) {
        var shuffleOpts = opts;
        shuffleOpts.profile_id = req.params.id;
        Profiles.shuffleUpdates(shuffleOpts, (body) => {
            res.json(body)
        });
    },
}
