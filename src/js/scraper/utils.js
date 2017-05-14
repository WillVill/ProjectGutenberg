var fs = require('fs');
var Papa = require('papaparse');
var colors = require('colors');

module.exports = {
    saveToFile(arr, dir, fileName, extension) {
        var bookTitle = arr[0].title;
        var bookAuthor = arr[0].author;
        var text = JSON.stringify(arr);

        if (extension === "csv") {
            text = Papa.unparse(arr, {header: false});
            var newLine = "\r\n";
            text = newLine + text;
        }

        fs.appendFileSync(dir + fileName + "." + extension, text);

        console.log("Book: " + bookTitle.bold + " by " + bookAuthor.bold + "\t✓".bold.green);
    },

    getProgressPercentage(a, b) {
        return Math.max( a / b * 100, 0 ).toFixed(2) + '%';
    }
}
