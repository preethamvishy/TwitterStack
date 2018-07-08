var config = require('./config');
var request = require('request');

const twitterAPIUrl = 'https://api.twitter.com/1.1'

export default {
    authorize: function (req, res) {
        var header = config.consumerkey + ':' + config.consumersecret;
        var encheader = new Buffer(header).toString('base64');
        var finalheader = 'Basic ' + encheader;

        request.post('https://api.twitter.com/oauth2/token', {
            form: { 'grant_type': 'client_credentials' },
            headers: { Authorization: finalheader }
        }, function (error, response, body) {
            if (error)
                console.log(error);
            else {
                config.bearertoken = JSON.parse(body).access_token;
                res.json({ success: true });
            }
        })
    },
    search: function (req, res) {
        var searchquery = encodeURIComponent(req.params.query);
        var bearerheader = 'Bearer ' + config.bearertoken;

        request.get(`${twitterAPIUrl}/search/tweets.json?q=${searchquery}&result_type=recent`,
            { headers: { Authorization: bearerheader } }, function (error, body, response) {
                if (error)
                    console.log(error);
                else {
                    res.json({ success: true, data: JSON.parse(body.body) });
                }
            })
    },
    user: function (req, res) {
        var screenname = encodeURIComponent(req.params.screenname);
        var max = req.params.max || 200;

        var bearerheader = 'Bearer ' + config.bearertoken;
        request.get(`${twitterAPIUrl}/statuses/user_timeline.json?screen_name=${screenname}&count=${max}&tweet_mode=extended`,
            { headers: { Authorization: bearerheader } }, function (error, body, response) {
                if (error)
                    console.log(error);
                else {
                    res.json({ success: true, data: JSON.parse(body.body) });
                }
            })
    },
    list: function (req, res) {
        var screenname = encodeURIComponent(req.params.screenname);
        var listslug = encodeURIComponent(req.params.slug);
        var max = req.params.max || 200;

        var encsearchquery = encodeURIComponent(screenname);
        var bearerheader = 'Bearer ' + config.bearertoken;

        request.get(`${twitterAPIUrl}/lists/statuses.json?slug=${listslug}&owner_screen_name=${screenname}&count=${max}&tweet_mode=extended`,
            { headers: { Authorization: bearerheader } }, function (error, body, response) {
                if (error)
                    console.log(error);
                else {
                    res.json({ success: true, data: JSON.parse(body.body) });
                }
            }, err => console.log(err))

    },
    favs: function (req, res) {
        var screenname = encodeURIComponent(req.params.screenname);
        var max = req.params.max_id || 200;
        var bearerheader = 'Bearer ' + config.bearertoken;

        request.get(`${twitterAPIUrl}/favorites/list.json?count=${max}&screen_name=${screenname}&tweet_mode=extended`,
            { headers: { Authorization: bearerheader } }, function (error, body, response) {
                if (error)
                    console.log(error);
                else {
                    res.json({ success: true, data: JSON.parse(body.body) });
                }
            })
    },
    id: function (req, res) {
        var searchquery = req.params.id;
        var encsearchquery = encodeURIComponent(searchquery);

        var bearerheader = 'Bearer ' + config.bearertoken;
        request.get(`${twitterAPIUrl}/statuses/show.json?id=${encsearchquery}&tweet_mode=extended`,
            { headers: { Authorization: bearerheader } }, function (error, body, response) {
                if (error)
                    console.log(error);
                else {
                    res.json({ success: true, data: JSON.parse(body.body) });
                }
            })
    },
}