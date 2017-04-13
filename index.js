var fs = require('fs'),
    googleTrends = require('google-trends-api'),
    json2csv = require('json2csv'),
    contries = require('./countries.json').countries;

var keyword = 'depression';
if (process.argv[2]) {
    keyword = process.argv[2];
}
console.log("Requesting data for keyword: " + keyword);
var geoCode = 'DE-BY';

//for (var i = 0; i < contries.length; i++) {
//    var regions = contries[i]['regions'];
//    for (var j = 0; j < regions.length; j++) {
//        startSearch(regions[j]);
//    }
//}

startSearch("DE-BY");

function startSearch(geoCode) {
    googleTrends.interestOverTime({
            startTime: new Date('2017-02-01'),
            endTime: new Date('2017-02-06'),
            keyword: keyword,
            geo: geoCode
        })
        .then(function (results) {
            console.log(geoCode + " successful fetched!");
            var json = JSON.parse(results);
            var data = json['default']['timelineData'];
            var fields = ['formattedTime', 'formattedValue'];
            console.log(data);
            //saveData(geoCode, csv);
        })
        .catch(function (err) {
            console.error('Oh no there was an error', err);
        });
}

function formatCSVString(dataArray) {
    str = '';
    str += 'Land, Region, Jahr, Monat, Wert';
    for (var i = 0; i < dataArray.length; i++) {
        var line = '';
        line += counry;
        line += region;
        line += "year";
            for (var index in array[i]) {
                if (line != '') line += ','
                line += array[i][index];
            }
        str += line + '\r\n';
    }
    return str;
}

function convertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';
    str += 'question, solution, answer1, answer2, answer3, state, expected, up, down, pass\r\n';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','
            line += array[i][index];
        }
        str += line + '\r\n';
    }
    return str;
}

function saveData(filename, data) {
    var folder = 'output';
    if (fs.existsSync(folder) === false) {
        fs.mkdirSync(folder);
    }
    fs.writeFile(folder + '/' + filename + '.csv', data, 'utf8')
}
