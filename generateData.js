const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');


//generates list of of genre titles...description needs to be added seperately
function getGenres() {
    let url = 'https://mangakakalot.com/read-cd3cm158504903532';

    request(url, (error, response, body) => {
        const $ = cheerio.load(body);

        $('td a').each((i, element) => {
            if (i >= 7) {
                let genre = $(element).attr('title');

                fs.appendFile('./data/genreList.json', '{\n\t"genre":"' + genre + '",\n\t"description":"Undefined"\n},\n',
                    (err) => {
                        if (err) {
                            console.log('Failed for : ', genre);
                        }
                    });
            }
        });
    });
}

//generates list of manga seperated into two different files based on source
function getMangaList() {
    //sets number of search pages to scrape
    let numPages = 5;

    for (i = 1; i <= numPages; i++) {
        let searchUrl = 'https://mangakakalot.com/manga_list?type=newest&category=all&state=all&page=' + i;

        request(searchUrl, (error, response, body) => {
            const $ = cheerio.load(body);

            $('div.list-truyen-item-wrap').each((i, element) => {
                let link = $(element).find('a').attr('href');
                let file = (link.startsWith('https://manganelo')) ? './data/manganelo.json' : './data/mangakakalot.json';

                fs.appendFile(file, '\t{"url":"' + link + '"},\n', (error) => {
                    if (error)
                        console.log('Failed for : ', link);
                });

            });
        });
    }
}

getGenres();
getMangaList();