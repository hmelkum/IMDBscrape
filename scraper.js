const request = require('request');
const scrapeIt = require('scrape-it');
const jsonfile = require('jsonfile');

var file = 'data.json'

var options = {
    url: 'http://www.imdb.com/search/title?groups=top_1000&sort=user_rating&view=simple&page=1&ref_=adv_prv',
    headers: {
        'User-Agent': 'request'
    }
};

var data = {
    // Fetch the articles
    articles: {
        listItem: "li.chapter:not(.active)", 
        data: {
            url: {
                selector: "a",
                attr: "href",
                convert: function(x){
                    return 'http://www.imdb.com/search/title?groups=top_1000&sort=user_rating&view=simple&page='+x+'&ref_=adv_prv';
                }
            },
            title: "a"
        }
    }
}

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        page = scrapeIt.scrapeHTML(body, data);

        jsonfile.writeFile(file, page, { spaces: 2 }, function (err) {
            console.error(err || 'success')
        });
    }
}

request(options, callback);