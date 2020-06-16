const router = require('express').Router();
const bodyparser = require('body-parser');

router.use(bodyparser.json());

router.post('/manga/mangakakalot', (req, res, next) => {
    let url = req.body.mangaUrl;

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
});

router.post('/manga/manganelo', (req, res, next) => {
    let url = req.body.mangaUrl;

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
});

module.exports = router;