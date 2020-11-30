// from data.js
var tableData = data;

// YOUR CODE HERE!
// select filter type
var filterType = d3.select("#filter-type");
var filterTypeValue = d3.select("#filter-type-value");

// select the button
var submit = d3.select("#filter-btn");

// Get table body reference
var tbody = d3.select("tbody");

// print data to console
function autoPopulate(tableData){
	// use d3 to populate tableData into new table rows and cells
	tableData.forEach((alientd) => {
		// Create table rows for each row of alien data
		var row = tbody.append("tr");
		// iterate through each row for keys and values
		Object.entries(alientd).forEach(([key, value]) => {
			// create cell for each table data entry
			var cell = row.append("td");
			cell.text(value);
		});
	});
}

autoPopulate(tableData);
console.log(tableData);



// filter by dropdown selection
filterType.on("change", function(){
	var filterValue = filterType.property("value");
	d3.select("#filtertype").node().value = '';

	// set placeholder values
	switch (filterValue){
		case 'datetime': placeHolder = '1/1/2010';
			break;
		case 'city': placeHolder = 'city';
			break;
		case 'country': placeHolder = 'country';
			break;
		case 'shape': placeHolder = 'shape';
			break;
		default: placeHolder = '';
	}
	d3.select("input").attr("placeholder", placeHolder);
	d3.select("label").attr("for", filterValue).text(`Enter a value for ${filterValue.toUpperCase()}`);
});

// show filtered data once button is clicked
submit.on("click", function(){
	d3.event.preventDefault();

	// Clear table
	tbody.html("");

	// get filterType selected
	var inputElement = d3.select("#filtertype");
	var inputValue = inputElement.property("value");

	if (inputValue == '') {
		alert("Plase enter a filter value");
		document.getElementById("#filtertype").focus();
		autoPopulate(tableData);
	}

	// filter data
	var typeValue = d3.select("label").attr("for");
	var filteredData = tableData.filter(alientd => alientd[typeValue] === inputValue.toLowerCase());
	if(filteredData.length == 0){
		alert("No UFO data found. Try another filter value");
		d3.select("#filtertype").node().value = '';
		autoPopulate(tableData);
	}
	console.log(filteredData);

	// show filtered data
	filteredData.forEach((alientd) => {
		// create table rows for each row of alien data
		var row = tbody.append("tr");

		// iterate through each row for keys and values
		Object.entries(alientd).forEach(([key, value]) => {
			
			// Create cells for each table data
			var cell = row.append("td");
			cell.text(value);
		});
	});


})