/**
 * Created by Brian on 3/25/2017.
 */
$(function() {

    ///////////////////////////////////////
    /// Functionality for Toggles
    ///
    ///////////////////////////////////////
    // create all toggles
    $('.toggles').toggles();

    // Getting notified of changes on toggles, and the new state: Front Door
    $('.toggles-fd').on('toggle', function(e, active) {
        // when switched on
        if (active) {
            console.log('Toggle is now ON!');

            // start ajax call
            $.ajax({
				/* *
				 * URL: Place file path for php
				 * */
                url: "../script/json_rw.php",
                data: {
                    'writeRequest': 'alarm',
                    'writeValue' : 'on'
                },
                type: "POST",
                context: document.body
            }).success(function(msg) {
                console.log('wow ' + msg);
            });
            // end ajax call

        } else {
            console.log('Toggle is now OFF!');

            // start ajax call
            $.ajax({
				/* *
				 * URL: Place file path for php
				 * */
                url: "../script/json_rw.php",
                data: {
                    'writeRequest': 'alarm',
                    'writeValue' : 'off'
                },
                type: "POST",
                context: document.body
            }).success(function(msg) {
                console.log('wow ' + msg);
            });
            // end ajax call
        }
    });

    // Getting notified of changes on toggles, and the new state: Light 1
    $('.toggles-l1').on('toggle', function(e, active) {
        // when switched on
        if (active) {
            console.log('Toggle is now ON!');

            // start ajax call
            $.ajax({
				/* *
				 * URL: Place file path for php
				 * */
                url: "../script/json_rw.php",
                data: {
                    'writeRequest': 'light',
                    'id' : '1',
                    'writeValue' : '100'
                },
                type: "POST",
                context: document.body
            }).success(function(msg) {
                console.log('wow ' + msg);
            });
            // end ajax call

        } else {
            console.log('Toggle is now OFF!');

            // start ajax call
            $.ajax({
				/* *
				 * URL: Place file path for php
				 * */
                url: "../script/json_rw.php",
                data: {
                    'writeRequest': 'light',
                    'id' : '1',
                    'writeValue' : '0'
                },
                type: "POST",
                context: document.body
            }).success(function(msg) {
                console.log('wow ' + msg);
            });
            // end ajax call
        }
    });

    // Getting notified of changes on toggles, and the new state: Light 2
    $('.toggles-l2').on('toggle', function(e, active) {
        // when switched on
        if (active) {
            console.log('Toggle is now ON!');

            // start ajax call
            $.ajax({
				/* *
				 * URL: Place file path for php
				 * */
                url: "../script/json_rw.php",
                data: {
                    'writeRequest': 'Light',
                    'id' : '2',
                    'writeValue' : '100'
                },
                type: "POST",
                context: document.body
            }).success(function(msg) {
                console.log('wow ' + msg);
            });
            // end ajax call

        } else {
            console.log('Toggle is now OFF!');

            // start ajax call
            $.ajax({
				/* *
				 * URL: Place file path for php
				 * */
                url: "../script/json_rw.php",
                data: {
                    'writeRequest': 'Light',
                    'id' : '2',
                    'writeValue' : '0'
                },
                type: "POST",
                context: document.body
            }).success(function(msg) {
                console.log('wow ' + msg);
            });
            // end ajax call
        }
    });

    // Getting notified of changes on toggles, and the new state: Light 3
    $('.toggles-l3').on('toggle', function(e, active) {
        // when switched on
        if (active) {
            console.log('Toggle is now ON!');

            // start ajax call
            $.ajax({
				/* *
				 * URL: Place file path for php
				 * */
                url: "../script/json_rw.php",
                data: {
                    'writeRequest': 'Light',
                    'id' : '3',
                    'writeValue' : '100'
                },
                type: "POST",
                context: document.body
            }).success(function(msg) {
                console.log('wow ' + msg);
            });
            // end ajax call

        } else {
            console.log('Toggle is now OFF!');

            // start ajax call
            $.ajax({
				/* *
				 * URL: Place file path for php
				 * */
                url: "../script/json_rw.php",
                data: {
                    'writeRequest': 'Light',
                    'id' : '3',
                    'writeValue' : '0'
                },
                type: "POST",
                context: document.body
            }).success(function(msg) {
                console.log('wow ' + msg);
            });
            // end ajax call
        }
    });

    // test ajax call for weather
	/*
    $.ajax({

        url: "../script/json_rw.php",
        data: {
            'readRequest': 'weather'
        },
        type: "POST",
        context: document.body
    }).success(function(msg) {
        console.log('wow ' + msg);
        var obj = JSON.parse(msg);
        console.log(obj);
    });
	*/

	//////////////////////////////////////
	// Functionality to Read Weather Data
	// from modules
	//////////////////////////////////////

    setInterval(function(){
        $.ajax({
			/* *
			 * URL: Place file path for php
			 * */
            url: "../script/json_rw.php",
            data: {
                'readRequest': 'weather'
            },
            type: "POST",
            context: document.body
        }).success(function(msg) {
            //console.log('wow ' + msg);
            var obj = JSON.parse(msg);

            console.log(obj);

            // set the temp
            $('#tempi').html(obj["temp"]);
            $('#presi').html(obj["pressure"]);
            $('#humi').html(obj["humidity"]);
        });
	}, 5000);
	// $('#tempi').html('temp here');

    // current blank profiles
    var profiles;

    // Navigation
    function render(url) {
      
    }
    
    // Function: Load profiles
    $("button#db-profiles").click(function() {
		event.preventDefault();
		$('div.component-profile').html('<h2>Loading...</h2>');
		$('div.component-cash').hide(1000, function() {
            $(this).hide();
        });
        // get data
        var json_data
        $.ajax({
			url: "../data/script.php",
			type: "GET",
			context: document.body
		}).done(function(obj) {
			console.log("success");
			console.log(obj);
			var json_data = JSON.parse(obj);
			console.log(json_data);
			
			/*
			// add table to html
			$('div.component-profile').html('<table id="myTable"></table>');
			
			// output the result into a table
			
			var content = '<tr> result </tr>';
			$('#myTable tbody').append(content);
			* */
			
			// clear out the html
			$('div.component-profile').html('</br>');
			
			var parentDiv = $('div.component-profile');
			var pTable = $("<table>", {
				"id": "newTable",
				"class": "container-fluid table table-bordered"
			}).appendTo(parentDiv);
			/*var tRow = $("<tr>", {
				"class": "trClass"
			}).appendTo(pTable).html('result');
			* */
			// get lengths
			var rowCount = json_data.length;
			var colCount = Object.keys(json_data[0]).length;
			console.log('rows: ' + rowCount + ', cols: ' + colCount);
			
			
			console.log(json_data[0][Object.keys(json_data[0])[0]]);
			// Loop for header
			var headerRow = $("<tr>", {
				"class": "trClass table-success" // TODO: table-success not working
			}).appendTo(pTable);
			for (var j = 0; j < colCount; j++) {
				$("<th>", {
					"class": "thClass"
				}).appendTo(headerRow).html(Object.keys(json_data[0])[j]);
			}
			// end header Loop
			
			// Loop for data
			for (var i = 0; i < rowCount; i++) {
				var dataRow = $("<tr>", {
					"class": "table-success"
				}).appendTo(pTable);
				
				// header for row
				$("<th>", {
					"class": "row"
				}).appendTo(dataRow).html(json_data[i][Object.keys(json_data[0])[0]]);
				console.log('ID: ' + json_data[i][Object.keys(json_data[0])[0]]);
				
				for (var j = 1; j < colCount; j++) {
					$("<td>", {
						"class": "tdClass"
					}).appendTo(dataRow).html(json_data[i][Object.keys(json_data[0])[j]]);
				}
				
				// add Edit button to the end of table row
				$("<button>", {
					"type": "button",
					"class": "btn btn-primary"
				}).appendTo(dataRow).html('Edit');
				
				// add Delete button to the end of table row
				$("<button>", {
					"type": "button",
					"class": "btn btn-danger"
				}).appendTo(dataRow).html('Delete');
			}
			// end data Loop
			
			
		});
		
	});

    $("a").click(function(event) {
        event.preventDefault();
        var href = $(this).attr('href');
        console.log(href);
        $('div.component-cash').show();
        //$('div.component-profile').hide();
        profiles = $('.component-profile').empty();
        console.log(profiles);
       /* $('div.component-profile').hide(1000, function() {
            $(this).hide();
        });*/
    });

    $('#change-div').click(function () {
        var pathArray = window.location.pathname.split( '/' );
        //$('div.component-profile').load("profiles.html");
        $('div.component-profile').html('<h2>New heading</h2>');
        $('div.component-cash').hide(1000, function() {
            $(this).hide();
        });
        console.log(pathArray);
        /*$.get("profiles.html", function(data) {
            $('div.component-profile').html(data);
            $('div.component-cash').hide(1000, function() {
                $(this).hide();
            });
            //$('div.component-cash').html(data);
            console.log(data);
        });*/
    });
    //$('#container').hide();
    /*var obj = $('section form p:nth-child(3)');
    obj.append( "<span> - 2nd!</span>" );*/
    //console.log(obj);

    $('#get-data').click(function () {
        //alert( "Handler for .click() called." );
        var showData = $('#show-data');

        $.getJSON('../data/example.json', function (data) {
            console.log(data);

            /*var items = data.items.map(function (item) {
                return item.key + ': ' + item.value;
            });

            showData.empty();

            if (items.length) {
                var content = '<li>' + items.join('</li><li>') + '</li>';
                var list = $('<ul />').html(content);
                showData.append(list);
            }*/
            var disp_data = data.glossary.title;
            console.log(disp_data);
            var obj = $('section form p:nth-child(3)').append("<span>" + disp_data + "</span>");
        });

        showData.text('Loading the JSON file.');
    });
});
