var fs = require('fs'),
    googleTrends = require('google-trends-api');

var countryCode = 'DE';
if (process.argv[2]) {
    countryCode = process.argv[2];
}
startSearch();
function startSearch() {
    googleTrends.interestByRegion({
            keyword: "Trump",
            startTime: new Date('2017-02-01'),
            endTime: new Date('2017-02-06'),
            resolution: 'REGION',
            geo: countryCode
        })
        .then(function (results) {
            console.log("data successful fetched!");
        //console.log(results);
            var json = JSON.parse(results);
            var data = json['default']['geoMapData'];
            var fields = ['geoCode'];
            var csv = json22CSV(data);
            saveData('geocodes-'+countryCode+'.txt', csv);
        })
        .catch(function (err) {
            console.error('Oh no there was an error', err);
        });
}

function json22CSV(myData) {
    var string = '';
    myData.forEach(function(item){
        string += '"'+item.geoCode+'",';
    });
    return string;
}

function saveData(filename, data) {
    var folder = 'output';
    if (fs.existsSync(folder) === false) {
        fs.mkdirSync(folder);
    }
    fs.writeFile(folder + '/' + filename, data, 'utf8')
}
