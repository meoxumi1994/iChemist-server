var Crawler = require("crawler");
var fs = require("fs");

fs.writeFile("./data_crawl_article.txt", "", function(err) {});
fs.writeFile("./data_crawl_medical.txt", "", function(err) {});

var c = new Crawler({
    maxConnections: 10,
    userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36",
    // This will be called for each crawled page
    callback: function(error, res, done) {
        if (error) {
            console.log(error);
        } else {
            const data = JSON.parse(res.body)
            data.data.map(value => {
                console.log("value", value)
            })

            // var $ = res.$;
            // medical = res.options.uri.split("/wiki/")[1]
            // $("p").text().split(".").map(sentence => {
            //
            //     sentence = sentence.toLowerCase()
            //     sentence = sentence.replace(new RegExp(medical, 'g'), "")
            //     medical.split("_").map(word => {
            //         sentence = sentence.replace(new RegExp(word, 'g'), "")
            //     })
            //     if(sentence.split(" ").length > 4){
            //         fs.appendFile("./data_crawl_article.txt", sentence.replace(new RegExp("\n", 'g')  , "") + "\n", function(err) {});
            //         fs.appendFile("./data_crawl_medical.txt", medical + "\n", function(err) {});
            //     }
            // })
            // $("dd").text().split(".").map(sentence => {
            //
            //     sentence = sentence.toLowerCase()
            //     sentence = sentence.replace(new RegExp(medical, 'g'), "")
            //     medical.split("_").map(word => {
            //         sentence = sentence.replace(new RegExp(word, 'g'), "")
            //     })
            //     if(sentence.split(" ").length > 4){
            //         fs.appendFile("./data_crawl_article.txt", sentence.replace(new RegExp("\n", 'g'), "") + "\n", function(err) {});
            //         fs.appendFile("./data_crawl_medical.txt", medical + "\n", function(err) {});
            //     }
            // })
            // $("dt").text().split(".").map(sentence => {
            //     sentence = sentence.toLowerCase()
            //     sentence = sentence.replace(new RegExp(medical, 'g'), "")
            //     medical.split("_").map(word => {
            //         sentence = sentence.replace(new RegExp(word, 'g'), "")
            //     })
            //     if(sentence.split(" ").length > 4){
            //         fs.appendFile("./data_crawl_article.txt", sentence.replace(new RegExp("\n", 'g'), "") + "\n", function(err) {});
            //         fs.appendFile("./data_crawl_medical.txt", medical + "\n", function(err) {});
            //     }
            // })
        }
        done();
    }
});

const arr_queue = []

arr_queue.push("https://chemistry-api.tungtung.vn/chemistry/equation/search?reactants=h2o&products=&page=1")

c.queue(arr_queue);
