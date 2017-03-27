/**
 * Created by Brian on 3/25/2017.
 */
$(function() {
    // Navigation
    function render(url) {
      
    }
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
