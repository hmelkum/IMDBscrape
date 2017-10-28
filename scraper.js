const request = require('request');
const scrapeIt = require('scrape-it');
const jsonfile = require('jsonfile');

var page;
var file = 'data.json'
var i = 1
var arr=new Array();



function scraperloop(i) {
    setTimeout(function () {
        if (i <= 21) {

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

           function callback(error, response, body) {
                if (!error && response.statusCode == 200) {
                    page = scrapeIt.scrapeHTML(body, data);

                }
            }

            request(options, callback)
            //arr.push(...data.movies);
            arr.push(page);
            console.log(i+" done")
            scraperloop(++i)
        }
        else { 
             jsonfile.writeFile(file,/* page,*/arr, { spaces: 2 }, function (err) {
                 console.error(err || 'success')
             });

            return;
        }

    }, 3000)
}

scraperloop(i);