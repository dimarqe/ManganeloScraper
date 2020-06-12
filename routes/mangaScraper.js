const router = require('express').Router();
const bodyparser = require('body-parser');
const request = require('request');
const cheerio = require('cheerio');

router.use(bodyparser.json());


//******************GET REQUESTS*********************/

router.get('/', (req, res, next) => {
    res.status(200).json({
        error: null,
        data: "...Connected"
    });
});


//******************POST REQUESTS*********************/
router.post('/genre', (req, res, next) => {

});

router.post('/manga/mangakakalot', (req, res, next) => {
    function mangakakalotInfo() {
        let url = 'https://mangakakalot.com/read-mk1ze158524520341';

        request(url, (error, response, body) => {
            if (error) {
                console.log(error);
            }
            else if (response.statusCode == 200) {
                const $ = cheerio.load(body);
                $('div#noidungm h2').remove();

                let genres = [];
                let authors = [];

                let thumbnail = $('div.manga-info-pic img').attr('src');
                let title = $('ul.manga-info-text li h1').text();
                let status = $('li:contains("Status")').text().replace('Status : ', '');

                $('li:contains("Author") a').each((i, element) => {
                    authors.push($(element).text());
                });

                $('li:contains("Genre") a').each((i, element) => {
                    genres.push($(element).text());
                });

                let description = $('div#noidungm').text().replace(/\n|\t/g, '');

                let mangaInfo = {
                    thumbnail: thumbnail,
                    title: title,
                    authors: authors,
                    status: status,
                    genres: genres,
                    description: description
                };

                console.log(mangaInfo);
            }
            else {
                console.log('Issue connecting to resource');
            }
        });
    }
});

router.post('/manga/manganelo', (req, res, next) => {
    function manganelo() {
        let url = 'https://manganelo.com/manga/ijhr296321559609648';

        request(url, (error, response, body) => {
            if (error) {
                console.log(error);
            }
            else if (response.statusCode == 200) {
                const $ = cheerio.load(body);
                $('#panel-story-info-description > h3').remove();

                let genres = [];
                let authors = [];


                let thumbnail = $('span.info-image img').attr('src');
                let title = $('div.story-info-right > h1').text();

                let status = $('table > tbody > tr:nth-child(2) > td.table-value').text();

                $('table > tbody > tr:nth-child(1) > td.table-value > a').each((i, element) => {
                    authors.push($(element).text());
                });

                $('table > tbody > tr:nth-child(3) > td.table-value > a').each((i, element) => {
                    genres.push($(element).text());
                });

                let description = $('div#panel-story-info-description').text().replace(/\n|\t/g, '');

                let mangaInfo = {
                    thumbnail: thumbnail,
                    title: title,
                    authors: authors,
                    status: status,
                    genres: genres,
                    description: description
                };

                console.log(mangaInfo);
            }
            else {
                console.log('Issue connecting to resource');
            }
        });
    }
});

module.exports = router;