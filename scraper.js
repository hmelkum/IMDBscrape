const request = require('request');
const scrapeIt = require('scrape-it');
const jsonfile = require('jsonfile');


var file = 'data.json'
var i = 1
var arr=[];
function scraperloop(i) {
    setTimeout(function () {
        if (i <= 3) {

            var options = {
                url: 'http://www.imdb.com/search/title?groups=top_1000&sort=user_rating&view=simple&page=' + i + '&ref_=adv_prv',
                headers: {
                    'User-Agent': 'request'
                }
            };

            var data = {
                movies: {
                    listItem: "div.lister-list div.lister-item",
                    data: {

                        url: {
                            selector: "a",
                            attr: "href",
                            convert: function (x) {
                                return 'http://www.imdb.com/search/title?groups=top_1000&sort=user_rating&view=simple&page=1&ref_=adv_prv' + x;
                            }
                        },

                        title: "a",
                        rating: {
                            selector: "div.col-imdb-rating strong",
                            how: "text"
                        },
                        date: {
                            selector: "span.lister-item-year"
                        }
                    },
                }
            }

            arr.push(...data.movies);

            request(options, callback)
            scraperloop(++i)
        }
        else {
            function callback(error, response, body) {
                if (!error && response.statusCode == 200) {
                    page = scrapeIt.scrapeHTML(body, data);

                    jsonfile.writeFile(file, page, { spaces: 2 }, function (err) {
                        console.error(err || 'success')
                    });
                }
            }
            return;
        }

    }, 3000)
}

scraperloop(i);