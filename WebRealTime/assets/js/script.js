/**
 * Created by Brian on 3/25/2017.
 */
$(function() {

    // current blank profiles
    var profiles;

    // Navigation
    function render(url) {
      
    }

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
    // Front_End Comment

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
