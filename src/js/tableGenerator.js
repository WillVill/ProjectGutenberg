function cityTableGenerator(data) {
    var length = data.length;

    var myTable= "<table id='bookTable'>";
        myTable+="<tr><th class='tableHeader'>City</td>";
        myTable+= "<th class='tableHeader'>Country Code</td></tr>";

    data.forEach(city =>{
        myTable+="<tr>";
        myTable+="<td class='tableData'>" + city.name + "</td>";
        myTable+="<td class='tableData'>" + city.countryCode + "</td></tr>";
    })
       myTable+="</table>";

    document.getElementById('citiesTable').innerHTML = myTable;
}

function bookAuthorTableGenerator(data) {
    var length = data.length;

    var myTable= "<table id='bookTable'>";
        myTable+="<tr><th class='tableHeader'>Title</td>";
        myTable+= "<th class='tableHeader'>Author</td></tr>";

      for (var i=0; i<length; i++) {
        myTable+="<tr>";
        myTable+="<td class='tableData'>" + data[i].title + "</td>";
        myTable+="<td class='tableData'>" + data[i].author + "</td></tr>";
      }  
       myTable+="</table>";

    document.getElementById('bookAuthorTable').innerHTML = myTable;
}

function bookAuthorCityTableGenerator(data) {
    var length = data.length;

    var myTable= "<table id='bookTable'>";
        myTable+="<tr><th class='bookCityHeader'>" + data.city.name + "</td>";
        myTable+= "<th class='tableHeader'>" + data.book.name + "</td></tr>";

      for (var i=0; i<length; i++) {
        myTable+="<tr>";
        myTable+="<td class='tableData'>" + data[i].name + "</td>";
        myTable+="<td class='tableData'>" + data[i].countryCode + "</td></tr>";
      }  
       myTable+="</table>";

    document.getElementById('bookAuthorCityTable').innerHTML = myTable;
}

function bookCitiesTableGenerator(data) {
    var length = data.length;

    var myTable= "<table id='bookTable'>";
        myTable+="<tr><th class='bookCityHeader'>" + data.city.name + "</td>";
        myTable+= "<th class='tableHeader'>" + data.book.name + "</td></tr>";

      for (var i=0; i<length; i++) {
        myTable+="<tr>";
        myTable+="<td class='tableData'>" + data[i].name + "</td>";
        myTable+="<td class='tableData'>" + data[i].countryCode + "</td></tr>";
      }  
       myTable+="</table>";

    document.getElementById('bookCitiesTable').innerHTML = myTable;
}
