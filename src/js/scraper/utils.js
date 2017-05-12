var Papa = require('papaparse');
var fs = require('fs');

module.exports = {
    // saves arr of city objects into a text file
    saveToFile(arr, dir, fileName, extension) {
        var bookTitle = arr[0].title;
        var text = JSON.stringify(arr);

        if (extension === "csv") {
            text = Papa.unparse(text, {header: false});
            var newLine = "\r\n";
            text = newLine + text;
        }

        fs.appendFile(dir + fileName + "." + extension, text, (err) => {
            if (err) throw err;

            console.log("\nMetadata from the book [ " + bookTitle + " ] was succesfully saved in the file: " + fileName  + "." + extension + "\n");
        });
    }
}
