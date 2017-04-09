/**
 * Created by Brian on 3/25/2017.
 */
$(function() {
    // Navigation
    function render(url) {
      
    }

    /*$("a").click(function( event ) {
       event.preventDefault();
        $.get("profiles.html", function(data) {
            $('div.component-cash').html(data);
            console.log(data);
        });
    });*/

    $("a").click(function(event) {
        event.preventDefault();
        var href = $(this).attr('href');
        console.log(href);
        $('div.component-cash').show();
        $('div.component-profile').hide(1000, function() {
            $(this).hide();
        });
    });

    $('#change-div').click(function () {
        //$('div.component-cash').replaceWith('<h2>New heading</h2>');
        var pathArray = window.location.pathname.split( '/' );
        $('div.component-profile').replaceWith('<h2>New heading</h2>');
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
